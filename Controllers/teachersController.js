//crud schema Model teachers.js
const mongoose = require("mongoose");
require("../Models/teachersModel.js");
const bcrypt = require("bcrypt");
const saltRounds = 10;



const TeachersSchema = mongoose.model("teachers");

exports.getAllTeachers = (request, response, next) => {
    TeachersSchema.find()
        .then(data => {
            response.status(200).json(data);

        })
        .catch(error => next(error))
}

exports.addTeacher = (request, response, next) => {

    bcrypt.hash(request.body.password, saltRounds, function (err, hash) {

        let newTeacher = new TeachersSchema({
            _id: request.body.id,
            fullName: request.body.name,
            password: hash,
            email: request.body.mail,
            image: request.body.image
        })
        console.log(hash);
        newTeacher.save()
            .then(result => {
                response.status(201).json({ msg: "teacher Added" });
            })
            .catch(error => next(error));
    });

}

exports.updateTeacher = (request, response, next) => {
    TeachersSchema.updateOne({ _id: request.body.id }, { $set: { fullName: request.body.name } })
        .then(result => {
            response.status(201).json({ msg: "teacher updated" })
        })
        .catch(error => next(error))
}

exports.deleteTeacher = (request, response, next) => {
    TeachersSchema.deleteOne({ _id: request.body.id })
        .then(result => {
            response.status(201).json({ msg: "teacher Deleted" })
        }).catch(error => next(error))

}

exports.getTeacherByID = (request, response, next) => {
    TeachersSchema.find({ _id: request.params.id })
        .then(result => {
            response.status(201).json(result)
        }).catch(error => next(error))
}