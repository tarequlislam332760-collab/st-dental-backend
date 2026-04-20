const express = require('express');
const router = express.Router();

// কন্ট্রোলার থেকে ফাংশনগুলো ইমপোর্ট করুন
const { 
    getDashboardStats, 
    updateDashboardData 
} = require('../controllers/dashboardController');

// ১. ড্যাশবোর্ড ডাটা দেখার জন্য (GET /api/dashboard)
router.get('/', getDashboardStats);

// ২. ড্যাশবোর্ড ডাটা আপডেট করার জন্য (PUT /api/dashboard/update)
router.put('/update', updateDashboardData);

// খুব জরুরি: নিশ্চিত করুন এখানে শুধু 'router' এক্সপোর্ট হচ্ছে, কোনো {} অবজেক্ট নয়
module.exports = router;