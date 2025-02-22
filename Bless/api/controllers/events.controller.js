const createError = require ("http-errors"); 
const Event = require ("../models/event.model");
const { model } = require("mongoose");

module.exports.list = (req, res, next) => {
    const { limit = 5, 
        page = 0, 
        sort = 'fecha', 
        title
    }  = req.query; 

    if (Number.isNaN(Number(limit)) || Number(limit) <= 0) {
        return next(createError(400, { message: 'Invalid query parameter', errors: { limit: 'Must be >= 0' }}));
    }
    if (Number.isNaN(Number(page)) || Number(page) < 0) {
        return next(createError(400, { message: 'Invalid query parameter', errors: { page: 'Must be >= 0' } }));
    }

    const criterial = {}; 
    if (title) criterial.title = new RegExp(title, 'i');

    Event.find(criterial)
      .sort({ [sort]: 'desc'})
      .limit(limit)
      .skip(limit * page)
      .then((events) => res.json(events))
      .catch ((error) => next(error));
}; 

module.exports.create = (req, res, next) => {
    const event = req.body; 
    
    Event.create(event)
        .then((event) => res.status(201).json(event))
        .catch((error) => next(error)); 
}; 

module.exports.detail = (req, res, next) => {
    const { id } = req.params; 

    Event.findById(id)
        .then((events) => {
            if (!event) next(createError(404, "Evento no encontrado")); 
            else res.json(event); 
        })
        .catch((error) => next (error)); 
}; 

module.exports.delete = (req, res, next) => {
    const { id } = req.params; 
    Event.findByIdAndDelete(id)
        .then((event) => {
            if (!event) next(createError(404, "Evento no encontrado" ));
            else res.status(204).send(); 
        })
        .catch((error) => next (error));
};

module.exports.update = (req, res, next) => {
    const { id } = req.params; 
    const { body } = req; 

    const permittedParams = ['titulo', 'descripción', 'fecha', 'edad', 'horario', 'DJ', 'dressCode', 'cartel'];

    Object.keys(body).forEach((key) => {
        if (!permittedParams.includes(key)) delete body[key]; 
    }); 

    Event.findByIdAndUpdate (id, body, { runValidators: true, new: true })
        .then ((event) => {
            if (!event) next(createError(404, "Evento no encontrado")); 
            else res.status(201).json(event); 
        })
        .catch((error) => next (error)); 
}; 

