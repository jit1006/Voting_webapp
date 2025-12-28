import express from 'express';
const app = express();
import { db } from './db.js';
import { configDotenv } from 'dotenv';
import cors from 'cors';
configDotenv();
const PORT = process.env.PORT || 3302


// middleware body-parser (use built-in express.json)
app.use(express.json());  // object name ->  req.body
app.use(cors({
    origin: [
        'http://localhost:3000',
        'http://localhost:5173',
        process.env.FRONTEND_URL,
        process.env.ADDITIONAL_FRONTEND_URL
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true // Required if you are sending cookies or specialized headers
}));

//import the router files
import userRoutes from './routes/userRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';

// use the routes
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
})
