// models/Document.js
const mongoose = require("mongoose");

const documentSchema = new mongoose.Schema({
    sessionId: String,
    userId: String,
    docTitle: String,
    format: { type: String, enum: ["markdown", "pdf", "html"] },
    content: String, // or path to stored file
    createdAt: { type: Date, default: Date.now },
});

const Document = mongoose.model("Document", documentSchema);
module.exports = Document;
