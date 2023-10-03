// Global variables
// var concertAPIKey = 
var weatherAPIKey = "4a5b27e8dacd4394811170611230310"
var header = document.getElementById("header");
var savedDropDown = document.getElementById("selector");
var hero = document.querySelector(".hero");
var asideEventList = document.getElementById("events-container");
var modalSearchButton = document.getElementById("modal-btn");
var mainDetail = document.getElementById("details-container");
var saveEventButton = document.getElementById("save-btn)");
var footer = document.getElementById("footer");
var inputForm = document.getElementById("form-container");
var inputCity = document.getElementById("city");
var inputArtist = document.getElementById("artist")
var submitButton = document.getElementById("submit-btn");

// const url = "https://api.weatherapi.com/v1/forecast.json" + weatherAPIKey;
   
//         function getWeatherData() {
//             fetch(url)
//                 // .then(handleErrors)
//                 .then(function (response) {
//                     return response.json();
//                 })
//                 .then(function (data) {
//                     console.log(data);
//                 })

function getWeatherData(){
    var location = 'Dallas'; // Replace with your desired location
    const apiUrl = `https://api.weatherapi.com/v1/forecast.json?q=${location}&key=${weatherAPIKey}`;
    
    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Handle the weather data here
        console.log(data);
    
        // Extract specific weather information from the 'data' object as needed
        const temperature = data.current.temp_f;
        console.log(temperature);
        const weatherDescription = data.current.condition[0];
        console.log(weatherDescription);
        // ... and so on
      })
      .catch(error => {
        // Handle errors here
        console.error('Fetch error:', error);
      });
}
    getWeatherData()
