const express = require("express");
const { signupValidator } = require("../utils/validator/authValidator");

const { signup } = require("../services/authService");

const router = express.Router();

router.route("/signup").post(signupValidator, signup);

module.exports = router;
