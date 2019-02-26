/* eslint-disable linebreak-style */
/* eslint-disable no-undef */
/* eslint-disable no-console */
const APPID = 'e33262cd6a432b1c3dc5181a736dbc41';
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APPID}&lang=ru&q=`;
const WEATHER_DETAILS_FIVE_DAYS = `http://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=${APPID}&lang=ru&q=`;
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
const historicalReview = {
    init: function () {
        this.getWeatherDetails(defaultCity, this.render, WEATHER_DETAILS_ENDPOINT);
        this.getWeatherDetails(defaultCity, this.renderhistoricalReview, WEATHER_DETAILS_FIVE_DAYS);
        const searchField = document.getElementById('search-field');
        searchField.addEventListener('change', (event) => {
            const city = event.target.value;
            this.getWeatherDetails(city, this.render, WEATHER_DETAILS_ENDPOINT);
            this.getWeatherDetails(city, this.renderhistoricalReview, WEATHER_DETAILS_FIVE_DAYS);
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
    render(data) {
        const city = data.name;
        const country = data.sys.country;
        document.getElementById('location').innerHTML = `${city}, ${country}`;
    },
    renderhistoricalReview(data) {
        let averageMax = document.querySelector('.chessboard-mid-max'),
            averageMin = document.querySelector('.chessboard-mid-min'),
            recordAverageMax = document.querySelector('.chessboard-record-max'),
            recordAverageMin = document.querySelector('.chessboard-record-min'),
            mid = '',
            max = '',
            recordMax = '',
            recordMin = '',
            weekForecast = data.list.slice(1, 7);
        for (let i = 0; i < weekForecast.length; i++) {

            maxTemp = weekForecast[i].main.temp_max;
            minTemp = weekForecast[i].main.temp_min;

            mid += `<span class="average_maximum grey_square">${Math.floor(minTemp)}&#176C</span>
            <span class="average_maximum">${Math.floor(minTemp)}&#176C</span>`;

            max += `<span class="average_minimum">${Math.ceil(maxTemp)}&#176C</span>
            <span class="average_minimum grey_square">${Math.ceil(maxTemp)}&#176C</span>`;

            recordMax += `<span class="record_maximum grey_square">${Math.floor(minTemp)}&#176C</span>
            <span class="record_maximum">${Math.floor(minTemp)}&#176C</span>`;

            recordMin += `<span class="average_minimum">${Math.ceil(maxTemp)}&#176C</span>
            <span class="average_minimum grey_square">${Math.ceil(maxTemp)}&#176C</span>`;
        }
        averageMax.innerHTML = mid;
        averageMin.innerHTML = max;
        recordAverageMax.innerHTML = recordMax;
        recordAverageMin.innerHTML = recordMin;
    }
};
historicalReview.init();