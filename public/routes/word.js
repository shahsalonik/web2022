const express = require('express');
const router = express.Router()

const fs = require('fs')
const path = require('path')

var count = 0;

var all_words = fs.readFileSync(path.join('/site','public','data','enable.txt')).toString().split('\n')


router.get('/some_page',function(req,res){
    res.render('word')
})

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
    
    console.log("M:" + passM);
    
    var passA = passM.filter(function(elem) {
        return(elem.charAt(1) === input.charAt(1) || input.charAt(1) === "*");
    });
    
    console.log("A:" + passA);
    
    var passB = passA.filter(function(elem) {
        return(elem.charAt(2) === input.charAt(2) || input.charAt(2) === "*");
    });
    
    console.log("B:" + passB);
    
    var passC = passB.filter(function(elem) {
        return(elem.charAt(3) === input.charAt(3) || input.charAt(3) === "*");
    });
    
    console.log("C:" + passC);
    
    var passD = passC.filter(function(elem) {
        return(elem.charAt(4) === input.charAt(4) || input.charAt(4) === "*");
    });
    
    console.log("D:" + passD);
    
    var params = {
        'array' : passD,
    };
    console.log(params);
    res.json(params);

});


module.exports = router;