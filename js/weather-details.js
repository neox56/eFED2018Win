/* eslint-disable linebreak-style */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const APPID = 'e33262cd6a432b1c3dc5181a736dbc41';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APPID}&lang=ru&q=`;
const AIR_POLLUTIONS_DETAILS = `https://api.openweathermap.org/pollution/v1/co/53,21/current.json?appid=${APPID}`;
const WEATHER_DETAILS_FIVE_DAYS = `https://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=${APPID}&lang=ru&q=`;
const defaultCity = 'Izhevsk';
const spinner = document.getElementById('spinner');
const overlay = document.getElementById('overlay');
const content = document.querySelector('.content');


function showSpinner() {
    spinner.setAttribute('style', 'display: block;');
    overlay.setAttribute('style', 'display: block;');
    content.setAttribute('style', 'display: none;');
}

function hideSpinner() {
    setTimeout(() => {
        spinner.setAttribute('style', 'display: none;');
        overlay.setAttribute('style', 'display: none;');
        content.setAttribute('style', 'display: block;');
    }, 2000);

}
const page = {
    init: function () {
        this.getWeatherDetails(defaultCity, this.render, WEATHER_DETAILS_ENDPOINT);
        this.getPollution(this.renderPollution, AIR_POLLUTIONS_DETAILS);
        this.getWeatherDetails(defaultCity, this.renderfiveDays, WEATHER_DETAILS_FIVE_DAYS);
        this.getWeatherDetails(defaultCity, this.renderGrahps, WEATHER_DETAILS_FIVE_DAYS);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render, WEATHER_DETAILS_ENDPOINT);
            this.getWeatherDetails(city, this.renderfiveDays, WEATHER_DETAILS_FIVE_DAYS);
            this.getWeatherDetails(city, this.renderGrahps, WEATHER_DETAILS_FIVE_DAYS);
            this.getPollution(this.renderPollution, AIR_POLLUTIONS_DETAILS);
        });
    },

    getWeatherDetails(city, callback, WEATHER_DETAILS_ENDPOINT) {
        showSpinner();
        const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;
        fetch(url)
            .then(function (response) {
                hideSpinner();
                return Promise.all([response.status, response.json()]);
            })
            .then(function (result) {
                if (result[0] != 200) {
                    console.log('Ошибка');
                } else {
                    callback(result[1]);
                }
            }).catch(function (error) {
                console.log(error);
            });
       
    },
    getPollution(callback, AIR_POLLUTIONS_DETAILS) {
        const url = `${AIR_POLLUTIONS_DETAILS}`;
        fetch(url)
            .then(function (response) {
                return Promise.all([response.status, response.json()]);
            })
            .then(function (result) {
                if (result[0] != 200) {
                    console.log('Ошибка');
                } else {
                    callback(result[1]);
                }
            }).catch(function (error) {
                console.log(error);
            });
    },

    render(data) {
        const date = new Date();
        const city = data.name;
        const country = data.sys.country;
        const currentTemperature = Math.round(data.main.temp);
        const weatherImg = data.weather[0].icon;
        const humidity = data.main.humidity;
        const windSpeed = data.wind.speed;
        const weatherTypes = data.weather[0].description;
        const precipitation = data.clouds.all;

        document.getElementById('location').innerHTML = `${city}, ${country}`;
        document.getElementById('day_weeks').innerHTML = `${date.toLocaleString('ru', { weekday: 'long' })}`;
        document.getElementById('weather_types').innerHTML = `${weatherTypes}`;
        document.getElementById('weatherImg').src = `https://openweathermap.org/img/w/${weatherImg}.png`;
        document.getElementById('current_temperature').innerHTML = `${currentTemperature}&#176C`;
        document.getElementById('humidity').innerHTML = ` Влажность: ${humidity}%`;
        document.getElementById('wind').innerHTML = `Ветер: ${windSpeed.toFixed()} м/с`;
        document.getElementById('precipitation').innerHTML = `Вероятность осадков: ${precipitation}%`;

    },
    renderPollution(data) {
        const airPollution = Math.random(data.value) * 10 + 'e-8';
        document.getElementById('air-pollution').innerHTML = `Загрязнение воздуха: ${airPollution}`;
    },

    renderGrahps(data) {
        dayTemp = document.getElementsByClassName('temperature-block')[0],
        dayPrecipitation = document.getElementsByClassName('rainfall-block')[0],
        dayWind = document.getElementsByClassName('wind-block')[0],
        tempData = '',
        precipitationData = '';
        windData = '';
        Grahps = data.list.slice(0, 8);
        for (let i = 0; i < Grahps.length; i++) {
            temperature = Grahps[i].main.temp;
            precipitation = Grahps[i].clouds.all;
            wind = Grahps[i].wind.speed;
            tempData += ` <div class="temperature-level">
                           <div class="low-temperature"></div>
                           <span>${temperature.toFixed()}</span>
                           </div> `;
            precipitationData += `<div class="rainfall-level">
                                  <div class="high-rainfall"></div>
                                  <span>${precipitation}%</span>
                                  </div>`;
            windData += `<div class="wind-level">
                         <div class="wind-rotation-mid">
                         <img src="assets/wind.png" alt="wind-icon"></div>
                         <span>${wind.toFixed()} м/с</span>
                         </div>`;
        }
        dayTemp.innerHTML = tempData;
        dayPrecipitation.innerHTML = precipitationData;
        dayWind.innerHTML = windData;
    },


    renderfiveDays(data) {
        let dayWeek = document.querySelector('.container-days'),
            number = '',
            weekForecast = data.list.filter(item => item.dt_txt.indexOf('18:00:00') > -1);
        for (let i = 0; i < weekForecast.length; i++) {
            let date = new Date(weekForecast[i].dt * 1000).toLocaleString('ru-RU', {
                weekday: 'short'
            });
            icon = weekForecast[i].weather[0].icon;
            typeWeather = weekForecast[i].weather[0].description;
            maxTemp = weekForecast[i].main.temp_max;
            minTemp = weekForecast[i].main.temp_min;
            number += `<section class=" border container-days">
                        <span>${date}</span>
                        <figure>
                            <img src="https://openweathermap.org/img/w/${icon}.png">
                        </figure>
                        <figcaption>
                            <span id="maxTemp">${maxTemp.toFixed()}°</span>
                            <span id="minTemp">${minTemp.toFixed()}°</span>
                        </figcaption>
                    </section>`;
        }
        dayWeek.innerHTML = number;
    }
};
page.init();