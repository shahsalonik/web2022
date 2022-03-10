const express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
    res.render('dino_votes');
});


module.exports = router;
