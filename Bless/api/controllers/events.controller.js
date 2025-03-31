const createError = require("http-errors"); 
const Event = require("../models/event.model");
const dayjs = require("../config/dayjs.config"); 
const DATE_FORMAT = "DD/MM/YYYY";

module.exports.list = async (req, res, next) => {
    try {
        const events = await Event.find().lean();
        res.json(events);
    } catch (error) {
        next(error);
    }
};

module.exports.create = (req, res, next) => {
    const { fecha } = req.body;

    if (!fecha || !dayjs(fecha, DATE_FORMAT, true).isValid()) {
        return next(createError(400, "Formato de fecha inválido"));
    }

    const event = { ...req.body, fecha: dayjs(fecha, DATE_FORMAT, true).toDate() };

    Event.create(event)
        .then((event) => res.status(201).json(event))
        .catch((error) => next(error));
};

module.exports.detail = (req, res, next) => {
    const { id } = req.params; 

    Event.findById(id)
        .then((event) => {
            if (!event) next(createError(404, "Evento no encontrado")); 
            else res.json(event); 
        })
        .catch((error) => next(error)); 
}; 

module.exports.delete = (req, res, next) => {
    const { id } = req.params; 
    Event.findByIdAndDelete(id)
        .then((event) => {
            if (!event) return next(createError(404, "Evento no encontrado"));
            else res.status(204).send(); 
        })
        .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
    const { id } = req.params; 
    const { body } = req; 

    const permittedParams = ['titulo', 'descripción', 'fecha', 'edad', 'horario', 'DJ', 'dressCode', 'cartel'];

    Object.keys(body).forEach((key) => {
        if (!permittedParams.includes(key)) delete body[key]; 
    }); 

    Event.findByIdAndUpdate(id, body, { 
        runValidators: true, 
        new: true 
    })
        .then((event) => {
            if (!event) next(createError(404, "Evento no encontrado")); 
            else res.status(200).json(event); 
        })
        .catch((error) => next(error)); 
};