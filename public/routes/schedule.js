const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    var https = require('https');
    var url = 'https://ion.tjhsst.edu/api/schedule?format=json'
    
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
            var obj = JSON.parse(rawData);
            console.log(obj);
            
            var render_info = {
                'date' : obj.results[0].date,
                'name' : obj.results[0].day_type.name,
                schedule : obj.results[0].day_type.blocks
            }
            console.log(render_info);
            console.log(obj);
            res.render('schedule', render_info);
            
            
        });
    }).on('error', function(e) {
    	console.error(e);
    })
    
    
    
});

module.exports = router;
