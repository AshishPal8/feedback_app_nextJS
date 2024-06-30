import mongoose from "mongoose";
import { number } from "zod";

type ConnectionObject = {
    isConnected?: number
}

const connection: ConnectionObject = {}

export async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected to database");
        return 
    }

    try {
        const db = await mongoose.connect(process.env.MONGO_URI || "")
        connection.isConnected = db.connections[0].readyState

        console.log("DB connected successfully");
        
    } catch (error) {
        
        console.log("DB connection failed!", error);
        process.exit(1)
    }
}