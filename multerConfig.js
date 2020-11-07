const path = require("path")
const multer = require("multer");

let Storage = multer.diskStorage({
    destination: function (req, file, callback) {
      callback(null, "./uploads");
    },
    filename: function (req, file, callback) {
      callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    },
  });
  
  let upload = multer({
    storage: Storage,
  }).single("file"); 

module.exports = upload;