const Event = require("../models/events.model");
const { events } = require("../utils/dataSeeders/events");

const eventSeeder = async () => {
  try {
    const existingCount = await Event.count();

    if (existingCount === 0) {
      await Event.bulkCreate(events, {
        updateOnDuplicate: [
          "id", "title",
        ],
      });
      console.log(
        "\x1b[34mEVENTS TABLE STATUS:\x1b[0m",
        "\x1b[32mSYNC\x1b[0m"
      );
    } else {
      console.log(
        "\x1b[34mEVENTS TABLE STATUS:\x1b[0m",
        "\x1b[33mEXISTING RECORDS FOUND, NO NEW RECORDS ADDED\x1b[0m"
      );
    }
  } catch (err) {
    console.error(err);
  }
};

module.exports = { eventSeeder };