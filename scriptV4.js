const weatherDataElement = document.getElementById("weather-data");
const suggestionDataElement = document.getElementById("suggestions-data");

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
  // rainy day
  if (rainRate > 0 && uvIndex < 5) {
        document.body.style.backgroundImage = 'url("rainy_background.png")';
 suggestionDataElement.innerHTML = `
      <h1>Weather Suggestions</h1>
    <div>
      <ul>
        <li>Read or learn something new</li>
        <li>Exercise indoors</li>
        <li>Cook or bake something delicious</li>
        <li>Have a family movie night</li>
        <li>Play board games or chess</li>
      </ul>
    </div>
  `;

  }
  // cloudy day
  if (rainRate == 0 && uvIndex < 5) {
        document.body.style.backgroundImage = 'url("cloudy_background.png")';
  suggestionDataElement.innerHTML = `
      <h2>Weather Suggestions</h2>
    <div>
      <ul>
        <li>Walking or Jogging</li>
        <li>Gardening</li>
        <li>Read a Book</li>
      </ul>
    </div>
  `;
  }



 // sunny day
  if (rainRate == 0 && uvIndex >5) {
        document.body.style.backgroundImage = 'url("sunny_background.png")';
 suggestionDataElement.innerHTML = `
      <h1>Weather Suggestions</h1>
    <div>
      <ul>
        <li>Go for a walk or hike</li>
        <li>Play outdoor sports</li>
        <li>Cook or bake something delicious</li>
        <li>Have a picnic in the park</li>
        <li>Go biking</li>
		<li>Attend an outdoor event</li>
      </ul>
    </div>
  `;

  }
  
  
 // foggy day
  if (rainRate == 0 && uvIndex <5 && humidity == 100 && outdoorTempCelsius <15 && windSpeedKmh <10) {
        document.body.style.backgroundImage = 'url("foggy_background.png")';
 suggestionDataElement.innerHTML = `
      <h1>Weather Suggestions</h1>
    <div>
      <ul>
        <li>Cozy up with a book or movie</li>
        <li>Board games or puzzles</li>
        <li>Arts and crafts</li>
        <li>Visit a museum, art gallery, or indoor attraction</li>
      </ul>
    </div>
  `;

  } 
  


  // Update the weather data element
  weatherDataElement.innerHTML = `
    <h2>Current Weather</h2>
    <div>
    <p>Outdoor Temperature: ${outdoorTempCelsius}&deg;C</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeedKmh} km/hr</p>
    <p>Rain Rate: ${rainRate} mm/hr</p>
    <p>UV Index: ${uvIndex}</p>
    </div>
  `;
})
.catch(error => {
  console.error("Error fetching weather data:", error);
  weatherDataElement.innerHTML = "Error: Unable to fetch weather data.";
});
