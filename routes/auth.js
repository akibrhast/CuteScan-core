const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError")

const {google} = require('googleapis');
const OAuth2Data = require('../credentials.json');

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID, CLIENT_SECRET, REDIRECT_URI
);

let authed = false;

const SCOPES =
  'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/userinfo.profile';

router.get('/', (req, res, next) => {
    try {
        if (!authed) {
            let url = oAuth2Client.generateAuthUrl({
              access_type: 'offline',
              scope: SCOPES,
            });
            res.render('index', {url:url});    
        }
        else {  
              res.render("success", {
                success:false
              })
        };
    } catch (error) {
    console.error(error);
    }      
});


router.get('/verified', (req, res, next) => {
    try {
        const code = req.query.code
        if (code) {
          // Get an access token based on our OAuth code
          oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
              console.log("Error authenticating");
              console.log(err);
            } else {
              console.log("Successfully authenticated");
              oAuth2Client.setCredentials(tokens);
              
      
              authed = true;
              res.redirect("/");
            }
          });
        }
   
    } catch (error) {
        console.error(error);
        }      
    });

module.exports = {
  router:router,
  oAuth2Client:oAuth2Client
}