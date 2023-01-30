const mongoose = require("mongoose");
require("../Models/childsModel");

const ChildsSchema = mongoose.model("childs");

exports.getAllChilds = (request, response, next) => {
    ChildsSchema.find()
        .then(data => {
            response.status(200).json(data)
        })
        .catch(error => next(error))
}

exports.addChild = (request, response, next) => {
    let newChild = new ChildsSchema({
        _id: request.body.id,
        fullName: request.body.name,
        age: request.body.age,
        level: request.body.level,
        address: request.body.address
    })
    newChild.save()
        .then(result => {
            response.status(201).json({ msg: "Child Added" })
        })
        .catch(error => next(error));
}

exports.updateChild = (request, response, next) => {
    ChildsSchema.updateOne({ _id: request.body.id }, {
        fullName: request.body.name,
        age: request.body.age,
        level: request.body.level,
        address: request.body.address
    }).then(result => {
        response.status(201).json({ id: "Child updated" })
    })
        .catch(error => next(error));
}

exports.deleteChild = (request, response, next) => {
    ChildsSchema.deleteOne({ _id: request.body.id })
        .then(result => {
            response.status(201).json({ id: "Child deleted" })
        })
        .catch(error => next(error))
}

exports.getChildbyID = (request, response, next) => {
    ChildsSchema.find({ _id: request.params.id })
        .then(result => {
            response.status(201).json(result)
        })
        .catch(error => next(error))
}

