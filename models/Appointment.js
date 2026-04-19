const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true }, // এটি 'department' হিসেবেও কাজ করবে
    timeSlot: { type: String, required: true }, // নতুন ফিল্ড
    appointmentDate: { type: String, required: true }, // নতুন ফিল্ড
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);