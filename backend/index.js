import express from 'express';
import dotenv from 'dotenv';
import connectDb from './database/db.js';
import cookieParser from 'cookie-parser';
import cloudinary from 'cloudinary';
import path from 'path';

dotenv.config();

cloudinary.v2.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
}); 

const app = express();

//using middleware
app.use(express.json());
app.use(cookieParser());

const port = process.env.PORT;

//importing routes
import userRoutes from "./routes/userRoutes.js";
import songRoutes from "./routes/songRoutes.js";

//using routes
app.use('/api/user', userRoutes);
app.use('/api/song', songRoutes);

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname,"/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
  });

app.listen(port, () => {
    console.log(`Server is running on http://localhost: ${port}`);
    connectDb();
});