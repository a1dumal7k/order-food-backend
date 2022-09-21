const { validationResult } = require("express-validator")
const { Op } = require("sequelize")
const Category = require("../models/Category")
const Products = require("../models/Products")
const AppError = require("../utilts/AppError")
const catchAsync = require("../utilts/catchAsync")


exports.getAllCategories = catchAsync(async (req, res, next) => {
    const { page, size } = req.query
    const allCategory = await Category.findAndCountAll({
        attributes: { exclude: ["updatedAt"] },
        limit: size || 2,
        offset: (page - 1) * size || 0
    })
    allCategory.totalPage = Math.ceil(allCategory.count / size) || 0
    res.status(200).json({
        status: "succesfull",
        message: "",
        error: null,
        data: {
            allCategory
        }
    })
})

exports.getCategoryById = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const categoryById = await Category.findByPk(id)
    if (!categoryById) {
        return next(new AppError("неверные ИД ", 400))
    }
    res.status(200).json({
        status: "succesfull",
        message: "",
        error: null,
        data: {
            categoryById
        }
    })
})

exports.getProductsbyCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params;
    const allProductsByCategory = await Products.findAll({
        include: [{ model: Category, as: "category" }],
        where: { categoryId: { [Op.eq]: id } }
    })
    if (!categoryById) {
        return next(new AppError("неверные ИД ", 400))
    }
    res.status(200).json({
        status: "succesfull",
        message: "All Products by Category",
        error: "",
        data: {
            allProductsByCategory
        }
    })
})

exports.createCategory = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const newCategory = await Category.create(req.body)
    res.status(201).json({
        status: "succesfull",
        message: "category created",
        error: "",
        data: { newCategory }
    })
})

exports.updateCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const { name } = req.body
    const categoryById = await Category.findByPk(id)
    if (!categoryById) {
        return next(new AppError("неверные ИД ", 400))
    }
    categoryById.name = name
    await categoryById.save()
    res.status(203).json({
        status: "succesfull",
        message: "Category Updated",
        error: "",
        data: null
    })
})

exports.deleteCategory = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const deletedCategoryById = await Category.findByPk(id)
    if (!categoryById) {
        return next(new AppError("неверные ИД ", 400))
    }
    deletedCategoryById.destroy()
    res.status(202).json({
        status: "succesfull",
        message: "Category deleted",
        error: "",
        data: null
    })
})