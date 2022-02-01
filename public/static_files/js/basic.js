var count = 0;

var h = setInterval(function(){
    
    var s = document.getElementById('span_1');
    count++;
    s.innerHTML = count;
    
}, 100)