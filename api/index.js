import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';   
import morgan from 'morgan';
import roleRoute from './routes/role.js';
import authRoute from './routes/auth.js';
import userRoute from './routes/user.js';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';

const app = express();
dotenv.config();

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// middlewears
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true,
}));

// Create uploads directory if it doesn't exist
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
    fs.mkdirSync(uploadsDir, { recursive: true });
}

// Serve static files from uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// routes
app.use('/api/role', roleRoute);
app.use('/api/auth', authRoute);
app.use('/api/user', userRoute);

// Test route
app.get('/test', (req, res) => {
    res.send('Server is working!');
});

// response handling middleware
app.use((obj, req, res, next)=>{
    const statusCode = obj.status || 500;
    const message = obj.message || "Internal Server Error!";
    return res.status(statusCode).json({
        success: [200, 201, 204].some(a=>a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data || null
    })
})

// connect to database
const connectMongoDB = async() =>{
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to Database!")
    } catch (error) {
        console.err(error);
        throw error;
    }
}

// start server
app.listen(8800, ()=>{
    connectMongoDB();
    console.log("Connected to backend");
})
