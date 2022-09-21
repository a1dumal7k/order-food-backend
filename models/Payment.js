const { DataTypes } = require("sequelize")
const sequelize = require("../config/database/db")
const paymentType = require("../utilts/paymentTypeENUM")

// PAYMENT
// id: serial,
// userid: user,
// orderid: order,
// type: PaymentType,
// paid: BigInt

const Payment = sequelize.define("payments", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    type: {
        type: DataTypes.ENUM(Object.values(paymentType)),
        allowNull: false,
        defaultValue: paymentType.paymentType_CARD

    },
    paidMoney: {
        type: DataTypes.BIGINT,
        allowNull: false
    }
}, { underscored: true })

module.exports = Payment