const { DataTypes, UUIDV4 } = require("sequelize");
const sequelize = require("../config/database/db");
const { hash } = require("bcryptjs");
const userRole = require("../utilts/userENUM");
const Cart = require("./Cart");
const Order = require("./Order");
const Payment = require("./Payment");
const Users = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: UUIDV4,
      primaryKey: true,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: { args: 3, msg: "6 tadan kam harf kiritdingiz" },
        max: 20,
      },
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: { args: 3, msg: "6 tadan kam harf kiritdingiz" },
        max: 20,
      },
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        min: { args: 5, msg: "5 ta harfdan kam ma`lumot kiritdingiz" },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        min: { args: 5, msg: "Siz kamida 5 ta ishorodan parol kiritmadiz" },
      },
    },
    role: {
      type: DataTypes.ENUM(Object.values(userRole)),
      allowNull: false,
      defaultValue: userRole.role_CUSTOMER,
    },
  },
  {
    underscored: true,
    updatedAt: false,
    hooks: {
      async beforeCreate(user) {
        user.password = await hash(user.password, 8);
      },
    },
  }
);

Users.hasOne(Cart, { foreignKey: "customer_id" });
Cart.belongsTo(Users, { as: "customer" });

Users.hasMany(Order, { as: "orders", foreignKey: "customer_id" });
Order.belongsTo(Users, { as: "customer" });

Users.hasMany(Payment, { as: "payments", foreignKey: "customer_id" });
Payment.belongsTo(Users, { as: "customer" });

module.exports = Users;
