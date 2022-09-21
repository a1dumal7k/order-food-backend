const express = require("express")
const paymentController = require("../controllers/paymentControllers")
const router = express.Router()

router
    .route("/").get(paymentController.getAllPaymentbyUser)

module.exports = router