// models/Log.js
const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
    type: { type: String, enum: ["info", "warning", "error"] },
    message: String,
    sessionId: String,
    timestamp: { type: Date, default: Date.now },
});

const Log = mongoose.model("Log", logSchema);
module.exports = Log;
