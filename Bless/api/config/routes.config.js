const express = require('express'); 
const mongoose = require('mongoose'); 
const createError = require('http-errors');

const users = require ('../controllers/users.controller'); 

const router = express.Router(); 

router.post('/users', /*storage.single("avatar"),*/users.create); 
router.get('/users/me', auth.isAuthenticated, users.profile); 
router.patch('/users/:id', auth.isAuthenticated, users.update); 
//router.get('/users/:id/validate', users.validate);  ESTO NO SE QUE HACE

//router.post("/sessions", sessions.create); 
//router.delete("/sessions", auth.isAuthenticated, sessions.destroy);

router.use((error, req, res, next) => {
    if (
        error instanceof mongoose.Error.CastError && 
        error.message.includes("_id")
    )
        error = createError(404, "Resource not found"); 
    else if (error instanceof mongoose.Error.ValidationError)
        error = createError (400, error);
    else if (!error.status) error = createError (500, error.message); 
    console.error(error); 

    const data = {}; 
    data.message = error.message; 
    if (error.errors){
        data.errors = Object.keys (error.errors).reduce((errors, errorKey) => {
            errors[errorKey] = 
              errors.errors[errorKey]?.message || error.errors[errorKey];
            return errors; 
        }, {});
    }
    res.status(error.status).json(data); 
})

module.exports = router; 