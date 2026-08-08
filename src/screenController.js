import { apiController } from './apiFunctions.js';
import locationIconSrc from './icons/location.png';

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
    location.textContent = data.address;

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

    const temperature = document.createElement('p');
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
    const fahrenheitBtn = document.createElement('button');
    fahrenheitBtn.textContent = '°F';
    fahrenheitBtn.classList.add('fahrenheit-btn');

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

    main.appendChild(card);
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

  function convertTemperatureToCelsius(F) {
    const fahrenheit = F;
    const celsius = (fahrenheit - 32) * (5 / 9);

    const result = `${Math.floor(celsius)}°C`;
    return result;
  }

  searchBtn.addEventListener('click', () => {
    renderCardEvent();
  });
};
