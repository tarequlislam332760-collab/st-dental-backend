const express = require('express');
const router = express.Router();
const { getDashboardStats } = require('../controllers/dashboardController');

// অ্যাডমিন প্যানেল এই লিঙ্কে রিকোয়েস্ট পাঠাবে
router.get('/', getDashboardStats);

module.exports = router;