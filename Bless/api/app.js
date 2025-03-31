require('dotenv').config();
const express = require("express");
const logger = require("morgan");
const session = require("express-session");
const cors = require("cors"); 

require("./config/db.config");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const corsOptions = {
  origin: [
    'http://localhost:5173', // Tu frontend local
    'https://blesstheclub.netlify.app' // Tu producción
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions));


app.use(session({
  secret: process.env.SESSION_SECRET || "super-secreto",
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
    maxAge: 24 * 60 * 60 * 1000
  }
}));

const { loadSessionUser } = require('./middlewares/session.middleware');
app.use(loadSessionUser);

const routes = require('./config/routes.config');
app.use("/api/v1", routes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Error interno del servidor' });
});

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});