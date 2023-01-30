const { body, query, param, validationResult } = require("express-validator");
module.exports = [
    // body("id").isMongoId().withMessage("id must be a valid mongoDb id"),
    body("name").isAlpha().withMessage("full name must be only alpha"),
    body("password").isStrongPassword().withMessage("password is weak"),
    body("mail").isEmail().withMessage("you must input a valid email"),
    body("image").isString().withMessage("image is corrupted")
]