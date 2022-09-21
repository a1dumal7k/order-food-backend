const { DataTypes } = require("sequelize")
const sequelize = require("../config/database/db")

const Attachment = sequelize.define("attachments", {
    id: { type: DataTypes.SMALLINT, primaryKey: true },
    name: { type: DataTypes.STRING, allowNull: false, validate: { min: { args: 2, msg: "Kamida 2 ta harf kiritishingiz kerak" } } },
    orginalName: { type: DataTypes.STRING, allowNull: false, validate: { min: { args: 2, msg: "Kamida 2 ta harf kiritishingiz kerak" } } },
    path: { type: DataTypes.STRING, allowNull: false, validate: { min: { args: 5, msg: "Kamida 5 ta harf kiritishingiz kerak" } } },
    size: { type: DataTypes.INTEGER, allowNull: false, validate: { isNumeric: true } },
}, { underscored: true })

module.exports = Attachment