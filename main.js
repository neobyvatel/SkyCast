const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const resultContainer = document.getElementById("resultContainer");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
  } else {
    console.log("Form submitted!");
    fetchWeatherData(city);
    cityInput.value = "";
  }
});

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    console.log("Enter key pressed");
    event.preventDefault();
    form.dispatchEvent(new Event("submit"));
  }
});

function fetchWeatherData(city) {
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=122f759f3073bc3b285d10fb134175c4`)
    .then(response => response.json())
    .then(data => {
      console.log(data);
      displayWeatherData(data);
    })
    .catch(error => console.error('Error fetching weather data:', error));
}

function displayWeatherData(data) {
  resultContainer.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Description: ${data.weather[0].description}</p>
  `;
}

