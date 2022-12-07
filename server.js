if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

console.log(process.env.NODE_ENV === 'production');

const express = require('express');
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
// THIS IS NEW
// app.set('view engine', 'html');

app.use(express.static('client'));
app.use(logger);
app.use(express.json());



app.use('/api/schedule', scheduleController);
app.use('/api/sessions', sessionsController);
app.use('/api/users', usersController);
app.use('/api/plants', plantsController);
app.use('/api/favourites', favouritesController);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
