function toggleNavbar(navbarId) {
  const navbar = document.getElementById(navbarId);
  if (navbar) {
    navbar.classList.toggle("hidden");
  }
}

const app = {
  init: () => {
    document
      .getElementById("btnGet")
      .addEventListener("click", app.fetchWeather);
    document
      .getElementById("btnCurrent")
      .addEventListener("click", app.getLocation);
  },
  fetchWeather: (ev) => {
    let lat = document.getElementById("latitude").value;
    let lon = document.getElementById("longitude").value;
    let key = "e31236ca2959caf5178b8298a93073e8";
    let lang = "en";
    let units = "metric";
    let url = `http://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=${key}&units=${units}&lang=${lang}`;
    //fetch the weather
    fetch(url)
      .then((resp) => {
        if (!resp.ok) throw new Error(resp.statusText);
        return resp.json();
      })
      .then((data) => {
        app.showWeather(data);
      })
      .catch(console.err);
  },
  getLocation: (ev) => {
    let opts = {
      enableHighAccuracy: true,
      timeout: 1000 * 10, //10 seconds
      maximumAge: 1000 * 60 * 5, //5 minutes
    };
    navigator.geolocation.getCurrentPosition(app.ftw, app.wtf, opts);
  },
  ftw: (position) => {
    console.log(position);
    //got position
    document.getElementById("latitude").value =
      position.coords.latitude.toFixed(2);
    document.getElementById("longitude").value =
      position.coords.longitude.toFixed(2);
  },
  wtf: (err) => {
    //geolocation failed
    console.error(err);
  },
  showWeather: (resp) => {
    console.log(resp);
    // Update City
    document.getElementById("city").textContent = `City: ${resp.timezone}`;

    // Update Card 1: Main Temperature
    document.getElementById(
      "mainTemperature"
    ).textContent = `Temperature: ${resp.current.temp} °C`;

    // Update Card 2: Humidity
    document.getElementById(
      "humidity"
    ).textContent = `Humidity: ${resp.current.humidity}%`;

    // Update Card 3: Wind Information
    document.getElementById(
      "windSpeed"
    ).textContent = `Speed: ${resp.current.wind_speed} m/s`;
    document.getElementById(
      "windDirection"
    ).textContent = `Direction: ${resp.current.wind_deg}°`;

    // Update Card 4: Pressure
    document.getElementById(
      "pressure"
    ).textContent = `Pressure: ${resp.current.pressure} hPa`;

    // Update Card 5: UV Index
    document.getElementById(
      "uvIndex"
    ).textContent = `UV Index: ${resp.current.uvi}`;
  },
};

app.init();
