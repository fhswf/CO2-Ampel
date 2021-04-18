let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');

let mockValues = 30;

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.get("/api/data", (req, res) => {
  let timestampValues = [];
  let co2values = [];
  let tempvalues = [];
  let humidityvalues = [];

  for(let i = 0; i < mockValues; i++){
    co2values.push(Math.floor(Math.random() * 3500));
    tempvalues.push(Math.floor((Math.random() * 100) - 50));
    humidityvalues.push(Math.floor(Math.random() * 100));
    timestampValues.push(new Date().getTime());
  }
  res.status(200).send({
    "timestamp": timestampValues,
    "co2": co2values,
    "temp": tempvalues,
    "humidity": humidityvalues
  });
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
