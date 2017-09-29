//stores Open Weather API data and endpoints
$.getScript('/openWeatherKey.js', function() {
  var OW = {
  apiKey: openWeatherAPIKey, // loade from openWeatherKey.js
  apiLocationBase: ' https://cors-anywhere.herokuapp.com/http://api.openweathermap.org/data/2.5/weather',
  apiIconBase: 'http://openweathermap.org/img/w/'
}
  
});

var tempScale = 'C'; //used to determine current temperature scale, switches between C and F
var weather; //stores API data

//convert from Kelvin(format of API) to Celsius
function getCelsius(kelvinTemp) {
  var celsius = kelvinTemp - 273.15;
  return Math.round((celsius + 0.00001) * 10) / 10;
}

// convert from Celsius to Fahrenheit
function CtoF(celsiusTemp) {
  return Math.round(((1.8 * celsiusTemp + 32)+0.00001)*10)/10;
}

// return and hex color depending on temperature (in celsius)
function getTempColor(temp) {
  var colors = ['#FE4646', '#FEA034', '#FEDF77', '#347EFE', '#2356FE'];
  var color;
  switch(true) {
      case(temp <= 0):
        color = colors[4];
        break;
      case(temp > 0 && temp <= 10):
        color = colors[3];
        break;
      case(temp > 10 && temp <= 20):
        color = colors[2];
        break;
      case(temp > 20 && temp <= 30):
        color = colors[1];
        break;
      case(temp > 30):
        color = colors[0];
        break;
      default:
        color = '#f5f5f5';
  }
  return color;
}

// fill DOM elements with data after API call
function displayData(weather){
  $('#currT').text(weather.main.temp);
  $('#maxT').text(weather.main.temp_max);
  $('#minT').text(weather.main.temp_min);
  $('#place').text(weather.name);
  $('#mainI').attr('title', weather.weather[0].main);
  $('#mainI').attr('alt', weather.weather[0].main);
  $('#mainI').attr('src', OW.apiIconBase + weather.weather[0].icon + '.png');
  $('#descrW').text(weather.weather[0].description);
  $('#clouds').text(weather.clouds.all);
  $('#wind').text(weather.wind.speed);
  $('#hum').text(weather.main.humidity);
  $('#press').text(weather.main.pressure);
  $('.panel-heading').css('background-color', getTempColor(weather.main.temp));
}


$(document).ready(function() {

  // event trigger for switching temperature scale
  $('#switchTemp').on('click', function() {
    if(tempScale === 'C') {
      $('#currT').text(CtoF(weather.main.temp));
      $('#maxT').text(CtoF(weather.main.temp_min));
      $('#minT').text(CtoF(weather.main.temp_max));
      tempScale = 'F';
      $('#switchTemp').text(tempScale);
    } else {
      $('#currT').text(weather.main.temp);
      $('#maxT').text(weather.main.temp_min);
      $('#minT').text(weather.main.temp_max);
      tempScale = 'C';
      $('#switchTemp').text(tempScale);
     }
  });

  //get geolocation through browser service, if available
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(function(position) {
      //store latitude and longitude with 2 decimal precision
      var pos = {
        lat: Math.round((position.coords.latitude + 0.00001) * 100) / 100,
        lon: Math.round((position.coords.longitude + 0.00001) * 100) / 100
      }
      //build Open Weather API call with coordinates
      var OWCall = OW.apiLocationBase + '?lat=' + pos.lat + '&lon=' + pos.lon + '&appid=' + OW.apiKey;
      //AJAX cal to Open Weather API
      $.getJSON(OWCall)
        .done(function(data) {
          weather = data;
          $('#location').text(weather.name + ', ' + weather.sys.country);
          // convert temp from kelvin to celsius 
          weather.main.temp = getCelsius(weather.main.temp);
          weather.main.temp_min = getCelsius(weather.main.temp_min);
          weather.main.temp_max = getCelsius(weather.main.temp_max);
          displayData(weather); //updates DOM elements
        }).fail(function(data) {
          alert('Unable to retrieve data');
        });
    });
  } else {
    alert('Your browser does not support geolocation.');
  }  
});
