const state = {
  city: 'Atlanta 🍑',
  temp: 75,
  unit: 'F',
};

const tempDisplay = document.getElementById('temp');
const cityInput = document.getElementById('city-input');
const cityName = document.getElementById('city-name');

// Wave 2 -- Altering Temperature

const displayTemp = () => {
  tempDisplay.textContent = `${state.temp}°${state.unit}`;
};

const raiseTemp = () => {
  state.temp += 1;
  displayTemp();
  updateTempDecor();
};

const lowerTemp = () => {
  state.temp -= 1;
  displayTemp();
  updateTempDecor();
};

const convertTemp = () => {
  if (state.unit === 'F') {
    state.temp = Math.floor((state.temp - 32) * (5 / 9));
    state.unit = 'C';
  } else if (state.unit === 'C') {
    state.temp = Math.floor(state.temp * (9 / 5) + 32);
    state.unit = 'F';
  }
  displayTemp();
};

const updateTempDecor = () => {
  const landscape = document.getElementById('landscape');
  if (
    (state.unit === 'F' && state.temp >= 80) ||
    (state.unit === 'C' && state.temp >= 27)
  ) {
    tempDisplay.className = 'red';
    landscape.className = 'hot';
  } else if (
    (state.unit === 'F' && state.temp >= 70 && state.temp < 80) ||
    (state.unit === 'C' && state.temp >= 21 && state.temp < 27)
  ) {
    tempDisplay.className = 'orange';
    landscape.className = 'warm';
  } else if (
    (state.unit === 'F' && state.temp >= 60 && state.temp < 70) ||
    (state.unit === 'C' && state.temp >= 16 && state.temp < 21)
  ) {
    tempDisplay.className = 'gold';
    landscape.className = 'cool';
  } else if (
    (state.unit === 'F' && state.temp >= 50 && state.temp < 60) ||
    (state.unit === 'C' && state.temp >= 10 && state.temp < 16)
  ) {
    tempDisplay.className = 'green';
    landscape.className = 'cool';
  } else {
    tempDisplay.className = 'lightblue';
    landscape.className = 'cold';
  }
};

// Wave 3 -- Updating City

const updateCity = () => {
  state.city = cityInput.value;
  cityName.textContent = state.city;
};

// Wave 4 -- Calling APIs

const getCurrentTemp = async () => {
  const locationData = await axios.get(
    `https://emily-weather-proxy-server.herokuapp.com/location?q=${state.city}`
  );
  const lat = locationData.data[0].lat;
  const lon = locationData.data[0].lon;
  getWeatherFromLocation(lat, lon);
};

const getWeatherFromLocation = async (lat, lon) => {
  const weatherData = await axios.get(
    `https://emily-weather-proxy-server.herokuapp.com/weather?lat=${lat}&lon=${lon}`
  );
  const tempKelvin = weatherData.data.current.temp;
  state.temp =
    state.unit === 'F'
      ? Math.floor((tempKelvin - 273.15) * 1.8 + 32)
      : Math.floor(tempKelvin - 273.15);
  displayTemp();
  updateTempDecor();
};

// Wave 5 -- Selecting the Sky

const selectSky = (e) => {
  const selected = e.target.value;
  if (!selected) {
    document.body.className = 'sun';
  } else {
    document.body.className = selected;
  }
};

// Wave 6 -- Resetting city name
const resetCity = () => {
  cityInput.value = '';
  state.city = 'Atlanta 🍑';
  cityName.textContent = state.city;
  getCurrentTemp();
};

// Event Listeners
const registerEventHandlers = () => {
  const tempUp = document.getElementById('temp-up');
  tempUp.addEventListener('click', raiseTemp);

  const tempDown = document.getElementById('temp-down');
  tempDown.addEventListener('click', lowerTemp);

  cityInput.addEventListener('input', updateCity);

  const getTempButton = document.getElementById('get-temp');
  getTempButton.addEventListener('click', getCurrentTemp);

  const skySelector = document.getElementById('sky');
  skySelector.addEventListener('change', selectSky);

  const resetButton = document.getElementById('reset-city-button');
  resetButton.addEventListener('click', resetCity);

  const convertButton = document.getElementById('f-to-c');
  convertButton.addEventListener('click', convertTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
