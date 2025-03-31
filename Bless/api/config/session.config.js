const expressSession = require('express-session');
const mongoose = require('mongoose');
const sessionMaxHours = parseInt(process.env.SESSION_MAX_HOURS || '6');

module.exports.loadSession = expressSession({
    secret: process.env.SESSION_SECRET, 
    resave: false, 
    saveUninitialized: true, 
    cookie: {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        maxAge: sessionMaxHours * 60 * 60 * 1000 
    }, 
});

