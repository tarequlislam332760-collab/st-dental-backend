const express = require('express');
const router = express.Router();
const { 
    getDashboardStats, 
    updateDashboardData 
} = require('../controllers/dashboardController');

// ১. ড্যাশবোর্ড ডাটা দেখার জন্য
router.get('/', getDashboardStats);

// ২. ড্যাশবোর্ড ডাটা আপডেট করার জন্য
router.put('/update', updateDashboardData);

// সরাসরি router এক্সপোর্ট (এটিই সঠিক নিয়ম)
module.exports = router;