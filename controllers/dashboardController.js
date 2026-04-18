const Appointment = require('../models/Appointment');
const Review = require('../models/Review');

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

        res.json({
            totalAppointments,
            newReviews,
            totalPatients,
            recentAppointments,
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = { getDashboardStats };