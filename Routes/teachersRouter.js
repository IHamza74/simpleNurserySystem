const express = require("express");
// const mongoose = require('mongoose');

const router = express.Router();
const { body, query, param, validationResult } = require("express-validator");
const controller = require("../Controllers/teachersController");
const validator = require("../Middlewares/errorValidator")
const validationArray = require("../Models/teacherFieldValidation")



router.route("/teachers")
    .get(controller.getAllTeachers)
    .post(validationArray,
        validator,
        controller.addTeacher)
    .patch(validationArray, validator, controller.updateTeacher)
    .delete(controller.deleteTeacher);

router.get("/teachers/:id",
    param("id")
        .isMongoId().withMessage("Not valid mongoID"),
    validator,
    controller.getTeacherByID
)
module.exports = router;

// router.get("/department/:id",
//     param("id").isIn().withMessage("isd should be integr"),
//     validator,
//     controller.getDepartmentByID)

// mongoose.Types.ObjectId(objectIdSring)