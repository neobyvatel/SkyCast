const fetchBtn = document.getElementById("btnFetch");
fetchBtn.addEventListener("click", fetchWeather);

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
}
function showWeather(resp) {
  console.log(resp);
}

// function getLocation(ev) {
//   let opts = {
//     enableHighAccuracy: true,
//     timeout: 1000 * 10, //10 seconds
//     maximumAge: 1000 * 60 * 5, //5 minutes
//   };
//   navigator.geolocation.getCurrentPosition(ftw, wtf, opts);
// }

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

// const data = {
//   labels: [],
//   datasets: [
//     {
//       label: "Hourly Temperature",
//       data: [],
//       fill: false,
//       borderColor: "rgba(75, 192, 192, 1)",
//       borderWidth: 2,
//       fill: false,
//     },
//   ],
// };
// data.labels = [
//   "12:00 AM",
//   "3:00 AM",
//   "6:00 AM",
//   "9:00 AM",
//   "12:00 PM",
//   "3:00 PM",
//   "6:00 PM",
//   "9:00 PM",
// ];
// data.datasets[0].data = [20, 22, 25, 28, 30, 28, 26, 24];
// const config = {
//   type: "line",
//   data: data,
//   options: {
//     responsive: true,
//     scales: {
//       x: {
//         type: "category",
//         labels: data.labels,
//       },
//       y: {
//         beginAtZero: true,
//       },
//     },
//   },
// };

// document.addEventListener("DOMContentLoaded", function () {
//   const ctx = document.getElementById("dailyTemp").getContext("2d");
//   const myLineChart = new Chart(ctx, config);
// });
