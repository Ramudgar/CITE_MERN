// BeginnerForm.jsx
import React, { useState } from "react";

export default function Form() {
  // ---- individual state per input (beginner-friendly) ----
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [bio, setBio] = useState("");
  const [country, setCountry] = useState("np");
  const [gender, setGender] = useState("male");
  const [agree, setAgree] = useState(false);
  const [avatar, setAvatar] = useState(null);       // single file
  const [files, setFiles] = useState([]);           // multiple files

  const onSubmit = (e) => {
    e.preventDefault();

    // Show how to read each value
    console.log("name:", name);
    console.log("email:", email);
    console.log("password:", password);
    console.log("bio:", bio);
    console.log("country:", country);
    console.log("gender:", gender);
    console.log("agree:", agree);
    console.log("avatar:", avatar?.name || null);
    console.log("files:", files.map((f) => f.name));

    alert("Submitted! Check console for values.");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-6">
      <form
        onSubmit={onSubmit}
        className="w-full max-w-md space-y-4 rounded-xl bg-white p-6 shadow"
      >
        <h1 className="text-xl font-bold">Beginner React Form (Individual States)</h1>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium">Name</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)} // individual handler
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium">Email</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} // individual handler
          />
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium">Password</label>
          <input
            className="mt-1 w-full rounded border px-3 py-2"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // individual handler
          />
        </div>

        {/* Bio */}
        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            className="mt-1 w-full rounded border px-3 py-2"
            rows={3}
            value={bio}
            onChange={(e) => setBio(e.target.value)} // individual handler
          />
        </div>

        {/* Country (Select) */}
        <div>
          <label className="block text-sm font-medium">Country</label>
          <select
            className="mt-1 w-full rounded border px-3 py-2"
            value={country}
            onChange={(e) => setCountry(e.target.value)} // individual handler
          >
            <option value="np">Nepal</option>
            <option value="in">India</option>
            <option value="us">USA</option>
          </select>
        </div>

        {/* Gender (Radio) */}
        <div>
          <span className="block text-sm font-medium">Gender</span>
          <div className="mt-1 flex gap-4">
            {["male", "female", "other"].map((g) => (
              <label key={g} className="flex items-center gap-2 text-sm">
                <input
                  type="radio"
                  name="gender"
                  value={g}
                  checked={gender === g}
                  onChange={(e) => setGender(e.target.value)} // individual handler
                />
                {g}
              </label>
            ))}
          </div>
        </div>

        {/* Terms (Checkbox) */}
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={agree}
            onChange={(e) => setAgree(e.target.checked)} // individual handler
          />
          I agree to terms
        </label>

        {/* Avatar (Single Image) */}
        <div>
          <label className="block text-sm font-medium">Avatar (single image)</label>
          <input
            className="mt-1 w-full rounded border p-2 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700"
            type="file"
            accept="image/*"
            onChange={(e) => setAvatar(e.target.files?.[0] || null)} // individual handler
          />
        </div>

        {/* Attachments (Multiple Files) */}
        <div>
          <label className="block text-sm font-medium">Attachments (multiple)</label>
          <input
            className="mt-1 w-full rounded border p-2 file:mr-4 file:rounded-md file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-indigo-700"
            type="file"
            multiple
            onChange={(e) => setFiles(Array.from(e.target.files || []))} // individual handler
          />
          {files.length > 0 && (
            <ul className="mt-2 list-inside list-disc text-sm text-gray-600">
              {files.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={!agree}
          className="w-full rounded bg-indigo-600 px-4 py-2 font-medium text-white hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
