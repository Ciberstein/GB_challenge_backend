const Event = require("../models/events.model");
const AppError = require("../utils/appError");
const catchAsync = require("../utils/catchAsync");

exports.reserveEventValidation = catchAsync(async (req, res, next) => {
    const { sessionAccount } = req;
    const { id } = req.params;
  
    const event = await Event.findOne({
      where: { id, status: "active" },
    });
  
    if (!event) {
      return next(new AppError("El evento no existe", 404));
    }
  
    if(event.members.length >= event.capacity) {
        return next(new AppError("No hay lugares disponibles para este evento", 404));
    }

    if (event.members.includes(sessionAccount.id)) {
        return next(new AppError("Usted ya tiene una reserva para este evento", 401));
    }

    req.event = event;

    next();
});