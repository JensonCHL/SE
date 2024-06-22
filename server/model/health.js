const mongoose = require('mongoose');

const healthSchema = mongoose.Schema({
    user_id: { type: String, required: true },
    date: { type:   String },
    steps_taken: { type: Number },
    distance_traveled_km: { type: Number },
    heart_rate: { type: Number },
    calories_burned: { type: Number },
    sleep_duration: { type: String },
    stress_level: { type: Number }
    
});

const Health = mongoose.model('Healths', healthSchema);
module.exports = Health;