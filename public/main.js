const weatherDisplay = document.querySelector(".weather");
const weatherForm = document.querySelector("#weather-form");
const cityInput = document.querySelector("#city-input");

// Fetch weather data from API
const fetchWeather = async (city) => {
  const apiKey = `9e77435b3bf4387ae1982a5327aa53e3`;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

  const res = await fetch(url);
  const data = await res.json();

  if (data.code === "404") {
    alert("City not found!");
    return;
  }

  const displayData = {
    city: data.name,
    temp: kelvinToFahrenheit(data.main.temp),
  };

  addWeatherToDOM(displayData);
};

// Add display data to DOM
const addWeatherToDOM = (data) => {
  weatherDisplay.innerHTML = `
    <h1>Weather in ${data.city}</h1>
    <h2>${data.temp} &deg;F</h2>
  `;

  cityInput.value = ``;
};

// Convert Kelvin to Ferhenheit
const kelvinToFahrenheit = (temp) => {
  return Math.ceil(((temp - 273.15) * 9) / 5 + 32);
};

// Event listener for form submission
weatherForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (cityInput.value === "") {
    alert("Please enter a city");
  } else {
    fetchWeather(cityInput.value);
  }
});

// Initial fetch
fetchWeather("Bentonville");
