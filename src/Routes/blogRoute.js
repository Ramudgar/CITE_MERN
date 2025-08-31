const express = require("express");
const router = express.Router();
const { createBlog, getAllBlogs } = require("../Controllers/blogController");
const { uploadBlogImage } = require("../services/fileUploadService");
const { authenticateUser } = require("../Middleware/authMiddleware");

// Route to create a new blog post with image upload
router.post(
  "/create-blog",
  authenticateUser,
  uploadBlogImage.single("imageUrl"),
  createBlog
);

/**
 * @description get all blogs
 * @api GET /api/v1/blogs
 * @access Public
 * @type GET
 * @returns response
 */
router.get("/all", getAllBlogs);

module.exports = router;
