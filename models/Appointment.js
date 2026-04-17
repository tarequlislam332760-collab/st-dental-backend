const mongoose = require('mongoose');

const appointmentSchema = mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    service: { type: String, required: true },
    status: { type: String, default: 'Pending' }, // Pending, Confirmed, Cancelled
}, { timestamps: true });

module.exports = mongoose.model('Appointment', appointmentSchema);