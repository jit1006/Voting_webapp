import express from 'express';
const app = express();
import { db } from './db.js';
import { configDotenv } from 'dotenv';
import cors from 'cors';
configDotenv();
const PORT = process.env.PORT || 3302


// middleware body-parser (use built-in express.json)
app.use(express.json());  // object name ->  req.body
app.use(cors());

//import the router files
import userRoutes from './routes/userRoutes.js';
import candidateRoutes from './routes/candidateRoutes.js';

// use the routes
app.use('/user', userRoutes);
app.use('/candidate', candidateRoutes);

app.listen(PORT, () => {
    console.log(`Listening on port : ${PORT}`);
})