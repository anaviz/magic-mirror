
//----------------------------------
// DATE
//----------------------------------

var timeEl = $("#date-time .time");
var dateEl = $("#date-time .date");

var dateTimeRenderInterval = 10000; // 10s

var renderDateTime = function () {
  var timeText = moment().format("HH:mm");
  var dateText = moment().format("dddd, Do MMMM");

  timeEl.text(timeText);
  dateEl.text(dateText);

  setTimeout(renderDateTime, dateTimeRenderInterval);
};

renderDateTime();


//----------------------------------
// WEATHER
//----------------------------------

var weatherIconEl = $("#weather .weather-icon i");
var weatherTempEl = $("#weather .weather-temperature");
var weatherCurrentSummaryEl = $("#weather .weather-current-summary");
var weatherSummaryEl = $("#weather .weather-summary");

var weatherPollInterval = 300000; // 5 min
var weatherReqOptions = {
  url: "/get-weather",
  global: false,
  dataType: "json",
  contentType: "application/json"
};

var weatherIconClassnames = {
  "clear-day": "wi-forecast-io-clear-day",
  "clear-night": "wi-forecast-io-clear-night",
  "rain": "wi-forecast-io-rain",
  "snow": "wi-forecast-io-snow",
  "sleet": "wi-forecast-io-sleet",
  "wind": "wi-forecast-io-wind",
  "fog": "wi-forecast-io-fog",
  "cloudy": "wi-forecast-io-cloudy",
  "partly-cloudy-day": "wi-forecast-io-partly-cloudy-day",
  "partly-cloudy-night": "wi-forecast-io-partly-cloudy-night",
  "hail": "wi-forecast-io-hail",
  "thunderstorm": "wi-forecast-io-thunderstorm",
  "tornado": "wi-forecast-io-tornado"
};

var onWeatherReqSuccess = function (data) {
  var currentSummaryText = data.currently && data.currently.summary ? data.currently.summary : "";
  var summaryText = data.hourly && data.hourly.summary ? data.hourly.summary : "";
  var currentTemp = data.currently && data.currently.temperature ? data.currently.temperature : 500;
  var weatherIconName = data.currently && data.currently.icon ? data.currently.icon : "";
  var weatherIconClass = weatherIconClassnames[weatherIconName] || "";

  weatherCurrentSummaryEl.text(currentSummaryText);
  weatherSummaryEl.text(summaryText);
  weatherTempEl.text(Math.round(currentTemp) + " °C");
  weatherIconEl.attr("class", "wi " + weatherIconClass);
};

var getWeather = function () {
  var weatherReq = $.ajax(weatherReqOptions);
  weatherReq.done(onWeatherReqSuccess);

  setTimeout(getWeather, weatherPollInterval);
};

getWeather();
