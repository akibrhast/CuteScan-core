const express = require('express');
const ExpressError = require("./expressError")
const dataRoutes = require("./dataRoutes")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', express.static(__dirname + '/public')); 


app.use("/", dataRoutes);


app.use(function (req, res, next) {
    const notFoundError = new ExpressError("Not Found", 404);
    return next(notFoundError)
});


app.use(function(err, req, res, next) {
    let status = err.status || 500;
    let message = err.message;
  
    return res.status(status).json({
      error: {message, status}
    });
  });

  

module.exports = app;