import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import cors from "cors";
const app = express();
const port = 7694;

// MongoDB Connection
const MONGODB_URI =
  "mongodb+srv://Akshay:Akshay_123@blogs.bakk5t5.mongodb.net/";

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  ssl: true,
});

// Define a MongoDB Schema
const blogSchema = new mongoose.Schema({
  title: String,
  content: String,
  author: String,
  type: String,
  date: { type: Date, default: Date.now },
  customId: Number, // Add customId field
});

const Blog = mongoose.model("Blog", blogSchema);

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// GET all blogs
app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
app.get("/blogsByType", async (req, res) => {
  try {
    const type = req.query.type;
    console.log("Received type parameter:", type);

    if (!type) {
      return res.status(400).json({ error: "Type parameter is missing" });
    }
    const filteredBlogs = await Blog.find({ type: new RegExp(type, 'i') });
    res.json(filteredBlogs);
  } catch (error) {
    console.error("Error fetching filtered blogs:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});
// GET a specific blog by id
app.get("/blogs/:customId", async (req, res) => {
  try {
    const blog = await Blog.findOne({ customId: req.params.customId });
    if (!blog) return res.status(404).json({ message: "Blog not found" });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET random blogs
app.get("/random-blogs", async (req, res) => {
  try {
    const blogCount = await Blog.countDocuments();
    const randomBlogs = await Blog.aggregate([
      { $sample: { size: blogCount } },
    ]);
    res.json(randomBlogs);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET blogs by type
app.get("/blogs/type", async (req, res) => {
  try {
    const type = req.query.type;
    console.log("Received type parameter:", type); // Add this line for debugging

    if (!type) {
      return res.status(400).json({ error: "Type parameter is missing" });
    }

    const filteredBlogs = await Blog.find({ type });
    res.json(filteredBlogs);
  } catch (error) {
    console.error("Error fetching filtered blogs:", error);
    res
      .status(500)
      .json({ error: "Internal Server Error", details: error.message });
  }
});

// POST a new blog
// POST a new blog with auto-incremented customId
app.post("/blogs", async (req, res) => {
  try {
    const maxCustomIdBlog = await Blog.findOne(
      {},
      { customId: 1 },
      { sort: { customId: -1 } }
    );
    const nextCustomId = maxCustomIdBlog ? maxCustomIdBlog.customId + 1 : 1;
    const blog = new Blog({ ...req.body, customId: nextCustomId });
    const savedBlog = await blog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// PATCH a blog when you just want to update one parameter
app.patch("/blogs/:customId", async (req, res) => {
  try {
    const updatedBlog = await Blog.findOneAndUpdate(
      { customId: req.params.customId },
      { $set: req.body },
      { new: true }
    );
    if (!updatedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// DELETE a specific blog by providing the blog id
app.delete("/blogs/:customId", async (req, res) => {
  try {
    const deletedBlog = await Blog.findOneAndDelete({
      customId: req.params.id,
    });
    if (!deletedBlog)
      return res.status(404).json({ message: "Blog not found" });
    res.json({ message: "Blog deleted" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.listen(port, () => {
  console.log(`API is running at http://localhost:${port}`);
});
