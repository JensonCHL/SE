require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser');

const app = express();
const port = 5001;

const cors = require('cors');
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: false,
        maxAge: 1000 * 60 * 60 * 24
    }
}));

const calendarController = require('./Controllers/CalendarControllers');
app.use('/api/calendar', calendarController);

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
