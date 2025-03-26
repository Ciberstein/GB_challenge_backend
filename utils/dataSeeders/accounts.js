const hashPassword = require("../hashPassword");

const accounts = [
    {
        email: "admin@eventify.com",
        password: hashPassword("IltErbIBlelaspitONAT"),
        username: "administrator",
        first_name: "Jhon",
        last_name: "Doe",
        role: "admin",
        status: "active"
    }
];

module.exports = { accounts };