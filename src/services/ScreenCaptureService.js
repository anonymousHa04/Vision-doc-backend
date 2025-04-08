const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
require("dotenv").config();

// screen capture service
class ScreenCaptureService {
    constructor() {
        this.screenshotInterval = null;
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
        const screenshotPath = path.join(__dirname, '../tempscreens', sessionId, screenshotName);

        // TODO: Replace this with actual screenshot logic
        fs.writeFileSync(screenshotPath, "dummy_screenshot_data");

        return screenshotPath;
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


}

module.exports = new ScreenCaptureService();