const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./middleware/logger');

// ১. কনফিগারেশন
dotenv.config();
connectDB();

const app = express();

// ২. মিডলওয়্যার (CORS সবার উপরে থাকা জরুরি)
app.use(logger); 
app.use(cors({
    origin: ["https://st-dental-frontend.vercel.app", "http://localhost:5173"], 
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
}));

// ৩. বডি পার্সার
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ৪. রাউটস ইমপোর্ট
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const blogRoutes = require('./routes/blogRoutes');

// ৫. এপিআই এন্ডপয়েন্ট কানেক্ট করা
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);          
app.use('/api/contact', contactRoutes);         
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/blogs', blogRoutes); 

// ৬. রুট ইউআরএল চেক
app.get('/', (req, res) => {
    res.send('ST Dental & Facial Clinic API is running perfectly...');
});

// ৭. ভুল রাউট হ্যান্ডলার (৪০৪)
app.use((req, res, next) => {
    res.status(404);
    next(new Error(`Requested route ${req.originalUrl} not found!`));
});

// ৮. গ্লোবাল এরর হ্যান্ডলার
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port: ${PORT}`.yellow.bold);
});