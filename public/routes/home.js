const express = require('express');
var router = express.Router();

const {checkAuthentication} = require('/site/public/routes/oauth.js')

//renders the home page after seeing a visitor
router.get('', function(req, res) {
    
    var cookie_key = 'visitor';
    
    if(cookie_key in req.cookies === false) {
        res.cookie('visitor', 'blergety blerp')
    }
    
    res.render('home');
});

//creates a gingerbread cookie and renders the cookieclickr page
router.get('/cookie', function(req, res) {
    
    var cookie_key = 'gingerbreads';
    
    if(cookie_key in req.cookies === false) {
        res.cookie(cookie_key, 0)
    }
    
    res.render('cookieclickr');
});

//ALL OF THE FOLLOWING ARE ASSIGNMENTS WE STARTED AT THE BEGINNING OF THE YEAR

//prints out 'someone is landing on my page' in the console
router.get('/it_works',function(req,res){
   console.log('someone is landing on my page');
   res.render('works_template');
});

//renders the second_template page with an obj parameter
router.get('/second', function(req,res){
   var obj = {
     'somekey' : 'Hello World, it works!'
   }
   res.render('second_template', obj);
});

//third_template is rendered with parameters as well
router.get('/third', function(req,res){
   var obj = {
       'message' : 'Thanks for waiting',
       'delay_time' : '3000'
   }
   res.render('third_template', obj);
});

//allows the user to see the stylesheet for the page
router.get('/something_styled', function(req, res) {
    var obj = {
    }
    res.render('style_template', obj);
});

//this renders a win-lose template based on an rng
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

//this renders a bulleted list on the page
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