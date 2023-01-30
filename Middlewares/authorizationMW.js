const { request, response } = require("express");
const express = require("express");
const classSchema = require("../Controllers/classesController.js")
const jwt = require("jsonwebtoken");
module.exports = (request, response, next) => {

    try {
        // console.log(request);

        let token = request.get("authorization").split(" ")[1];
        let decodedToken = jwt.verify(token, "ITIPDTRACK");
        request.id = decodedToken.id;
        request.role = decodedToken.role;
    }
    catch (error) {
        error.status = 403;
        error.meassage = "Not Authorized";
        next(error);
    }
    next();
}


module.exports.isAdmin = (request, response, next) => {
    if (request.role == "admin") {

        next();
    } else {
        let error = new Error();
        error.status = 403;
        error.message = "Only admins are authorized to access this page"
        next(error);
    }
}

module.exports.isAdminOrTeacher = (request, response, next) => {
    if (request.role == "admin" || request.role == "teacher") {
        next();
    } else {
        let error = new Error();
        error.status = 403;
        error.message = "Only admins and teachers are authorized to access thiss page"
        next(error);
    }
}

module.exports.isTheSupervisor = (request, response, next) => {
    // console.log(request.id)
    // console.log(request.params)
    if (Request.role == "admin") { next(); }
    else if (Request.role == "teacher" && request.id == request.param.id) {
        next();
    } else {
        let error = new Error();
        error.message = ("you are not the supervisor of this class");
        error.status = 403;
        next(error);
    }
}