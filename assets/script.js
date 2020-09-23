var cityLat = "";
var cityLon = "";
var searches = [];
var cityButton;
var cityNameEl;
$(document).ready(function () {

    $("#weather-btn").on("click", function(event) {
        event.preventDefault();

    var citySearch = $("#weather-input").val().trim();

    console.log(citySearch);
    currentWeather(citySearch);

})


function currentWeather(cityName) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(data){
        $("#current-weather").empty();
        console.log(data);
        var weatherDiv = $("<div>");
        weatherDiv.addClass("card-body")
        var weatherCardDiv = $("<div>");
        weatherCardDiv.addClass("card");


        var temp =data.main.temp;
        var humidity = data.main.humidity;
        var wind = data.wind;
        cityLat = data.coord.lat;
        cityLon = data.coord.lon;
        console.log(cityLon);
        console.log(cityLat);
        var tempOutput = $("<h6>").text("Temperature: " + Math.floor((temp - 273.15) * 9/5 + 32) + "\xB0" + "F");
        var humOutput = $("<h6>").text("Humidity: " + humidity + "%");
        var windOutput = $("<h6>").text("Wind: " + wind.speed + "mph at " + wind.deg + " degrees.");
        

        weatherDiv.append(tempOutput);
        weatherDiv.append(humOutput);
        weatherDiv.append(windOutput);
    

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=current,minutely,hourly,alerts&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(forecastData){
        console.log(forecastData);
        $("#forecast").empty();

        for (i=0; i < 5; i++) {
        var forecastDiv = $("<div>");
        forecastDiv.addClass("card-body");
        var cardDiv = $("<div>");
        cardDiv.addClass("card");
        var dt = forecastData.daily[i].dt;
        var forecastTemp =forecastData.daily[i].temp.day;
        var forecastHum = forecastData.daily[i].humidity;
            console.log("time", moment.unix(dt).format("MMM Do YYYY"))

        var forecastDTOut = $("<h6>").text(moment.unix(dt).format("MMM Do YYYY"));
        var forecastTempOut = $("<h6>").text("Temperature: " + Math.floor((forecastTemp-273.15) * 9/5 +32) + "\xB0" + "F");
        var forecastHumOut = $("<h6>").text("Humidity: " + forecastHum + "%");
        forecastDiv.append(forecastDTOut);
        forecastDiv.append(forecastTempOut);
        forecastDiv.append(forecastHumOut);

        $(cardDiv).append(forecastDiv);
        $("#forecast").append(cardDiv);
        }

        var uvi = forecastData.daily[0].uvi;
        var uviOut = $("<h6>").text("UVI: " + uvi);
        var cityNameEl = data.name;
        var cityNameOut =  $("<h3>").text(cityNameEl);
        weatherDiv.prepend(cityNameOut);
        weatherDiv.append(uviOut);
        weatherCardDiv.append(weatherDiv);
        $("#current-weather").prepend(weatherCardDiv);

        searches.push(cityNameEl);
        cityButton = $("<button>");
        cityButton.text(cityNameEl);

        $("#search-column").prepend(cityButton);
        $(cityButton).on("click", function (searchAgain) {
            searchAgain.preventDefault();
            currentWeather(cityNameEl);
        })
    })})}})


    