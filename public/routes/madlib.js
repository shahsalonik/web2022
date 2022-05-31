const express = require('express');
var router = express.Router();

//madlibs lab
router.get('/madlib_form', function(req,res){
   res.render('form_template');
 });

//this is what the form goes to after the user submits it on the 'form_template' package
//it saves all of their answers in a dictionary which it then uses in order to populate the page
router.post('/form_render', function(req,res){
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

module.exports = router;

