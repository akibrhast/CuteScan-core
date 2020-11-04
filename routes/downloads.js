const express = require("express");
const router = new express.Router();
const ExpressError = require("../expressError")

router.get('/api/download_single', (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'download_single'
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/api/download_multiple', (req, res, next) => {
    try {
        return res.status(201).json({
            message: 'download_multiple'
        });
    } catch (error) {
        console.error(error);
    }
});

router.get('/api/donwload_all', (req, res, next) => {
    try {
        
        return res.status(201).json({
            message: 'download_all'
        });
    } catch (error) {
        console.error(error);
    }
});

module.exports = router
