const Appointment = require('../models/Appointment');
const Review = require('../models/Review');

// ১. ড্যাশবোর্ড স্ট্যাটাস পাওয়ার লজিক
const getDashboardStats = async (req, res) => {
    try {
        const totalAppointments = await Appointment.countDocuments();
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const newReviews = await Review.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        const uniquePatients = await Appointment.distinct('phone'); 
        const totalPatients = uniquePatients.length;

        const recentAppointments = await Appointment.find()
            .sort({ createdAt: -1 })
            .limit(5);

        res.status(200).json({
            totalAppointments,
            newReviews,
            totalPatients,
            recentAppointments,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// ২. ড্যাশবোর্ড আপডেট করার লজিক
const updateDashboardData = async (req, res) => {
    try {
        res.status(200).json({ message: "Dashboard updated successfully" });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { 
    getDashboardStats, 
    updateDashboardData 
};