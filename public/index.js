#!/usr/bin/nodejs

// -------------- load packages -------------- //
// INITIALIZATION STUFF

console.log('hello world')

var express = require('express')
var app = express();

var hbs = require('hbs')
app.set('view engine','hbs')

app.use(express.static('static_files'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/it_works',function(req,res){
   console.log('someone is landing on my page');
   res.render('works_template');
 });
 
 app.get('/second', function(req,res){
   var obj = {
     'somekey' : 'Hello World, it works!'
   }
   res.render('second_template', obj);
});

app.get('/third', function(req,res){
   var obj = {
       'message' : 'Thanks for waiting',
       'delay_time' : '3000'
   }
   res.render('third_template', obj);
});

app.get('/something_styled', function(req, res) {
    var obj = {
    }
    res.render('style_template', obj);
});

app.get('/chance', function(req, res) {
    
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
    
})

app.get('/list_render', function(req,res){
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

//madlibs lab
app.get('/madlib_form', function(req,res){
   res.render('form_template');
 });

app.post('/form_render', function(req,res){
   console.log(req.body);
   var render_dict = {
       'noun' : req.body.noun
   }
   render_dict['adjective'] = req.body.adjective;
   render_dict['person'] = req.body.person;
   
   if(req.body["verb-list"] == 10) {
       render_dict['verb'] = "running";
   }
   else if (req.body["verb-list"] == 11) {
       render_dict['verb'] = "flying";
   }
   else if (req.body["verb-list"] == 12) {
       render_dict['verb'] = "swimming";
   }
   else {
       render_dict['verb'] = "walking";
   }
   
   if(req.body["picture-selection"] == 1) {
       render_dict['location'] = "tree";
       render_dict['location_url'] = "img/tree.jpg";
   }
   else if (req.body["picture-selection"] == 2) {
       render_dict['location'] = "lake";
       render_dict['location_url'] = "img/lake.jpg";
   }
   else if (req.body["picture-selection"] == 3) {
       render_dict['location'] = "mountain";
       render_dict['location_url'] = "img/mountain.jpg";
   }
   else {
       render_dict['location'] = "park";
       render_dict['location_url'] = "img/tree.jpg";
   }
   
   res.render('madlib', render_dict);
});



// -------------- listener -------------- //
// // The listener is what keeps node 'alive.' 

var listener = app.listen(process.env.PORT || 8080, process.env.HOST || "0.0.0.0", function() {
    console.log("Express server started");
});
