const { Op } = require("sequelize");
const Cart = require("../models/Cart");
const CartItem = require("../models/CartItem");
const Products = require("../models/Products");
const Users = require("../models/User");
const { validationResult } = require("express-validator")
const catchAsync = require("../utilts/catchAsync");

exports.createCartItem = catchAsync(async (req, res, next) => {
    const validatonErrors = validationResult(req)
    if (!validatonErrors.isEmpty()) {
        let err = new AppError("Validation Error", 400)
        err.name = "ValidationError"
        err.isOperational = false
        err.errors = validatonErrors.errors
        return next(err)
    }
    const { productId, amount } = req.body
    const product = await Products.findByPk(productId)
    const cart = await Cart.findOne({
        where: {
            customerId: { [Op.eq]: req.user.id }
        },
        include: [{ model: CartItem, as: "item" },
        { model: Users, as: "customer" }]
    })

    const existedCartItem = cart.item.find(e => e.productId === productId)
    if (existedCartItem) {
        await CartItem.update({
            amount: existedCartItem.amount + amount, totalPrice: existedCartItem.totalPrice + (product.price * amount)
        },
            { where: { id: { [Op.eq]: existedCartItem.id } } })
        await cart.update({ totalPrice: cart.totalPrice + existedCartItem.totalPrice })
    } else {
        const newItem = await CartItem.create(
            {
                amount,
                productId,
                totalPrice: amount * product.price,
                cartId: cart.id
            })
        await cart.update({ totalPrice: cart.totalPrice + newItem.totalPrice })
    }

    res.status(201).json({
        status: "succesfull",
        message: "Maxsulot savatchaga qo`shildi",
        errors: null,
        data: {
            bormaxsulot: existedCartItem,
            savatdagiMaxsulotlar: cart.item
        }
    })
})