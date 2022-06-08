const state = {
  city: 'Atlanta 🍑',
  temp: 75,
};

// Wave 2 -- Altering Temperature

const raiseTemp = () => {
  state.temp += 1;
  updateTemp();
};

const lowerTemp = () => {
  state.temp -= 1;
  updateTemp();
};

const updateTemp = () => {
  const tempDisplay = document.getElementById('temp');
  const landscape = document.getElementById('landscape');
  tempDisplay.textContent = `${state.temp}°`;
  if (state.temp >= 80) {
    tempDisplay.style.color = 'red';
    landscape.setAttribute('src', 'assets/hot.jpg');
  } else if (state.temp >= 70 && state.temp < 80) {
    tempDisplay.style.color = 'orange';
    landscape.setAttribute('src', 'assets/warm.jpg');
  } else if (state.temp >= 60 && state.temp < 70) {
    tempDisplay.style.color = 'gold';
    landscape.setAttribute('src', 'assets/cool.jpg');
  } else if (state.temp >= 50 && state.temp < 60) {
    tempDisplay.style.color = 'green';
    landscape.setAttribute('src', 'assets/cool.jpg');
  } else {
    tempDisplay.style.color = 'lightblue';
    landscape.setAttribute('src', 'assets/cold.jpg');
  }
};

// Wave 3 -- Updating City

const updateCity = () => {
  const city = document.getElementById('city');
  const cityName = document.getElementById('city-name');
  state.city = city.value;
  cityName.textContent = state.city;
};

// Wave 4 -- Calling APIs

const getCurrentTemp = async () => {
  const locationData = await axios.get(
    `http://127.0.0.1:5000/location?q=${state.city}`
  );
  const lat = locationData.data[0].lat;
  const lon = locationData.data[0].lon;
  getWeatherFromLocation(lat, lon);
};

const getWeatherFromLocation = async (lat, lon) => {
  const weatherData = await axios.get(
    `http://127.0.0.1:5000/weather?lat=${lat}&lon=${lon}`
  );
  const tempKelvin = weatherData.data.current.temp;
  state.temp = Math.floor((tempKelvin - 273.15) * 1.8 + 32);
  updateTemp();
};

// Event Listeners
const registerEventHandlers = () => {
  const tempUp = document.getElementById('temp-up');
  tempUp.addEventListener('click', raiseTemp);

  const tempDown = document.getElementById('temp-down');
  tempDown.addEventListener('click', lowerTemp);

  const city = document.getElementById('city');
  city.addEventListener('input', updateCity);

  const getTempButton = document.getElementById('get-temp');
  getTempButton.addEventListener('click', getCurrentTemp);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
