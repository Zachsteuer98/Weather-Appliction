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
var fiveDaySection = document.getElementById("fiveDaySection");
var currentWeather = document.getElementById("currentWeatherBox");

var cityNames = []

var getCurrentWeatherData = function(name) {
    //format the github apiUrl to grab weather for a specific city
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + name + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2&units=imperial" 

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
    currentWeather.classList.remove("hide")
    DisplayCity(name, temp, speed, humidity, icon)


    //fetch call for 5 day forecast wouldn't accept appid, so I used the daily 3 hour forecast instead.
    var fiveDayFetchCall = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2&units=imperial"
    
    //make a request to the url
    fetch(fiveDayFetchCall)
    .then(function(response){
    response.json().then(function(data){
    console.log(data)
    //data day 1
    const dateOne = data.list[9].dt
    const tempOne = data.list[9].main.temp
    const windOne = data.list[9].wind.speed
    const humidityOne = data.list[9].main.humidity
    const icon1 = data.list[9].weather[0].icon
    console.log("icon", icon)
    listDay1.innerHTML = ''
    fiveDaySection.classList.remove("hide")
    dayOneForecast(dateOne, tempOne, windOne, humidityOne, icon1)
    //data day 2
    const dateTwo = data.list[17].dt
    const tempTwo = data.list[17].main.temp
    const windTwo = data.list[17].wind.speed
    const humidityTwo = data.list[17].main.humidity
    const icon2 = data.list[17].weather[0].icon
    listDay2.innerHTML = ''
    dayTwoForecast(dateTwo, tempTwo, windTwo, humidityTwo, icon2)
    //data day 3
    const dateThree = data.list[25].dt
    const tempThree = data.list[25].main.temp
    const windThree = data.list[25].wind.speed
    const humidityThree = data.list[25].main.humidity
    const icon3 = data.list[25].weather[0].icon
    listDay3.innerHTML = ''
    dayThreeForecast(dateThree, tempThree, windThree, humidityThree, icon3)
    //data day 4
    const dateFour = data.list[33].dt
    const tempFour = data.list[33].main.temp
    const windFour = data.list[33].wind.speed
    const humidityFour = data.list[33].main.humidity
    const icon4 = data.list[33].weather[0].icon
    listDay4.innerHTML = ''
    dayFourForecast(dateFour, tempFour, windFour, humidityFour, icon4)
    //data day 5
    const dateFive = data.list[39].dt
    const tempFive = data.list[39].main.temp
    const windFive = data.list[39].wind.speed
    const humidityFive = data.list[39].main.humidity
    const icon5 = data.list[39].weather[0].icon
    listDay5.innerHTML = ''
    dayFiveForecast(dateFive, tempFive, windFive, humidityFive, icon5)
        })
    })

    var uvIndex = "https://api.openweathermap.org/data/2.5/onecall?lat=" +lat + "&lon=" + lon + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2"
    fetch(uvIndex)
    .then(function(response) {
    return response.json() })
    .then(function(data) {
    console.log("UV Index", data)
    const { uvi } = data.daily[0]
    console.log(uvi)
    DisplayUV(uvi)
    })
});  
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
        cityNames.push(name);
        console.log(name);
        localStorage.setItem('cities', JSON.stringify(cityNames))
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
        console.log(name)
        getCurrentWeatherData(name)
    })
    recentSearch.appendChild(buttonEl);
}

var DisplayCity = function(name, temp, wind, humidity, icon) {
    
    let iconURL = "https://openweathermap.org/img/w/" + icon + ".png";
    
    let currentWeatherIcon = `
    <img src="${iconURL}">`

    $('#currentWeather').html(currentWeatherIcon)

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

var DisplayUV= function(uvi) {
var UV = document.createElement("li");
UV.setAttribute('id', 'uvVal')
UV.textContent = "UV Index: " + uvi;
listGroupEl.appendChild(UV);

    if (uvi>=0 && uvi<3){
        UV.setAttribute("class", "uv-favorable");
    } else if (uvi>=3 && uvi<8){
        UV.setAttribute("class", "uv-moderate");
    } else if (uvi>=8){
        UV.setAttribute("class", "uv-severe");
    }
};


var dayOneForecast = function(dateOne, tempOne, windOne, humidityOne, icon1) {
    console.log(dateOne)
    dateDayOne.textContent = moment.unix(dateOne).format("MM/DD/YYYY");
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempOne + " F";
listDay1.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windOne + " MPH";
listDay1.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityOne + " %";
listDay1.appendChild(humidity);

let iconURL = "https://openweathermap.org/img/w/" + icon1 + ".png";
let currentWeatherIcon = `
    <img src="${iconURL}">`

    $('#iconOne').html(currentWeatherIcon)
}

var dayTwoForecast = function(dateTwo, tempTwo, windTwo, humidityTwo, icon2) {
    dateDayTwo.textContent = moment.unix(dateTwo).format("MM/DD/YYYY");
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempTwo + " F";
listDay2.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windTwo + " MPH";
listDay2.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityTwo + " %";
listDay2.appendChild(humidity);

let iconURL = "https://openweathermap.org/img/w/" + icon2 + ".png";
let currentWeatherIcon2 = `
    <img src="${iconURL}">`

    $('#iconTwo').html(currentWeatherIcon2)
}

var dayThreeForecast = function(dateThree, tempThree, windThree, humidityThree, icon3) {
    dateDayThree.textContent = moment.unix(dateThree).format("MM/DD/YYYY");
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempThree + " F";
listDay3.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windThree + " MPH";
listDay3.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityThree + " %";
listDay3.appendChild(humidity);

let iconURL = "https://openweathermap.org/img/w/" + icon3 + ".png";
let currentWeatherIcon3 = `
    <img src="${iconURL}">`

    $('#iconThree').html(currentWeatherIcon3)
}

var dayFourForecast = function(dateFour, tempFour, windFour, humidityFour, icon4) {
    dateDayFour.textContent = moment.unix(dateFour).format("MM/DD/YYYY");
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempFour + " F";
listDay4.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windFour + " MPH";
listDay4.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityFour + " %";
listDay4.appendChild(humidity);

let iconURL = "https://openweathermap.org/img/w/" + icon4 + ".png";
let currentWeatherIcon4 = `
    <img src="${iconURL}">`

    $('#iconFour').html(currentWeatherIcon4)
}

var dayFiveForecast = function(dateFive, tempFive, windFive, humidityFive, icon5) {
    dateDayFive.textContent = moment.unix(dateFive).format("MM/DD/YYYY");
var temperature = document.createElement('li');
temperature.textContent = "Temp: " + tempFive + " F";
listDay5.appendChild(temperature);
var wind = document.createElement('li');
wind.textContent = "Wind: " + windFive + " MPH";
listDay5.appendChild(wind);
var humidity = document.createElement('li');
humidity.textContent = "Humidity: " + humidityFive + " %";
listDay5.appendChild(humidity);

let iconURL = "https://openweathermap.org/img/w/" + icon5 + ".png";
let currentWeatherIcon5 = `
    <img src="${iconURL}">`

    $('#iconFive').html(currentWeatherIcon5)
}

userFormEl.addEventListener("submit", formSubmitHandler);




