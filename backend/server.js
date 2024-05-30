import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routes/auth.routes.js";
import path from "path";
import connectToMongoDB from "./db/connectToMongoDB.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import cookieParser from "cookie-parser";
import { app, server } from './socket/socket.js';

const PORT=process.env.PORT || 5000;
dotenv.config();

const __dirname = path.resolve();


app.use(express.json());// tp parse the incoming requests with JSON payloads(from req.body)
app.use(cookieParser());

app.use("/api/auth",appRoutes);
app.use("/api/messages",messageRoutes);
app.use("/api/users",userRoutes);

app.use(express.static(path.join(__dirname,"/frontend/dist")));

app.get("*",(req,res)=>{
    res.sendFile(path.join(__dirname,"frontend","dist","index.html"));
});

server.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
});
