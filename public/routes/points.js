const express = require('express');
var router = express.Router();

//renders the points page
router.get('/', function(req, res) {
    res.render('points');
});

//lists all the genres and the books under that genre after getting it from the sql table
router.get('/sql_ajax_101_worker', function(req, res) {
    
    var genre_chx;
    if('genre' in req.query === false) {
        return res.send('missing genre by that name');
    }
    else {
        genre_chx = req.query.genre;
    }
    console.log(genre_chx);
    var sql = 'SELECT book_name, author FROM book WHERE book_id=(SELECT genre_id FROM book_genres WHERE genre=?;';
    res.app.locals.pool.query(sql, [genre_chx], function(error, results, fields) {
        console.log("" + results);
        res.render('book_snippet', {'results' : results});
    });
    
});

module.exports = router;