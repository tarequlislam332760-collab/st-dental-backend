const Appointment = require('../models/Appointment');
const Review = require('../models/Review');

const getDashboardStats = async (req, res) => {
    try {
        // ১. মোট অ্যাপয়েন্টমেন্ট সংখ্যা
        const totalAppointments = await Appointment.countDocuments();

        // ২. নতুন রিভিউ (গত ৭ দিনের)
        const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
        const newReviews = await Review.countDocuments({ createdAt: { $gte: sevenDaysAgo } });

        // ৩. মোট রোগী (ইউনিক ফোন নম্বর অনুযায়ী অ্যাপয়েন্টমেন্ট থেকে বের করা)
        const uniquePatients = await Appointment.distinct('phone'); 
        const totalPatients = uniquePatients.length;

        // ৪. সাম্প্রতিক ৫টি অ্যাপয়েন্টমেন্ট
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