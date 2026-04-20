const Blog = require('../models/blogModel');

// @desc    Get all blogs
// @route   GET /api/blogs
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Create a blog
// @route   POST /api/blogs
const createBlog = async (req, res) => {
    try {
        const { title, description, image, category } = req.body;
        const blog = await Blog.create({ title, description, image, category });
        res.status(201).json(blog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Get single blog
const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (blog) res.json(blog);
        else res.status(404).json({ message: 'Blog not found' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update blog
const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// @desc    Delete blog
const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: 'Blog removed' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogs, createBlog, getBlogById, updateBlog, deleteBlog };