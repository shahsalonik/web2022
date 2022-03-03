const express = require('express');
var router = express.Router();
var https = require('https');

router.get('/', function(req, res){
    res.render('weather_form');
});

router.post('/form_render', function(req, res) {
    const {lat, long} = req.query;
    var url = 'https://api.weather.gov/points/' + lat + ',' + long;
    
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
            if('status' in obj) {
                res.render('no_forecast');
            }
            else {
                fetchForecastInfo(obj.properties.forecast);
            }
        });
    }).on('error', function(e) {
    	console.error(e);
    })
    
    function fetchForecastInfo(properties) {
        https.get(properties, options, function(response) {
            var weather_info = '';
            response.on('data', function(chunk) {
    		    weather_info += chunk;
    	   });
            	
    	    response.on('end', function() {
    	        var obj = JSON.parse(rawData);
    	        var weather_dict = {
    	            'location' : obj.properties.properties.city + ', ' + obj.properties.properties.state,
    	            forecast : obj.properties.period[0]
                }
                res.render('weather', weather_dict);
    	    });
        }).on('error', function(e) {
            console.error(e);
        });
    }
    
    
    
});

module.exports = router;
