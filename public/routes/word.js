const express = require('express');
const router = express.Router()

const fs = require('fs')
const path = require('path')

var count = 0;

var all_words = fs.readFileSync(path.join('/site','public','data','enable.txt')).toString().split('\n')


router.get('/some_page',function(req,res){
    res.render('word')
})

router.get('/json_worker',function(req,res){
    
    count += 1;
    
    var params = {
        'hello' : 'world',
        'c' : count
    }
    res.json(params)
    
})

router.get('/enable',function(req,res){
    
    var input1, input2, input3, input4, input5;
    if ('ltr1' in req.query) {
        input1 = req.query.ltr1;
    } 
    if ('ltr2' in req.query) {
        input2 = req.query.ltr2;
    } 
    if ('ltr3' in req.query) {
        input3 = req.query.ltr3;
    } 
    if ('ltr4' in req.query) {
        input4 = req.query.ltr4;
    } 
    if ('ltr5' in req.query) {
        input5 = req.query.ltr5;
    } else {
        input = "";
    }
    
    
    var t1 = all_words.filter(function(elem){
        return(elem.charAt[0] === input1 || input1 === '');
    });
    
    //add multiple filters
    var t2 = t1.filter(function(elem) {
        return(elem.charAt[1] === input2 || input2 === '');
    });
    
    var t3 = t2.filter(function(elem) {
        return(elem.charAt[2] === input3 || input3 === '');
    });
    
    var t4 = t3.filter(function(elem) {
        return(elem.charAt[3] === input4 || input4 === '');
    });
    
    var t5 = t4.filter(function(elem) {
        return(elem.charAt[4] === input5 || input5 === '');
    });
    
    console.log(t5)
    
    var params = {
        'ltr1' : input1,
        'ltr2' : input2,
        'ltr3' : input3,
        'ltr4' : input4,
        'ltr5' : input5,
        'array' : t5,
    };

    res.json(params);

});


module.exports = router;