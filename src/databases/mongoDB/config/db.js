const mongoose = require("mongoose");
const { success, errorMessage, info } = require("../../../utilities/utilityFunctions");
require("dotenv").config();

const connectDB = async () => {
    info("Connecting to MongoDB...");
    try {
        await mongoose.connect(process.env.MONGO_URI);
        success("MongoDB connected successfully!");
    } catch (error) {
        errorMessage("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;