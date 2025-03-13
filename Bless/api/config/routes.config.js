const express = require('express'); 
const mongoose = require('mongoose'); 
const router = express.Router(); 
const createError = require('http-errors');
const events = require ('../controllers/events.controller');
const users = require ('../controllers/users.controller');
const sessions = require ('../controllers/sessions.controller');  
const auth = require("../middlewares/session.middleware");
const storage = require("../config/cloudinary.config");
const dayjs = require ("../config/dayjs.config"); 
const multer = require('multer');
const upload = multer(); 

router.post("/users", upload.none(), users.create);
router.get("/users/me", auth.isAuthenticated, users.profile);
router.patch("/users/me", auth.isAuthenticated, users.update);
router.get("/users/:id/validate", users.validate); 

router.post("/sessions", sessions.create); 
router.delete("/sessions", auth.isAuthenticated, sessions.destroy);

router.get("/eventos", events.list);
router.post("/eventos", /*auth.isAuthenticated, auth.isAdmin,*/ storage.single("cartel"), events.create);
router.get("/eventos/:id", events.detail); 
router.delete("/eventos/:id", auth.isAuthenticated, auth.isAdmin, events.delete);
router.patch("/eventos/:id", auth.isAuthenticated, auth.isAdmin, events.update); 

router.use((req, res, next) => {
    next(createError(404, "Route not found"));
});

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
});

module.exports = router; 