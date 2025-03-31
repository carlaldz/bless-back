const User = require("../models/user.model");
const createError = require("http-errors");

module.exports.create = (req, res, next) => {
    const { email, password } = req.body;
  
    User.findOne({ email })
      .then((user) => {
        if (!user) {
          return next(createError(401, {
            errors: { credentials: "Email o contraseña incorrectos" }
          }));
        }

        return user.checkPassword(password)
          .then((match) => {
            if (!match) {
              throw createError(401, {
                errors: { credentials: "Email o contraseña incorrectos" }
              });
            }

            req.session.userId = user.id;
             
            res.status(201).json({
              id: user.id,
              nombre: user.nombre,
              email: user.email,
              role: user.role
            });
          });
      })
      .catch(next);
};

module.exports.destroy = (req, res, next) => {
    req.session.destroy(() => {
        res.clearCookie("connect.sid"); 
        res.status(204).send();
    });
};