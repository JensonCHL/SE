require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const cors = require('cors');

const app = express();
const port = 5001;

// Middleware
app.use(cors()); // Call cors as a function to enable it
app.use(bodyParser.json());
app.use(cookieParser());

// Import controllers
const calendarController = require('./Controllers/CalendarControllers');
app.use('/api/calendar', calendarController);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
.then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
})
.catch((err) => {
    console.error('Failed to connect to MongoDB', err);
    process.exit(1);
});
