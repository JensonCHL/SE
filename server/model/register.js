const mongoose = require("mongoose");

const eventReg = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true }
});

const Register = mongoose.model('Register', eventReg)

module.exports = Register;