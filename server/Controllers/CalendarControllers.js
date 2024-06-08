const express = require('express');
const router = express.Router();
const moment = require('moment');
const Event = require('../model/event'); // Adjust the path based on your project structure

// Create event
router.post('/create-event', async (req, res) => {
    try {
        console.log('Received event data:', req.body);
        const event = new Event(req.body);
        await event.save();
        res.status(201).send(event);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send({ error: 'Failed to create event' });
    }
});

// Get events within a specific time range
router.get('/get-events', async (req, res) => {
    try {
        const start = moment(req.query.start).toDate();
        const end = moment(req.query.end).toDate();
        const events = await Event.find({
            start: { $gte: start },
            end: { $lte: end }
        });
        res.send(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send({ error: 'Failed to fetch events' });
    }
});

// Get all users (events)
router.get('/get-users', async (req, res) => {
    try {
        const users = await Event.find().sort({ start: 'asc' });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).json({ error: 'Failed to fetch users' });
    }
});

// Delete a user (event) by ID
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        await Event.findByIdAndDelete(userId);
        res.status(200).send({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
});

// Update an event by ID
router.put('/update-event/:id', async (req, res) => {
    try {
        const { title, description, start, end, location } = req.body;
        const updatedEvent = await Event.findByIdAndUpdate(req.params.id, {
            title,
            description,
            start,
            end,
            location
        }, { new: true });

        if (!updatedEvent) {
            return res.status(404).send({ error: 'Event not found' });
        }

        res.json({ message: 'Event updated successfully', updatedEvent });
    } catch (error) {
        console.error('Error updating event:', error);
        res.status(500).send({ error: 'Failed to update event' });
    }
});


module.exports = router;
