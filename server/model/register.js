const mongoose = require("mongoose");

const eventReg = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    garmin: {type: String},
    passwordGarmin: {type:String}
});

const Register = mongoose.model('Register', eventReg)
module.exports = Register;