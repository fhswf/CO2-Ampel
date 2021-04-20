let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');

let mockValues = 30;

let app = express();

const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI
const token = '5FSHhpDzos6J2kxBFGyRO0AdThOWtidRajrpjxUE6zdl-zOb_dfWd6vDS4M3sC2yiRNu5dsfsV1Dwzx6hYfTgA=='
const org = 'fhswf'
const bucket = 'timeseries'

const client = new InfluxDB({url: 'http://localhost:8086', token: token})

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
