const express = require('express');
const router = express.Router();
const { 
    getReviews, 
    createReview, 
    updateReview, // নতুন যোগ করা হলো
    deleteReview 
} = require('../controllers/reviewController');

// ১. সব রিভিউ পাওয়ার জন্য (GET)
router.get('/', getReviews);

// ২. নতুন রিভিউ সেভ করার জন্য (POST)
router.post('/', createReview);

// ৩. রিভিউ আপডেট করার জন্য (PUT) - এডিট/সেভ এর জন্য
router.put('/:id', updateReview);

// ৪. রিভিউ ডিলিট করার জন্য (DELETE)
router.delete('/:id', deleteReview);

module.exports = router;