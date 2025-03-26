require("dotenv").config();
const app = require("./app");
const { db } = require("./database/config");
const initModel = require("./models/initModels");
const { accountSeeder } = require("./seeders/accounts.seeder");
const { eventSeeder } = require("./seeders/events.seeder");

db.authenticate()
  .then(() => console.log(
    "\x1b[34mDATABASE AUTH STATUS:\x1b[0m",
    "\x1b[32mAUTHENTICATED\x1b[0m"
  ))
  .catch((err) => console.log(err));

initModel();

db.sync({ force: false })
  .then(async () => {
    console.log("\x1b[34mDATABASE STATUS:\x1b[0m", "\x1b[32mSYNC\x1b[0m");

    // Seeders
    await accountSeeder();
    await eventSeeder();
  })
  .catch((err) => console.log(err));

const port = process.env.PORT || 3011;

app.listen(port, () => {
  console.log(
    "\x1b[34mSERVER IS RUNNING ON PORT:\x1b[0m",
    `\x1b[32m${port}\x1b[0m`
  )
});
