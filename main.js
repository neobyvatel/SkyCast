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
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=122f759f3073bc3b285d10fb134175c4`
  )
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      displayWeatherData(data);
    })
    .catch((error) => console.error("Error fetching weather data:", error));
}

function displayWeatherData(data) {
  resultContainer.innerHTML = `
    <h2>Weather in ${data.name}</h2>
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Description: ${data.weather[0].description}</p>
  `;
}

//slider
let slideIndex = 1;
const slides = document.getElementsByClassName("slide");
const dots = document.getElementsByClassName("dot");

// Function to show a specific slide
function showSlides(n) {
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }

  // Remove the "active" class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  // Display the current slide and mark its corresponding dot as active
  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
}

// Function to advance to the next slide
function plusSlides(n) {
  showSlides((slideIndex += n));
}

// Function to navigate to a specific slide
function currentSlide(n) {
  showSlides((slideIndex = n));
}

// Automatically advance to the next slide every 3 seconds (3000 milliseconds)
setInterval(function () {
  plusSlides(1);
}, 5000);

// Initialize the slider
showSlides(slideIndex);
