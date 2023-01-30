const mongoose = require("mongoose");


//creating schema for Teachers
const schema = new mongoose.Schema({
    _id: {
        type: mongoose.Types.ObjectId,
        default: mongoose.Types.ObjectId
    },
    fullName: {
        type: String,
        max: 10,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },
    image: { type: String }
})

mongoose.model("teachers", schema);

