const weatherDataElement = document.getElementById("weather-data");
const myHeaders = new Headers();
myHeaders.set("Accept", "application/json, text/plain");
myHeaders.set("Content-Type", "application/x-www-form-urlencoded");
myHeaders.set("Cookie", "lang_var=en-us; ousaite_language=english; ousaite_unit_cookie_2=4; ousaite_unit_cookie_5=16; ousaite_unit_cookie_10=24; ousaite_unit_cookie_3=7; ousaite_unit_cookie_4=12; ousaite_unit_cookie_1=1");
const cookies = {
  lang_var: "en-us",
  ousaie_language: "english",
  ousaie_unit_cookie_2: "4",
  ousaie_unit_cookie_5: "16",
  ousaie_unit_cookie_10: "24",
  ousaie_unit_cookie_3: "7",
  ousaie_unit_cookie_4: "12",
  ousaie_unit_cookie_1: "1",
};

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
  const outdoorTemp = data.data.temp.data.tempf.value;
  const humidity = data.data.temp.data.humidity.value;
  const windSpeed = data.data.wind.data.windspeedmph.value;
  const rainRate = data.data.rain.data.rainratein.value;
  const uvIndex = data.data.so_uv.data.uv.value;
  
  // Update the weather data element
  weatherDataElement.innerHTML = `
    <p>Outdoor Temperature: ${outdoorTemp}&deg;F</p>
    <p>Humidity: ${humidity}%</p>
    <p>Wind Speed: ${windSpeed} mph</p>
    <p>Rain Rate: ${rainRate} in/hr</p>
    <p>UV Index: ${uvIndex}</p>
  `;
})
.catch(error => {
  console.error("Error fetching weather data:", error);
  weatherDataElement.innerHTML = "Error: Unable to fetch weather data.";
});
