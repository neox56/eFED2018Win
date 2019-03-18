/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const APPID = 'e33262cd6a432b1c3dc5181a736dbc41';
const WEATHER_DETAILS_ENDPOINT = `https://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APPID}&lang=ru&q=`;
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
const fiveDays = {
    init: function () {
        this.getWeatherDetails(defaultCity, this.render);
        this.getWeatherDetails(defaultCity, this.renderSunMoon);
        this.getfiveDaysForecast(defaultCity, this.renderWindPrecipitation);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render);
            this.getWeatherDetails(city, this.renderSunMoon);
            this.getfiveDaysForecast(city, this.renderWindPrecipitation);
        });
    },

    getWeatherDetails(city, callback, ) {
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
    getfiveDaysForecast(city, callback, ) {
        const url = `${WEATHER_DETAILS_FIVE_DAYS}${city}`;
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
        const city = data.name;
        const country = data.sys.country;
        const currentTemperature = Math.round(data.main.temp);
        const weatherImg = data.weather[0].icon;
        document.getElementById('location').innerHTML = `${city}, ${country}`;
        document.getElementById('weatherImg').src = `http://openweathermap.org/img/w/${weatherImg}.png`;
        document.getElementById('current_temperature').innerHTML = `${currentTemperature}&#176C`;
    },

    renderSunMoon(data) {
        const sunrise = new Date(data.sys.sunrise * 1000);
        const sunset = new Date(data.sys.sunset * 1000);
        const currentDay = new Date(data.dt * 1000).toLocaleString('RU', {
            weekday: 'long',
            day: 'numeric',
            month: 'long'
        });
        const timestr = sunrise.toLocaleTimeString();
        const timeSun = sunset.toLocaleTimeString();
        const lengthHours = Math.floor((sunset - sunrise) / (3600 * 1000));
        const lengthMinutes = Math.floor((sunset - sunrise) / (60 * 1000) - lengthHours * 60);
        document.querySelector('.day_length').textContent = 'Долгота дня - ' + lengthHours + ' ч ' + lengthMinutes + ' мин ';
        document.querySelector('.sunrise').textContent = 'Восход - ' + timestr;
        document.querySelector('.sunset').textContent = 'Заход - ' + timeSun;
        document.querySelector('.sunriseMoon').textContent = 'Восход - ' + timeSun;
        document.querySelector('.sunsetMoon').textContent = 'Заход - ' + timestr;
        document.querySelector('.calendar_day').textContent = currentDay + ',сегодня ';
    },

    renderWindPrecipitation(data) {
        let dayWindSpeed = document.querySelector('.wind_speed_value'),
            dayPrecipitation = document.querySelector('.rainfall_value'),
            windValue = '',
            precipitationValue = '',
            weekForecast = data.list.slice(0, 5);
        for (let i = 0; i < weekForecast.length; i++) {
            windSpeed = weekForecast[i].wind.speed;
            precipitationData = weekForecast[i].clouds.all / 10;
            windValue += `<p>
              <span class="square"><mark>${windSpeed.toFixed()}</mark></span>
              <span class="square"><mark>${windSpeed.toFixed()}</mark></span>
              <span class="square"><mark>${Math.floor(windSpeed)}</mark></span>
              <span class="square"><mark>${Math.floor(windSpeed)}</mark></span>
              </p>`;
            precipitationValue += `<p>
            <span>${precipitationData}</span>
            <span>${precipitationData}</span>
            <span class="chart_small">${precipitationData}</span>
            <span class="chart_big">${precipitationData}</span>
          </p>`;
        }
        dayWindSpeed.innerHTML = windValue;
        dayPrecipitation.innerHTML = precipitationValue;
    }
};

fiveDays.init();