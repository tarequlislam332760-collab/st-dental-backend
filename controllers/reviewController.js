const Review = require('../models/Review');

// ১. সব রিভিউ দেখা
const getReviews = async (req, res) => {
    try {
        const reviews = await Review.find().sort({ createdAt: -1 });
        res.status(200).json(reviews);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// ২. নতুন রিভিউ তৈরি
const createReview = async (req, res) => {
    try {
        const { name, text, rating } = req.body; 
        const review = await Review.create({ 
            name, 
            text, 
            rating 
        });
        res.status(201).json({ success: true, data: review });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ৩. রিভিউ আপডেট/এডিট করা (নতুন যুক্ত করা হলো)
const updateReview = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedReview = await Review.findByIdAndUpdate(
            id,
            { $set: req.body },
            { new: true, runValidators: true }
        );

        if (!updatedReview) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }

        res.status(200).json({ success: true, data: updatedReview });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// ৪. রিভিউ ডিলিট করা
const deleteReview = async (req, res) => {
    try {
        const review = await Review.findByIdAndDelete(req.params.id);
        
        if (!review) {
            return res.status(404).json({ success: false, message: "Review not found" });
        }
        
        res.status(200).json({ success: true, message: "Review deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { getReviews, createReview, updateReview, deleteReview }; // updateReview এক্সপোর্ট করা হলো