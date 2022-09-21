const { validationResult } = require("express-validator");
const { Op } = require("sequelize")
const Users = require("../models/User");
const AppError = require("../utilts/AppError");
const catchAsync = require("../utilts/catchAsync");


exports.getAllPersons = catchAsync(async (req, res, next) => {
    if (req.user.role === "SUPER_ADMIN") {
        const { size, page, userRole } = req.query;
        console.log(typeof userRole)
        const allPersons = await Users.findAndCountAll({
            where: { role: { [Op.eq]: userRole || "" } },
            limit: size || 3,
            offset: (page - 1) * size
        })
        allPersons.totalPage = Math.ceil(allPersons.count / size)

        res.status(200).json({
            status: "succesfull",
            message: "",
            error: "",
            data: { allPersons }
        })
    }
    return next(new AppError(`Sizda ushbu ${req.originalUrl} ga ruxsat yo\`q`, 400))
})

exports.createUser = catchAsync(async (req, res, next) => {
    if (req.user.role === "SUPER_ADMIN") {
        const { username } = req.body
        const validatorErrors = validationResult(req)
        if (!validatorErrors.isEmpty()) {
            const err = new AppError("Validation Error")
            err.name = "validationError";
            err.isOperational = false;
            err.errros = validatorErrors.errros
            return next(err)
        }
        const existedUsername = await Users.findOne({ where: { username: { [Op.eq]: username } } })
        if (existedUsername) {
            return next(`Ushbu "${username}" nomli foydalanuvchi tizimda mavjud`, 409)
        }
        const newPerson = await Users.create(req.body)
        res.status(201).json({
            status: "succesfull",
            message: `${req.user.role}:${req.user.firstName} tomonidan yangi xodim ro\`yhatdan o\`tkazildi`,
            errors: "",
            data: { newPerson }
        })
    }

    return next(new AppError(`Sizda ushbu ${req.originalUrl} ga ruxsat yo\`q`, 400))
})