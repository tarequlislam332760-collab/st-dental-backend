const express = require('express');
const router = express.Router();
const { 
    createAppointment, 
    getAppointments, 
    deleteAppointment // এটি নতুন যোগ করতে হবে
} = require('../controllers/appointmentController');

// ওয়েবসাইট থেকে অ্যাপয়েন্টমেন্ট বুক করার জন্য
router.post('/', createAppointment); 

// অ্যাডমিন প্যানেলে সব অ্যাপয়েন্টমেন্ট দেখার জন্য
router.get('/', getAppointments); 

// অ্যাডমিন প্যানেল থেকে নির্দিষ্ট অ্যাপয়েন্টমেন্ট ডিলিট করার জন্য
router.delete('/:id', deleteAppointment); 

module.exports = router;