const express = require('express');
const router = express.Router();
const Review = require('../models/Review');

// ১. সব রিভিউ পাওয়ার জন্য (GET)
router.get('/', async (req, res) => {
  try {
    const reviews = await Review.find().sort({ createdAt: -1 });
    res.json(reviews);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// ২. নতুন রিভিউ সেভ করার জন্য (POST)
router.post('/', async (req, res) => {
  const review = new Review({
    name: req.body.name,
    text: req.body.text, // মডেলে 'text' থাকলে এখানেও 'text' ই থাকবে
    rating: req.body.rating,
  });

  try {
    const newReview = await review.save();
    res.status(201).json(newReview);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// ৩. রিভিউ ডিলিট করার জন্য (DELETE) -> এই অংশটিই আপনার ৪MD ৪ এরর সমাধান করবে
router.delete('/:id', async (req, res) => {
  try {
    const review = await Review.findByIdAndDelete(req.params.id);
    
    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }
    
    res.json({ message: "Review deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;