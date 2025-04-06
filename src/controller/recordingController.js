const { success, info, errorMessage } = require("../utilities/utilityFunctions");
const Session = require("../databases/mongoDB/models/sessionSchema");
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

            const userId = req.body.userId || `Guest - ${Date.now()}`; // Use current timestamp as userId if not provided

            // check if there is aleady a active session in the database
            const activeSession = await Session.findOne({ userId, status: "active" });
            
            if (activeSession) {
                return res.status(400).json({ message: "An active session already exists for this user." });
            }

            // create a new session in the database
            const sessionId = `session-${uuidv4}`;

            const newSession = new Session({
                userId,
                sessionId,
                startTime: Date.now(),
                status: "active",
            });

            await newSession.save();

            success(`Revording started for user: ${userId} at session: ${sessionId}`);
            res.status(200).json({ message: "Recording started" });
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
        try {
            const { sessionId } = req.body;

            const session = await Session.findOne({ sessionId });
           
            if (!session || session.status !== "active") {
                return res.status(404).json({ message: "No active recording session found" });
            }

            session.status = "stopped";
            session.endTime = Date.now();
            session.duration = session.calculateDuration();

            await session.save();

            success(`Recording stopped for session: ${sessionId}`);
            info(`Session duration: ${session.duration} milliseconds`);

            // TODO: Call ScreenCaptureService to stop recording
            res.status(200).json({ 
                message: "Recording stopped successfully!", 
                session
            });
        } catch (err) {
            errorMessage("Error stopping recording");
            res.status(500).json({ 
                error: "Failed to stop recording", 
                details: err.message 
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