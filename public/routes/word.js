const express = require('express');
const router = express.Router()

const fs = require('fs')
const path = require('path')

var count = 0;

//word list
var all_words = fs.readFileSync(path.join('/site','public','data','enable.txt')).toString().split('\n')

//renders the word page
router.get('/some_page',function(req,res){
    res.render('word')
})

//1st pass: takes out all words > length 5
router.get('/enable',function(req,res){
    
    var input = req.query.word;
    
    console.log("Word: " + input);

    var pass = all_words.filter(function(elem) {
        return elem.length == 5;
    });
    
    //5 word array
    console.log(pass);

    var passM = pass.filter(function(elem) {
        return(elem.charAt(0) === input.charAt(0) || input.charAt(0) === "*");
    });
    
    var passA = passM.filter(function(elem) {
        return(elem.charAt(1) === input.charAt(1) || input.charAt(1) === "*");
    });
    
    var passB = passA.filter(function(elem) {
        return(elem.charAt(2) === input.charAt(2) || input.charAt(2) === "*");
    });
    
    var passC = passB.filter(function(elem) {
        return(elem.charAt(3) === input.charAt(3) || input.charAt(3) === "*");
    });
    
    var passD = passC.filter(function(elem) {
        return(elem.charAt(4) === input.charAt(4) || input.charAt(4) === "*");
    });
    
    var params = {
        'array' : passD,
    };
    console.log(params);
    res.json(params);

});


module.exports = router;