const mongoose = require("mongoose");

const screenshotSchema = new mongoose.Schema({
    sessionId: { type: String, required: true },
    path: String,
    timestamp: { type: Date, default: Date.now },
    important: { type: Boolean, default: false },
});

const Screenshot = mongoose.model("Screenshot", screenshotSchema);
module.exports = Screenshot;