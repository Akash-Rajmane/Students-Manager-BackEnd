const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollNumber: {
        type: String || Number,
        required: true,
        unique: true
    },
    attendance: {
        type:  String || Number,
        required: true
    },
    marks: {
        type:  String || Number,
        required: true
    }

});

const students = new mongoose.model("students",studentSchema);


module.exports = students;