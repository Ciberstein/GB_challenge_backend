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

    const currentDate = new Date();

    if (currentDate > event.expiredAt) {
      return next(new AppError("La fecha límite para reservar este evento ha caducado", 400));
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

exports.cancelReserveEventValidation = catchAsync(async (req, res, next) => {
  const { sessionAccount } = req;
  const { id } = req.params;

  const event = await Event.findOne({
    where: { id, status: "active" },
  });

  if (!event) {
    return next(new AppError("El evento no existe", 404));
  }

  if (!event.members.includes(sessionAccount.id)) {
    return next(new AppError("Usted no tiene una reserva para este evento", 401));
  }

  req.event = event;

  next();
});

exports.existEventValidation = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const event = await Event.findOne({
    where: { id }
  })

  if (!event) {
    return next(new AppError("El evento no existe", 404));
  }

  req.event = event;

  next();
});

exports.eventValidation = catchAsync(async (req, res, next) => {
  const { expiredAt } = req.body;

  const date = new Date(expiredAt);
  const currentDate = new Date();

  if (date < currentDate) {
    return next(new AppError("La fecha debe ser mayor a la fecha actual", 401));
  }

  next();
});

exports.updateEventValidation = catchAsync(async (req, res, next) => {
  const { event, sessionAccount } = req;

  if (event.accountId !== sessionAccount.id) {
    return next(new AppError("El evento no existel", 401));
  }

  next();
});
