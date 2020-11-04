const express = require('express');
const ExpressError = require("./expressError")
const upload_routes = require("./routes/uploads")
const download_routes = require("./routes/downloads")

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/", upload_routes);
app.use("/", download_routes);


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