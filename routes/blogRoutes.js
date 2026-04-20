const express = require('express');
const router = express.Router();
const { 
    getBlogs, 
    createBlog, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');

// ১. সব ব্লগ পাওয়ার জন্য
router.get('/', getBlogs);

// ২. নতুন ব্লগ তৈরি করার জন্য
router.post('/', createBlog);

// ৩. ব্লগ আপডেট করার জন্য (ID সহ)
router.put('/:id', updateBlog);

// ৪. ব্লগ ডিলিট করার জন্য (ID সহ)
router.delete('/:id', deleteBlog);

module.exports = router;