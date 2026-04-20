const express = require('express');
const router = express.Router();
const { 
    getBlogs, 
    createBlog, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');

// সব ব্লগ নিয়ে আসার জন্য
router.get('/', getBlogs);

// নতুন ব্লগ তৈরি করার জন্য
router.post('/', createBlog);

// নির্দিষ্ট ব্লগ আপডেট করার জন্য
router.put('/:id', updateBlog);

// নির্দিষ্ট ব্লগ ডিলিট করার জন্য
router.delete('/:id', deleteBlog);

module.exports = router;