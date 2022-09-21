const { DataTypes, UUIDV4 } = require("sequelize")
const sequelize = require("../config/database/db")
const orderStatus = require("../utilts/orderStatusENUM")
const OrderItem = require("./OrderItem")
const Payment = require("./Payment")
// order
// id: UUID,
// UserId: USER,
// adress: Varchar,
// status: OrderStatus
// TotalPrice: int

const Order = sequelize.define("orders", {
    id: {
        type: DataTypes.UUID,
        primaryKey: true,
        defaultValue: UUIDV4
    },
    address: {
        type: DataTypes.TEXT,
        allowNull: false,
        status: {
            type: DataTypes.ENUM(Object.values(orderStatus)),
            allowNull: false
        }
    },
    status: {
        type: DataTypes.ENUM(Object.values(orderStatus)),
        defaultValue: orderStatus.status_NEW
    },
    totalPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, { underscored: true })

Order.hasMany(OrderItem, { as: "orderItem" })
OrderItem.belongsTo(Order, { as: "order", onDelete: "restrict" })

Order.hasOne(Payment, { as: "payment", foreignKey: "order_id" })
Payment.belongsTo(Order, { as: "order" })
module.exports = Order