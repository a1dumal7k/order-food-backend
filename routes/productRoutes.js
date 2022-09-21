const express = require("express")
const productController = require("../controllers/productControllers")
const authTokenmiddleware = require("../middleware/authTokenmiddleware")
const { productValidator } = require("../middleware/expressValidator")
const router = express.Router()
router
    .route("/")
    .get(authTokenmiddleware, productController.getProducts)
    .post(productValidator, authTokenmiddleware, productController.createProduct)

router
    .route("/:id")
    .get(productController.getProductbyId)
    .put(productValidator, productController.updateProduct)
    .delete(productController.deleteProduct)

module.exports = router