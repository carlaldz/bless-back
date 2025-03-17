require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const { loadSession } = require ('./config/session.config'); 
const { loadSessionUser } = require ('./middlewares/session.middleware'); 
const { cors } = require('./config/cors.config'); 

require("./config/db.config"); 

const app = express();

//Middlewares

app.use(cors); 
app.use(express.json());
app.use(logger("dev")); 
app.use(loadSession); 
app.use(loadSessionUser)

app.use ((req, res, next) => {
    console.log ('Oki dokki'); 
    next (); 
})

const routes = require('./config/routes.config'); 
app.use("/api/v1", routes);

const port = Number (process.env.PORT || 3000); 
app.listen (port, () => console.info(`Application running at port ${port}`)); 

app.get('/api/images', async (req, res) => {
    try {
        const cloudName = process.env.CLOUD_NAME;
        const apiKey = process.env.API_KEY;
        const apiSecret = process.env.API_SECRET;
        const folderName = process.env.FOLDER_NAME;
        const response = await axios.get(
            `https://api.cloudinary.com/v1_1/${cloudName}/resources/image`,
            {
                params: {
                    type: 'upload',
                    prefix: folderName,
                    max_results: 100,
                },
                auth: {
                    username: apiKey,
                    password: apiSecret,
                },
            }
        );

        res.json(response.data.resources);
        } catch (error) {
            console.error('Error fetching images:', error);
            res.status(500).json({ error: 'Failed to fetch images' });
        }
});