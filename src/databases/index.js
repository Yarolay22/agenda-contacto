import mongoose from "mongoose";
import { EnvConfig } from "../config";


export async function connection() {
    await mongoose.connect(EnvConfig.MONGO_URI)
}