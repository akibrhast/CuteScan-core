const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError")
const mult_config = require("../multerConfig")

router.post('/api/upload_single', mult_config.single("file"), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});

router.post('/api/upload_multiple', mult_config.array("file",10), (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'File uploded successfully'
        });
    } catch (error) {
        console.error(error);
    }
});


module.exports = router;