if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

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
app.set('view engine', 'html');

app.use(express.static('client'));
app.use(logger);
app.use(express.json());


app.use(function(req, res, next) {
    res.status(404);
  
    // respond with html page
    if (req.accepts('html')) {
      res.render('404', { url: req.url });
      return;
    }
  
    // respond with json
    if (req.accepts('json')) {
      res.json({ error: 'Not found' });
      return;
    }
  
    // default to plain-text. send()
    res.type('txt').send('Not found');
  });



app.use('/api/schedule', scheduleController);
app.use('/api/sessions', sessionsController);
app.use('/api/users', usersController);
app.use('/api/plants', plantsController);
app.use('/api/favourites', favouritesController);
app.use(errorHandler);

app.listen(port, () => {
    console.log(`server listening on port: ${port}`);
});
