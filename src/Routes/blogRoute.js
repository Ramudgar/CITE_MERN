const express = require("express");
const router = express.Router();
const { createBlog } = require("../Controllers/blogController");
const { uploadBlogImage } = require("../services/fileUploadService");

// Route to create a new blog post with image upload
router.post("/create-blog", uploadBlogImage.single("imageUrl"), createBlog);

module.exports = router;
