const express = require("express");
const { body, query, param, validationResult } = require("express-validator");
const controller = require("../Controllers/childsController");
const validator = require("../Middlewares/errorValidator");
const router = express.Router();
const validationArray = require("../Models/childFieldValidation");
const authorization = require("../Middlewares/authorizationMW")

router.route("/childs")
    .get(authorization.isAdminOrTeacher, controller.getAllChilds)
    .post(authorization.isAdmin, validationArray, validator, controller.addChild)
    .patch(authorization.isAdmin, validationArray, validator, controller.updateChild)
    .delete(authorization.isAdmin, controller.deleteChild);

router.get("/childs/:id",
    param("id").isInt().withMessage("wrong ID"),
    validator,
    controller.getChildbyID)

module.exports = router;