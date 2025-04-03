const mongoose = require("mongoose");
const { success, errorMessage } = require("../../../utilities/utilityFunctions");
require("dotenv").config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        success("MongoDB connected successfully!");
    } catch (error) {
        errorMessage("MongoDB connection failed:", error);
        process.exit(1); // Exit the process with failure
    }
}

module.exports = connectDB;