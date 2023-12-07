import './stylesheet.css';
import { format } from 'date-fns';

const appid = '8c6756b80aabdd4de605502eeb301ee9';

async function getWeatherByCoords(lat, lon, appid) {
    let response = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${appid}`, {
        mode: 'cors'
    });

    let weatherJSON = await response.json();
    console.log(weatherJSON);
}

// getWeatherByCoords('40.7128', '-74.0060', appid);

const searchWrapper = document.getElementById('search-wrapper');

const searchbox = document.createElement('input');
searchbox.type = 'text';
searchbox.id = 'searchbox';
searchWrapper.append(searchbox);

const searchBtn = document.createElement('button');
searchBtn.type = 'button';
searchBtn.innerText = 'Submit';
searchWrapper.append(searchBtn);

async function getWeatherByZip(zip, country, units, appid) {
    try {
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&units=${units}&appid=${appid}`, {
            mode: 'cors'
        });

        let weatherJSON = await weatherData.json();

        displayWeather(weatherJSON, units);
    }
    catch(error) {
        console.log(error);
    }
}

function displayWeather(weatherJSON, units) {
    const currentWeatherWrapper = document.getElementById('current-weather-wrapper');

    let tempUnits, windSpeedUnits;

    if (units == 'metric') {
        tempUnits = '&deg;C';
        windSpeedUnits = 'm/s';
    } else {
        tempUnits = '&deg;F';
        windSpeedUnits = 'mph';
    }

    displayDateTime(weatherJSON, currentWeatherWrapper);
    displayMainWeatherData(weatherJSON, currentWeatherWrapper, tempUnits)
    displayExtraWeatherData(weatherJSON, currentWeatherWrapper, tempUnits, windSpeedUnits)
}

function displayDateTime(weatherJSON, currentWeatherWrapper) {
    let unixDT = weatherJSON.dt;
    let [formattedDate, formattedTime] = convertDT(unixDT);
    
    const datetimeWrapper = document.createElement('div');

    const currentDate = document.createElement('div');
    currentDate.innerText = formattedDate;
    datetimeWrapper.appendChild(currentDate); 

    const currentTime = document.createElement('div');
    currentTime.innerText = formattedTime;
    datetimeWrapper.appendChild(currentTime); 

    currentWeatherWrapper.appendChild(datetimeWrapper);
}

function displayMainWeatherData(weatherJSON, currentWeatherWrapper, tempUnits) {
    const mainWeatherDataWrapper = document.createElement('div');

    const currentLocation = document.createElement('div');
    currentLocation.innerText = weatherJSON.name;
    mainWeatherDataWrapper.appendChild(currentLocation);

    const currentWeatherConditions = document.createElement('div');
    currentWeatherConditions.innerText = weatherJSON.weather[0].description;
    mainWeatherDataWrapper.appendChild(currentWeatherConditions);

    const currentTemp = document.createElement('div');
    currentTemp.innerHTML = `${weatherJSON.main.temp} ${tempUnits}`;
    mainWeatherDataWrapper.appendChild(currentTemp);

    const currentTempMax = document.createElement('div');
    currentTempMax.innerHTML = `H: ${weatherJSON.main.temp_max} ${tempUnits}`;
    mainWeatherDataWrapper.appendChild(currentTempMax);

    const currentTempMin = document.createElement('div');
    currentTempMin.innerHTML = `L: ${weatherJSON.main.temp_min} ${tempUnits}`;
    mainWeatherDataWrapper.appendChild(currentTempMin);

    currentWeatherWrapper.appendChild(mainWeatherDataWrapper);
}

function displayExtraWeatherData(weatherJSON, currentWeatherWrapper, tempUnits, windSpeedUnits) {
    const extraWeatherDataWrapper = document.createElement('ul');

    const currentTempFeelsLike = document.createElement('li');
    const currentTempFeelsLikeTitle = document.createElement('h4');
    currentTempFeelsLikeTitle.innerText = `Feels like:`;
    const currentTempFeelsLikeData = document.createElement('p');
    currentTempFeelsLikeData.innerHTML = `${weatherJSON.main.feels_like} ${tempUnits}`;
    currentTempFeelsLike.appendChild(currentTempFeelsLikeTitle);
    currentTempFeelsLike.appendChild(currentTempFeelsLikeData);
    extraWeatherDataWrapper.appendChild(currentTempFeelsLike);

    const currentHumidity = document.createElement('li');
    const currentHumidityTitle = document.createElement('h4');
    currentHumidityTitle.innerText = `Humidity:`;
    const currentHumidityData = document.createElement('p');
    currentHumidityData.innerHTML = `${weatherJSON.main.humidity}%`;
    currentHumidity.appendChild(currentHumidityTitle);
    currentHumidity.appendChild(currentHumidityData);
    extraWeatherDataWrapper.appendChild(currentHumidity);

    const currentWind = document.createElement('li');
    const currentWindTitle = document.createElement('h4');
    currentWindTitle.innerText = `Wind speed:`;
    const currentWindData = document.createElement('p');
    currentWindData.innerHTML = `${weatherJSON.wind.speed} ${windSpeedUnits}`;
    currentWind.appendChild(currentWindTitle);
    currentWind.appendChild(currentWindData);
    extraWeatherDataWrapper.appendChild(currentWind);

    currentWeatherWrapper.appendChild(extraWeatherDataWrapper);
}

getWeatherByZip('10280', 'US', 'metric', appid);

async function getForecastByZip(zip, country, appid) {
    try {
        let weatherData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},${country}&appid=${appid}`, {
            mode: 'cors'
        });

        let weatherJSON = await weatherData.json();
        console.log(weatherJSON);

    }
    catch(error) {
        console.log(error);
    }
}

function convertDT(unixDT) {
    let date = new Date(unixDT * 1000);
    let formattedDate = format(date, 'EEEE, LLLL do, yyyy');
    let formattedTime = format(date, 'h:m aaa');
    return [formattedDate, formattedTime];
}

// getForecastByZip('10280', 'US', appid);