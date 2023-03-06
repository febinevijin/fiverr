import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
import connectDb from './config/dbConnect.js';

dotenv.config({ path: path.resolve(__dirname, "./.env") });

connectDb();
const app = express();

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`); 
})