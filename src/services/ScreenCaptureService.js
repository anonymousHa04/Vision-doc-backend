const fs = require('fs');
const path = require('path');
const util = require('util');
const execAsync = util.promisify(require('child_process').exec);
const { success, errorMessage } = require("../utils/logger");
require("dotenv").config();

// screen capture service
class ScreenCaptureService {
    constructor(captureBinaryPath) {
        this.screenshotInterval = null;
        this.captureBinaryPath = captureBinaryPath;
        this.screenshotDir = path.join(__dirname, '../tempscreens');
    }

    // create session folder in temp directory
    initSessionFolder(sessionId) {
        const sessionPath = path.join(__dirname, '../tempscreens', sessionId);
        if (!fs.existsSync(sessionPath)) {
            fs.mkdirSync(sessionPath, { recursive: true });
        }
        return sessionPath;
    }

    // capture screenshot and save it to session folder
    async captureScreenshot(sessionId, isImportant = false) {
        const timestamp = Date.now();
        const suffix = isImportant ? 'important' : 'screenshot';
        const screenshotName = `${suffix}-${timestamp}.png`;

        const sessionDir = path.join(this.screenshotDir)
        const screenshotPath = path.join(sessionDir, screenshotName);

        // Ensure the session folder exists
        if (!fs.existsSync(sessionDir)) {
            fs.mkdirSync(sessionDir, { recursive: true });
        }

        const command = `${this.captureBinaryPath} ${screenshotPath}`;

        try {
            await execAsync(command, { timeout: 5000 });
            success(`Screenshot captured: ${screenshotPath}`);
            return screenshotPath;
        } catch (error) {
            errorMessage(`Error capturing screenshot: ${error.message}`);
            throw error;
        }
    }

    // delete screenshots older than 2 minutes
    cleanupOldScreenshots(sessionId) {
        const sessionPath = path.join(__dirname, "../tempScreens", sessionId);
        const now = Date.now();
        const files = fs.readdirSync(sessionPath);

        /* 
        files to be delted
            1. check for files which are not important 
            2. check for files which are older than 2 minutes
        */

        files.forEach(file => {
            if (file.includes('important')) return; // skip important files

            const filePath = path.join(sessionPath, file);
            const [timestampStr] = file.split('-');
            const timestamp = parseInt(timestampStr, 10);

            const fileAge = now - timestamp;
            if (fileAge > process.env.deletionTime) { // older than 2 minutes
                fs.unlinkSync(filePath);
            }
        });
    }

    startPerodicScreenshotCapture(sessionId, interval = 2000) {
        if (!sessionId) {
            errorMessage("Session ID is required to start periodic screenshot capture.");
            throw new Error("Session ID is required.");
        }
        if (this.screenshotInterval) {
            clearInterval(this.screenshotInterval);
        }

        this.initSessionFolder(sessionId); // Ensure the session folder exists

        this.screenshotInterval = setInterval(() => {
            this.captureScreenshot(sessionId)
                .then(() => this.cleanupOldScreenshots(sessionId))
                .catch(error => errorMessage(`Error capturing screenshot: ${error.message}`));
        }, interval);

        success(`Started periodic screenshot capture every ${interval} ms for session: ${sessionId}`);
    }

    stopPeriodicScreenshotCapture() {
        if (this.screenshotInterval) {
            clearInterval(this.screenshotInterval);
            this.screenshotInterval = null;
            success("Stopped periodic screenshot capture.");
        } else {
            errorMessage("No periodic screenshot capture to stop.");
        }
    }
}

module.exports = new ScreenCaptureService();