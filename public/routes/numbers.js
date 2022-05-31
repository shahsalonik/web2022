const express = require('express');
var router = express.Router();

//has a list of numbers from 1-100
router.get('/', function(req,res) {
    var num = {
        nums : [
            1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 
            11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 
            21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 
            31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 
            41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 
            51, 52, 53, 54, 55, 56, 57, 58, 59, 60, 
            61, 62, 63, 64, 65, 66, 67, 68, 69, 70, 
            71, 72, 73, 74, 75, 76, 77, 78, 79, 80, 
            81, 82, 83, 84, 85, 86, 87, 88, 89, 90, 
            91, 92, 93, 94, 95, 96, 97, 98, 99, 100
        ],
        
    }
    res.render('numbers', num)
});
    
//based on whatever number the user selects, it gets formatted in terms of JSON or no JSON
//gives them the square root, the square, and the natural log of that number
//renders the page with the info
router.get('/:numbers', function(req,res) {
    console.log(req.params.numbers);
    
    var num_req = req.params.numbers;
    
    if(isNaN(Math.sqrt(num_req))) {
        res.render('nan_template');
    }
    else if("format" in req.query) {
        if(req.query.format == "json") {
            var number_dict = {
                number : num_req,
                square_root : Math.sqrt(num_req),
                squared : Math.pow(num_req, 2),
                natural_log : Math.log(num_req)
            }
            res.json(number_dict);
        }
    }
    else {
        var number_info = {
            'num' : num_req,
            'sqrt' : Math.sqrt(num_req),
            'square' : Math.pow(num_req, 2),
            'ln' : Math.log(num_req)
        }
        res.render('numbers_template', number_info);
    }
    
});

module.exports = router;
