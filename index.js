
var weatherTokenApi = "token";

var express = require("express");
var app = express();
var server = require("http").createServer(app);
// var io = require("socket.io")(server);
var cache = require("memory-cache");

var WeatherApi = require("./weather-api");
var weather = new WeatherApi(weatherTokenApi);
var weatherCacheKey = "weather-data";

var clientAppDir = __dirname + "/client-app";
var PORT = 3001;

//----------------------------------
// WEATHER
//----------------------------------

var weatherPollInterval = 300000; // 5 min
var longOslo = 10.7522;
var latOslo = 59.9139;

var onWeatherReqSuccess = function (data) {
  cache.put(weatherCacheKey, data)
};

var getWeather = function () {
  weather.setLocation(longOslo, latOslo);
  weather.get().then(onWeatherReqSuccess);

  setTimeout(getWeather, weatherPollInterval);
};

getWeather();

//----------------------------------
// CLIENT REQUESTS
//----------------------------------

app.use(express.static(clientAppDir));

app.get( "/", function( req, res ){
  res.sendFile(clientAppDir + "/index.html");
});

app.get( "/get-weather" , function( req, res ) {
  var weatherData = cache.get(weatherCacheKey) || {};
  res.json(weatherData);
});

//----------------------------------
// SOCKETS
//----------------------------------

// io.on("connection", function (socket) {
//
//     socket.on("join", function (data) {
//
//     });
// });

//----------------------------------
// START SERVER
//----------------------------------

server.listen(PORT);
console.log("Server started on port " + PORT );
