var getCurrentWeatherData = function(cityName) {
    //format the github apiUrl to grab weather for a specific city
    var apiUrl = "http://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=642eea345e5cbf72aef7bc5c87e8b7e2" 

    //make a request to the url
    fetch(apiUrl).then(function(response) {
    response.json().then(function(data) {
    console.log(data);
});
});
};


getCurrentWeatherData("New York");