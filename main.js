const fetchBtn = document.getElementById("btnFetch");
fetchBtn.addEventListener("click", fetchWeather);
const cityNameInput = document.getElementById("cityName");

fetchBtn.addEventListener("click", fetchWeather);
cityNameInput.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    fetchWeather();
  }
});

function fetchWeather() {
  let city = document.getElementById("cityName").value.trim();
  let key = "e31236ca2959caf5178b8298a93073e8";
  let lang = "en";
  let units = "metric";

  // Fetch current weather data
  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=${lang}&units=${units}`;
  fetch(currentWeatherUrl)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then((currentWeatherData) => {
      // Fetch 5-day forecast data
      let forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${key}&lang=${lang}&units=${units}`;
      return fetch(forecastUrl)
        .then((resp) => {
          if (!resp.ok) throw new Error(resp.statusText);
          return resp.json();
        })
        .then((forecastData) => {
          showWeather(currentWeatherData, forecastData);
        });
    })
    .catch((error) => {
      console.log(error);
      alert("City not found. Please check the city name and try again.");
    });

  cityNameInput.value = "";
}

function showWeather(currentWeatherData, forecastData) {
  console.log("Current Weather:", currentWeatherData);
  console.log("5-Day Forecast:", forecastData.list); // This will log the list of forecasts

  // Display current weather data
  document.getElementById("updateTime").textContent = getCurrentTime();
  document.getElementById(
    "city"
  ).textContent = `${currentWeatherData.name}, ${currentWeatherData.sys.country}`;
  document.getElementById(
    "temp"
  ).innerHTML = `${currentWeatherData.main.temp}&deg;C`;
  document.getElementById(
    "feelsLike"
  ).innerHTML = `${currentWeatherData.main.feels_like}&deg;C`;
  document.getElementById(
    "windSpeed"
  ).textContent = `Wind speed: ${currentWeatherData.wind.speed} m/s`;
  document.getElementById(
    "windDirection"
  ).textContent = `Direction: ${currentWeatherData.wind.deg}°`;
  document.getElementById("weatherDescription").textContent =
    currentWeatherData.weather[0].description;
  document.getElementById(
    "humidity"
  ).textContent = `${currentWeatherData.main.humidity}`;
  document.getElementById(
    "pressure"
  ).textContent = `${currentWeatherData.main.pressure} hPa`;
  const sunriseTime = formatTimeFromTimestamp(currentWeatherData.sys.sunrise);
  const sunsetTime = formatTimeFromTimestamp(currentWeatherData.sys.sunset);
  document.getElementById("sunrise").textContent = `${sunriseTime}`;
  document.getElementById("sunset").textContent = `${sunsetTime}`;

  // Iterate through the forecast data and display it
  forecastData.list.forEach((forecast) => {
    console.log(
      `Date/Time: ${forecast.dt_txt}, Temperature: ${forecast.main.temp}&deg;C, Weather: ${forecast.weather[0].description}`
    );
  });
}

function getCurrentTime() {
  const currentTime = new Date();
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}

function formatTimeFromTimestamp(timestamp) {
  const date = new Date(timestamp * 1000); // Convert timestamp to milliseconds
  const hours = date.getHours();
  const minutes = date.getMinutes();
  return `${hours}:${minutes < 10 ? "0" : ""}${minutes}`;
}
