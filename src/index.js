import "./stylesheet.css";

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

async function getWeatherByZip(zip, country, appid) {
    try {
        let locationData = await fetch(`https://api.openweathermap.org/data/2.5/weather?zip=${zip},${country}&appid=${appid}`, {
            mode: 'cors'
        });

        let locationJSON = await locationData.json();
        console.log(locationJSON.name);
        console.log(locationJSON.main.temp_max);
        console.log(locationJSON.main.temp_min);
        console.log(locationJSON.weather[0].main);
        console.log(locationJSON.weather[0].description);
    }
    catch(error) {
        console.log(error);
    }
}


async function getForecastByZip(zip, country, appid) {
    try {
        let locationData = await fetch(`https://api.openweathermap.org/data/2.5/forecast?zip=${zip},${country}&appid=${appid}`, {
            mode: 'cors'
        });

        let locationJSON = await locationData.json();
        console.log(locationJSON);

    }
    catch(error) {
        console.log(error);
    }
}

getWeatherByZip('10280', 'US', appid);
getForecastByZip('10280', 'US', appid);