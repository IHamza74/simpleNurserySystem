const { body, query, param, validationResult } = require("express-validator");
module.exports = [
    // body("id").isNumeric().withMessage("id must be a number"),
    body("name").isString().withMessage("name must be only alpha"),
    // body("supervisor").isMongoId().withMessage("you must input a valid supervisor ID"),
    body("children").isArray().withMessage("children must be an array"),
    body("children.*").isInt().withMessage("you must enter an array of integerss")
]