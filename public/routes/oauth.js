const express = require('express');
const router = express.Router();

const {  AuthorizationCode } = require('simple-oauth2');

const https = require('https');
    

// Here we create an oauth2 variable that we will use to manage out OAUTH operations

// -------------- BEGIN OAUTH CONFIG STUFF -------------- //

//
//  PARAMATERS FROM ION
//  YOU GET THESE PARAMETERS BY REGISTERING AN APP HERE: https://ion.tjhsst.edu/oauth/applications/

var ion_client_id = 'i7RB0RdrOh3fmhMBOfZ2O6q3Tzi0DcW33REQRvIh';
var ion_client_secret = 'BXWYiufbCGJd2aD9Mab20GpkE8iIpfdXIkKVL2756n3aIMGF8SvNczb5xElViFb7WaxPbYW2Yp64fI8rftuYsQGgQmzr1LIWuv5PY5isLjnkDS8z9p4Il7W3mjFUnbSf';
var ion_redirect_uri = 'https://user.tjhsst.edu/2023sshah/oauth/ion_oauth_login_processor';    //    <<== you choose this one

// Instantiate oauth2 class instance as a variable that we will use to manage out OAUTH operations

var client = new AuthorizationCode({
  client: {
    id: ion_client_id,
    secret: ion_client_secret,
  },
  auth: {
    tokenHost: 'https://ion.tjhsst.edu/oauth/',
    authorizePath: 'https://ion.tjhsst.edu/oauth/authorize',
    tokenPath: 'https://ion.tjhsst.edu/oauth/token/'
  }
});

// This is the link that will be used later on for logging in. This URL takes
// you to the ION server and asks if you are willing to give read permission to ION.

var authorizationUri = client.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});

console.log(authorizationUri)

// -------------- END OAUTH CONFIG STUFF -------------- //



router.get('/oauth', function (req, res) {

    if ('authenticated' in req.session) {
		// the cookie is present
		if (req.session.authenticated === true) {
			// the user has authenticated
	        
			// send them a verified page and stop
	        return res.render('verified')

	    }
    } 

    // if we've made it here, they are unverified
    res.render('unverified', {'login_link' : authorizationUri})

});


router.get('/logout', function (req, res) {
    
    //remove traces of the authentication process
    delete req.session.authenticated;
    delete req.session.token;
    res.redirect('https://user.tjhsst.edu/2023sshah/oauth/oauth');

});


router.get('/ion_oauth_login_processor', async function(req, res) { 

	// ----- CODE CREATED PASSED BY ION (OAUTH) IN A GET PARAMETER -----
    var theCode = req.query.code;

	// ----- req.query.code FROM ION GETS BUNDLED UP INTO AN OBJECT -----
    var options = {
        'code': theCode,
        'redirect_uri': ion_redirect_uri,
        'scope': 'read'
     };
    
	// ----- PARAMTERS PASSED BACK TO ION AS YOUR APP 'LOGS IN'  -----

    // needs to be in try/catch
    try {
        var accessToken = await client.getToken(options);      // await serializes asyncronous fcn call 
        res.locals.token = accessToken.token;
    } 
    catch (error) {
        console.log('Access Token Error', error.message);
        res.send(502); // error creating token
    }


	// ----- CONFIGURE SOME STUFF IN THE COOKIE TO SHOW THEY ARE LOGGED IN  -----

    req.session.authenticated = true;
    req.session.token = res.locals.token;
    
    res.redirect('https://user.tjhsst.edu/2023sshah/oauth/oauth');
    
});

router.get('/my_ion_info', function(req,res){

    var access_token = req.session.token.access_token;
    var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;
    
    https.get(profile_url, function(response) {
    
      var rawData = '';
      response.on('data', function(chunk) {
          rawData += chunk;
      });
    
      response.on('end', function() {
        var profile = JSON.parse(rawData);
        console.log(profile);
        
        var params = {
            'first_name' : profile.first_name,
            'full_name' : profile.full_name,
            'username' : profile.ion_username,
            'img_link' : profile.picture,
            'counselor' : profile.counselor.full_name,
        }
        console.log(params);
        res.render('profile', params)
        
      });
    
    }).on('error', function(err) {
        console.log('error', err.message);
        res.send(502); // error 
    });

})

function retrieveIonId(req,res,next) {

    var access_token = req.session.token.access_token;
    var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;
    
    https.get(profile_url, function(response) {
    
      var rawData = '';
      response.on('data', function(chunk) {
          rawData += chunk;
      });
    
      response.on('end', function() {
        var profile = JSON.parse(rawData);

        var id, ion_username, display_name, user_type, admin;
        ({id, ion_username, display_name, user_type} = profile);

        admin = false;
        if (user_type=='teacher'){
            admin = true;
        }

        req.session.id = id;
        
        var sql    = 'INSERT INTO users (id, ion_username, display_name, nickname, admin) VALUES (?, ?, ?, ?, ?) ON DUPLICATE KEY UPDATE id=id;';
        var params = [id, ion_username, display_name, nickname, admin];
        res.app.locals.pool.query(sql, params, function(error, results, fields){
            if (error) throw error;
            next(); 
        });
      });
    
    }).on('error', function(err) {
        next(err)
    });

}

module.exports = router;