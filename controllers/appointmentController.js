const Appointment = require('../models/Appointment');

// ১. নতুন অ্যাপয়েন্টমেন্ট তৈরি করা (ওয়েবসাইট থেকে)
const createAppointment = async (req, res) => {
    try {
        const { name, phone, service } = req.body;
        const appointment = await Appointment.create({ name, phone, service });
        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ২. সব অ্যাপয়েন্টমেন্ট দেখা (অ্যাডমিন প্যানেলের জন্য)
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        // ফ্রন্টএন্ডে সরাসরি res.data ম্যাপ করার সুবিধার জন্য ডাটা পাঠানো হচ্ছে
        res.status(200).json(appointments); 
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ৩. অ্যাপয়েন্টমেন্ট ডিলিট করা (অ্যাডমিন প্যানেল থেকে)
const deleteAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const appointment = await Appointment.findByIdAndDelete(id);

        if (!appointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({ success: true, message: "Appointment deleted successfully" });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

module.exports = { 
    createAppointment, 
    getAppointments, 
    deleteAppointment // এটি এক্সপোর্ট করতে ভুলবেন না
};