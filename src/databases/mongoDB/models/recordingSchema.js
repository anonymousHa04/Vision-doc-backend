const mongoose = require("mongoose");
const { Schema } = mongoose;
const { v4: uuidv4 } = require("uuid");
const { info } = require("../../../utilities/utilityFunctions");

// Define the session schema
const recordingSchema = new Schema({
    userId: { // Identifier for the user associated with the session (optional)
        type: String,
    },
    recordingId: { // Unique identifier for the session
        type: String,
        default: uuidv4,
        unique: true,
    },
    // sessionID: { // Identifier for the associated recording
    //     type: String,
    //     required: true,
    // },
    startTime: { // Start time of the session
        type: Date,
        default: Date.now,
    },
    endTime: { // End time of the session (optional)
        type: Date,
    },
    duration: { // Duration of the session in milliseconds (optional)
        type: Number,
    },
    status: { type: String, enum: ["active", "stopped"], default: "active" },
    screenShots: [{ // Array of screenshots taken during the session (optional)
        path: String,
        timestamp: Date,
        important: {
            type: Boolean,
            default: false,
        }
    }],
}, { timestamps: true });

// duration method to calculate the duration of the session in milliseconds
recordingSchema.methods.calculateDuration = function () {
    if (this.endTime) {
        return this.endTime - this.startTime;
    } else {
        return Date.now() - this.startTime;
    }
};

// Pre-save hook to calculate duration before saving the session
recordingSchema.pre("save", function (next) {
    if (this.isModified("endTime") || this.isNew) {
        this.duration = this.calculateDuration();
    }
    next();
});

// get sduration in seconds
recordingSchema.virtual("durationInMinutes").get(function () {
    return Math.round(this.duration / 60000);
});

const RecordingSession = mongoose.model("Recording", recordingSchema);
info("Session model created successfully!");

module.exports = RecordingSession;
