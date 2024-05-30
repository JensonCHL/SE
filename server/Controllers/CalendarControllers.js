const router = require("express").Router();
const Event = require("../model/event");
const moment = require('moment');

// Create Event Endpoint
router.post("/create-event", async (req, res) => {
    try {
        console.log("Received event data:", req.body);
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event); // Send back the created event
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send({ error: "Failed to create event" });
    }
});


// Get Events Endpoint
router.get('/get-events', async (req, res) => {
    try {
        const start = moment(req.query.start).toDate();
        const end = moment(req.query.end).toDate();
        const schedule = await Event.find({
            start: { $gte: start },
            end: { $lte: end },
        });
        res.send(schedule);
    } catch (error) {
        console.error("Error fetching events:", error);
        res.status(500).send({ error: "Failed to fetch events" });
    }
});

module.exports = router;
