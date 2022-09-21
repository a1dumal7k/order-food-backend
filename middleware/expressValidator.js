const { body } = require("express-validator")

exports.categoryValidator = body("name")
    .notEmpty()
    .withMessage("maxsulot nomi  bo`sh bo`lmasligi kerak")


exports.login = [
    body("username")
        .notEmpty()
        .withMessage("login bo`sh bo`lmasligi kerak")
        .isLength({ min: 5 })
        .withMessage("ism kamida 5 ta ishoradan kam bo`lmasligi kerak"),
    body("password")
        .notEmpty().withMessage("parol bo`sh bo`lmasligi kerak")
        .isLength({ min: 5 }).withMessage("parol kamida 5 ta ishoradan iborat bo`lishi kerak")
]

exports.register = [
    body("firstName")
        .notEmpty()
        .withMessage("Ism bo`sh bo`lmasligi kerak"),
    body("username")
        .notEmpty()
        .withMessage("login bo`sh bo`lmasligi kerak")
        .isLength({ min: 5 })
        .withMessage("ism kamida 5 ta ishoradan kam bo`lmasligi kerak"),
    body("password")
        .notEmpty().withMessage("parol bo`sh bo`lmasligi kerak")
        .isLength({ min: 5 }).withMessage("parol kamida 5 ta ishoradan iborat bo`lishi kerak")
]

exports.attachmentValidator = [
    body("name").notEmpty().withMessage("Rasm nomi bo`sh bo`lmasligi kerak"),
    body("path").notEmpty().withMessage("Rasm yo`li bo`sh bo`lmasligi kerak")
]

exports.productValidator = [
    body("name").notEmpty().withMessage("Maxsulot nomi bo`sh bo`lmasligi keak")
        .isLength({ min: 2 }).withMessage("Maxsulot nomi kamida 2ta harfdan iborat bo`lishi kerak"),
    body("discription").notEmpty().withMessage("Maxsulot nomi bo`sh bo`lmasligi keak")
        .isLength({ min: 2 }).withMessage("Maxsulot haqida kamida 2ta harfdan iborat so`z bo`lishi kerak"),
    body("price").notEmpty().withMessage("Maxsulot narxi bo`sh bo`lmasligi kerak"),
    body("categoryId").notEmpty().withMessage("Toifa raqmi ko`rsatilishi kerak")
]

exports.cartItemValidator = [
    body("productId").notEmpty().withMessage("Bunday maxsulot topilmadi").isNumeric({ locale: "ru-RU" }).withMessage("Raqam kiriting"),
    body("amount").notEmpty().withMessage("Bunday maxsulot topilmadi").isNumeric({ locale: "ru-RU" }).withMessage("Raqam kiriting")
]

exports.orderValidation = [
    body("address").notEmpty().withMessage("Iltimos manzilingizni kiriting")
]

exports.orderStatusValidator = [
    body("status").notEmpty().withMessage("Tanlangan maxsulotni statusini kiriting")
]