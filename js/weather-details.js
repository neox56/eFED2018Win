function buttonClick(k) {
  showButtons(buttonItem = k);
}

var buttonItem = 1;
showButtons(buttonItem);


function showButtons(k) {
  var buttons = document.getElementsByClassName("myButtons");
  if (k > buttons.length) {
    buttonItem = 1
  }
  if (k < 1) {
    buttonItem = button.length
  }
  for (i = 0; i < buttons.length; i++) {
    buttons[i].style.display = "none";
  }
  buttons[buttonItem - 1].style.display = "block";
}


const APPID = "e33262cd6a432b1c3dc5181a736dbc41";
const WEATHER_DETAILS_ENDPOINT = `http://api.openweathermap.org/data/2.5/weather?units=metric&APPID=${APPID}&lang=ru&q=`;
const AIR_POLLUTIONS_DETAILS = `http://api.openweathermap.org/pollution/v1/co/53,21/current.json?appid=${APPID}`;
const WEATHER_DETAILS_FIVE_DAYS = `http://api.openweathermap.org/data/2.5/forecast?&units=metric&appid=${APPID}&lang=ru&q=`;
const defaultCity = "Izhevsk";


const page = {
  init: function () {
    this.getWeatherDetails(defaultCity, this.render, WEATHER_DETAILS_ENDPOINT);
    this.getPollution(defaultCity, this.renderPollution, AIR_POLLUTIONS_DETAILS);
    this.getWeatherDetails(defaultCity, this.renderfiveDays, WEATHER_DETAILS_FIVE_DAYS);
    const searchField = document.getElementById("search-field");
    searchField.addEventListener("change", (event) => {
      const city = event.target.value;
      this.getWeatherDetails(city, this.render, WEATHER_DETAILS_ENDPOINT);
      this.getWeatherDetails(city, this.renderfiveDays, WEATHER_DETAILS_FIVE_DAYS);
      this.getPollution(defaultCity, this.renderPollution, AIR_POLLUTIONS_DETAILS);
    });
  },

  getWeatherDetails(city, callback, WEATHER_DETAILS_ENDPOINT) {
    const url = `${WEATHER_DETAILS_ENDPOINT}${city}`;
    const xhr = new XMLHttpRequest();

    xhr.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(xhr.responseText));
        callback(JSON.parse(xhr.responseText));
      }
    }

    xhr.open("GET", url, true); //настройка запроса
    xhr.send(); // инициализация соединения; метод открывает соединение и отправляет запрос на сервер.
  },
  getPollution(city, callback, AIR_POLLUTIONS_DETAILS) {
    const url = `${AIR_POLLUTIONS_DETAILS}`;
    const xhr = new XMLHttpRequest();
    xhr.onload = function () {
      if (this.readyState === 4 && this.status === 200) {
        console.log(JSON.parse(xhr.responseText));
        callback(JSON.parse(xhr.responseText));
      }
    };
    xhr.open('GET', url, true);
    xhr.send();
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
    document.getElementById('weatherImg').src = `http://openweathermap.org/img/w/${weatherImg}.png`;
    document.getElementById('current_temperature').innerHTML = `${currentTemperature}&#176C`;
    document.getElementById('humidity').innerHTML = ` Влажность: ${humidity}%`;
    document.getElementById('wind').innerHTML = `Ветер: ${windSpeed} м/с`;
    document.getElementById('precipitation').innerHTML = `Вероятность осадков: ${precipitation}%`;

  },
  renderPollution(data) {
    const airPollution = Math.random(data.value) * 10 + 'e-8';
    document.getElementById('air-pollution').innerHTML = `Загрязнение воздуха: ${airPollution}`;
  },

  renderfiveDays(data) {
    let dayWeek = document.querySelector(".container-days"),
      number = "",
      weekForecast = data.list.filter(item => item.dt_txt.indexOf('18:00:00') > -1);
    for (let i = 0; i < weekForecast.length; i++) {
      let date = weekForecast[i].dt_txt;
      icon = weekForecast[i].weather[0].icon;
      typeWeather = weekForecast[i].weather[0].description;
      maxTemp = weekForecast[i].main.temp_max;
      minTemp = weekForecast[i].main.temp_min;
      number += `<section class="container-days">
                        <span>${getDayName(date)}</span>
                        <figure>
                            <img src="http://openweathermap.org/img/w/${icon}.png">
                        </figure>
                        <figcaption>
                            <span id="maxTemp">${maxTemp.toFixed()}°</span>
                            <span id="minTemp">${minTemp.toFixed()}°</span>
                        </figcaption>
                    </section>`
    }
    dayWeek.innerHTML = number;
  }
};
page.init();


function getDayName(date) {
  let dayName = "";
  date = new Date(date);
  switch (date.getDay()) {
    case 1:
      dayName = "Пн";
      break;
    case 2:
      dayName = "Вт";
      break;
    case 3:
      dayName = "Ср";
      break;
    case 4:
      dayName = "Чт";
      break;
    case 5:
      dayName = "Пт";
      break;
  }
  return dayName;
}
