const express = require('express');
var router = express.Router();
var https = require('https');

//initial page where the user can enter in longitude and latitude
router.get('/weather_form', function(req, res){
    res.render('weather_form');
});

//renders the form based on that info by retrieving it from the weather.com api
//it is initially in JSON form when it is retrieved from the api
//formats it and populates the page
router.get('/form_render', function(req, res, obj) {
    console.log(req.query)
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
                res.locals.city = obj.properties.relativeLocation.properties.city;
                res.locals.state = obj.properties.relativeLocation.properties.state;
                
                if(obj.properties.forecast === null) {
                    res.render('no_forecast');
                }
                else {
                    fetchForecastInfo(obj.properties.forecast);
                }
            }
            })
        }).on('error', function(e) {
    	    console.error(e);
        });
    
    function fetchForecastInfo(properties) {
        https.get(properties, options, function(response) {
            var weather_info = '';
            response.on('data', function(chunk) {
    		    weather_info += chunk;
    	   });
            	
    	    response.on('end', function() {
    	        console.log(weather_info);
    	        var weather_obj = JSON.parse(weather_info);
    	        var weather_dict = {
    	            'city' : res.locals.city,
    	            'state' : res.locals.state,
    	            forecast : weather_obj.properties.periods,
    	            
    	        };
    	        res.render('weather', weather_dict);
    	    });
        }).on('error', function(e) {
            console.error(e);
        });
    }
});

module.exports = router;
