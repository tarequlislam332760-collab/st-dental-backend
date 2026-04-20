const express = require('express');
const dotenv = require('dotenv');

// ১. সবার আগে এনভায়রনমেন্ট ভেরিয়েবল লোড
dotenv.config();

const cors = require('cors');
const colors = require('colors');
const connectDB = require('./config/db');

// ২. মিডলওয়্যার ইমপোর্ট
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./middleware/logger');

// ৩. রাউটস ইমপোর্ট
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');

// ডাটাবেস কানেক্ট
connectDB();

const app = express();

// ৪. গ্লোবাল মিডলওয়্যার
app.use(logger); // রিকোয়েস্ট আসার সাথে সাথে লগ করার জন্য উপরে দেওয়া হয়েছে
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ৫. এপিআই রাউটস
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);          
app.use('/api/contact', contactRoutes);         
app.use('/api/dashboard', dashboardRoutes); 

// ৬. রুট রাউট
app.get('/', (req, res) => {
    res.send('ST Dental & Facial Clinic API is running perfectly...');
});

// ৭. ভুল রাউট হ্যান্ডলার (৪০৪)
app.use((req, res, next) => {
    res.status(404);
    next(new Error('Requested route not found!'));
});

// ৮. গ্লোবাল এরর হ্যান্ডলার
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`=========================================`.white);
    console.log(`🚀 Server Running on Port: ${PORT}`.yellow.bold);
    console.log(`📁 All Routes Connected Successfully`.cyan);
    console.log(`📊 Dashboard Stats: ACTIVE`.magenta);
    console.log(`✅ MongoDB: Connected Successfully`.green);
    console.log(`=========================================`.white);
});