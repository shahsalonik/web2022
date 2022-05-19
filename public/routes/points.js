const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('points');
});

router.get('/sql_ajax_101_worker', function(req, res) {
    
    var book_chx;
    if('book' in req.query === false) {
        return res.send('missing book by that name');
    }
    else {
        book_chx = req.query.book;
    }
    console.log(book_chx)
    var sql = 'SELECT * FROM book WHERE book_id=(SELECT genre_id FROM book_genres WHERE genre=?;';
    res.app.locals.pool.query(sql, [book_chx], function(error, results, fields) {
        console.log("" + results);
        res.render('./jquery/book_snippet', {'results' : results});
    });
    
});

module.exports = router;