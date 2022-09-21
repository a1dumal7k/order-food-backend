const catchAsync = require("../utilts/catchAsync");
const { Op } = require("sequelize");
const CartItem = require("../models/CartItem");
const Cart = require("../models/Cart");
const OrderItem = require("../models/OrderItem");
const Order = require("../models/Order");
const orderStatus = require("../utilts/orderStatusENUM");
const Payment = require("../models/Payment");
const { validationResult } = require("express-validator")

exports.getAllOrder = catchAsync(async (req, res, next) => {
    const getOrder = await Order.findAll({
        where: {
            customerId: { [Op.eq]: req.user.id },
        }
    })
    res.status(200).json({
        status: "succesfull",
        message: "buyurtmalar topildi",
        error: "",
        data: {
            getOrder
        }
    })
})

exports.getAllOrderAndOrderItems = catchAsync(async (req, res, next) => {
    const { id } = req.params
    const totalPrice = await Order.findOne({ where: { id: { [Op.eq]: id } }, attributes: ["totalPrice"] })
    const getAllorderItembyOrder = await OrderItem.findAndCountAll({ where: { orderId: { [Op.eq]: id } } })
    getAllorderItembyOrder.totalPrice = totalPrice.totalPrice
    res.status(200).json({
        status: "succesfull",
        message: "buyurtma qilingan maxsulotlar ro`yhati",
        error: "",
        data: {
            getAllorderItembyOrder
        }
    })
})

exports.addOrder = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const { address } = req.body
    const cart = await Cart.findOne({
        where: { customerId: { [Op.eq]: req.user.id } },
        include: [
            { model: CartItem, as: "item", attributes: ["productId", "totalPrice", "amount"] }],
    })
    const order = await Order.create({ address, totalPrice: cart.totalPrice, customerId: req.user.id })
    const neworderItem = cart.item.map(e => {
        return {
            amount: e.amount,
            totalPrice: e.totalPrice,
            productId: e.productId,
            orderId: order.id
        }
    })
    const newOrderItems = await OrderItem.bulkCreate(neworderItem)
    await CartItem.destroy({ where: { cartId: { [Op.eq]: cart.id } } })
    await Cart.update({ totalPrice: 0 },
        { where: { customerId: { [Op.eq]: req.user.id } } })
    res.status(201).json({
        status: "succesfull",
        message: "Maxsulotlar to`lov qismiga o`tdi",
        error: "",
        data: {
            order,
            orderItems: newOrderItems
        }
    })
})

exports.updateStatusOrder = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const { id } = req.params
    const { status } = req.body
    const updateOrder = await Order.findByPk(id)
    updateOrder.status = status
    await updateOrder.save()
    if (updateOrder.status === orderStatus.status_COMPLETED) {
        Payment.create({
            customerId: updateOrder.customerId,
            orderId: updateOrder.id,
            paidMoney: updateOrder.totalPrice
        })
    }

    res.status(201).json({
        status: "succesfull",
        message: "To`lov amalga oshirildi",
        error: "",
        order: updateOrder
    })
})