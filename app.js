const express = require('express');
const ExpressError = require("./expressError")
const uploads = require("./routes/uploads")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", uploads);


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