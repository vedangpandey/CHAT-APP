import mongoose from "mongoose";

const conectToMongoDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_DB_URI);
        console.log("Connected to MongoDB");
    }catch(error){
        console.log("Error Connecting to MongoDB ",error.message);
    }
}

export default conectToMongoDB;