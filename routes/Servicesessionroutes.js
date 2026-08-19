const express = require('express');
const router = express.Router();
const ServiceSession = require('../models/ServiceSession');

// ================== ADMIN ROUTES (full data) ==================

// GET /api/service-sessions?category=dental&serviceName=...  — সব সেশন (admin)
router.get('/', async (req, res) => {
  try {
    const filter = {};
    if (req.query.category) filter.category = req.query.category;
    if (req.query.serviceName) filter.serviceName = req.query.serviceName;

    const sessions = await ServiceSession.find(filter).sort({ date: 1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// POST /api/service-sessions — নতুন সেশন যোগ করো
router.post('/', async (req, res) => {
  try {
    const { serviceName, category, date, patientName, note, status } = req.body;
    if (!serviceName || !category || !date) {
      return res.status(400).json({ success: false, message: 'serviceName, category এবং date আবশ্যক' });
    }
    const session = await ServiceSession.create({ serviceName, category, date, patientName, note, status });
    res.status(201).json({ success: true, data: session });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// PUT /api/service-sessions/:id — সেশন আপডেট করো
router.put('/:id', async (req, res) => {
  try {
    const { _id, __v, createdAt, updatedAt, ...updateData } = req.body;
    const session = await ServiceSession.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    if (!session) return res.status(404).json({ success: false, message: 'সেশন পাওয়া যায়নি' });
    res.json({ success: true, data: session });
  } catch (err) {
    res.status(400).json({ success: false, message: err.message });
  }
});

// DELETE /api/service-sessions/:id — সেশন ডিলিট করো
router.delete('/:id', async (req, res) => {
  try {
    const session = await ServiceSession.findByIdAndDelete(req.params.id);
    if (!session) return res.status(404).json({ success: false, message: 'সেশন পাওয়া যায়নি' });
    res.json({ success: true, message: 'সেশন ডিলিট হয়েছে' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

// ================== PUBLIC ROUTE (limited data — no patient name/note) ==================

// GET /api/service-sessions/public/:serviceName — শুধু তারিখ ও status (website এর জন্য)
router.get('/public/:serviceName', async (req, res) => {
  try {
    const sessions = await ServiceSession.find({ serviceName: req.params.serviceName })
      .select('date status -_id')
      .sort({ date: 1 });
    res.json(sessions);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
