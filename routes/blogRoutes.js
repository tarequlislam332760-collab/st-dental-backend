const express = require('express');
const router = express.Router();
const { 
    getBlogs, 
    createBlog, 
    updateBlog, 
    deleteBlog 
} = require('../controllers/blogController');

/**
 * @route   GET /api/blogs
 * @desc    সব ব্লগগুলো ডাটাবেজ থেকে নিয়ে আসবে
 */
router.get('/', getBlogs);

/**
 * @route   POST /api/blogs
 * @desc    অ্যাডমিন প্যানেল থেকে নতুন ব্লগ সেভ করবে
 */
router.post('/', createBlog);

/**
 * @route   PUT /api/blogs/:id
 * @desc    নির্দিষ্ট আইডি অনুযায়ী ব্লগ এডিট/আপডেট করবে
 */
router.put('/:id', updateBlog);

/**
 * @route   DELETE /api/blogs/:id
 * @desc    নির্দিষ্ট আইডি অনুযায়ী ব্লগ ডাটাবেজ থেকে মুছে ফেলবে
 */
router.delete('/:id', deleteBlog);

module.exports = router;