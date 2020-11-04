const ocrSpaceApi = require('ocr-space-api');
 
var options =  { 
    apikey: process.env.OCR_API_KEY,
    language: 'eng', // Português
    imageFormat: 'image/png', // Image Type (Only png ou gif is acceptable at the moment i wrote this)
    isOverlayRequired: true
  };
 
// Image file to upload
// const imageFilePath = "r_1.png";
 
// Run and wait the result
ocrSpaceApi.parseImageFromLocalFile(imageFilePath, options)
  .then(function (parsedResult) {
    console.log(parsedResult)

  }).catch(function (err) {
    console.log('ERROR:', err);
  });

module.exports = ocrSpaceApi