import mongoose from "mongoose";

export const connectDb = async () => {
    if (mongoose.connection.readyState >= 1) {
        return
    }

    try {
        await mongoose.connect(process.env.MONGO_URI!)
    } catch (error) {
        console.log(error)
    }
}