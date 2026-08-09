import { apiController } from './apiFunctions.js';
import locationIconSrc from './icons/location.png';
import umbrellaIcon from './icons/umbrella.png';
import uvIcon from './icons/uv-index.png';
import windIconSrc from './icons/wind.png';

import humidityIconSrc from './icons/drop.png';
import {
  convertKMHtoMPH,
  convertTemperatureToCelsius,
  convertMPHToKMH,
  convertTemperatureToFahrenheit,
} from './utils.js';

export const screenController = () => {
  const main = document.querySelector('main');
  const input = document.querySelector('input[type="text"]');
  const searchBtn = document.querySelector('.search-btn');

  async function render(data) {
    main.textContent = '';

    const card = document.createElement('div');
    card.classList.add('card');

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location-div');

    const locationIcon = document.createElement('img');
    locationIcon.classList.add('location-icon');
    locationIcon.setAttribute('alt', 'location-icon');
    locationIcon.src = `${locationIconSrc}`;

    const location = document.createElement('p');
    location.classList.add('location');
    location.textContent = `${data.address.slice(0, 1).toUpperCase() + data.address.slice(1)}`;

    locationDiv.appendChild(locationIcon);
    locationDiv.appendChild(location);

    card.appendChild(locationDiv);

    const weatherDiv = document.createElement('div');

    weatherDiv.classList.add('weather-div');

    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('alt', 'weather-icon');
    weatherIcon.classList.add('weather-icon');
    const response = await import(`./icons/weather_icons/${data.icon}.png`);
    const src = await response.default;
    weatherIcon.src = src;

    const temperatureDiv = document.createElement('div');
    temperatureDiv.classList.add('temp-div');

    const temperature = document.createElement('h2');
    temperature.classList.add('temp');

    temperature.textContent = convertTemperatureToCelsius(data.temp);

    const feelsLikeTemp = document.createElement('p');
    feelsLikeTemp.classList.add('feels-like');
    feelsLikeTemp.textContent = `Feels like ${convertTemperatureToCelsius(data.feelsLike)}`;

    temperatureDiv.appendChild(temperature);
    temperatureDiv.appendChild(feelsLikeTemp);

    const convertTempBtns = document.createElement('div');
    convertTempBtns.classList.add('convert-btns');

    const celsiusBtn = document.createElement('button');
    celsiusBtn.textContent = `°C`;
    celsiusBtn.classList.add('celsius-btn');
    celsiusBtn.classList.add('temp-btn');

    const fahrenheitBtn = document.createElement('button');
    fahrenheitBtn.textContent = '°F';
    fahrenheitBtn.classList.add('fahrenheit-btn');
    fahrenheitBtn.classList.add('temp-btn');

    const separator = document.createElement('p');
    separator.textContent = '│';
    separator.classList.add('separator');

    convertTempBtns.appendChild(celsiusBtn);
    convertTempBtns.appendChild(separator);
    convertTempBtns.appendChild(fahrenheitBtn);

    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(temperatureDiv);
    weatherDiv.appendChild(convertTempBtns);

    card.appendChild(weatherDiv);

    const descriptionDiv = document.createElement('div');
    descriptionDiv.classList.add('description-div');
    const condition = document.createElement('h3');
    condition.classList.add('condition');
    condition.textContent = data.condition;

    const description = document.createElement('p');
    description.classList.add('description');
    description.textContent = data.description;

    descriptionDiv.appendChild(condition);
    descriptionDiv.appendChild(description);

    card.appendChild(descriptionDiv);

    const metricDataDiv = document.createElement('div');
    metricDataDiv.classList.add('metric-data');

    const precipationDiv = document.createElement('div');
    const precipationIcon = document.createElement('img');

    precipationIcon.src = umbrellaIcon;

    const precipationValue = document.createElement('p');
    precipationValue.textContent = `${data.precip}%`;

    const precipationTitle = document.createElement('span');
    precipationTitle.textContent = 'Precip';

    precipationDiv.appendChild(precipationIcon);
    precipationDiv.appendChild(precipationValue);
    precipationDiv.appendChild(precipationTitle);

    metricDataDiv.appendChild(precipationDiv);

    const uvIndexDiv = document.createElement('div');
    const uvIndexIcon = document.createElement('img');

    uvIndexIcon.src = uvIcon;

    const uvValue = document.createElement('p');
    uvValue.textContent = data.uvindex;

    const uvTitle = document.createElement('span');
    uvTitle.textContent = 'UV Index';

    uvIndexDiv.appendChild(uvIndexIcon);
    uvIndexDiv.appendChild(uvValue);
    uvIndexDiv.appendChild(uvTitle);

    metricDataDiv.appendChild(uvIndexDiv);

    const windDiv = document.createElement('div');
    const windIcon = document.createElement('img');

    windIcon.src = windIconSrc;

    const windValue = document.createElement('p');
    windValue.textContent = convertMPHToKMH(data.wind);
    windValue.classList.add('wind');

    const windTitle = document.createElement('span');
    windTitle.textContent = 'Wind';

    windDiv.appendChild(windIcon);
    windDiv.appendChild(windValue);
    windDiv.appendChild(windTitle);

    metricDataDiv.appendChild(windDiv);

    const humidityDiv = document.createElement('div');
    const humidityIcon = document.createElement('img');

    humidityIcon.src = humidityIconSrc;

    const humidityValue = document.createElement('p');
    humidityValue.textContent = `${Math.trunc(data.humidity)}%`;

    const humidityTitle = document.createElement('span');
    humidityTitle.textContent = 'Humidity';

    humidityDiv.appendChild(humidityIcon);
    humidityDiv.appendChild(humidityValue);
    humidityDiv.appendChild(humidityTitle);

    metricDataDiv.appendChild(humidityDiv);

    card.appendChild(metricDataDiv);

    main.appendChild(card);
    ConverterEvent(data.temp, data.feelsLike, data.wind);
  }

  async function renderCardEvent() {
    if (input.value === '') {
      alert('Please enter  a location.');
      return;
    }
    let data = await apiController.fetchApiData(input.value);
    if (!data) {
      return;
    }
    render(data);
  }

  function ConverterEvent(temperature, feelsLikeTemp, wind) {
    const temp = document.querySelector('.temp');
    const feelsLike = document.querySelector('.feels-like');
    const windValue = document.querySelector('.wind');

    const celsiusBtn = document.querySelector('.celsius-btn');
    const fahrenheitBtn = document.querySelector('.fahrenheit-btn');

    celsiusBtn.addEventListener('click', () => {
      temp.textContent = convertTemperatureToCelsius(temperature);
      feelsLike.textContent = `Feels like ${convertTemperatureToCelsius(feelsLikeTemp)}`;
      windValue.textContent = convertMPHToKMH(wind);
    });

    fahrenheitBtn.addEventListener('click', () => {
      temp.textContent = convertTemperatureToFahrenheit(temperature);
      feelsLike.textContent = `Feels like ${convertTemperatureToFahrenheit(feelsLikeTemp)}`;
      windValue.textContent = convertKMHtoMPH(wind);
    });

    changeSelectedUnit();
  }

  function changeSelectedUnit() {
    const unitBtns = document.querySelectorAll('.temp-btn');
    document.querySelector('.celsius-btn').classList.add('selected');

    unitBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        document.querySelector('.selected').classList.remove('selected');
        btn.classList.add('selected');
      });
    });
  }

  searchBtn.addEventListener('click', () => {
    renderCardEvent();
  });
};
