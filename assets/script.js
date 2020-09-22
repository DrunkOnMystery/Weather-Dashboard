var cityLat = "";
var cityLon = "";
$(document).ready(function () {

$("#weather-btn").on("click", function(event) {
    event.preventDefault();
    console.log("clicked!");

    var citySearch = $("#weather-input").val().trim();

    console.log(citySearch);
    currentWeather(citySearch);
    // forecast(citySearch);

})


function currentWeather(cityName) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(data){
        $("current-weather").empty();
        console.log(data);
        var weatherDiv = $("<div>");
        var temp =data.main.temp;
        var humidity = data.main.humidity;
        var wind = data.wind;
        cityLat = data.coord.lat;
        cityLon = data.coord.lon;
        console.log(cityLon);
        console.log(cityLat);
        var tempOutput = $("<p>").text("Temperature: " + Math.floor((temp - 273.15) * 9/5 + 32) + "\xB0" + "F");
        var humOutput = $("<p>").text("Humidity: " + humidity + "%");
        var windOutput = $("<p>").text("Wind: " + wind.speed + "mph at " + wind.deg + " degrees.");
        weatherDiv.append(tempOutput);
        weatherDiv.append(humOutput);
        weatherDiv.append(windOutput);

        

//     })
// }

// function forecast(cityName) {
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=current,minutely,hourly,alerts&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(forecastData){
        console.log(forecastData);
        $("#forecast").empty();

        for (i=0; i < 5; i++) {
        var forecastDiv = $("<div>");
        var dt = forecastData.daily[i].dt;
        var forecastTemp =forecastData.daily[i].temp.day;
        var forecastHum = forecastData.daily[i].humidity;
            console.log("time", moment.unix(dt).format("MMM Do YYYY"))

        var forecastDTOut = $("<p>").text("Date: " + moment.unix(dt).format("MMM Do YYYY"));
        var forecastTempOut = $("<p>").text("Temperature: " + Math.floor((forecastTemp-273.15) * 9/5 +32) + "\xB0" + "F");
        var forecastHumOut = $("<p>").text("Humidity: " + forecastHum + "%");
        forecastDiv.append(forecastDTOut);
        forecastDiv.append(forecastTempOut);
        forecastDiv.append(forecastHumOut);

        $("#forecast").append(forecastDiv);
        }

        var uvi = forecastData.daily[0].uvi;
        var uviOut = $("<div>").text("UVI: " + uvi);
        weatherDiv.append(uviOut);
        $("#current-weather").prepend(weatherDiv);

    })})}})
