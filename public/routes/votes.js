const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('dino_votes');
});

router.get('/view_dino_votes', function(req, res) {
    var https = require('https');
    var url = 'https://user.tjhsst.edu/2023sshah/dinos'
    
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
                dino : obj,
            }
            console.log(render_info);
            console.log(obj);
            res.render('view_votes', render_info)
            
        });
    }).on('error', function(e) {
    	console.error(e);
    })
    
    
    
});

module.exports = router;
