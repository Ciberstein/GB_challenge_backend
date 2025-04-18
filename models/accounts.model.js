const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Account = db.define(
  "accounts",
  {
    id: {
      primaryKey: true,
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      field: "id",
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "email",
      unique: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "username",
      unique: true
    },
    password: {
      type: DataTypes.TEXT,
      allowNull: false,
      field: "password",
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "first_name",
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
      field: "last_name",
    },
    role: {
      type: DataTypes.ENUM("user", "admin"),
      allowNull: false,
      defaultValue: "user",
      field: "role",
    },
    status: {
      type: DataTypes.ENUM("active", "pending", "disabled"),
      defaultValue: "pending",
      allowNull: false,
      field: "status",
    },
  },
  {
    tableName: "accounts",
  }
);

module.exports = Account;
