require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const registerPlanetaRoute = require('./routes/planeta');
const errorHandler = require('./middleware/errorHandler');

const app = express();
const router = express.Router();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

registerPlanetaRoute(router);

app.use('/api', router);

module.exports = app;
