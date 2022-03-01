const express = require('express');
var router = express.Router();

router.get('/', function(req, res, obj) {
    var https = require('https');
    var url = 'https://ion.tjhsst.edu/api/schedule'
    
    var options = { 
    	headers : {
    		'User-Agent': 'request'
    	}
    }

    https.get(url, options, function(response) {
    	var rawData = '';
    	response.on('data', function(chunk) {
    		rawData += chunk;
    	});
    	response.on('end', function() {
            console.log(rawData); // THIS IS WHERE YOU HAVE ACCESS TO RAW DATA
            obj = JSON.parse(rawData);
            var render_info = {
                'date' : obj.results.date,
            }
            res.render('schedule', render_info);
        });
    }).on('error', function(e) {
    	console.error(e);
    })
    
});

module.exports = router;
