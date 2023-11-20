var themeToggleDarkIcon = document.getElementById("theme-toggle-dark-icon");
var themeToggleLightIcon = document.getElementById("theme-toggle-light-icon");

// Change the icons inside the button based on previous settings
if (
  localStorage.getItem("color-theme") === "dark" ||
  (!("color-theme" in localStorage) &&
    window.matchMedia("(prefers-color-scheme: dark)").matches)
) {
  themeToggleLightIcon.classList.remove("hidden");
} else {
  themeToggleDarkIcon.classList.remove("hidden");
}

var themeToggleBtn = document.getElementById("theme-toggle");

themeToggleBtn.addEventListener("click", function () {
  // toggle icons inside button
  themeToggleDarkIcon.classList.toggle("hidden");
  themeToggleLightIcon.classList.toggle("hidden");

  // if set via local storage previously
  if (localStorage.getItem("color-theme")) {
    if (localStorage.getItem("color-theme") === "light") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    }

    // if NOT set via local storage previously
  } else {
    if (document.documentElement.classList.contains("dark")) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("color-theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("color-theme", "dark");
    }
  }
});

function fetchWeather(ev) {
  let rawLat = document.getElementById("latitude").value;
  let rawLon = document.getElementById("longitude").value;

  // Validate input using isNaN
  if (isNaN(parseFloat(rawLat)) || isNaN(parseFloat(rawLon))) {
    // Display an alert for invalid input
    alert(
      "Invalid input. Please enter valid numerical values for latitude and longitude."
    );
    return;
  }

  let lat = parseFloat(rawLat).toFixed(2);
  let lon = parseFloat(rawLon).toFixed(2);
  let key = "e31236ca2959caf5178b8298a93073e8";
  let lang = "en";
  let units = "metric";
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&lang=${lang}&units=${units}`;
  //fetch the weather
  fetch(url)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then((data) => {
      showWeather(data);
    })
    .catch(console.error);
}

function getLocation(ev) {
  let opts = {
    enableHighAccuracy: true,
    timeout: 1000 * 10, //10 seconds
    maximumAge: 1000 * 60 * 5, //5 minutes
  };
  navigator.geolocation.getCurrentPosition(ftw, wtf, opts);
}

function ftw(position) {
  console.log(position);
  //got position
  document.getElementById("latitude").value =
    position.coords.latitude.toFixed(2);
  document.getElementById("longitude").value =
    position.coords.longitude.toFixed(2);
}

function wtf(err) {
  //geolocation failed
  console.error(err);
}

function showWeather(resp) {
  console.log(resp);

  // // Update City
  // document.getElementById(
  //   "city-info"
  // ).textContent = `${resp.name}, ${resp.sys.country}`;

  // // Update Card 1: Main Temperature
  // document.getElementById(
  //   "mainTemperature"
  // ).textContent = `Temperature: ${resp.main.temp} °C`;

  // // Update Card 2: Humidity
  // document.getElementById(
  //   "humidity"
  // ).textContent = `Humidity: ${resp.main.humidity}%`;

  // // Update Card 3: Wind Information
  // document.getElementById(
  //   "windSpeed"
  // ).textContent = `Speed: ${resp.wind.speed} m/s`;
  // document.getElementById(
  //   "windDirection"
  // ).textContent = `Direction: ${resp.wind.deg}°`;

  // // Update Card 4: Pressure
  // document.getElementById(
  //   "pressure"
  // ).textContent = `Pressure: ${resp.main.pressure} hPa`;

  // // Update Card 5: UV Index
  // document.getElementById("uvIndex").textContent = `UV Index: ${resp.uvi}`;
}

// Initialize event listeners
document.getElementById("btnGet").addEventListener("click", fetchWeather);
document.getElementById("btnCurrent").addEventListener("click", getLocation);

// date.js

document.addEventListener("DOMContentLoaded", function () {
  // Update the current date dynamically
  const currentDateElement = document.getElementById("currentDate");
  const currentDate = new Date();
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentDate.toLocaleDateString("en-US", options);
  currentDateElement.textContent = `${formattedDate}`;
});

// clock.js

// setInterval(function () {
//   const clock = document.querySelector(".display");

//   let time = new Date();

//   let sec = time.getSeconds();
//   let min = time.getMinutes();
//   let hr = time.getHours();
//   let day = "AM";

//   if (hr > 12) {
//     day = "PM";
//     hr = hr - 12;
//   }

//   if (hr == 0) {
//     hr = 12;
//   }

//   if (sec < 10) {
//     sec = "0" + sec;
//   }

//   if (min < 10) {
//     min = "0" + min;
//   }

//   if (hr < 10) {
//     hr = "0" + hr;
//   }

//   clock.textContent = hr + ":" + min + ":" + sec + " " + day;
// }, 1000); // Update every 1000 milliseconds (1 second)

const data = {
  labels: [],
  datasets: [
    {
      label: "Hourly Temperature",
      data: [],
      fill: false,
      borderColor: "rgba(75, 192, 192, 1)",
      borderWidth: 2,
      fill: false,
    },
  ],
};
data.labels = [
  "12:00 AM",
  "3:00 AM",
  "6:00 AM",
  "9:00 AM",
  "12:00 PM",
  "3:00 PM",
  "6:00 PM",
  "9:00 PM",
];
data.datasets[0].data = [20, 22, 25, 28, 30, 28, 26, 24];
const config = {
  type: "line",
  data: data,
  options: {
    responsive: true,
    scales: {
      x: {
        type: "category",
        labels: data.labels,
      },
      y: {
        beginAtZero: true,
      },
    },
  },
};

document.addEventListener("DOMContentLoaded", function () {
  const ctx = document.getElementById("dailyTemp").getContext("2d");
  const myLineChart = new Chart(ctx, config);
});
