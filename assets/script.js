$(document).ready(function () {

$("#weather-btn").on("click", function(event) {
    event.preventDefault();
    console.log("clicked!");

    var citySearch = $("#weather-input").val().trim();

    console.log(citySearch);
    currentWeather(citySearch);
    forecast(citySearch);

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
        var tempOutput = $("<p>").text("Temperature: " + Math.floor((temp - 273.15) * 9/5 + 32) + "\xB0");
        var humOutput = $("<p>").text("Humidity: " + humidity);
        var windOutput = $("<p>").text("Wind: " + wind.speed + "mph at " + wind.deg + " degrees.");
        //response.daily[i].temp.max - 273.15) * 9/5 + 32) + "\xB0");

        // var temp = $("<p>").text("Current Temperature: " + temp);
        // var humidity = $("<p>").text("Current Humidity: " + humidity);
        // var wind = $("<p>").text("Current Wind Speed: " + wind);
        weatherDiv.append(tempOutput);
        weatherDiv.append(humOutput);
        weatherDiv.append(windOutput);

        $("#current-weather").prepend(weatherDiv);

    })
}

function forecast(cityName) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=current,minutely,hourly,alerts&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(forecastData){
        console.log(forecastData);
        $("#forecast").empty();
        
        // for (i=0; i<4; i++) {
        
        // var forecastDiv = $("<div>");
        // var date = forecastData.list[i].dt_txt;
        // var icon = forecastData.list[i].weather.icon;
        // var forecastTemp = forecastData.list[i].main.temp;
        // var forecastHum = forecastData.list[i].main.humidity;
        // var dateOutput = $("<p>").text(date);
        // var iconOutput = $("<p>").text(icon);
        // var forecastTempOutput = $("<p>").text("Temp: " + Math.floor((forecastTemp - 273.15) * 9/5 + 32) + "\xB0");
        // var forecastHumOutput = $("<p>").text("Humidity: " + forecastHum);

        // forecastDiv.append(dateOutput);
        // forecastDiv.append(iconOutput);
        // forecastDiv.append(forecastTempOutput);
        // forecastDiv.append(forecastHumOutput);

        // $("#forecast").prepend(forecastDiv);
        }
    })
}















































})