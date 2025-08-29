const Blog = require("../Models/blogModel");


// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content, author } = req.body;

    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({ message: "Title, content, and author are required." });
    }

    // Handle image if uploaded
    const imageUrl = req.file ? `/public/blogImage/${req.file.filename}` : null;

    const newBlog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      author: author.trim(),
      imageUrl,
    });

    return res.status(201).json({
      message: "Blog created successfully",
      blog: newBlog,
    });
  } catch (error) {
    console.error("Error creating blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createBlog };

