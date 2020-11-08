const express = require('express');
const router = new express.Router();

const fs = require("fs");
const formidable = require('formidable');
const form = formidable({ multiples: true });
const google_configs = require("../google_configs")


// Don't forgot to make folder uploads in main folder, otherwise you will get an error

router.post("/api/upload_single", (req, res) => {

  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    const fileMetadata = {name: files.file.name};
    const media = {
      mimeType: files.file.type,
      body: fs.createReadStream(files.file.path),
    };
    google_configs.drive.files.create(
      {
        resource: fileMetadata,
        media: media,
        fields: "id"
      },
      (err, x) => {
        if (err) {
          console.error(err);
        } else {
          res.render("success",{success:true})
        }

      }
    );
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