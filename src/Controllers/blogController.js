const { authenticateUser } = require("../Middleware/authMiddleware");
const Blog = require("../Models/blogModel");

// Create a new blog post
const createBlog = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validate required fields
    if (!title || !content) {
      return res
        .status(400)
        .json({ message: "Title, content, and author are required." });
    }
    const author = req.user.id; // Assuming authenticateUser middleware sets req.user

    // Handle image if uploaded
    const imageUrl = req.file ? `/public/blogImage/${req.file.filename}` : null;

    const newBlog = await Blog.create({
      title: title.trim(),
      content: content.trim(),
      author: author,
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

// controller function to get all blogs
const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate("author", " username email");
    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// controller function to get all blogs by a specific user
const getBlogsByUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const blogs = await Blog.find({ author: userId }).populate(
      "author",
      " -_id username  email"
    );
    return res.status(200).json({
      message: "Blogs fetched successfully",
      blogs,
    });
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// controller function to get a single blog by its ID

const getBlogById = async (req, res) => {
  try {
    const { blogId } = req.params;
    const blog = await Blog.findById({ _id: blogId }).populate(
      "author",
      " username email"
    );
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    return res.status(200).json({
      message: "Blog fetched successfully",
      blog,
    });
  } catch (error) {
    console.error("Error fetching blog:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Export the controller function

module.exports = { createBlog, getAllBlogs, getBlogsByUser, getBlogById };
