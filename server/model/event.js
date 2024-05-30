const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    title: { type: String, required: true },
    description: {type: String, required: false},
    priority: {type: String, required: true},
    location: {type: String, required: false}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;