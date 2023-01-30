const mongoose = require("mongoose");
const autoIncrementFactory = require("mongoose-sequence");
const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/nurseryDB");
const autoIncrement = autoIncrementFactory(connection);

//creating schema for Teachers
const schema = new mongoose.Schema({
    _id: { type: Number },
    name: {
        type: String,
        required: true
    },
    supervisor: {
        type: mongoose.Types.ObjectId,
        ref: "teachers",
        required: true
    },
    children: [{
        type: Number,
        ref: "childs",
        required: true
    }]
})

schema.plugin(autoIncrement);
mongoose.model("class", schema)