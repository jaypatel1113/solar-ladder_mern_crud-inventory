import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import { userRoutes } from "./routes/userRoutes.js";
import { bookInvRoutes } from "./routes/bookInvRoutes.js";

export const app = express();

dotenv.config({path: "./config/config.env"});

app.use(express.json({limit: "50mb"}));
app.use(express.urlencoded({extended: true, limit: "50mb"}));
app.use(cookieParser());

app.use(cors({credentials: true, origin: ['http://localhost:3000', process.env.FRONTEND_URL]}));


app.use("/api/user", userRoutes);
app.use("/api/book", bookInvRoutes);
