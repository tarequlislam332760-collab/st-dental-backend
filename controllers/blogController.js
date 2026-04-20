const Blog = require('../models/blogModel');

// ১. সব ব্লগ দেখা (অ্যাডমিন ও ইউজার সবার জন্য)
const getBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().sort({ createdAt: -1 });
        res.status(200).json(blogs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ২. নতুন ব্লগ সেভ করা (Save Option)
const createBlog = async (req, res) => {
    try {
        const { title, description, image, category } = req.body;
        const newBlog = await Blog.create({ title, description, image, category });
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

// ৩. ব্লগ আপডেট করা (Edit/Update Option)
const updateBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedBlog = await Blog.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );
        if (!updatedBlog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json(updatedBlog);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ৪. ব্লগ ডিলিট করা (Delete Option)
const deleteBlog = async (req, res) => {
    try {
        const { id } = req.params;
        const blog = await Blog.findByIdAndDelete(id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.status(200).json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getBlogs, createBlog, updateBlog, deleteBlog };