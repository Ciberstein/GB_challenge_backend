const express = require("express");
const eventsControllers = require("../controllers/events.controllers");
const eventsMiddlewares = require("../middlewares/events.middlewares");
const validation = require("../middlewares/validation.middleware");
const authMiddleware = require("../middlewares/auth.middleware");
const router = express.Router();

router.use(authMiddleware.protect);

router.get(
  "/all/:id?",
  eventsControllers.getAllEvents
);

router.get(
  "/user/:id?",
  eventsControllers.getUserEvents
);

router.post(
  "/",
  validation.validEventParams,
  eventsMiddlewares.eventValidation,
  eventsControllers.createEvent
);

router.patch(
  "/:id",
  validation.validIdParam,
  validation.validEventParams,
  eventsMiddlewares.eventValidation,
  eventsMiddlewares.existEventValidation,
  eventsMiddlewares.updateEventValidation,
  eventsControllers.updateEvent
);

router.delete(
  "/:id",
  validation.validIdParam,
  eventsMiddlewares.existEventValidation,
  eventsMiddlewares.updateEventValidation,
  eventsControllers.deleteEvent
);

router.post(
  "/reserve/:id",
  validation.validIdParam,
  eventsMiddlewares.reserveEventValidation,
  eventsControllers.reserveEvent
);

router.get(
  "/reserve/me",
  eventsControllers.getUserReserves
);

router.delete(
  "/reserve/:id",
  validation.validIdParam,
  eventsMiddlewares.cancelReserveEventValidation,
  eventsControllers.cancelReserve
);

module.exports = router;
