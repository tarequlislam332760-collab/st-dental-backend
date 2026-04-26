const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');

// এনভায়রনমেন্ট ভেরিয়েবল লোড করা
dotenv.config();

// ডাটাবেস কানেকশন
connectDB();

const app = express();

// ১. সঠিক ও ক্লিন CORS কনফিগারেশন
const allowedOrigins = [
    "https://st-dental-frontend.vercel.app",
    "http://localhost:5173",
    "http://localhost:3000"
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            return callback(null, true);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// ২. প্রি-ফ্লাইট (OPTIONS) রিকোয়েস্ট হ্যান্ডেল করা
app.options('*', cors());

// ৩. মিডলওয়্যার
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ৪. রাউটস ইমপোর্ট
const appointmentRoutes  = require('./routes/appointmentRoutes');
const reviewRoutes       = require('./routes/reviewRoutes');
const contactRoutes      = require('./routes/contactRoutes');
const dashboardRoutes    = require('./routes/dashboardRoutes');
const blogRoutes         = require('./routes/blogRoutes');
const siteContentRoutes  = require('./routes/siteContentRoutes'); // ✅ নতুন

// ৫. এপিআই এন্ডপয়েন্ট
app.use('/api/appointments',  appointmentRoutes);
app.use('/api/reviews',       reviewRoutes);
app.use('/api/contact',       contactRoutes);
app.use('/api/dashboard',     dashboardRoutes);
app.use('/api/blogs',         blogRoutes);
app.use('/api/site-content',  siteContentRoutes); // ✅ নতুন

// রুট পাথ চেক
app.get('/', (req, res) => {
    res.status(200).json({
        status: "success",
        message: 'ST Dental Clinic API is running perfectly...',
        mongodb_status: process.env.MONGO_URI ? "Configured" : "URI Missing"
    });
});

// ৬. এরর হ্যান্ডেলার
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port: ${PORT}`.yellow.bold);
});