const mongoose = require("mongoose");

const eventSchema = mongoose.Schema({
    user_id: {type: String},
    types: { type: String },
    title: { type: String, required: true },
    start: { type: Date, required: true },
    end: { type: Date, required: true },
    description: {type: String},
    location: {type: String},
    priority: {type: String},
    color: {type: String},
    reminder: {type: Boolean},
    repeat: {type: Number}
});

const Event = mongoose.model('Event', eventSchema);
module.exports = Event;