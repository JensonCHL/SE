const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    types: { type: String },
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    description: {type: String},
    location: {type: String},
    priority: {type: String},
    color: {type: String}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;