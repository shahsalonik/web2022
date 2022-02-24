const express = require('express');
var router = express.Router();

var https = require('https');
var url = 'https://ion.tjhsst.edu/api/schedule'

var options = { 
	headers : {
		'User-Agent': 'request'
	}
}
console.log('A');
https.get(url, options, function(response) {
	console.log('B')
	var rawData = '';
	response.on('data', function(chunk) {
		console.log('C')
		rawData += chunk;
	});
	console.log('D')
	response.on('end', function() {
		console.log('E')
console.log(rawData); // THIS IS WHERE YOU HAVE ACCESS TO RAW DATA
obj = JSON.parse(rawData);
});
	console.log('F')
}).on('error', function(e) {
	console.error(e);
});
console.log('G')

router.get('/', function(req, res) {
    var render_info = {
        
    }
    res.render('schedule', render_info);
    
});

/*var c_checkAuth = function(req, res, next) {
  res.locals.username = 'Paul'
  res.locals.authenticated = true;
  next();
}

var c_checkVisits = function(req, res) {
    res.locals.visit_count = req.cookie.visits
    next()
}

var c_validateAuth = function(req,res) {
  if (res.locals.visit_count > 5) {
     if (res.locals.authenticated == false) {
        return res.render('unauthorized');
     }
  }
  
  var render_dictionary = {
    'uname' : res.locals.username,
    'authenticated' : res.locals.authenticated,
    'visits' : res.locals.visit_count   
      
  }
  res.render('nan_template'. render_dictionary);
});

app.get('/foo', [c_checkAuth, c_checkVisits, c_validateAuth] )*/

module.exports = router;
