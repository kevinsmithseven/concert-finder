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
var inputFormCity = document.getElementById("form-container-city");
var inputFormArtist = document.getElementById("form-container-artist");
var inputCity = document.getElementById("city");
var inputArtist = document.getElementById("artist")
var submitButtonCity = document.getElementById("submit-btn-city");
var submitButtonArtist = document.getElementById("submit-btn-artist");


// Gets Event data from Ticketmaster API

// TODO Notes for various query parameters that we may need on the event search
//* {keyword} this can be used to search for specific artists (or venues, event name, etc), but I think we can it for the artist search logic
//* {classificationName} can be used to limit results, we could use "Music"
//* {startDate} and {endDate} we can use to limit time frame of the search, we would need to add dayjs functionality
//* {city} this can be used to search for events in a specific city
//* {sort=date,asc} sort by newest events first
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

//* accepts input from city modal form and checks if city exists
function cityFormSubmitHandler(event) {
    event.preventDefault();

    //* establish variables that accept the input of the city text field and trim
    var cityChoice = inputCity.value.trim();
    console.log(cityChoice);
    console.log(inputCity);

    //* check and see whether there is input in the field and run the appropriate function - display alerts if none are filled or both
    if (cityChoice) {
        getCityEventData(cityChoice);

    } else {
        alert("Please enter a city name");
    }
}

// //* accepts input from artist modal form and checks if artist exists
// function artistFormSubmitHandler(event) {
//     event.preventDefault();

//     //* establish variables that accept the input of the artist text field and trim
//     var artistChoice = inputArtist.elements.city.value.trim();    

//     //* check and see whether there is input in the field and run the appropriate function - display alerts if none are filled or both
//     if (artistChoice) {
//         getArtistEventData(artistChoiceChoice);

//     } else {
//         alert("Please enter an artist name");
//     }   
// }


//* function to fetch data for events in the city entered in the modal form
function getCityEventData(cityChoice) {
    var cityEventFetchURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=" + cityChoice + "&classificationName=Music&sort=date,asc&apikey=" + concertAPIKey;

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


            displayCityEvents(cityEventData);
        })

        .catch(function (error) {
            console.error(error.message);
        });
}

// Display city events in cards in aside
function displayCityEvents(cityEventData) {
    console.log(cityEventData);
    asideEventList.innerHTML = "";

    // for (let i = 0; i < cityEventData._embedded.events.length; i++) {
    //     const event = cityEventData._embedded.events[i];
    //     const eventItem = document.createElement("li");
    //     eventItem.textContent = event.name;
    //     eventItem.classList.add("event-card"); // Add a CSS class for styling
    //     eventItem.addEventListener("click", () => showEventDetails(event));
    //     asideEventList.appendChild(eventItem);
    // }

    asideEventList.innerHTML = "";
    

    for (let i = 0; i < 10; i++) {
        var events = cityEventData._embedded.events[i];
        console.log(events);
        // var priceRanges = cityEventData._embedded.events.priceRanges[i];
        // console.log(priceRanges);

        var cardHTML = `      
        <div class="card">
            <header class="card-header">
             <p class="card-header-title">
                ${events.name}
             </p>
             <button class="card-header-icon" aria-label="more options">
               <span class="icon">
                 <i class="fas fa-angle-down" aria-hidden="true"></i>
               </span>
             </button>
            </header>
          <div class="card-content">
           <div class="content">
            <ul>
            <li> ${events.dates.start.localTime}
            <li> ${events.dates.start.localDate}
            
            <a href="#">@bulmaio</a>. <a href="#">#css</a> <a href="#">#responsive</a>
            <br>
            <time datetime="2016-1-1">11:09 PM - 1 Jan 2016</time>
           </div>
        </div>
      <footer class="card-footer">
        <a href="#" class="card-footer-item">Save</a>
        <a href="#" class="card-footer-item">Edit</a>
        <a href="#" class="card-footer-item">Delete</a>
      </footer>
     </div>   
    `;

    asideEventList.insertAdjacentHTML("beforeend", cardHTML);

    }
}


// //* function to fetch data for events for the artist entered in the modal form
// function getArtistEventData(artistChoice) {
//     var artistEventFetchURL = "https://app.ticketmaster.com/discovery/v2/events.json?keyword=" + artistChoice + "&apikey=" + concertAPIKey;

//     fetch(artistEventFetchURL)
//         .then(function (response) {
//             if (response.ok) {
//                 return response.json();
//             } else {
//                 alert("Artist not found, please check spelling and try again")
//             }
//         })
//         .then(function (artistEventData) {
//             console.log(artistEventData);
//         })
// }



// function testData () {
//     var testDataURL = "https://app.ticketmaster.com/discovery/v2/events.json?city=Dallas&classificationName=Music&apikey=" + concertAPIKey;

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

function getWeatherData() {
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

// ****************basic page functions***********************************************************************
// *dropdown function 

var dropdown = document.querySelector('.dropdown');
dropdown.addEventListener('click', function (event) {
    event.stopPropagation();
    dropdown.classList.toggle('is-active');
});

// *modal function 

var modalBtnCity = document.getElementById("modal-btn-city");
var modalBtnArtist = document.getElementById("modal-btn-artist");
var modalCardCity = document.getElementById("modal-card-city");
var modalCardArtist = document.getElementById("modal-card-artist");
var closeModalCity = document.getElementById("close-modal-city");
var closeModalArtist = document.getElementById("close-modal-artist");
var modalBackgroundArtist = document.getElementById("modal-background-artist")
var modalBackgroundCity = document.getElementById("modal-background-city")

modalBtnCity.onclick = function () {
    modalCardCity.style.display = "block"
}

closeModalCity.onclick = function () {
    modalCardCity.style.display = "none"
}

modalBackgroundCity.onclick = function (event) {

    if (event.target == modalBackgroundCity) {
        modalCardCity.style.display = "none";

    }
};




modalBtnArtist.onclick = function () {
    modalCardArtist.style.display = "block"
}

closeModalArtist.onclick = function () {
    modalCardArtist.style.display = "none"
}

window.onclick = function (event) {
    if (event.target == modalBackgroundArtist) {
        modalCardArtist.style.display = "none";

    }
};

var currentDay = dayjs().format('DD/MM/YYYY')
console.log(currentDay);

// ****************basic page functions***********************************************************************

//* Event listeners

submitButtonCity.addEventListener('click', cityFormSubmitHandler);
