// express js boiler plate
const express = require('express');
const connectDB = require('./databases/mongoDB/config/db');

const cors = require('cors');

const app = express();

// connect all Databases
connectDB();


app.use(cors());
app.use(express.json());


// Import routes
const recordingRoutes = require('./routes/recordingRoutes');

// Use routes
app.get('/', (req, res) => {
    res.send('Welcome to the Screen Recorder API');
});
app.use('/recording', recordingRoutes);

module.exports = app;