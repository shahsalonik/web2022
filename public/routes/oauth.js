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
// you to the Ion server and asks if you are willing to give read permission to Ion.

var authorizationUri = client.authorizeURL({
    scope: "read",
    redirect_uri: ion_redirect_uri
});

console.log(authorizationUri);

//renders the oauth page which is where it allows the user to log in
//renders the verified template after they log in
router.get('/oauth', function(req, res) {
    
    if('authenticated' in req.session) {
        if(req.session.authenticated === true) {
            var access_token = req.session.token.access_token;
            var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token=' + access_token;
            
            https.get(profile_url, function(response) {
                var rawData = '';
                response.on('data', function(chunk) {
                    rawData += chunk;
                });
                
                response.on('end', function() {
                var profile = JSON.parse(rawData);
                res.locals.profile = profile;
                
                var id, ion_username, display_name, user_type, admin;
                ({id, ion_username, display_name, user_type} = profile);
                
                admin = false;
                if(user_type == 'teacher') {
                    admin = true;
                }

                var sql = 'INSERT INTO users(id, nickname) VALUES (?, ?) ON DUPLICATE KEY UPDATE nickname = nickname;';
                var params = [profile.id, profile.first_name];
                res.app.locals.pool.query(sql, params, function(error, results, fields) {
                    if(error) throw error;
                });
                });
            }).on('error', function(err) {
                next(err);
            });
            
            return res.render('verified');
            
        }
        
    }
    else {
        res.render('unverified', {'login_link' : authorizationUri});
    }
    
});

//this route is used with the Ion OAuth page
//the info is redirected here after they authenticate 
//redirects them to the oauth homepage
router.get('/ion_oauth_login_processor', async function(req, res) {
    var theCode = req.query.code;
    
    var options = {
        'code': theCode,
        'redirect_uri' : ion_redirect_uri,
        'scope': 'read',
    };
    
    try {
        var accessToken = await client.getToken(options);
        res.locals.token = accessToken.token;
    }
    catch(error) {
        console.log('Access Token Error', error.message);
        res.send(502);
    }
    
    req.session.authenticated = true;
    req.session.token = res.locals.token;
    
    res.redirect('https://user.tjhsst.edu/2023sshah/oauth/oauth');
    
});

//allows the user to set their own nickname on the page through a form
//enters it into a sql table so that it is stored and retrieved when they log in
router.get('/nickname', function(req, res) {
    const {nickname} = req.query;
    var access_token = req.session.token.access_token;
    var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;
    
    https.get(profile_url, function(response) {
        var rawData = '';
        response.on('data', function(chunk) {
            rawData += chunk;
        });
        
        response.on('end', function() {
            var profile = JSON.parse(rawData);
            
            var sql = 'INSERT INTO users(id, nickname) VALUES (?, ?) ON DUPLICATE KEY UPDATE nickname = ?;';
            var params = [profile.id, nickname, nickname];
            res.app.locals.pool.query(sql, params, function(error, results, fields) {
                if (error) throw error;
            });
            res.redirect('https://user.tjhsst.edu/2023sshah/oauth/my_ion_info');
        }).on('error', function(err) {
            console.log('error', err.message);
            res.send(502);
        });
        
    });
});

//this is the actual profile page
//gets info from the Ion api
//populates the page with that info
router.get('/my_ion_info', function(req, res) {
    var access_token = req.session.token.access_token;
    var profile_url = 'https://ion.tjhsst.edu/api/profile?format=json&access_token='+access_token;
    
    https.get(profile_url, function(response) {
        var rawData = '';
        response.on('data', function(chunk) {
            rawData += chunk;
        });
    
        response.on('end', function() {
            var profile = JSON.parse(rawData);
            var sql = "SELECT nickname FROM users WHERE id = ?;";
            var params = [profile.id];
            res.app.locals.pool.query(sql, params, function(error,results,fields){
                if (error) throw error;
                var render_dict = {
                    'first_name' : profile.first_name,
                    'full_name' : profile.full_name,
                    'username' : profile.ion_username,
                    'nickname' : results[0]['nickname'],
                    'img_link' : profile.picture,
                    'counselor' : profile.counselor.full_name,
                };
                res.render('profile', render_dict);
            });
        }).on('error', function(err) {
            console.log('error', err.message);
            res.send(502);
        });
        
    });
    
});

//allows the user to log out
router.get('/logout', function(req, res) {
    delete req.session.authenticated;
    delete req.session.token;
    res.redirect('https://user.tjhsst.edu/2023sshah');
});


module.exports = router;