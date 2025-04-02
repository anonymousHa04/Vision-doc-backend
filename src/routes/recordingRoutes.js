let routes = require('express').Router();

const recordingController = require('../controller/recordingController');

// Initialize the recording controller
const recordingCtrl = new recordingController();

// Define the routes for recording
routes.post('/start', recordingCtrl.startRecording);
routes.post('/stop', recordingCtrl.stopRecording);
routes.post('/screenshot', recordingCtrl.captureScreenshot);

// Export the routes
module.exports = routes;