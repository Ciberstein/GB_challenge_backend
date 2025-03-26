const hashPassword = require("../hashPassword");

const accounts = [
    {
        email: "admin@eventify.com",
        password: hashPassword("123456"),
        username: "administrator",
        first_name: "Jhon",
        last_name: "Doe",
        role: "admin",
        status: "active"
    }
];

module.exports = { accounts };