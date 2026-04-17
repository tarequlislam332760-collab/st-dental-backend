const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const colors = require('colors');

// ১. কনফিগ এবং কানেকশন ইমপোর্ট
const connectDB = require('./config/db');

// ২. রাউটস ইমপোর্ট
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes'); // ড্যাশবোর্ড রাউট ইমপোর্ট

// ৩. মিডলওয়্যার ইমপোর্ট
const { errorHandler } = require('./middleware/errorMiddleware');
const logger = require('./middleware/logger');

// এনভায়রনমেন্ট ভেরিয়েবল লোড
dotenv.config();

// ডাটাবেস কানেক্ট
connectDB();

const app = express();

// ৪. গ্লোবাল মিডলওয়্যার সেটআপ
app.use(cors());
app.use(express.json());
app.use(logger); 

// ৫. এপিআই রাউটস
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);          
app.use('/api/contact', contactRoutes);         
app.use('/api/dashboard', dashboardRoutes); // ড্যাশবোর্ড এপিআই কানেক্ট করা হলো

// ৬. রুট রাউট
app.get('/', (req, res) => {
    res.send('ST Lesser Clinic API is running with all features...');
});

// ৭. ভুল রাউট হ্যান্ডলার (৪০৪)
app.use((req, res, next) => {
    res.status(404);
    next(new Error('Requested route not found!'));
});

// ৮. গ্লোবাল এরর হ্যান্ডলার
app.use(errorHandler);

// পোর্ট সেটআপ
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`=========================================`.white);
    console.log(`🚀 Server Running on Port: ${PORT}`.yellow.bold);
    console.log(`📁 All Routes Connected Successfully`.cyan);
    console.log(`✅ MongoDB: Waiting for connection...`.green);
    console.log(`=========================================`.white);
});