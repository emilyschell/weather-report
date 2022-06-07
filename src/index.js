const state = {
  city: 'Atlanta 🍑',
  temp: 75,
};

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

const updateCity = () => {
  const city = document.getElementById('city');
  const cityName = document.getElementById('city-name');
  state.city = city.value;
  cityName.textContent = state.city;
};

const registerEventHandlers = () => {
  const tempUp = document.getElementById('temp-up');
  tempUp.addEventListener('click', raiseTemp);

  const tempDown = document.getElementById('temp-down');
  tempDown.addEventListener('click', lowerTemp);

  const city = document.getElementById('city');
  city.addEventListener('input', updateCity);
};

document.addEventListener('DOMContentLoaded', registerEventHandlers);
