const weatherContainerEl = document.querySelector("#weather-container");
const forecastContainerEl = document.querySelector("#forecast-container");
const pastSearchContainerEl = document.querySelector("#previous-city-search");
const citySearchTerm = document.querySelector("#city-search-term");
const citySearchBtn = document.querySelector("#search-button");
const cityInputEl = document.querySelector("#cityName");

// Global Variables
coordObj = {};
forecastObj = {};

// city search function
var citySearchHandler = function(event) {
    event.preventDefault();
    var cityName = cityInputEl.value.trim();

    if (cityName) {
        getCurrentWeatherByCity(cityName);
        cityInputEl.value = "";
    } else {
        alert("Please enter a City!");
    }
    get5DayForecastByCity(cityName);
};

  // Fetch to Current Weather API
var getCurrentWeatherByCity = function(cityName) {
    // fomat the OpenWeather api url
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" 
                    + cityName + 
                    "&appid=116af814ffcc819f9393605c81b75556";

    fetch(apiUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            coordObj.name = data.name
            coordObj.date = moment().format('(M/D/YYYY)')
            coordObj.icon = data.weather[0].icon
            coordObj.temp = Math.trunc(((((data.main.temp)-273.15))*1.8)+32);
            coordObj.hum = data.main.humidity
            coordObj.windspeed = data.wind.speed
            coordObj.uvIndex = data.uvIndex
            console.log(coordObj)
            displayCurrentWeather(coordObj);
        })
};
  // Display Current Weather Function
function displayCurrentWeather(coordObj) {

    //populate current weather results
    let innerHTML ='';
    innerHTML += `
    <div class="card-content">
        <p><h3>${coordObj.name} ${coordObj.date} <img src="https://openweathermap.org/img/wn/${coordObj.icon}.png"></h3></p>
        <p>Temperature: ${coordObj.temp} &deg F</p>
        <p>Humidity: ${coordObj.hum}%</p>
        <p>Wind Speed: ${coordObj.windspeed} MPH</p>
        <p>UV Index: ${coordObj.uvIndex}</p>
    </div>
    `;
    weatherContainerEl.innerHTML = innerHTML;
}

  // Fetch to 5 day forecast API
function get5DayForecastByCity(cityName) {
    var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q="
                    + cityName + 
                    "&appid=116af814ffcc819f9393605c81b75556";
    fetch(apiUrl)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            // grab forecast dates
            forecastObj.dayOnedate = moment(data.list[3].dt_txt).format('M/D/YYYY');
            forecastObj.dayTwodate = moment(data.list[11].dt_txt).format('M/D/YYYY');
            forecastObj.dayThreedate = moment(data.list[19].dt_txt).format('M/D/YYYY');
            forecastObj.dayFourdate = moment(data.list[27].dt_txt).format('M/D/YYYY');
            forecastObj.dayFivedate = moment(data.list[35].dt_txt).format('M/D/YYYY');
            // grab weather icon
            forecastObj.dayOneicon = data.list[3].weather[0].icon;
            forecastObj.dayTwoicon = data.list[11].weather[0].icon;
            forecastObj.dayThreeicon = data.list[19].weather[0].icon;
            forecastObj.dayFouricon = data.list[27].weather[0].icon;
            forecastObj.dayFiveicon = data.list[35].weather[0].icon;
            // grab temp and humidity for next 5 days
            forecastObj.dayOneTemp = Math.trunc(((((data.list[3].main.temp)-273.15))*1.8)+32);
            forecastObj.dayOneHum = data.list[3].main.humidity
            forecastObj.dayTwoTemp = Math.trunc(((((data.list[11].main.temp)-273.15))*1.8)+32);
            forecastObj.dayTwoHum = data.list[11].main.humidity
            forecastObj.dayThreeTemp = Math.trunc(((((data.list[19].main.temp)-273.15))*1.8)+32);
            forecastObj.dayThreeHum = data.list[19].main.humidity
            forecastObj.dayFourTemp = Math.trunc(((((data.list[27].main.temp)-273.15))*1.8)+32);
            forecastObj.dayFourHum = data.list[27].main.humidity
            forecastObj.dayFiveTemp = Math.trunc(((((data.list[35].main.temp)-273.15))*1.8)+32);
            forecastObj.dayFiveHum = data.list[35].main.humidity
            console.log(forecastObj)
            displayWeatherForecast(forecastObj);
        })
};

function displayWeatherForecast(forecastObj) {
    
    // populate 5day forecast cards
    let innerHTML = '';
    innerHTML += `
    <div class="cards">
        <div class="card forecast-card">
            <div class="forecast-data">
                <p>${forecastObj.dayOnedate}</p>
                <img  src="https://openweathermap.org/img/wn/${forecastObj.dayOneicon}.png">
                <p>Temp: ${forecastObj.dayOneTemp} &deg F</p>
                <p>Humidity: ${forecastObj.dayOneHum}%</p>
            </div>
        </div>
        <div class="card forecast-card">
            <div class="forecast-data">
                <p>${forecastObj.dayTwodate}</p>
                <img  src="https://openweathermap.org/img/wn/${forecastObj.dayTwoicon}.png">
                <p>Temp: ${forecastObj.dayTwoTemp} &deg F</p>
                <p>Humidity: ${forecastObj.dayTwoHum}%</p>
            </div>
        </div>
        <div class="card forecast-card">
            <div class="forecast-data">
                <p>${forecastObj.dayThreedate}</p>
                <img  src="https://openweathermap.org/img/wn/${forecastObj.dayThreeicon}.png">
                <p>Temp: ${forecastObj.dayThreeTemp} &deg F</p>
                <p>Humidity: ${forecastObj.dayThreeHum}%</p>
            </div>
        </div>
        <div class="card forecast-card">
            <div class="forecast-data">
                <p>${forecastObj.dayFourdate}</p>
                <img  src="https://openweathermap.org/img/wn/${forecastObj.dayFouricon}.png">
                <p>Temp: ${forecastObj.dayFourTemp} &deg F</p>
                <p>Humidity: ${forecastObj.dayFourHum}%</p>
            </div>
        </div>
        <div class="card forecast-card">
            <div class="forecast-data">
                <p>${forecastObj.dayFivedate}</p>
                <img  src="https://openweathermap.org/img/wn/${forecastObj.dayFiveicon}.png">
                <p>Temp: ${forecastObj.dayFiveTemp} &deg F</p>
                <p>Humidity: ${forecastObj.dayFiveHum}%</p>
            </div>
        </div>
    </div>
    `;
    forecastContainerEl.innerHTML = innerHTML;
};

// add searched cities to previous search container



citySearchBtn.addEventListener('click', citySearchHandler);