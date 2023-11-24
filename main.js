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

  let currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&lang=${lang}&units=${units}`;
  fetch(currentWeatherUrl)
    .then((resp) => {
      if (!resp.ok) throw new Error(resp.statusText);
      return resp.json();
    })
    .then((currentWeatherData) => {
      // Fetch 5-day forecast data

      showWeather(currentWeatherData);
    })
    .catch((error) => {
      console.log(error);
      alert("City not found. Please check the city name and try again.");
    });

  cityNameInput.value = "";
}

function showWeather(currentWeatherData) {
  console.log("Current Weather:", currentWeatherData);

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

// main.js

const signupModal = document.getElementById("signupModal");
const signupForm = document.getElementById("signupForm");
const registerButton = document.getElementById("register");
registerButton.addEventListener("click", showModal);
function showModal() {
  signupModal.classList.remove("hidden");
}
function closeModal() {
  signupModal.classList.add("hidden");
}

const registerUser = document.getElementById("registerUser");
registerUser.addEventListener("click", signup);
const closeModalButton = document.getElementById("closeModal");
closeModalButton.addEventListener("click", closeModal);
// Function to handle the signup process
function signup() {
  // Get user input values
  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const username = document.getElementById("username").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    alert("Please enter a valid email address.");
    return;
  }
  if (password.length < 8) {
    alert("Password must be at least 8 characters long.");
    return;
  }

  if (!firstName || !lastName || !username || !email || !password) {
    alert("All fields are required. Please fill in all the fields.");
    return;
  }
  const userData = {
    firstName,
    lastName,
    username,
    email,
    password,
  };

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];
  existingUsers.push(userData);
  localStorage.setItem("users", JSON.stringify(existingUsers));
  closeModal();
  alert("Registration successful!");

  firstName.value = "";
  lastName.value = "";
  username.value = "";
  email.value = "";
  password.value = "";
}

const loginModal = document.getElementById("loginModal");
const loginForm = document.getElementById("loginForm");
const loginUserButton = document.getElementById("loginUser");
loginUserButton.addEventListener("click", login);
const openLoginModalButton = document.getElementById("showLoginModal");
openLoginModalButton.addEventListener("click", showLoginModal);
const closeLoginModalButton = document.getElementById("closeLoginModal");
closeLoginModalButton.addEventListener("click", closeLoginModal);

function showLoginModal() {
  loginModal.classList.remove("hidden");
}

function closeLoginModal() {
  loginModal.classList.add("hidden");
}

let loggedInUser = null;
function login() {
  const loginUsername = document.getElementById("username").value;
  const loginPassword = document.getElementById("password").value;

  if (!loginUsername || !loginPassword) {
    alert("Both username and password are required.");
    return;
  }

  const existingUsers = JSON.parse(localStorage.getItem("users")) || [];

  const matchedUser = existingUsers.find(
    (user) => user.username === loginUsername && user.password === loginPassword
  );

  if (matchedUser) {
    closeLoginModal();
    loggedInUser = matchedUser;
    // let username_ = document.getElementById("usernameField");
    // let firstName_ = document.getElementById("firstnameField");
    // let lastname_ = document.getElementById("lastnameField");
    // let email_ = document.getElementById("emailField");
    // usernameField.textContent = loggedInUser.username;
    // firstnameField.textContent = loggedInUser.firstName;
    // lastnameField.textContent = loggedInUser.lastName;
    // emailField.textContent = loggedInUser.email;

    console.log(`User ${loginUsername} logged in.`, loggedInUser);

    alert("Login successful!");
  } else {
    alert("Invalid username or password. Please try again.");
    password.value = "";
  }
}

document.addEventListener("DOMContentLoaded", function () {
  const themeToggleBtn = document.getElementById("toggleTheme");
  const htmlElement = document.documentElement;

  themeToggleBtn.addEventListener("click", function () {
    // Toggle 'dark' class on the <html> element
    htmlElement.classList.toggle("dark");

    // Toggle 'light' class on the <html> element
    htmlElement.classList.toggle("light");
  });
});
