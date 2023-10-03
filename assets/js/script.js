// Global variables
var concertAPIKey = "ae45lQ2lZADiZHhpyVAASRQGSWGA7r8X"
// var weatherAPIKey =
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


// Gets Event data from Ticketmaster API

// TODO Notes for various query parameters that we may need on the event search
//* {keyword} this can be used to search for specific artists (or venues, event name, etc), but I think we can it for the artist search logic
//* {classificationName} can be used to limit results, we could use "Music"
//* {startDate} and {endDate} we can use to limit time frame of the search, we would need to add dayjs functionality
//* {city} this can be used to search for events in a specific city
//* {id} - this will return the details for an event - can be found in the event array data

// TODO Need to go over the various key options in array and decide which ones we want to use
//* Here are some I think we could use:
//* _embedded.events[0].name: name of the event
//* _embedded.events[0].dates.start: current scheduled date and time - object includes localDate and localTime
//* _embedded.events[0].priceRanges - includes min and max pricing in USD in an object in an array
//* _embedded.events[0].seatmap.staticUrl: shows an image of the seating chart
//* _embedded.events[0].url: link to the ticketmaster event site where the user can purchase tickets

// TODO add event listener to search button
// TODO add Modal pop out
// TODO add event listener to modal input fields - do we need to preventDefault on a modal?

// TODO Logic: if a city is submitted, run the fetch for that {city=} - what date range do we want to use? Do we need an error catch?
// TODO Logic: if an artist is submitted, run fetch for {keyword=} - same applies to date range and error catch
// TODO Logic - do we need separate functions for the above? I think yes
// TODO add dayjs() to html so we can use to reference dates in logic, i.e, if we are limiting search to two weeks, we need to know current date for comparison

//* accepts input from modal form and determines if a city or artist was entered and running the fetch function for that choice
function modalFormSubmitHandler(event) {
    event.preventDefault();
    //* establish variables that accept the input of either field and trim
    var cityChoice = inputCity.elements.city.value.trim();
    var artistChoice = inputArtist.elements.city.value.trim();

    //* check and see whether there is input in either field and run the appropriate function - display alerts if none are filled or both
    if (cityChoice && !artistChoice) {
        getCityEventData(cityChoice);
    }

    if (!cityChoice && artistChoice) {
        getArtistEventData(artistChoice);
    }

    if (cityChoice && artistChoice) {
        alert("Please enter only a city or an artist")
    }

    if (!cityChoice && !artistChoice) {
        alert("Please enter a city or an artist to search")
    }
}


//* function to fetch data for events in the city entered in the modal form
function getCityEventData(cityChoice) {
    var cityEventFetchURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityChoice + "&apikey=" + concertAPIKey;

    fetch(cityEventFetchURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert("City not found, please check spelling and try again")
            }
        })
        .then(function (cityEventData) {
            console.log(cityEventData);
        })
}

//* function to fetch data for events for the artist entered in the modal form
function getArtistEventData(artistChoice) {
    var artistEventFetchURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artistChoice + "&apikey=" + concertAPIKey;

    fetch(artistEventFetchURL)
        .then(function (response) {
            if (response.ok) {
                return response.json();
            } else {
                alert("Artist not found, please check spelling and try again")
            }
        })
        .then(function (artistEventData) {
            console.log(artistEventData);
        })
}



// function testData () {
//     var testDataURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=Dallas&classificationName=Music&id=vvG1YZ9Rpgpfev&apikey=" + concertAPIKey;

//     fetch(testDataURL)
//         .then(function (response) {
//             return response.json();
//         })

//         .then(function (data) {
//             console.log(data);
//         })
// }

// testData();

var weatherAPIKey = "4a5b27e8dacd4394811170611230310"

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