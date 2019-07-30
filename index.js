require('dotenv').config();

const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const app = express();
const router = express.Router();
const expressValidator = require('express-validator');
const routes = require('./api/routes/indexRoutes');

const environment = process.env.NODE_ENV;
const stage = require('./config')[environment];

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(expressValidator());

const connUri = process.env.MONGODB_URI;
mongoose.connect(connUri, { useNewUrlParser: true }, (error) => {
    if (error) {
        console.log('Database connection failed. 🔴');
        return;
    }
    console.log('Database connection completed. ✅');
});

if (environment !== 'production') {
    app.use(logger('dev'));
}

app.use('/api/v1', routes(router));

app.listen(`${stage.port}`, () => {
    console.log(`Server now listening at localhost:${stage.port}`);
});

module.exports = app;
