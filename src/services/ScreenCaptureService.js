const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

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
    

}