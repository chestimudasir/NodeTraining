const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    school:{
        type:String,
        required: true,
    },
    subject:{
        type: Array,
        required: true,
    }
});
module.exports = mongoose.model("Student", studentSchema);