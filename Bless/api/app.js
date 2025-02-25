require('dotenv').config();

const express = require ('express'); 
const logger = require ('morgan'); 

require("./config/db.config"); 

const app = express (); 

app.use(express.json()); 
app.use(logger('dev')); 
app.use ((req, res, next) => {
    console.log ('Oki dokki'); 
    next (); 
})

const routes = require ('./config/routes.config'); 
app.use ('/api/v1', routes); 

const port = Number (process.env.PORT || 3000); 
app.listen (port, () => console.info(`Application running at port ${port}`)); 