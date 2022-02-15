#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

console.log('hello world')

var express = require('express')
var app = express();

var hbs = require('hbs')
app.set('view engine','hbs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// -------------- routes -------------- //
const home = require('./routes/home.js')
app.use(home);

const madlib = require('./routes/madlib.js')
app.use('/', madlib);

const numbers = require('./routes/numbers.js')
app.use('/numbers', numbers);

app.use(express.static('static_files'))

// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
