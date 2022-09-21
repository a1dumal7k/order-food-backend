const { DataTypes } = require("sequelize")
const sequelize = require("../config/database/db")

const CartItem = sequelize.define("cartItems", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    amount: { type: DataTypes.SMALLINT, defaultValue: 1 },
    totalPrice: { type: DataTypes.INTEGER, allowNull: false }
}, { underscored: true, updatedAt: false })

module.exports = CartItem