if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const express = require('express');
const path = require('path');
const expressSession = require('express-session');
const pgSession = require('connect-pg-simple')(expressSession);
const db = require('./database/db');

const scheduleController = require('./controllers/schedule');
const sessionsController = require('./controllers/sessions');
const usersController = require('./controllers/users');
const plantsController = require('./controllers/plants');
const favouritesController = require('./controllers/favourites');

const errorHandler = require('./middleware/error_handler');
const logger = require('./middleware/logger');

const app = express();
const port = process.env.PORT || 3000;

app.use(
    expressSession({
        store: new pgSession({
            pool: db, 
            createTableIfMissing: true,
        }),
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
    })
);

// app.use(express.static('client'));
app.use(logger);
app.use(express.json());


// NEW CODE BELOW

app.use((req, res, next) => {
    // res.sendFile(path.join('./client', '/index.html'));
    console.log(`Time: ${Date.now()}`);
});


// app.mountpath = './client';

app.use('/api/schedule', scheduleController);
app.use('/api/sessions', sessionsController);
app.use('/api/users', usersController);
app.use('/api/plants', plantsController);
app.use('/api/favourites', favouritesController);

app.use(errorHandler);
app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});

// console.log(app);