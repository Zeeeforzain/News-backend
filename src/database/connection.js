// src/database/connection.js
const mongoose = require("mongoose");

// Ensure you load your environment variables
require("dotenv").config(); // This should be here to load MONGO_URI

const connectDB = async () => {
    try {
        // Connect using the environment variable for the MongoDB URI
        await mongoose.connect(process.env.MONGO_URI, {
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
