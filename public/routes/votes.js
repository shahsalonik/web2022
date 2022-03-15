const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('dino_votes');
});

router.get('/view_dino_votes', function (req, res) {
    res.render('view_votes')
});

module.exports = router;
