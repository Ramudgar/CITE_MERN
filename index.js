const express = require("express");
const db = require("./src/Config/db");
const config = require("./src/Config/config");

// Import routes
const authRoutes = require("./src/Routes/authRoute");
const blogRoutes = require("./src/Routes/blogRoute");
const userRoutes = require("./src/Routes/userRoute");

const app = express();

const port = config.PORT;
app.use(express.json());

// Connect to the database
db.connect();

app.use("/api/v1/auth", authRoutes);

app.use("/public", express.static("public"));

app.use("/api/v1/users", userRoutes);

app.use("/api/v1/blogs", blogRoutes);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
