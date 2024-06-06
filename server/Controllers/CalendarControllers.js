const router = require("express").Router();
const Event = require("../model/event");
const userModel = require("../model/event");
const moment = require('moment');

router.post("/create-event", async (req, res) => {
    try {
        console.log("Received event data:", req.body);
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        console.error("Error creating event:", error);
        res.status(500).send({ error: "Failed to create event" });
    }
});

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

router.get('/get-users', async (req, res) => {
    try {
        const users = await userModel.find();
        res.json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ error: "Failed to fetch users" });
    }
});

router.delete('/delete-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await userModel.findByIdAndDelete(userId);
        res.status(200).send({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send({ error: "Failed to delete user" });
    }
});


module.exports = router;