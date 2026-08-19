const mongoose = require('mongoose');

const serviceSessionSchema = new mongoose.Schema({
  serviceName:  { type: String, required: true },          // যে সার্ভিসের জন্য সেশন (যেমন: "রুট ক্যানেল ট্রিটমেন্ট")
  category:     { type: String, enum: ['dental', 'skin'], required: true },
  date:         { type: Date, required: true },
  patientName:  { type: String },                          // Admin-only, website এ দেখাবে না
  note:         { type: String },                          // Admin-only
  status:       { type: String, enum: ['pending', 'completed', 'cancelled'], default: 'pending' },
}, { timestamps: true });

serviceSessionSchema.index({ serviceName: 1, date: 1 });

module.exports = mongoose.model('ServiceSession', serviceSessionSchema);
