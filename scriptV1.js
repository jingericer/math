const weatherDataElement = document.getElementById("weather-data");

  // Fetch the weather data from My Ecowitt Weather Station
fetch("https://www.ecowitt.net/index/home", {
  method: "POST",
  body: new URLSearchParams({
    device_id: "V3ZqaWZaWFFYMGwyZ2ZtclhwV005QT09",
    authorize: "BUY4VT",
  }),

})
.then(response => response.json())
.then(data => {
  // Access and process weather data
  const outdoorTempFahrenheit = data.data.temp.data.tempf.value;
  const outdoorTempCelsius = ((outdoorTempFahrenheit - 32) * (5 / 9)).toFixed(1);
  const humidity = data.data.temp.data.humidity.value;
  const windSpeedMph = data.data.wind.data.windspeedmph.value;
  const windSpeedKmh = (windSpeedMph * 1.60934).toFixed(1); 
  const rainRate = (data.data.rain.data.rainratein.value * 25.4).toFixed(1);
  const uvIndex = data.data.so_uv.data.uv.value;

  // Change background picture based on weather data
  if (rainRate > 0) {
        document.body.style.backgroundImage = 'url("rainy_background.png")';
  }

  if (uvIndex < 6) {
        document.body.style.backgroundImage = 'url("cloudy_background.png")';
  }


  // Update the weather data element
  weatherDataElement.innerHTML = `
    <p>Outdoor Temperature: ${outdoorTempCelsius}&deg;C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeedKmh} km/hr</p>
    <p>Rain Rate: ${rainRate} mm/hr</p>
    <p>UV Index: ${uvIndex}</p>
  `;
})
.catch(error => {
  console.error("Error fetching weather data:", error);
  weatherDataElement.innerHTML = "Error: Unable to fetch weather data.";
});
