import dotenv from 'dotenv';
import express from 'express';
import connectDB from './src/db/db.js';
import cookieParser from 'cookie-parser';
import cors from "cors";
import userRoutes from './src/routes/user.routes.js'
import tasksRoutes from './src/routes/tasks.routes.js'

dotenv.config({
    path: '.env'
});

const app = express();


app.use(cors({ origin: process.env.CORS }));
app.use(cookieParser());
app.use(express.json({ limit: "15kb" }));
app.use(express.urlencoded({ extended: true, limit: "15kb" }));

app.use('/api/users', userRoutes); 
app.use('/api/tasks', tasksRoutes); 

connectDB().then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server listening on port ${process.env.PORT}`);
    });
}).catch((error) => {
    console.log(`Server error: ${error}`);
});
