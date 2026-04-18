const express = require('express');
const router = express.Router();
const Message = require('../models/Message'); // নিশ্চিত করুন models ফোল্ডারে Message.js আছে

// ১. কন্টাক্ট মেসেজ ডাটাবেসে সেভ করার জন্য (POST)
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;
        const newMessage = new Message({ name, email, subject, message });
        await newMessage.save();
        res.status(201).json({ success: true, message: "Message sent successfully!" });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
});

// ২. সব মেসেজ দেখার জন্য (GET) - অ্যাডমিন প্যানেলের জন্য
router.get('/', async (req, res) => {
    try {
        const messages = await Message.find().sort({ createdAt: -1 });
        res.json(messages);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// ৩. মেসেজ ডিলিট করার জন্য (DELETE) - অ্যাডমিন প্যানেলের জন্য
router.delete('/:id', async (req, res) => {
    try {
        const deletedMessage = await Message.findByIdAndDelete(req.params.id);
        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: "Message not found" });
        }
        res.json({ success: true, message: "Message deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;