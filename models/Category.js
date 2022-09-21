const { DataTypes } = require("sequelize")
const sequelize = require("../config/database/db")
const ProductModel = require("./Products")
const Category = sequelize.define("categories", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { min: { args: 2, msg: "Kamida 2 ta harf kiritishingiz kerak" } }
    },
    description: {
        type: DataTypes.STRING,
        defaultValue: "Category"
    }
}, { underscored: true })

Category.hasMany(ProductModel, { as: "products" })
ProductModel.belongsTo(Category, { as: "category", onDelete: "cascade" })

module.exports = Category