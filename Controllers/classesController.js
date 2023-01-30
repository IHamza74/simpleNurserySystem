const mongoos = require("mongoose");
const authorization = require("../Middlewares/authorizationMW")
require("../Models/classesModel.js")
const ClassSchema = mongoos.model("class");

exports.getAllClasses = (request, response, next) => {
    ClassSchema.find().populate({
        path: "supervisor",
        select: { _id: 0 }
    }).populate({
        path: "children",
        select: { _id: 0 }
    })
        .then(result => {
            response.status(200).json(result)
        })
        .catch(error => next(error));
}

exports.addClass = (request, response, next) => {
    let newClass = new ClassSchema({
        _id: request.body.id,
        name: request.body.name,
        supervisor: request.body.supervisor,
        children: request.body.children
    }).save()
        .then(result => {
            response.status(201).json({ msg: "Class Added" })
        })
        .catch(error => next(error))
}

exports.updateClass = (request, response, next) => {
    ClassSchema.updateOne({ _id: request.body.id }, {
        _id: request.body.id,
        name: request.body.name,
        supervisor: request.body.supervisor
    }).then(result => {
        response.status(201).json({ msg: "Class updated" })
    })
        .catch(error => next(error))
}

exports.deleteClass = (request, response, next) => {
    ClassSchema.findByIdAndDelete({ _id: request.body.id })
        .then(result => {
            response.status(201).json({ msg: "Class deleted" })
        })
        .catch(error => next(error));
}

exports.getClassByID = (request, response, next) => {
    ClassSchema.findById({ _id: request.params.id })
        .then(result => {
            response.status(201).json(result)
        }).catch(error => next(error))
}

exports.getClassChildren = (request, response, next) => {
    ClassSchema.findOne({ _id: request.params.id })
        .populate({
            path: "children"
        })
        .then(result => {
            // console.log(`request.role ${request.role}`)
            // console.log(`result  ${result.supervisor}`)
            // console.log(`request.id  ${request.id}`)
            if (request.role == "admin" || (request.role == "teacher" && result.supervisor == request.id)) { response.status(201).json(result) }
            else {
                let error = new Error();
                error.message = ("you are not the supervisor of this class");
                error.status = 403;
                next(error);

            }
        }).catch(error => {
            next(error)
        });
}

exports.getClassTeacher = (request, response, next) => {
    ClassSchema.find({ _id: request.params.id })
        .populate({
            path: "supervisor"
        })
        .then(result => {

            response.status(201).json(result[0].supervisor)
        }).catch(error => {
            next(error)
        });
}
