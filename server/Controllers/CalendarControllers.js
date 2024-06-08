const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const moment = require('moment');
const Event = require('../model/event');
const Register = require('../model/register');

// Create event
router.post('/create-event', async (req, res) => {
    try {
        console.log('Received event data:', req.body);
        const event = new Event(req.body);
        const savedEvent = await event.save();
        res.status(201).send(savedEvent);
    } catch (error) {
        console.error('Error creating event:', error);
        res.status(500).send({ error: 'Failed to create event' });
    }
});

// Login user
router.post('/loginUser', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Register.findOne({ email });

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Incorrect password' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ error: 'Failed to login' });
    }
});

// Create user
router.post('/create-user', async (req, res) => {
    try {
        const { email, password, ...otherUserData } = req.body;
        console.log('Received user data:', req.body);

        // Check if a user with the same email already exists
        const existingUser = await Register.findOne({ email });
        console.log(email)
        if (existingUser) {
            return res.status(400).send({ error: 'Email already exists' });
        }

        // Hash the password before saving the user
        const hashedPassword = await bcrypt.hash(password, 10);

        // If the email is unique, create the new user
        const newUser = new Register({ email, password: hashedPassword, ...otherUserData });
        const savedUser = await newUser.save();
        res.status(201).send(savedUser);
    } catch (error) {
        console.error('Error creating user:', error);
        res.status(500).send({ error: 'Failed to create user' });
    }
});

// Get events within a specific time range
router.get('/get-events', async (req, res) => {
    try {
        const { start, end } = req.query;
        const events = await Event.find({
            start: { $gte: new Date(start) },
            end: { $lte: new Date(end) }
        });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send({ error: 'Failed to fetch events' });
    }
});

// Get all users
router.get('/get-users', async (req, res) => {
    try {
        const users = await Event.find().sort({ name: 'asc' });
        res.json(users);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send({ error: 'Failed to fetch users' });
    }
});

// Delete user by ID
router.delete('/delete-user/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        const deletedUser = await Event.findByIdAndDelete(userId);
        
        if (!deletedUser) {
            return res.status(404).send({ error: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).send({ error: 'Failed to delete user' });
    }
});

// Update event by ID
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
