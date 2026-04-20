const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  phone: { type: String, required: true, trim: true },
  service: { type: String, required: true }, // এটিই আপনার ডিপার্টমেন্ট বা সার্ভিস
  appointmentDate: { type: String, required: true }, // যেমন: '2026-04-20'
  timeSlot: { type: String, required: true }, // যেমন: '10:00 AM'
  status: { type: String, enum: ['Pending', 'Confirmed', 'Cancelled'], default: 'Pending' }
}, { 
  timestamps: true 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);
module.exports = Appointment;