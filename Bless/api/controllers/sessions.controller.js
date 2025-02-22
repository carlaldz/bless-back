const User = require ("../models/user.model"); 
const createError = require ('http-errors'); 

module.exports.create = (req, res, next) => {
    const { email, password } = req.body; 

    User.findOne ({ email })
        .then((user) => {
            if (user) {
                user
                    .checkPassword (password)
                    .then((match) => {
                        if (match) {
                            req.session.userId = user.id; 
                            res.status(201).json(user); 
                        } else {
                            next (createError(401, {
                                message: "Credenciales incorrectos", 
                                errors: { email: "Email o contraseña inválidos"},
                            }))
                        }
                    })
                    .catch(next); 
            } else {
                next (createError(401, {
                    message: "Credenciales incorrectos", 
                    errors: { email: "Email o contraseña incorrectos"}, 
                }))
            }
        }) .catch(next); 
}; 

module.exports.destroy = (req, res, next) => {
    req.session.destroy (); 
    res.status(204).send(); 
}