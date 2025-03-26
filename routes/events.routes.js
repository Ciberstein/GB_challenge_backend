const express = require("express");
const eventsControllers = require("../controllers/events.controllers");
const eventsMiddlewares = require("../middlewares/events.middlewares");
const validation = require("../middlewares/validation.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(authMiddleware.protect);

router.get(
  "/:id?",
  eventsControllers.getEvents
);

router.post(
  "/reserve/:id",
  validation.reserveEvent,
  eventsMiddlewares.reserveEventValidation,
  eventsControllers.reserveEvent
);

router.get(
  "/reserve/me",
  eventsControllers.getUserReserves
);

module.exports = router;
