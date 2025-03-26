const { DataTypes } = require("sequelize");
const { db } = require("../database/config");

const Event = db.define(
    "events",
    {
        id: {
            primaryKey: true,
            autoIncrement: true,
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "id",
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            field: "title",
        },
        description: {
            type: DataTypes.TEXT,
            allowNull: true,
            field: "description",
        },
        members: {
            type: DataTypes.JSONB,
            allowNull: false,
            field: "members",
            defaultValue: []
        },
        capacity: {
            type: DataTypes.INTEGER,
            allowNull: false,
            field: "capacity",
            defaultValue: 1
        },
        status: {
            type: DataTypes.ENUM("active", "expired", "cancelled"),
            defaultValue: "active",
            allowNull: false,
            field: "status",
        },
        expiredAt: {
            type: DataTypes.DATE,
            allowNull: false,
            field: "expiredAt",
        },
    },
    {
        tableName: "events",
    }
);

module.exports = Event;
