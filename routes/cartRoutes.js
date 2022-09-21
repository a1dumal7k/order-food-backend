const express = require("express")
const { createCartItem } = require("../controllers/cardItemController")
const { cartItemValidator } = require("../middleware/expressValidator")

const router = express.Router()

router.post("/item", cartItemValidator, createCartItem)

module.exports = router