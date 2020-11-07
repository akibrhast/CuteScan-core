const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError")

const {google} = require('googleapis');

const OAuth2Data = require('../credentials.json');

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const OAuth2Client = new google.auth.OAuth2(
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
);

let authed = false;

const SCOPES =
  'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile';

router.get('/', (req, res, next) => {
    try {
        if (!authed) {
            let url = OAuth2Client.generateAuthUrl({
              access_type: 'offline',
              scope: SCOPES,
            //   prompt: 'consent'
            });
            res.render('index', {url:url});    
        }
        else {  
            // let oauth2 = google.oauth2({
            //     auth: OAuth2Client,
            //     version: "v2",
            //   });
            //   oauth2.userinfo.get(function (err, response) {
            //     if (err) {
            //         const authError = new ExpressError("Error with Authenticating", 400);
            //         return next(authError)
            //     } else {
                  res.render("success", {
                    success:false
                  })
            //     };
            //   });
        };
    } catch (error) {
    console.error(error);
    }      
});


router.get('/verified', (req, res, next) => {
    try {
        const code = req.query.code

        if (code) {
            let tokens;
            OAuth2Client.getToken(code,function(err,tokens) {
                
                if (err) {
                    const authError = new ExpressError("Error with Authenticating", 400);
                    return next(authError)
                }
                else {
                    console.log(tokens)
                    // console.log(tokens.refresh_token, "ME")
                    OAuth2Client.setCredentials = {
                    
                        refresh_token: 'your_refresh_token'
                    };
                    OAuth2Client.refreshAccessToken(function(err, tokens){
                    console.log(tokens)
                    OAuth2Client.setCredentials = {access_token : tokens.access_token}
                    callback(OAuth2Client);
                    })

                    authed = true

                    res.redirect('/')
                }
            });
        };   
    } catch (error) {
        console.error(error);
        }      
    });

module.exports = OAuth2Client;
module.exports = router;
