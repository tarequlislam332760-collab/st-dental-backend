const Appointment = require('../models/Appointment');

const createAppointment = async (req, res) => {
    try {
        // ফ্রন্টএন্ড থেকে বিভিন্ন নামে ডাটা আসতে পারে, তাই আমরা সবগুলোকে চেক করছি
        const name = req.body.name || req.body.fullName;
        const phone = req.body.phone || req.body.phoneNumber;
        const service = req.body.service || req.body.department || req.body.selectDepartment;
        const appointmentDate = req.body.appointmentDate || req.body.preferredDate || req.body.date;
        const timeSlot = req.body.timeSlot || req.body.preferredTime || req.body.time;

        // চেক করা হচ্ছে সব ডাটা আছে কি না
        if (!name || !phone || !service || !appointmentDate || !timeSlot) {
            return res.status(400).json({ 
                success: false, 
                message: "সবগুলো ঘর পূরণ করা বাধ্যতামূলক (Required fields missing)",
                receivedData: req.body // এটি আপনাকে ডিবাগ করতে সাহায্য করবে
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

const getAppointments = async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ createdAt: -1 });
        res.status(200).json(appointments); 
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

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

module.exports = { createAppointment, getAppointments, updateAppointment, deleteAppointment };