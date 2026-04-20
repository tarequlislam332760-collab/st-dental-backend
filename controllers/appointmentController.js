const Appointment = require('../models/Appointment');

// ১. নতুন অ্যাপয়েন্টমেন্ট তৈরি করা
const createAppointment = async (req, res) => {
    try {
        // ফ্রন্টএন্ড থেকে এই ৫টি ডাটা অবশ্যই পাঠাতে হবে
        const { name, phone, service, appointmentDate, timeSlot } = req.body;

        // চেক করা হচ্ছে সব ডাটা আসছে কি না
        if (!name || !phone || !service || !appointmentDate || !timeSlot) {
            return res.status(400).json({ 
                success: false, 
                message: "সবগুলো ঘর পূরণ করা বাধ্যতামূলক (Required fields missing)" 
            });
        }

        const appointment = await Appointment.create({ 
            name, 
            phone, 
            service, 
            appointmentDate, 
            timeSlot 
        });

        res.status(201).json({ success: true, data: appointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ২. সব অ্যাপয়েন্টমেন্ট দেখা
const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json(appointments); 
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// ৩. অ্যাপয়েন্টমেন্ট আপডেট করা
const updateAppointment = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedAppointment = await Appointment.findByIdAndUpdate(
            id, 
            { $set: req.body }, 
            { new: true, runValidators: true }
        );

        if (!updatedAppointment) {
            return res.status(404).json({ success: false, message: "Appointment not found" });
        }

        res.status(200).json({ success: true, data: updatedAppointment });
    } catch (error) {
        res.status(400).json({ success: false, message: error.message });
    }
};

// ৪. অ্যাপয়েন্টমেন্ট ডিলিট করা
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
    updateAppointment, 
    deleteAppointment 
};