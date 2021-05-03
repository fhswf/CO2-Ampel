let createError = require('http-errors');
let express = require('express');
let path = require('path');
let logger = require('morgan');

const config = require("./config")

let app = express();

const {InfluxDB} = require('@influxdata/influxdb-client')

// You can generate a Token from the "Tokens Tab" in the UI

const token = config.influxToken;
const org = config.influxOrg;
const bucket = config.influxBucket;

const client = new InfluxDB({url: config.influxUrl, token: token});

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Interface for fetching the C02 Data.
 */
app.get("/api/data", (req, res) => {
  const queryApi = client.getQueryApi(org);

  // Start Time, if not defined use 1 hour earlier
  let start = (req.query.start) ? req.query.start : "-1h";
  // End Time, if not defined use now
  let end = (req.query.end) ? req.query.end : "now()";
  // Limit amount of data
  let limit = (req.query.limit) ? parseInt(req.query.limit) : 200;
  // Which Host to use
  let influxHost = req.query.host;

  if(!influxHost) {
    res.sendStatus(400);
  } else {
    let results = {};

    // Define query
    const query = `from(bucket: "${bucket}") |> range(start: ${start}, stop: ${end}) |> filter(fn: (r) => r.host == "${influxHost}")`
    queryApi.queryRows(query, {
      next(row, tableMeta) {
        const o = tableMeta.toObject(row);

        if(!(o._time in results)){
          results[o._time] = {};
        }
        // Save results to given time and field.
        results[o._time][o._field] = o._value
      },
      error(error) {
        console.error(error)
        res.sendStatus(500);
      },
      complete() {
        // Change Data format into a array with following objects: (timestamp: value, c02: value, humidity: value, temp: value)
        let returnData = [];

        for(let key in results){
          returnData.push(Object.assign({timestamp: key}, results[key]));
        }

        returnData.sort((a, b) => (a.timestamp < b.timestamp) ? 1 : -1);

        res.send(returnData.slice(0, limit));
      },
    })
  }
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
