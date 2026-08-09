export function convertTemperatureToCelsius(F) {
  const fahrenheit = F;
  const celsius = (fahrenheit - 32) * (5 / 9);

  const result = `${Math.floor(celsius)}°C`;
  return result;
}

export function convertTemperatureToFahrenheit(F) {
  const result = `${Math.floor(F)}°F`;
  return result;
}

export function convertKMHtoMPH(speed) {
  let result = `${Math.round(speed)}mph`;

  return result;
}

export function convertMPHToKMH(speed) {
  return `${Math.round(speed * 1.7)}km/h`;
}
