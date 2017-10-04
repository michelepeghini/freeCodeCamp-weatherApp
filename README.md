# freeCodeCamp: Random Quote Machine

This is a widget developed for the freeCodeCamp Front End Certificate. It uses Open Weather API to display local weather information.

## Getting started

This is a stand alone single page app, all external libraries needed are either included as files on the repo or via CDN with the exception of the **Open WeatherMap API Key**.

### Open WeatherMap API Key
The `index.html` links to a script called `openWeatherKey.js` which is *gitignored* and should look like this:

```javascript
var openWeatherAPIKey = 'xxxxxxxxxxxxxxxxxxxxxx';
```
You can get a Basic API Key, with max 60 queries per hour and no subscription fees [here](https://openweathermap.org/price)

## Requirements

* Build a CodePen.io app that is functionally similar to [this](http://codepen.io/FreeCodeCamp/full/bELRjV)
* **User Story:** I can see the weather in my current location
* **User Story:** I can see a different icon or background image (e.g. snowy mountain, hot desert) depending on the weather.
* **User Story:** I can push a button to toggle between Fahrenheit and Celsius.

## Features

**Fulfillment of Requirements:**
* Get Location from browser and queries OpenWeatherMapAPI to get local weather info
* Update color of header depending on temperature. 5 steps: < 0, from >=0  to <10, from >=10 to <20, from >=20 to <30, >=30
* "C / F" button switches between Celsius and Fahrenheit degrees

**Extra features:**
* Shows minimum and maximum temperature aside of current
* Shows cloud percentage, wind speed, humidity percentage and pressure in panel footer

## Screenshots

Desktop view, with Celsius degrees and yellow header(temperature between 10 and 20 degrees Celsius)

![Weather App Celsius](/weather-app-celsius.png "Weather App Celsius")

Mobile view, with Fahrenheit degrees and light blue header(temperature between 32 and 50 degrees Fahrenheit)

![Weather App Fahrenheit](/weather-app-fahrenheit.png "Weather App Fahrenheit")

## APIs / Libraries used

* [Open Weather Map API](https://openweathermap.org/api)
* [Weather Icons by Eric Flowers](https://erikflowers.github.io/weather-icons/)
* jQuery 3.2.1
* Bootstrap 3.3.7 CSS

## Licence 

This work is licensed under a [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](http://creativecommons.org/licenses/by-nc-sa/4.0/)
![Creative Commons License](https://i.creativecommons.org/l/by-nc-sa/4.0/88x31.png "Creative Commons License")
