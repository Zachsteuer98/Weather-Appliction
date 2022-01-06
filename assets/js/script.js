var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#citySearch")
var citySearchName = document.querySelector("#city-search-name")

var getCurrentWeatherData = function(name) {
    //format the github apiUrl to grab weather for a specific city
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2" 

    //make a request to the url
    fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
    DisplayCity(data, name)
});
});
};

var formSubmitHandler = function(event) {
    event.preventDefault();
    //Get Value from input element
    var name = cityInputEl.value.trim();

    if (name) {
        getCurrentWeatherData(name);
        cityInputEl.value = "";
    }
    else {
        alert("Please enter a City name");
    }
    // console.log(event);
};

var DisplayCity = function(name) {
    citySearchName.textContent = name
    console.log(name);
}

userFormEl.addEventListener("submit", formSubmitHandler);