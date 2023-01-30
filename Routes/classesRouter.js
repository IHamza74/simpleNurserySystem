const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const controller = require("../Controllers/classesController");
const validator = require("../Middlewares/errorValidator");
const router = express.Router();
const validationArray = require("../Models/classesFieldValidation");
const authorization = require("../Middlewares/authorizationMW.js")

router.route("/classes").all(authorization.isAdmin)
    .get(controller.getAllClasses)
    .post(validationArray, validator, controller.addClass)
    .patch(validationArray, validator, controller.updateClass)
    .delete(controller.deleteClass)

router.get("/classes/:id",
    param("id").isInt().withMessage("id should be integr"),
    authorization.isAdminOrTeacher, validator,
    controller.getClassByID)


router.get("/classchildern/:id",
    param("id").isInt().withMessage("id should be integr"),
    authorization.isAdminOrTeacher, validator,
    controller.getClassChildren)


router.get("/classTeacher/:id",
    param("id").isInt().withMessage("id should be integr"),
    authorization.isTheSupervisor, validator,
    controller.getClassTeacher)


module.exports = router;
