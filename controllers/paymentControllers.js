const { Op } = require("sequelize")
const Payment = require("../models/Payment")
const catchAsync = require("../utilts/catchAsync")
exports.getAllPaymentbyUser = catchAsync(async (req, res, next) => {
    if (req.user.role === "CUSTOMER") {
        const allPayments = await Payment.findAndCountAll({ where: { userId: { [Op.eq]: req.user.id } } })
        res.status(200).json({
            status: "succesfull",
            message: "Mijozning barcha to`lovlari tarixi",
            error: "",
            data: { allPayments }
        })
    }
    const { size, page } = req.query
    const allUsersPayments = await Payment.findAndCountAll({
        limit: size || 10,
        offset: (page - 1) * size || 1
    })
    res.status(200).json({
        status: "succesfull",
        message: "Mijozning barcha to`lovlari tarixi",
        error: "",
        data: { allUsersPayments }
    })
})