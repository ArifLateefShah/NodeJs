const mysql = require('mysql');
const config = require('./db.config.js');
const connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB
});

connection.connect(err => {
    if(err)
        throw err;
});

module.exports = connection;