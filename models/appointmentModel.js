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
    enum: ['Dental Care', 'Facial Aesthetic', 'Maxillofacial Surgery', 'Select Department'],
    default: 'Select Department'
  },
  date: {
    type: String, // অথবা Date টাইপ ব্যবহার করতে পারেন
    required: true
  },
  time: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Cancelled'],
    default: 'Pending'
  },
  createdAt: {
    type: Date,
    default: Date.now
  } 
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;