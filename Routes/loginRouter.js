const express = require("express");
const router = express.Router();

const controller = require("../Controllers/loginController.js")

router.route("/login")
    .post(controller.authenticating);


module.exports = router;
