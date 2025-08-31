const express = require("express");
const router = express.Router();
const {
  createBlog,
  getAllBlogs,
  getBlogsByUser,
  getBlogById,
} = require("../Controllers/blogController");
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

/**
 * @description get all blogs by a specific user
 * @api GET /api/v1/blogs/user/:userId
 * @access Public
 * @type GET
 * @returns response
 */
router.get("/user/:userId", authenticateUser, getBlogsByUser);

/**
 * @description get a single blog by its ID
 * @api GET /api/v1/blogs/:blogId
 * @access Public
 * @type GET
 * @returns response
 */
router.get("/:blogId", getBlogById);

module.exports = router;
