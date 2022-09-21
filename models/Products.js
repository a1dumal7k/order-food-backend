const { DataTypes } = require("sequelize")
const sequelize = require("../config/database/db")
const Attachment = require("./Attachment")
const CartItem = require("./CartItem")
const OrderItem = require("./OrderItem")
const Products = sequelize.define("products", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: { min: { args: 2, msg: "Kamida 2 ta harfdan iborat maxsulot nomini kiritishingiz kerak" } }
    },
    discription: {
        type: DataTypes.TEXT,
        validate: {
            len: {
                args: [2, 1000],
                msg: " Models: Kamida 2 ta harfdan iborat maxsulot haqida ma`lumot kiritishingiz kerak"
            }
        }
    },
    price: {
        type: DataTypes.INTEGER,
        allowNull: false,
    }
}, { underscored: true })

Products.hasOne(Attachment, { as: "image", foreignKey: "product_id" })
Attachment.belongsTo(Products, { as: "product" })

Products.hasOne(CartItem, { as: "cartItem", foreignKey: "product_id" })
CartItem.belongsTo(Products, { as: "product" })

Products.hasOne(OrderItem, { as: "orderItem", foreignKey: "product_id" })
OrderItem.belongsTo(Products, { as: "product" })

module.exports = Products