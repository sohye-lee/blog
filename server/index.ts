import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
import routes from './routes/index';

// MIDDLEWARE
const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cors());
app.use(morgan('dev'));
app.use(cookieParser());

// ROUTES
app.use('/api', routes.authRouter);

// DATABASE
import './config/database';

// SERVER LISTENING
const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
    console.log("Server is running on port : ", PORT);
})