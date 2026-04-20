const express = require('express');
const router = express.Router();
const { 
    getBlogs, 
    createBlog, 
    getBlogById, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');

// সব ব্লগ পেতে এবং নতুন ব্লগ তৈরি করতে
router.route('/')
    .get(getBlogs)
    .post(createBlog);

// নির্দিষ্ট একটি ব্লগ দেখতে, আপডেট করতে বা ডিলিট করতে
router.route('/:id')
    .get(getBlogById)
    .put(updateBlog)
    .delete(deleteBlog);

module.exports = router;