const express = require('express');
const router = express.Router();
// আপনার কন্ট্রোলার থেকে প্রয়োজনীয় ফাংশনগুলো ইমপোর্ট করুন
const { 
    getDashboardStats, 
    updateDashboardData // নিশ্চিত করুন আপনার কন্ট্রোলারে এই ফাংশনটি আছে
} = require('../controllers/dashboardController');

// ১. ড্যাশবোর্ড ডাটা দেখার জন্য (GET /api/dashboard)
router.get('/', getDashboardStats);

// ২. ড্যাশবোর্ড ডাটা আপডেট করার জন্য (PUT /api/dashboard/update)
// আপনার এরর লগে এই এন্ডপয়েন্টটি খুঁজছিল, তাই এটি যোগ করা হলো
router.put('/update', updateDashboardData);

module.exports = router;