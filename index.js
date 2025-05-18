import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import sequelize from './db/client.js';
import userRouter from './routes/userRoutes.js';
import cookieParser from 'cookie-parser';

dotenv.config();

const app = express();

app.use(cors({
    origin: ['http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 4000;

(async () => {
    try {
        await sequelize.authenticate();
        console.log('DB connection OK');
        await sequelize.sync();
        app.use('/api/user', userRouter);
        app.listen(PORT, () => {
            console.log(`Server running on port: ${PORT}`);
        });
    } catch (error) {
        console.error('Error connecting to DB:', error);
    }
})();


