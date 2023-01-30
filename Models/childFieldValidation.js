const { body, query, param, validationResult } = require("express-validator");

module.exports = [
    // body("id").isInt().withMessage("id must be a valid mongoDb id"),
    body("name").isString().withMessage("full name must be only alpha"),
    body("age").isNumeric().withMessage("age must be a number"),
    body("level").isIn(["PreKG", "KG1", "KG2"]).withMessage("Wrong level"),
    body("address").isObject().withMessage("address must be an object"),
    body("address.city").isString().withMessage("city must be a string"),
    body("address.street").isString().withMessage("street  must be an alphanumeric value"),
    body("address.building").isString().withMessage("building must be an alphanumeric value")
]   