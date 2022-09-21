const express = require("express")
const orderControllers = require("../controllers/orderControllers")
const { orderValidation } = require("../middleware/expressValidator")
const router = express.Router()

router
    .route("/")
    .get(orderControllers.getAllOrder)
router
    .route("/:id")
    .get(orderControllers.getAllOrderAndOrderItems)
    .put(orderValidation, orderControllers.updateStatusOrder)

router
    .route("/add")
    .post(
        orderValidation,
        orderControllers.addOrder)

module.exports = router