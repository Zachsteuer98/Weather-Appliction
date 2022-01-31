var userFormEl = document.querySelector("#user-form");
var cityInputEl = document.querySelector("#citySearch");
var citySearchName = document.querySelector("#city-search-name");
var listGroupEl= document.getElementById("currentDayContent");
var dateDayOne =document.getElementById("date1");
var dateDayTwo = document.getElementById("date2");
var dateDayThree = document.getElementById("date3");
var dateDayFour = document.getElementById("date4");
var dateDayFive = document.getElementById("date5");
var listDay1 = document.getElementById("dayOneContent");
var listDay2 = document.getElementById("dayTwoContent");
var listDay3 = document.getElementById("dayThreeContent");
var listDay4 = document.getElementById("dayFourContent");
var listDay5 = document.getElementById("dayFiveContent");
var cityIdCounter = 0;
var submitButton = document.querySelector(".btn")
var recentSearch = document.querySelector("#city-results")

var cityNames = []

var getCurrentWeatherData = function(name) {
    //format the github apiUrl to grab weather for a specific city
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2&units=imperial" 

    //make a request to the url
    fetch(apiUrl)
    .then(function(response) {
    response.json().then(function(data) {
    const {lon, lat}= data.coord 
    const  {name} = data
    const {speed} = data.wind
    const  {icon} = data.weather[0]
    const {temp, humidity} = data.main
    listGroupEl.innerHTML = ''
    DisplayCity(name, temp, speed, humidity)

    var fiveDayFetchCall = "http://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2&units=imperial"
    
    //make a request to the url
    fetch(fiveDayFetchCall)
    .then(function(response){
    response.json().then(function(data){
    console.log(data)
    //data day 1
    const dateOne = data.list[1].dt_txt
    const tempOne = data.list[1].main.temp
    const windOne = data.list[1].wind.speed
    const humidityOne = data.list[1].main.humidity
    listDay1.innerHTML = ''
    dayOneForecast(dateOne, tempOne, windOne, humidityOne)
    //data day 2
    const dateTwo = data.list[9].dt_txt
    const tempTwo = data.list[9].main.temp
    const windTwo = data.list[9].wind.speed
    const humidityTwo = data.list[9].main.humidity
    listDay2.innerHTML = ''
    dayTwoForecast(dateTwo, tempTwo, windTwo, humidityTwo)
    //data day 3
    const dateThree = data.list[17].dt_txt
    const tempThree = data.list[17].main.temp
    const windThree = data.list[17].wind.speed
    const humidityThree = data.list[17].main.humidity
    listDay3.innerHTML = ''
    dayThreeForecast(dateThree, tempThree, windThree, humidityThree)
    //data day 4
    const dateFour = data.list[25].dt_txt
    const tempFour = data.list[25].main.temp
    const windFour = data.list[25].wind.speed
    const humidityFour = data.list[25].main.humidity
    listDay4.innerHTML = ''
    dayFourForecast(dateFour, tempFour, windFour, humidityFour)
    //data day 5
    const dateFive = data.list[33].dt_txt
    const tempFive = data.list[33].main.temp
    const windFive = data.list[33].wind.speed
    const humidityFive = data.list[33].main.humidity
    listDay5.innerHTML = ''
    dayFiveForecast(dateFive, tempFive, windFive, humidityFive)
        })
    })
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
    cityNames = JSON.parse(localStorage.getItem("cities")) || []
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
        console.log('hello')
        if (cityNames.indexOf(name) === -1) {
         addToList(name)
        }
        getCurrentWeatherData(name);
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
    buttonEl.addEventListener('click', function() {
        var name = this.textContent
        getCurrentWeatherData(name)
    })
    recentSearch.appendChild(buttonEl);
}

var DisplayCity = function(name, temp, wind, humidity) {
    citySearchName.textContent = name
    // console.log(name);
var temperature = document.createElement("li");
temperature.textContent = "Temp: " + temp + " F";
listGroupEl.appendChild(temperature);
var windSpeed = document.createElement("li");
windSpeed.textContent = "Wind: " + wind + " MPH";
listGroupEl.appendChild(windSpeed);
var humidityOutside = document.createElement("li");
humidityOutside.textContent = "Humidity: " + humidity + " %";
listGroupEl.appendChild(humidityOutside);
}

var dayOneForecast = function(dateOne, tempOne, windOne, humidityOne) {
    dateDayOne.textContent = dateOne
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempOne + " F";
listDay1.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windOne + " MPH";
listDay1.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityOne + " %";
listDay1.appendChild(humidity);
}

var dayTwoForecast = function(dateTwo, tempTwo, windTwo, humidityTwo) {
    dateDayTwo.textContent = dateTwo
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempTwo + " F";
listDay2.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windTwo + " MPH";
listDay2.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityTwo + " %";
listDay2.appendChild(humidity);
}

var dayThreeForecast = function(dateThree, tempThree, windThree, humidityThree) {
    dateDayThree.textContent = dateThree
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempThree + " F";
listDay3.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windThree + " MPH";
listDay3.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityThree + " %";
listDay3.appendChild(humidity);
}

var dayFourForecast = function(dateFour, tempFour, windFour, humidityFour) {
    dateDayFour.textContent = dateFour
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempFour + " F";
listDay4.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windFour + " MPH";
listDay4.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityFour + " %";
listDay4.appendChild(humidity);
}

var dayFiveForecast = function(dateFive, tempFive, windFive, humidityFive) {
    dateDayFive.textContent = dateFive
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempFive + " F";
listDay5.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windFive + " MPH";
listDay5.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityFive + " %";
listDay5.appendChild(humidity);
}

userFormEl.addEventListener("submit", formSubmitHandler);




