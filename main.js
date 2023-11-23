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
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=${lang}&units=${units}`;
  //fetch the weather
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then((data) => {
      showWeather(data);
    })
    .catch((error) => {
      console.log(error);
      alert("City not found. Please check the city name and try again.");
    });
  cityNameInput.value = "";
}
function showWeather(resp) {
  console.log(resp);
  console.log(resp.daily);
  document.getElementById("updateTime").textContent = getCurrentTime(); // Assuming you have a function getCurrentTime() to get the current time
  document.getElementById(
    "city"
  ).textContent = `${resp.name}, ${resp.sys.country}`;
  document.getElementById("temp").innerHTML = `${resp.main.temp}&deg;C`;
  document.getElementById(
    "feelsLike"
  ).innerHTML = `${resp.main.feels_like}&deg;C`;
  document.getElementById(
    "windSpeed"
  ).textContent = `Wind speed: ${resp.wind.speed} m/s`;
  document.getElementById(
    "windDirection"
  ).textContent = `Direction: ${resp.wind.deg}°`;
  document.getElementById("weatherDescription").textContent =
    resp.weather[0].description;
  document.getElementById("humidity").textContent = `${resp.main.humidity}`;
  document.getElementById("pressure").textContent = `${resp.main.pressure} hPa`;
  const sunriseTime = formatTimeFromTimestamp(resp.sys.sunrise);
  const sunsetTime = formatTimeFromTimestamp(resp.sys.sunset);

  document.getElementById("sunrise").textContent = `${sunriseTime}`;
  document.getElementById("sunset").textContent = `${sunsetTime}`;
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
