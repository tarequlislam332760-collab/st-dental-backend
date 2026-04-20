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
            // ডেভেলপমেন্টের সুবিধার জন্য প্রোডাকশনেও ট্রু রাখা হলো
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

// ৩. মিডলওয়্যার (ব্লগের বড় ইমেজের জন্য ৫০mb লিমিট)
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ৪. রাউটস ইমপোর্ট
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const blogRoutes = require('./routes/blogRoutes');

// ৫. এপিআই এন্ডপয়েন্ট
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);          
app.use('/api/contact', contactRoutes);         
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/blogs', blogRoutes); 

// রুট পাথ চেক
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: "success",
        message: 'ST Dental Clinic API is running on Vercel...',
        mongodb_status: process.env.MONGO_URI ? "Configured" : "URI Missing"
    });
});

// ৬. এরর হ্যান্ডেলার
app.use(errorHandler);

// ৭. ভার্সেলের জন্য এক্সপোর্ট (এটিই সবচেয়ে গুরুত্বপূর্ণ পরিবর্তন)
module.exports = app;

// লোকালহোস্টে চালানোর জন্য এই অংশটুকু
const PORT = process.env.PORT || 5000;
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`🚀 Server Running on Port: ${PORT}`.yellow.bold);
    });
}