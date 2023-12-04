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
        let locationData = await fetch(`http://api.openweathermap.org/geo/1.0/zip?zip=${zip},${country}&appid=${appid}`, {
            mode: 'cors'
        });

        let locationJSON = await locationData.json();
        console.log(locationJSON);

        getWeatherByCoords(await locationJSON.lat, await locationJSON.lon, appid);

    }
    catch(err) {
        console.log(err);
    }
}

getWeatherByZip('10280', 'US', appid);