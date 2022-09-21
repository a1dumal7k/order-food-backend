const { DataTypes } = require("sequelize")
const sequelize = require("../config/database/db")
const CartItem = require("./CartItem")

const Cart = sequelize.define("carts", {
    id: {
        type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true
    },
    totalPrice: { type: DataTypes.INTEGER, allowNull: false, defaultValue: 0 }
}, { underscored: true })

Cart.hasMany(CartItem, { as: "item", foreignKey: "cart_id" })
CartItem.belongsTo(Cart, { as: "cart" })

module.exports = Cart