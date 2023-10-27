const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");
const resultContainer = document.getElementById("resultContainer");
const cityName = document.getElementById("cityName");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
  } else {
    console.log("Form submitted!");
    fetchWeatherData(city);
    cityName.innerHTML = '<i class="fa-solid fa-mountain-city"></i> ' + city;
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

// function fetchWeatherData(city) {
//   fetch(
//     `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=122f759f3073bc3b285d10fb134175c4`
//   )
//     .then((response) => response.json())
//     .then((data) => {
//       console.log(data);
//       displayWeatherData(data);
//     })
//     .catch((error) => console.error("Error fetching weather data:", error));
// }

// function displayWeatherData(data) {
//   resultContainer.innerHTML = `
//     <h2>Weather in ${data.name}</h2>
//     <p>Temperature: ${data.main.temp}°C</p>
//     <p>Description: ${data.weather[0].description}</p>
//   `;
// }

//time
function showTime() {
  let date = new Date();
  let h = date.getHours(); // 0 - 23
  let m = date.getMinutes(); // 0 - 59
  let s = date.getSeconds(); // 0 - 59
  let session = "AM";

  if (h == 0) {
    h = 12;
  }

  if (h > 12) {
    h = h - 12;
    session = "PM";
  }

  h = h < 10 ? "0" + h : h;
  m = m < 10 ? "0" + m : m;
  s = s < 10 ? "0" + s : s;

  let time = h + ":" + m + ":" + s + " " + session;

  document.getElementById("MyClockDisplay").textContent = time;

  setTimeout(showTime, 1000);
}

showTime();
