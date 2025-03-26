

const Account = require("../models/accounts.model");
const { accounts } = require("../utils/dataSeeders/accounts");

const accountSeeder = async () => {
  try {
    const existingCount = await Account.count();

    if (existingCount === 0) {
      await Account.bulkCreate(accounts, {
        updateOnDuplicate: [
          "username", "email",
        ],
      });
      console.log(
        "\x1b[34mACCOUNTS TABLE STATUS:\x1b[0m",
        "\x1b[32mSYNC\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[34mACCOUNTS TABLE STATUS:\x1b[0m",
        "\x1b[33mEXISTING RECORDS FOUND, NO NEW RECORDS ADDED\x1b[0m"
      );
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { accountSeeder };