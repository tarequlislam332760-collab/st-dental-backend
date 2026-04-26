const express = require('express');
const router = express.Router();
const SiteContent = require('../models/SiteContent');

// GET — একটি section এর data আনো
router.get('/:section', async (req, res) => {
  try {
    let doc = await SiteContent.findOne({ section: req.params.section });
    if (!doc) {
      // প্রথমবার default data তৈরি করো
      doc = await SiteContent.create({ section: req.params.section });
    }
    res.json(doc);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// PUT — একটি section আপডেট করো
router.put('/:section', async (req, res) => {
  try {
    const doc = await SiteContent.findOneAndUpdate(
      { section: req.params.section },
      { ...req.body, section: req.params.section },
      { new: true, upsert: true, runValidators: false }
    );
    res.json({ success: true, data: doc });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;