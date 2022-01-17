var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#citySearch");
var citySearchName = document.querySelector("#city-search-name");
var listGroupEl= document.getElementById("currentDayContent");
var cityIdCounter = 0;
var submitButton = document.querySelector(".btn")
var recentSearch = document.querySelector("#city-results")

var cityNames = []

var getCurrentWeatherData = function(name) {
    //format the github apiUrl to grab weather for a specific city
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2" 

    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
    response.json().then(function(data) { 
    const  {name} = data
    const {speed} = data.wind
    const  {icon} = data.weather[0]
    const {temp, humidity} = data.main
    DisplayCity(name, temp, speed, humidity)
    
});
// cityNames.id = cityIdCounter++

        var inputSearch = name
        cityNames.push(inputSearch);
        console.log(cityNames);
        localStorage.setItem('cities', JSON.stringify(cityNames))  
});
};

reload()

function reload() {
    cityNames = JSON.parse(localStorage.getItem("cities"))
    console.log(cityNames)

    for (var i = 0; i < cityNames.length; i++) {
        addToList(cityNames[i])
    }
}

var formSubmitHandler = function(event) {
    event.preventDefault();
    //Get Value from input element
    var name = cityInputEl.value.trim();

    if (name) {
        getCurrentWeatherData(name);
        addToList(name)
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a City name");
    }
    // console.log(event);
};

function addToList(cityName) {
    var buttonEl = document.createElement("button");
    buttonEl.textContent = cityName;
    recentSearch.appendChild(buttonEl);
}

var DisplayCity = function(name, temp, wind, humidity) {
    citySearchName.textContent = name
    // console.log(name);
var temperature = document.createElement("li");
temperature.textContent = "Temp:" + temp + "F";
listGroupEl.appendChild(temperature);
var windSpeed = document.createElement("li");
windSpeed.textContent = "Wind:" + wind + "MPH";
listGroupEl.appendChild(windSpeed);
var humidityOutside = document.createElement("li");
humidityOutside.textContent = "Humidity:" + humidity + "%";
listGroupEl.appendChild(humidityOutside);

// listGroupEl.appendChild(temperature)
// listGroupEl.appendChild(windSpeed)
// listGroupEl.appendChild(humidityOutside)
}

userFormEl.addEventListener("submit", formSubmitHandler);




