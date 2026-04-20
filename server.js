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

// ১. সঠিক CORS কনফিগারেশন
const allowedOrigins = [
    "https://st-dental-frontend.vercel.app", 
    "http://localhost:5173"
];

app.use(cors({
    origin: function (origin, callback) {
        // মোবাইল অ্যাপ বা লোকাল রিকোয়েস্টের জন্য !origin চেক
        if (!origin) return callback(null, true);
        if (allowedOrigins.indexOf(origin) === -1) {
            const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
            return callback(new Error(msg), false);
        }
        return callback(null, true);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With', 'Accept']
}));

// ২. প্রি-ফ্লাইট (OPTIONS) রিকোয়েস্ট হ্যান্ডেল করা
app.options('*', cors());

// ৩. মিডলওয়্যার (ব্লগের বড় ইমেজের জন্য ৫৪mb লিমিট)
app.use(express.json({ limit: '50mb' })); 
app.use(express.urlencoded({ extended: true, limit: '50mb' }));

// ৪. কাস্টম হেডার মিডলওয়্যার (CORS এর এক্সট্রা সিকিউরিটি)
app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (allowedOrigins.includes(origin)) {
        res.header("Access-Control-Allow-Origin", origin);
    }
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});

// ৫. রাউটস ইমপোর্ট
const appointmentRoutes = require('./routes/appointmentRoutes');
const reviewRoutes = require('./routes/reviewRoutes'); 
const contactRoutes = require('./routes/contactRoutes'); 
const dashboardRoutes = require('./routes/dashboardRoutes');
const blogRoutes = require('./routes/blogRoutes');

// ৬. এপিআই এন্ডপয়েন্ট
app.use('/api/appointments', appointmentRoutes);
app.use('/api/reviews', reviewRoutes);          
app.use('/api/contact', contactRoutes);         
app.use('/api/dashboard', dashboardRoutes); 
app.use('/api/blogs', blogRoutes); 

// রুট পাথ চেক
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: "success",
        message: 'ST Dental Clinic API is running perfectly...',
        mongodb_status: process.env.MONGO_URI ? "Configured" : "URI Missing"
    });
});

// ৭. এরর হ্যান্ডেলার (অবশ্যই রাউটের নিচে থাকবে)
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port: ${PORT}`.yellow.bold);
});