const { success, info, errorMessage } = require("../utilities/utilityFunctions");
const Recording = require("../databases/mongoDB/models/recordingSchema");
const { v4: uuidv4 } = require("uuid");

// logic for recording controller
class RecordingController {
    constructor() {
        this.recordingService = null;
        this.screenCaptureService = null;
        // this.recordingService = new RecordingService();
    }

    // start recording
    async startRecording(req, res) {
        try {
            success("Recording started");

            const userId = req?.body?.userId || `Guest - ${Date.now()}`; // Use current timestamp as userId if not provided

            // check if there is aleady a active Recording in the database
            const activeRecording = await Recording.findOne({ userId, status: "active" });
            
            if (activeRecording) {
                return res.status(400).json({ message: "An active Recording already exists for this user." });
            }

            // create a new Recording in the database
            const recordingId = `Recording-${Date.now()}-${uuidv4()}`; // Generate a unique recording ID using timestamp and UUID

            // TODO: change recordingID for invitining
            const newRecording = new Recording({
                userId,
                recordingId,
                startTime: Date.now(),
                status: "active",
            });

            await newRecording.save();

            success(`Recording started for user: ${userId} at Recording: ${recordingId}`);
            res.status(200).json({ message: "Recording started", recordingId });
        } catch (error) {
            errorMessage("Error starting recording");
            res.status(500).json({
                message: "Error starting recording",
                error: error.message,
            });

        }
    }

    // stop recording
    async stopRecording(req, res) {
        const { recordingId } = req?.body;

        try {

            // const recordID = RecordingId || "Recording-1743947419319-6edb1d1f-6975-4c83-b828-6361cf8af163" // Use a default value if RecordingId is not provided
            // const existingRecording = await Recording.findOne({ RecordingId });
            const existingRecording = await Recording.findOne({ recordingId: recordingId });
           
            if (!existingRecording || existingRecording.status !== "active") {
                return res.status(404).json({ message: `No active recording Recording found for ${RecordingId}` });
            }

            existingRecording.status = "stopped";
            existingRecording.endTime = Date.now();
            
            await existingRecording.save();

            success(`Recording stopped for Recording: ${RecordingId}`);
            info(`Recording duration: ${existingRecording.duration} milliseconds`);

            // TODO: Call ScreenCaptureService to stop recording
            res.status(200).json({ 
                message: "Recording stopped successfully!", 
                existingRecording
            });
        } catch (err) {
            errorMessage("Error stopping recording", RecordingId);
            res.status(500).json({ 
                error: "Failed to stop recording", 
                details: err.message,
                recordingId: RecordingId
            });
        }
    }

    // capture screenshot
    async captureScreenshot(req, res) {
        try {
            info("Screenshot captured...");

            // TODO: Call ScreenCaptureService to take a screenshot
            res.status(200).json({ message: "Screenshot captured successfully!" });
        } catch (error) {
            res.status(500).json({ error: "Failed to capture screenshot" });
        }
    }

}

module.exports = RecordingController;