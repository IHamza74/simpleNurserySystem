const mongoose = require("mongoose");
const autoIncrementFactory = require("mongoose-sequence");
const connection = mongoose.createConnection("mongodb://127.0.0.1:27017/nurseryDB");
const autoIncrement = autoIncrementFactory(connection);

//creating schema for Teachers
const schema = new mongoose.Schema({
    _id: {
        type: Number
    },
    fullName: { type: String },
    age: { type: Number },
    level: { type: String, enum: ["PreKG", "KG1", "KG2"] },
    address: {
        city: String,
        street: String,
        building: String
    }
})

schema.plugin(autoIncrement, { id: "comments_id_counter", inc_field: "_id" });
mongoose.model("childs", schema);