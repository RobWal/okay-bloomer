const pg = require('pg');

let db;
if (process.env.NODE_ENV === 'production') {
    db = new pg.Pool({
        connectionString: process.env.CONNECTION_STRING,
    })
} else {
    db = new pg.Pool({
        database: 'ok_bloomer',
    });
}

module.exports = db;
