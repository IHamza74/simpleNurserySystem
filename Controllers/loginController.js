const { request, response } = require("express");
const jwt = require("jsonwebtoken");
const mongoos = require("mongoose");
const bcrypt = require("bcrypt");
const teachersDB = mongoos.model("teachers")

// const teachers = require("../Models/teachersModel.js");

exports.authenticating = (request, response, next) => {
    teachersDB.findOne({ fullName: request.body.name })
        .then(teacher => {
            if (request.body.name == "admin" && request.body.password == "123") {
                let token = jwt.sign({
                    role: "admin"
                }, "ITIPDTRACK", { expiresIn: "1h" })
                response.status(200).json({ body: "admin logged in", token })

            }

            else if (teacher == null) {
                let error = new Error("no teacher with this name");
                error.status = 401
                next(error);

            } else {
                if (request.body.password == teacher.password) {
                    let token = jwt.sign({
                        id: teacher._id,
                        name: teacher.fullName,
                        role: "teacher"
                    }, "ITIPDTRACK")
                    response.status(200).json({ data: "teacher", token })
                }
            }
        })
}