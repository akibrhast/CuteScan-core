const express = require("express");
const router = new express.Router();
const ExpressError = require("./expressError")
const upload = require("./multerConfig")

// (Commented out as Drumline not sure if we need it or not)
// router.get('/', function (req, res) {
//     res.sendFile(__dirname + '/views/index.html');
// });

router.post('/upload', upload.single('image'), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;