const express = require('express');
const router = new express.Router();
const ExpressError = require('../expressError');
const mult_config = require('../multerConfig');
const multer = require("multer");
const fs = require("fs");
const {google} = require('googleapis');

const OAuth2Data = require('../credentials.json');

const CLIENT_ID = OAuth2Data.web.client_id;
const CLIENT_SECRET = OAuth2Data.web.client_secret;
const REDIRECT_URI = OAuth2Data.web.redirect_uris[0];

const auth = require('./auth')

// Don't forgot to make folder uploads in main folder, otherwise you will get an error

router.post("/api/upload_single", (req, res) => {
    mult_config(req, res, function (err) {       
      if (err) {
        console.log(err);
        return res.end(err);
      } else {
        console.log(req.file.path);
        const drive = google.drive({ 
            version: "v3",
            auth: auth.oAuth2Client  
            });
        const fileMetadata = {
          name: req.file.filename,
        };
        const media = {
          mimeType: req.file.mimetype,
          body: fs.createReadStream(req.file.path),
        };
        drive.files.create(
          {
            resource: fileMetadata,
            media: media,
            fields: "id"
          },
          (err, file) => {
            if (err) {
              console.error(err);
            } else {
              fs.unlinkSync(req.file.path)
              res.render("success",{success:true})
            }
  
          }
        );
      }
    });
  });


// router.post('/api/upload_multiple', mult_config.array('file',10), (req, res, next) => {
//     try {
//         return res.status(201).json({
//             message: 'File uploded successfully'
//         });
//     } catch (error) {
//         console.error(error);
//     }
// });




module.exports = router;