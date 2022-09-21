const { DataTypes, UUIDV4 } = require("sequelize")
const { models } = require("../config/database/db")
const sequelize = require("../config/database/db")

const OrderItem = sequelize.define("order_items", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
    }
}, { underscored: true })

module.exports = OrderItem