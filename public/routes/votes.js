const express = require('express');
var router = express.Router();

//this renders the default template that the user first sees
//it has three pictures of dinosaurs on it
//each of them have a button underneath that will allow the user to click on it to vote
router.get('/', function(req, res) {
    res.render('dino_votes');
});

//this is the page where the user can see the votes
//each dino is assigned a number - rex = 0, john = 1, and asteroid = 2
//after that, it enters the vote into a sql table, where it keeps a running total
//finally, it gets the results from the table and displays them on a page 
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
        sqlQuery = "UPDATE dinos SET votes = votes WHERE d_name = 'Rex';";
    }
    res.app.locals.pool.query(sqlQuery, function(error,results,fields){
        if (error) throw error;
        var sql = "SELECT d_id, d_name, votes FROM dinos;";
        res.app.locals.pool.query(sql, function(error,results,fields){
            if (error) throw error;
            console.log(results);
            var render_dict = {
                'r_votes' : results[0].votes,
                'j_votes' : results[1].votes,
                'a_votes' : results[2].votes,
            };
            
            res.render('view_votes', render_dict);
        });
    });

     
    
});

module.exports = router;
