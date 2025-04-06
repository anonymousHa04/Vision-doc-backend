import mongoose from "mongoose";
const { Schema } = mongoose;
import { v4 as uuidv4 } from "uuid";
import { info } from "../../../utilities/utilityFunctions";

// Define the session schema
const sessionSchema = new Schema({
    userId: { // Identifier for the user associated with the session (optional)
        type: String,
    },
    sessionId: { // Unique identifier for the session
        type: String,
        default: uuidv4,
        unique: true,
    },
    recordingId: { // Identifier for the associated recording
        type: String,
        required: true,
    },
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
    screenShots: [{ // Array of screenshots taken during the session (optional)
        path: String,
        timestamp: Date,
        important: {
            type: Boolean,
            default: false,
        }
    }],
}, { timestamps: true });

const Session = mongoose.model("Session", sessionSchema);
info("Session model created successfully!");

// duration method to calculate the duration of the session in milliseconds
sessionSchema.methods.calculateDuration = function () {
    if (this.endTime) {
        return this.endTime - this.startTime;
    } else {
        return Date.now() - this.startTime;
    }
};

// Pre-save hook to calculate duration before saving the session
sessionSchema.pre("save", function (next) {
    if (this.isModified("endTime") || this.isNew) {
        this.duration = this.calculateDuration();
    }
    next();
});

// get sduration in seconds
sessionSchema.virtual("durationInMinutes").get(function () {
    return Math.round(this.duration / 60000);
});

export default Session;
