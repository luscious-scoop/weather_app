import { apiController } from './apiFunctions.js';

export const screenController = () => {
  const main = document.querySelector('main');
  const input = document.querySelector('input[type="text"]');
  const searchBtn = document.querySelector('.search-btn');

  function render() {
    main.textContent = '';

    const card = document.createElement('div');
    card.classList.add('.card');

    const locationDiv = document.createElement('div');
    locationDiv.classList.add('location-div');

    const locationIcon = document.createElement('img');
    locationIcon.classList.add('location-icon');
    locationIcon.setAttribute('alt', 'location-icon');

    const location = document.createElement('p');
    location.classList.add('location');

    locationDiv.appendChild(locationIcon);
    locationDiv.appendChild(location);

    card.appendChild(locationDiv);

    const weatherDiv = document.createElement('div');

    weatherDiv.classList.add('weather-div');

    const weatherIcon = document.createElement('img');
    weatherIcon.setAttribute('alt', 'weather-icon');
    weatherIcon.classList.add('weather-icon');

    const temperatureDiv = document.createElement('div');
    temperatureDiv.classList.add('temp-div');

    const temperature = document.createElement('p');
    temperature.classList.add('temp');

    const feelsLikeTemp = document.createElement('p');
    feelsLikeTemp.classList('feels-like');

    temperatureDiv.appendChild(temperature);
    temperatureDiv.appendChild(feelsLikeTemp);

    weatherDiv.appendChild(weatherIcon);
    weatherDiv.appendChild(temperatureDiv);

    card.appendChild(weatherDiv);

    main.appendChild(card);
  }

  input.addEventListener('input', () => {
    if (input.value !== '') {
      searchBtn.disabled = false;
    } else {
      searchBtn.disabled = true;
    }
  });
};
