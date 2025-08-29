const express = require("express");
const router = express.Router();
const { createBlog } = require("../Controllers/blogController");
const { uploadBlogImage } = require("../services/fileUploadService");
const { authenticateUser } = require("../Middleware/authMiddleware");

// Route to create a new blog post with image upload
router.post(
  "/create-blog",
  authenticateUser,
  uploadBlogImage.single("imageUrl"),
  createBlog
);

module.exports = router;
