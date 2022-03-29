
const fs = require('fs')
const path = require('path')

var count = 0;

var req = {};
req.query = {};

req.query.word = "hellop"

var all_words = fs.readFileSync(path.join('/site','public','data','enable.txt')).toString().split('\n')

    var input;
    if ('word' in req.query) {
        input = req.query.word;
    } else {
        input = "";
    }
    
    var t = all_words.filter(function(elem){
        if(elem.charAt(count)===input) {
            
            return true;
        }
        else {
            return false;
        }
    })
    
    console.log(t)
    
    var params = {
        'word' : input,
        'indx' : all_words.indexOf(input),
    }
