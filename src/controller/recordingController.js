const { success, info, errorMessage } = require("../utilities/utilityFunctions");

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

            // TODO: Call ScreenCaptureService to start recording
            res.status(200).json({ message: "Recording started" });
        } catch (error) {
            res.status(500).json({
                message: "Error starting recording",
                error: error.message,
            });

        }
    }

    // stop recording
    async stopRecording(req, res) {
        try {
            success("Recording stopped...");

            // TODO: Call ScreenCaptureService to stop recording
            res.status(200).json({ message: "Recording stopped successfully!" });
        } catch (err) {
            errorMessage("Error stopping recording");
            res.status(500).json({ error: "Failed to stop recording" });
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