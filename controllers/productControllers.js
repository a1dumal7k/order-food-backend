const Products = require("../models/Products")
const AppError = require("../utilts/AppError")
const catchAsync = require("../utilts/catchAsync")
const { validationResult } = require("express-validator")

exports.getProducts = catchAsync(async (req, res, next) => {
    const { page, size } = req.query
    const allProducts = await Products.findAndCountAll({
        attributes: ["id", "name", "discription"],
        offset: (page - 1) * size || 0,
        limit: size || 4,
    })
    allProducts.totalPage = Math.ceil(allProducts.count / size) || 0
    res.status(200).json({
        status: "succesfull",
        message: "All Products",
        error: "",
        data: {
            allProducts
        }
    })
})

exports.getProductbyId = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const productById = await Products.findByPk(id);

    if (!productById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }

    res.status(200).json({
        status: "succesfull",
        message: "",
        error: "",
        data: {
            productById
        }
    })
})

exports.createProduct = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const newProduct = await Products.create(req.body)
    res.status(204).json(newProduct)
})

exports.updateProduct = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const { id } = req.params;
    const { name, discription, price, categoryId } = req.body
    const productById = await Products.findByPk(id)

    if (!productById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    productById.name = name;
    productById.discription = discription;
    productById.price = price;
    productById.categoryId = categoryId
    await categoryId.save();

    await productById.save()
    res.status(203).json({
        status: "succesfull",
        message: "Product Updated",
        error: "",
        data: null
    })
})

exports.deleteProduct = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const productById = await Products.findByPk(id)

    if (!productById) {
        return next(new AppError(`Category with ID ${id} not found`, 404))
    }
    await productById.destroy()
    res.status(200).json({
        status: "succesfull",
        message: "Product deleted",
        error: "",
        data: null
    })
})