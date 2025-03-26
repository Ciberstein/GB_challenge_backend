const Event = require("../models/events.model");
const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');

exports.getEvents = catchAsync(async (req, res) => {
    const { id } = req.params;
    
    if(id) {
        const transaction = await Event.findOne({
            where: { id }
        });

        return res.status(200).send(transaction);
    };

    const transactions = await Event.findAll(
        { order: [['id', 'DESC']] }
    );

    return res.status(200).send(transactions);
});
  
exports.reserveEvent = catchAsync(async (req, res) => {
    const { sessionAccount, event } = req;

    const members = [...event.members, sessionAccount.id];;

    await event.update({ members });

    return res.status(200).json({
        status: "success",
        message: "Reserva realizada con éxito"
    });
});
  

exports.getUserReserves = catchAsync(async (req, res) => {
    const { sessionAccount } = req;

    const events = await Event.findAll({
        where: {
          members: {
            [Op.contains]: [sessionAccount.id]
          }
        }
    });

    return res.status(200).json(events);
});
  