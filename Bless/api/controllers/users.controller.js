const createError = require('http-errors');
const User = require('../models/user.model');

module.exports.create = (req, res, next) => {
    const { email } = req.body;

    User.findOne({ email })
        .then((user) => {
            if (user) {
                return next(createError(400, {
                    message: "Este email ya está registrado",
                    errors: { email: "Already exists" },
                }));
            }

            return User.create({
                email: req.body.email,
                password: req.body.password,
                nombre: req.body.nombre,
                fotoPerfil: req.file?.path,
            })
            .then((user) => {
                res.status(201).json(user);
            });
        })
        .catch(next);
};

module.exports.update = (req, res, next) => {
    const permittedBody = {
        email: req.body.email,
        password: req.body.password,
        nombre: req.body.nombre,
        fotoPerfil: req.body.fotoPerfil,
    };

    // Remove undefined keys
    Object.keys(permittedBody).forEach((key) => {
        if (permittedBody[key] === undefined) {
            delete permittedBody[key];
        }
    });

    Object.assign(req.user, permittedBody);

    req.user
        .save()
        .then((user) => res.json(user))
        .catch(next);
};

module.exports.validate = (req, res, next) => {
    User.findOne({ _id: req.params.id, activateToken: req.query.token })
        .then((user) => {
            if (user) {
                user.active = true;
                return user.save().then((user) => res.json(user));
            } else {
                return next(createError(404, "Usuario no encontrado"));
            }
        })
        .catch(next);
};

module.exports.profile = (req, res, next) => {
    res.json(req.user);
};