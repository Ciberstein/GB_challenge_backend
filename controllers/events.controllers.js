const Event = require("../models/events.model");
const catchAsync = require("../utils/catchAsync");
const { Op } = require('sequelize');

exports.getAllEvents = catchAsync(async (req, res) => {
    const { id } = req.params;
    
    if(id) {
        const event = await Event.findOne({
            where: { id }
        });

        return res.status(200).send(event);
    };

    const events = await Event.findAll({ 
        where: {
            expiredAt: { 
                [Op.gt]: new Date() 
            }
        },
        order: [['id', 'DESC']]
    });

    return res.status(200).send(events);
});


exports.getUserEvents = catchAsync(async (req, res) => {
    const { id, sessionAccount } = req;

    if(id) {
        const event = await Event.findOne({
            where: { 
                id, 
                accountId: sessionAccount.id
            }
        });

        return res.status(200).send(event);
    };

    const events = await Event.findAll({ 
        where: {
            accountId: sessionAccount.id
        },
        order: [['id', 'DESC']]
    });

    return res.status(200).json(events);
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
            status: "active",
            members: {
                [Op.contains]: 
                [sessionAccount.id]
            }
        }
    });

    return res.status(200).json(events);
});

exports.cancelReserve = catchAsync(async (req, res) => {
    const { sessionAccount, event } = req;

    const members = event.members.filter(
        id => id !== sessionAccount.id
    );

    await event.update({ members });

    return res.status(200).json({
        status: "success",
        message: "Reserva cancelada con éxito"
    });
});
  
exports.createEvent = catchAsync(async (req, res) => {
    const { title, description, expiredAt, capacity } = req.body;
    const { sessionAccount } = req;

    await Event.create({
        title,
        description, 
        expiredAt,
        capacity,
        accountId: sessionAccount.id
    });

    return res.status(200).json({
        status: "success",
        message: "Evento creado con éxito"
    });
});
  
  
exports.updateEvent = catchAsync(async (req, res) => {
    const { title, description, expiredAt, capacity } = req.body;
    const { event } = req;

    await event.update({
        title,
        description, 
        expiredAt,
        capacity,
    });

    return res.status(200).json({
        status: "success",
        message: "Evento actualizado con éxito"
    });
});
  
exports.deleteEvent = catchAsync(async (req, res) => {
    const { event } = req;

    await event.destroy();

    return res.status(200).json({
        status: "success",
        message: "Evento eliminado con éxito"
    });
});