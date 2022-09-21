const { Sequelize } = require("sequelize");

module.exports = sequelize = new Sequelize({
  host: "localhost",
  port: 5432,
  username: "postgres",
  database: "orderFood",
  password: "root",
  dialect: "postgres",
  underscore: true,
});
