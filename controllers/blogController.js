const Blog = require('../models/blogModel');

// ১. সব ব্লগ দেখা (সবচেয়ে নতুনটা আগে আসবে)
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: "Server error while fetching blogs" });
    }
};

// ২. নতুন ব্লগ সেভ করা
const createBlog = async (req, res) => {
    const { title, content, image, category, author } = req.body;

    // ভ্যালিডেশন
    if (!title || !content) {
        return res.status(400).json({ message: "Title and Content are required!" });
    }

    try {
        const newBlog = await Blog.create({ 
            title, 
            content, 
            image, 
            category,
            author: author || 'Admin' 
        });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: "Failed to create blog" });
    }
};

// ৩. ব্লগ আপডেট করা
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        
        if (!updatedBlog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: "Update failed. Check ID or Data" });
    }
};

// ৪. ব্লগ ডিলিট করা
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        
        if (!blog) {
            return res.status(404).json({ message: "Blog not found" });
        }
        
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Delete operation failed" });
    }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };