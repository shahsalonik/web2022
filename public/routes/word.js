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
    
    var input;
    if ('word' in req.query) {
        input = req.query.word;
    } else {
        input = "";
    }
    
    var t = all_words.filter(function(elem){
        if(elem.charAt(count)===input) {
            console.log(input)
            count++
            return true;
        }
        else {
            return false;
        }
    })
    
    var params = {
        'word' : input,
        'indx' : all_words.indexOf(input),
    }

    res.json(params)
})


module.exports = router;