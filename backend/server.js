import express from 'express';
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
import dotenv from "dotenv";
import connectDb from './config/dbConnect.js';
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { notFound, errorHandler } from "./middlewares/errorMiddleware.js";

import authRouter from "./routes/authRoute.js";
import userRouter from "./routes/userRoutes.js";
import gigRouter from "./routes/gigRoute.js";
import orderRouter from "./routes/orderRoute.js";
import conversationRouter from "./routes/conversationRoute.js";
import messageRouter from "./routes/messageRoute.js";
import reviewRouter from "./routes/reviewRoute.js"; 

dotenv.config({ path: path.resolve(__dirname, "./.env") });

connectDb();
const app = express();


app.use(cookieParser());
app.use(express.json({ limit: "50mb" }));

app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000",
};
app.use(cors(corsOptions));

app.use('/api/auth',authRouter)    
app.use('/api/users',userRouter)    
app.use('/api/gigs',gigRouter)
app.use('/api/orders',orderRouter)
app.use("/api/conversations", conversationRouter);
app.use("/api/messages", messageRouter);
app.use("/api/reviews", reviewRouter);


app.use(notFound);
app.use(errorHandler);


const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`); 
})