const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    const { email, password, nombre, apellidos } = req.body;
  
    User.findOne({ email })
      .then((user) => {
        if (user) {
          throw createError(409, {
            errors: { 
              email: "Ya existe un usuario con este email" 
            }
          });
        }
        return User.create({ email, password, nombre, apellidos });
      })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((error) => next(error));
};

module.exports.update = (req, res, next) => {
    const { password, nombre } = req.body;
    
    if (password) req.user.password = password;
    if (nombre) req.user.nombre = nombre;
        
    req.user.save()
      .then(user => {
        res.json(user);
      })
      .catch(next);
};

module.exports.validate = (req, res, next) => {
    const { id } = req.params;
    const { token } = req.query;

    User.findOne({ 
      _id: id, 
      activateToken: token 
    })
    .then((user) => {
      if (!user) {
        throw createError(404, "Enlace de validación inválido");
      }
      
      user.active = true;
      user.activateToken = undefined;
      return user.save();
    })
    .then((user) => {
      res.json(user);
    })
    .catch(next);
};

module.exports.profile = (req, res, next) => {
    res.json(req.user);
};