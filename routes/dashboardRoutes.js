const express = require('express');
const router = express.Router();
const { 
    getDashboardStats, 
    updateDashboardData 
} = require('../controllers/dashboardController');

// ১. ড্যাশবোর্ড ডাটা দেখার জন্য (GET /api/dashboard)
router.get('/', getDashboardStats);

// ২. ড্যাশবোর্ড ডাটা আপডেট করার জন্য (PUT /api/dashboard/update)
router.put('/update', updateDashboardData);

module.exports = router;