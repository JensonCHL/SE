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
            return res.status(404).json({ message: 'User not found' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        res.json({ message: 'Login successful', user });
    } catch (error) {
        console.error('Error logging in:', error);
        res.status(500).send({ message: 'Failed to login' });
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
// Get events
router.get('/get-events', async (req, res) => {
    try {
        const { start, end, id } = req.query;
        if (!start || !end) {
            return res.status(400).send({ error: 'Missing required query parameters' });
        }
        const events = await Event.find({
            user_id: id,
            start: { $gte: new Date(start) },
            end: { $lte: new Date(end) }
        });
        res.json(events);
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send({ error: 'Failed to fetch events' });
    }
});
// Get collision && Find any 

router.get('/get-collision', async (req, res) => {
    try {
        const { id } = req.query;

        // Fetch events from database based on user_id, truncated start, and truncated end parameters
        const events = await Event.find({
            user_id: id,                     // Filter events by user_id

        });

        // Respond with JSON array of events
        res.json(events);
    } catch (error) {
        // Handle errors if any occur during event fetching
        console.error('Error fetching events:', error);
        res.status(500).send({ error: 'Failed to fetch events' });
    }
});

module.exports = router;

// Closest events
router.get('/closest-event', async (req, res) => {
    try {
        const { userId } = req.query;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const now = new Date();

        // Query to find the closest upcoming event for the user
        const closestEvent = await Event.findOne({
            user_id: userId,
            start: { $gte: now }, // Events starting from now onwards
        }).sort({ start: 1 }); // Sort by start time in ascending order to get the closest one

        if (!closestEvent) {
            return res.status(404).json({ error: 'No upcoming event found for the user' });
        }

        res.json(closestEvent);
    } catch (error) {
        console.error('Error fetching closest event:', error);
        res.status(500).json({ error: 'Failed to fetch closest event' });
    }
});

router.post('/get-profile', async (req, res) => {
    const userId = req.body.id; // Extract userId from request body

    try {
        // Find user by _id
        const user = await Register.findOne({ _id: userId });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return user data
        res.json({ username: user.name, email: user.email });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).json({ error: 'Failed to fetch user' });
    }
});

router.post('/change-password', async (req, res) => {
    const { userId, currentPassword, newPassword, reNewPassword } = req.body;
    if (newPassword !== reNewPassword) {
        return res.status(400).json({ error: 'New passwords do not match' });
    }
    try {
        const user = await Register.findOne({ _id: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ error: 'Current password is incorrect' });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error('Error changing password:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get all users
router.get('/get-users', async (req, res) => {
    try {
        const userId = req.query.user_id; // Extract userId from query parameters
        console.log(userId, "a")
        console.log('Received userId:', userId);
        const users = await Event.find({ user_id: userId }).sort({ name: 'asc' });
        res.json(users);
        console.log(users);
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

router.get('/get-past-events', async (req, res) => {
    try {
        const { excludeTitle } = req.query;

        // Construct the match condition to exclude the specified title if provided
        const matchCondition = { types: { $in: ["todo", "habit"] } };
        if (excludeTitle) {
            matchCondition.title = { $ne: excludeTitle };
        }

        const mostFrequentTitle = await Event.aggregate([
            { $match: matchCondition },
            { $group: { _id: "$title", count: { $sum: 1 }, firstEvent: { $first: "$$ROOT" } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);

        if (mostFrequentTitle.length > 0) {
            res.json(mostFrequentTitle[0].firstEvent);
        } else {
            res.status(404).send({ error: 'No events found' });
        }
    } catch (error) {
        console.error('Error fetching events:', error);
        res.status(500).send({ error: 'Failed to fetch events' });
    }
});

module.exports = router;