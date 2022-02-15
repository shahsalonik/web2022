const express = require('express');
var router = express.Router();

router.get('', function(req, res) {
    res.render('home');
});

router.get('/it_works',function(req,res){
   console.log('someone is landing on my page');
   res.render('works_template');
});

router.get('/second', function(req,res){
   var obj = {
     'somekey' : 'Hello World, it works!'
   }
   res.render('second_template', obj);
});

router.get('/third', function(req,res){
   var obj = {
       'message' : 'Thanks for waiting',
       'delay_time' : '3000'
   }
   res.render('third_template', obj);
});

router.get('/something_styled', function(req, res) {
    var obj = {
    }
    res.render('style_template', obj);
});

router.get('/chance', function(req, res) {
    
    var x = Math.random();
    
    if (x < 0.5) {
        var win = {
            'win_key' : 'Hello world, you won!'
        }
        res.render('win_template', win);
    }
    else {
        var lose = {
            'lose_key' : 'Hello world, you lost!'
        }
        res.render('lose_template', lose);
    }
    
});

router.get('/list_render', function(req,res){
   var obj = {
       thingz : [
            "Gryffindor",
            "Huflepuff",
            "Ravenclaw",
            "Slytherin",
           ],
   }
   res.render('list', obj);
});

module.exports = router;
