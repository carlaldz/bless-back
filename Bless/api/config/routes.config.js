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
 

router.get("/api/v1/status", (req, res) => {
    res.json({ message: "API v1 working" }); 
});

router.post("/users", express.json(), users.create);
router.get("/users/:id", auth.isAuthenticated, users.profile);
router.patch("/users/:id", auth.isAuthenticated, users.update);

router.post("/sessions", sessions.create); 
router.delete("/sessions", auth.isAuthenticated, sessions.destroy);
router.post('/login', sessions.create);
router.get("/events", events.list);
router.post("/events", auth.isAuthenticated, auth.isAdmin, storage.single("cartel"), events.create);
router.get("/events/:id", events.detail); 
router.delete("/events/:id", auth.isAuthenticated, auth.isAdmin, events.delete);
router.patch("/events/:id", auth.isAuthenticated, auth.isAdmin, events.update); 

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