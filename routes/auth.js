const express = require("express");
const router = new express.Router();
const google_configs = require("../google_configs")


let authed = false;



router.get('/', (req, res, next) => {
    try {
        if (!authed) {
            res.render('index', {url:google_configs.auth_url});    
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
        
          google_configs.oAuth2Client.getToken(code, function (err, tokens) {
            if (err) {
              console.log("Error authenticating");
              console.log(err);
            } else {
              console.log("Successfully authenticated");
              google_configs.oAuth2Client.setCredentials(tokens);
              authed = true;
              res.redirect("/");
            }
          });
        }
   
    } catch (error) {
        console.error(error);
        }      
    });

module.exports = router;