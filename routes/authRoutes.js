const express = require("express");
const authController = require("../controllers/authControllers");
const { register: authRegister, login: authLogin } = require("../middleware/expressValidator");
const router = express.Router()

router
    .post("/register", authRegister,
        // validationResult, 
        authController.register);

router
    .post("/login", authLogin, authController.login)

module.exports = router
