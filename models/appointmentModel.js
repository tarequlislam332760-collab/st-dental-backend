const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  department: {
    type: String,
    required: true,
    // আপনার ফ্রন্টএন্ডের সিলেক্ট অপশনের সাথে মিলিয়ে রাখা হয়েছে
    enum: ['Dental Care', 'Facial Aesthetic (Skin/Face)', 'Maxillofacial Surgery', 'General Dentistry'],
  },
  appointmentDate: {
    type: String, // '2026-04-20' ফরম্যাটে সেভ করা সহজ ফিল্টার করার জন্য
    required: true
  },
  timeSlot: {
    type: String, // যেমন: '10:00 AM'
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  }
}, { 
  timestamps: true // এটি অটোমেটিক createdAt এবং updatedAt তৈরি করবে
});

// একই দিনে, একই সময়ে যাতে দুইজন সিরিয়াল না পায় তার জন্য (Optional Validation)
// appointmentSchema.index({ appointmentDate: 1, timeSlot: 1 }, { unique: true });

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;