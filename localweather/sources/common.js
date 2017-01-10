var APPID = "a458bdf2741cec87ac936ef8ec168bc3";

$(document).ready(function() {

  getData();
  
  $(".js_changeScale").click(changeScale);
  
});

function getData() {
  $.getJSON("https://geoip-db.com/json/geoip.php?jsonp=?").done (function(location) {
    // location = {
    //   "city":"Rio de Janeiro",
    //   "latitude":-22.90,
    //   "longitude":-43.19,
    // };
    // location = {
    //   "city":"Minneapolis",
    //   "latitude":44.9733,
    //   "longitude":-93.2323,
    // };
    // location = {
    //   "city":"Lima",
    //   "latitude":-12.03,
    //   "longitude":-77.02,
    // };
    
    if (!location) {
      $(".js_error").text("Could not get your location");
      return false;
    }
    
    if (location.city) {
      $(".js_city").text(location.city);
    } else {
      $(".js_error").text("Could not get your city");
    }
    
    if (location.latitude && location.longitude) {
      $(".js_lat").text(location.latitude);
      $(".js_lon").text(location.longitude);
      getDegree(location.latitude, location.longitude);
    } else {
      $(".js_error").text("Could not get your coordinates");
    }
  });
}

function getDegree(lat, lon) {
  var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon +"&units=metric&APPID=" + APPID;
  
  $.getJSON(url, updateWeather).fail(function(jqxhr, textStatus, error) {
    $(".js_error").text("Could not get weather for your location. [" + textStatus + ", " + error + "]");
  });
}

function changeScale() {
  var nextScale = $(this).text();
  var newScale = "Celsius";
  var newScaleLetter = "F";
  var currentValue = $(".js_degree").text();
  var newDegree = currentValue * 1.8 + 32;
  
  if (nextScale === newScale)  {
    newScale = "Fahrenheit";
    newScaleLetter = "C";
    newDegree = (currentValue - 32) / 1.8;
  }
  
  $(this).text(newScale);
  $(".js_scaleShort").text(newScaleLetter);
  $(".js_degree").text(Math.round(newDegree));
}

function updateWeather(data) { 
  if (data && data.main.temp) {
    $(".js_degree").text(Math.round(data.main.temp));
    updateIcon(data.weather[0].id);
  } else {
    $(".js_error").text("Could not get weather for your location");
  }
}

function updateIcon(code) {
  var icon = "#";

  // Details http://openweathermap.org/weather-conditions
  switch (code)  {
    case 200:
    case 201:
    case 202:
    case 210:
    case 211:
    case 212:
    case 221:
    case 230:
    case 231:
    case 232:
      icon += "thunderstorm";
      break;
    case 300:
    case 301:
    case 302:
    case 310:
    case 311:
    case 312:
    case 313:
    case 314:
    case 321:
      icon += "drizzle";
      break;
    case 500:
    case 501:
    case 502:
    case 503:
    case 504:
      icon += "rain";
      break;
    case 511:
    case 520:
    case 521:
    case 522:
    case 531:
      icon += "snow-rain";
      break;
    case 600:
    case 601:
    case 602:
    case 611:
    case 612:
    case 615:
    case 616:
    case 620:
    case 621:
    case 622:
      icon += "snow";
      break;
    case 800:
      icon += "clear";
      break;
     case 801:
      icon += "few-clouds";
      break;
     case 802:
      icon += "clouds";
      break;
     case 803:
     case 804:
      icon += "broken-clouds";
      break;
  }
  
  $(".js_icon").attr("xlink:href", icon);
}