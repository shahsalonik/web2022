#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

console.log('hello world');

var express = require('express');
var app = express();

var hbs = require('hbs');
app.set('view engine','hbs');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('static_files'));

var mysql = require('mysql');

var sql_params = {
  connectionLimit : 10,
  user            : process.env.DIRECTOR_DATABASE_USERNAME,
  password        : process.env.DIRECTOR_DATABASE_PASSWORD,
  host            : process.env.DIRECTOR_DATABASE_HOST,
  port            : process.env.DIRECTOR_DATABASE_PORT,
  database        : process.env.DIRECTOR_DATABASE_NAME
}

app.locals.pool  = mysql.createPool(sql_params);

// -------------- routes -------------- //
const home = require('./routes/home.js');
app.use(home);

const madlib = require('./routes/madlib.js');
app.use('/', madlib);

const numbers = require('./routes/numbers.js');
app.use('/numbers', numbers);

const schedule = require('./routes/schedule.js');
app.use('/schedule', schedule);

const weather = require('./routes/weather.js');
app.use('/weather', weather);

const dino_votes = require('./routes/votes.js');
app.use('/dino_votes', dino_votes);

const word_finder = require('./routes/word.js');
app.use('/word_finder', word_finder);


// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
