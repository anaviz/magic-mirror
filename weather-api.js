'use strict';
var req = require('request');

class WeatherApi {
  constructor(apiToken) {
    this.apiToken = apiToken;
    this.long = null;
    this.lat = null;
  }

  setLocation(long, lat) {
    this.long = long ? long : null;
    this.lat = lat ? lat : null;
  }

  get(long, lat) {
    if (long && lat) {
      this.setLocation(long, lat);
    }

    return new Promise(function (resolve, reject) {
      if(!this.lat || !this.long) {
        reject("Request not sent. ERROR: Longitute or Latitude is missing");
      }

      req({
        url: "https://api.darksky.net/forecast/" + this.apiToken + "/" + this.lat + "," + this.long + "?units=si",
        json: true
      }, function (err, res, body) {
        if (err || res.statusCode !== 200) {
          reject("Forecast cannot be retrieved.");
        } else {
          resolve(body);
        }
      }.bind(this));
    }.bind(this));
  }
}

module.exports = WeatherApi;
