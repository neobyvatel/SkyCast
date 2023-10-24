const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const city = cityInput.value.trim();

  if (city === "") {
    alert("Please enter a city name.");
  } else {
    console.log("Form submitted!");
    // If the city name is not empty, you can proceed with the form submission
    // For example, you can make an API request with the city name here.
    // fetchWeatherData(city);

    // Reset the form input field
    cityInput.value = "";
  }
});

cityInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    console.log("Enter key pressed");
    event.preventDefault(); // Prevent form submission
    form.dispatchEvent(new Event("submit")); // Trigger the form's submit event
  }
});
