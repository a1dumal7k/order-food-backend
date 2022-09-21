const express = require("express")
const categoryControllers = require("../controllers/categoryControllers")
const { categoryValidator } = require("../middleware/expressValidator")


const router = express.Router()
router
    .route("/")
    .get(categoryControllers.getAllCategories)
    .post(categoryValidator, categoryControllers.createCategory)

router
    .route("/:id")
    .get(categoryControllers.getCategoryById)
    .delete(categoryControllers.deleteCategory)
    .put(categoryValidator, categoryControllers.updateCategory)

router
    .route("/:id/products")
    .get(categoryControllers.getProductsbyCategory)

module.exports = router