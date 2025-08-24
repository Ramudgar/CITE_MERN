const express = require("express");
const db = require("./src/Config/db");
const config = require("./src/Config/config");

// Import routes
const authRoutes = require("./src/Routes/authRoute");

const app = express();

const port = config.PORT;
app.use(express.json());

// Connect to the database
db.connect();

app.use("/api/v1/auth", authRoutes);


app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
