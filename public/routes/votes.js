const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('dino_votes');
});

router.get('/view_dino_votes', function(req, res) {
    var sqlQuery;
    
    if(req.query.votes == 0) {
        sqlQuery = "UPDATE dinos SET votes = votes + 1 WHERE d_name = 'Rex';";
    }
    else if(req.query.votes == 1) {
        sqlQuery = "UPDATE dinos SET votes = votes + 1 WHERE d_name = 'John';";
    }
    else if(req.query.votes == 2) {
        sqlQuery = "UPDATE dinos SET votes = votes + 1 WHERE d_name = 'Asteroid';";
    }
    else {
        sqlQuery = "";
    }
    res.app.locals.pool.query(sqlQuery, function(error,results,fields){
        if (error) throw error;
        var sql = "SELECT d_id, d_name, votes FROM dinos;";
        res.app.locals.pool.query(sqlQuery, function(error,results,fields){
            if (error) throw error;
            res.render('view_votes', results);
        });
    });

     
    
});

module.exports = router;
