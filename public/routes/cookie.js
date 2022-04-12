const express = require('express');
const router = express.Router()


router.get('/clickpage',function(req,res){
    
    var visits,clicks,loggedIn;
    
	// log the incoming cookies
	console.log( req.cookies )

	// has the clicks cookie been created?
	if (!('clicks' in req.cookies)) {
	    clicks = 0;
		res.cookie('clicks', 0)
	}  else {
	    clicks = Number(req.cookies.clicks);
	}

	// has the visits cookie been created?
	if (!('visits' in req.cookies)) {
		res.cookie('visits', 1)
	} else {
	    
	    if(visits <= 5) {
	        visits = Number(req.cookies.visits) + 1;
	    }
	    else {
	    }
	    res.cookie('visits', visits);
	}

    var params = {
        'clicks' : clicks,
        'visits' : visits
    }

	res.render('cookie',params)

	
})

module.exports = router;