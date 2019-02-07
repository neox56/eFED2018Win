/* eslint-disable no-console */
const APPID = 'e33262cd6a432b1c3dc5181a736dbc41';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APPID}&q=`;
const defaultCity = 'Izhevsk';

const fiveDays = {
    init: function () {
        this.getWeatherDetails(defaultCity, this.render);

        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render);
        });
    },

    getWeatherDetails(city, callback) {
        const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;
        const xhr = new XMLHttpRequest();

        xhr.onload = function () {
            if (this.readyState === 4 && this.status === 200) {
                console.log(JSON.parse(xhr.responseText));
                callback(JSON.parse(xhr.responseText));
            }
        };

        xhr.open('GET', url, true); //настройка запроса
        xhr.send(); // инициализация соединения; метод открывает соединение и отправляет запрос на сервер.
    },

    render(data) {

        //const date = new Date();
        const city = data.name;
        const country = data.sys.country;
        const currentTemperature = Math.round(data.main.temp);
        const weatherImg = data.weather[0].icon;
        //const humidity = data.main.humidity;
        //const windSpeed = data.wind.speed;
        //const weatherTypes = data.weather[0].description;
        //const precipitation = Math.round(data.precipitation )/ 1000;



        document.getElementById('location').innerHTML = `${city}, ${country}`;

        //document.getElementById('weather_types').innerHTML = `${weatherTypes}`;
        document.getElementById('weatherImg').src = `http://openweathermap.org/img/w/${weatherImg}.png`;
        document.getElementById('current_temperature').innerHTML = `${currentTemperature}&#176C`;
        //document.getElementById('humidity').innerHTML = ` Влажность: ${humidity}%`;
        //document.getElementById('wind').innerHTML = `Ветер: ${windSpeed}м/с`;
        //document.getElementById('precipitation').innerHTML = `${precipitation}`;

    }
};

fiveDays.init();