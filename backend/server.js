import express from "express";
import dotenv from "dotenv";
import appRoutes from "./routes/auth.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";

const app = express();

const PORT=process.env.PORT || 5000;
dotenv.config();
app.use(express.json());// tp parse the incoming requests with JSON payloads(from req.body)
app.use("/api/auth",appRoutes);


// app.get("/",(req,res)=>{
//     root route http://localhost:5000/
//     res.send("Hello World!");
// });


app.listen(PORT,()=>{
    connectToMongoDB();
    console.log(`server running on port ${PORT}`);
});
