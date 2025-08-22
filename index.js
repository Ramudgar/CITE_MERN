const express = require("express");
const db = require("./src/Config/db");
const config = require("./src/Config/config");
const app = express();

const port = config.PORT;
app.use(express.json());

// Connect to the database
db.connect();

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
