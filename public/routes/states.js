const express = require('express');
const router = express.Router();

router.get('/', function(req, res) {
    res.render('states');
});

router.get('/state', function(req, res) {
    var input = req.query.getState;
    console.log("State: " + input);
    
    var params = {
        'state' : input,
    };
    console.log(params);
    res.json(params);
});

module.exports = router;