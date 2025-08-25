# -*- coding: utf-8 -*-
import os, pickle, random
from typing import List, Dict, Any
import numpy as np

from datasets import Dataset, DatasetDict, ClassLabel, Features, Sequence, Value
from transformers import (
    XLMRobertaTokenizerFast, AutoConfig, AutoModelForTokenClassification,
    DataCollatorForTokenClassification, TrainingArguments, Trainer, EarlyStoppingCallback
)
import evaluate

# ========== CONFIG ==========
DATASET_PKL = "dataset.pkl"       # must contain keys: train/validation/test -> {tokens, ner_tags}
LABELS_TXT  = "labels.txt"        # one label per line, order must match your ner_tags IDs
MODEL_NAME  = "xlm-roberta-base"  # try -large after baseline
OUTPUT_DIR  = "outputs_xlmr_base"
SEED        = 42
EPOCHS      = 5
LR          = 5e-5
BS_TRAIN    = 16
BS_EVAL     = 32
WEIGHT_DECAY = 0.01
WARMUP_RATIO = 0.1
USE_FP16     = True               # set False on CPU
MAX_LENGTH   = 128                # if sentences are long, try 256
# ===========================

random.seed(SEED); np.random.seed(SEED)

def load_splits(pkl_path:str) -> Dict[str,Any]:
    with open(pkl_path, "rb") as f: raw = pickle.load(f)
    for sp in ("train","validation","test"):
        assert sp in raw and "tokens" in raw[sp] and "ner_tags" in raw[sp]
    return raw

def to_hf(raw:Dict[str,Any]) -> DatasetDict:
    dd = {sp: Dataset.from_dict({"tokens": raw[sp]["tokens"], "ner_tags": raw[sp]["ner_tags"]})
          for sp in ("train","validation","test")}
    return DatasetDict(dd)

def load_label_list(labels_txt:str, dataset:DatasetDict, raw:Dict[str,Any]) -> List[str]:
    # Prefer labels.txt (explicit, stable)
    if os.path.isfile(labels_txt):
        with open(labels_txt, "r", encoding="utf-8") as f:
            return [ln.strip() for ln in f if ln.strip()]
    # Else try dataset feature names
    try:
        names = dataset["train"].features["ner_tags"].feature.names
        if names: return names
    except: pass
    # Else infer numeric IDs
    ids=set(); [ids.update(row) for row in raw["train"]["ner_tags"]]
    return [f"LABEL_{i}" for i in sorted(ids)]

def cast_with_labels(dataset, label_list):
    feats = Features({"tokens": Sequence(Value("string")),
                      "ner_tags": Sequence(ClassLabel(names=label_list))})
    return DatasetDict({sp: dataset[sp].cast(feats) for sp in dataset.keys()})

def tokenize_and_align(batch, tokenizer, pad_id=-100):
    tok = tokenizer(batch["tokens"], is_split_into_words=True,
                    truncation=True, max_length=MAX_LENGTH)
    all_labels = []
    for i, word_labels in enumerate(batch["ner_tags"]):
        word_ids = tok.word_ids(batch_index=i)
        prev = None; label_ids=[]
        for wid in word_ids:
            if wid is None: label_ids.append(pad_id)
            elif wid != prev: label_ids.append(word_labels[wid])  # first subtoken uses word label
            else: label_ids.append(pad_id)                        # continuation ignored
            prev = wid
        all_labels.append(label_ids)
    tok["labels"] = all_labels
    return tok

def main():
    raw = load_splits(DATASET_PKL)
    dataset = to_hf(raw)
    label_list = load_label_list(LABELS_TXT, dataset, raw)
    id2label = {i:l for i,l in enumerate(label_list)}
    label2id = {l:i for i,l in id2label.items()}
    dataset = cast_with_labels(dataset, label_list)

    tokenizer = XLMRobertaTokenizerFast.from_pretrained(MODEL_NAME)
    tokenized = dataset.map(lambda ex: tokenize_and_align(ex, tokenizer),
                            batched=True, remove_columns=["tokens","ner_tags"],
                            desc="Tokenizing & aligning")

    config = AutoConfig.from_pretrained(MODEL_NAME, num_labels=len(label_list),
                                        id2label=id2label, label2id=label2id)
    model = AutoModelForTokenClassification.from_pretrained(MODEL_NAME, config=config)

    collator = DataCollatorForTokenClassification(tokenizer)
    seqeval = evaluate.load("seqeval")
    def compute_metrics(p):
        logits, labels = p
        preds = np.argmax(logits, axis=-1)
        tp, tl = [], []
        for pred, lab in zip(preds, labels):
            p_tags, l_tags = [], []
            for pi, li in zip(pred, lab):
                if li == -100: continue
                p_tags.append(id2label[pi]); l_tags.append(id2label[li])
            tp.append(p_tags); tl.append(l_tags)
        res = seqeval.compute(predictions=tp, references=tl)
        return {"precision":res["overall_precision"], "recall":res["overall_recall"],
                "f1":res["overall_f1"], "accuracy":res["overall_accuracy"]}

    os.makedirs(OUTPUT_DIR, exist_ok=True)
    args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        learning_rate=LR,
        per_device_train_batch_size=BS_TRAIN,
        per_device_eval_batch_size=BS_EVAL,
        num_train_epochs=EPOCHS,
        weight_decay=WEIGHT_DECAY,
        warmup_ratio=WARMUP_RATIO,
        evaluation_strategy="epoch",
        save_strategy="epoch",
        load_best_model_at_end=True,
        metric_for_best_model="f1", greater_is_better=True,
        fp16=USE_FP16, seed=SEED, logging_steps=50, report_to=[]
    )

    trainer = Trainer(model=model, args=args,
                      train_dataset=tokenized["train"],
                      eval_dataset=tokenized["validation"],
                      tokenizer=tokenizer,
                      data_collator=collator,
                      compute_metrics=compute_metrics,
                      callbacks=[EarlyStoppingCallback(early_stopping_patience=2)])

    print("🚀 Training XLM-R base…")
    trainer.train()
    print("DEV:", trainer.evaluate())
    print("TEST:", trainer.evaluate(eval_dataset=tokenized["test"]))
    trainer.save_model(OUTPUT_DIR)
    with open(os.path.join(OUTPUT_DIR,"labels.txt"),"w",encoding="utf-8") as f:
        f.write("\n".join(label_list))
    print("✅ Saved model to", OUTPUT_DIR)

if __name__ == "__main__":
    main()
