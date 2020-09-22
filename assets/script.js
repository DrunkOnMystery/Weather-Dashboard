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

        console.log(data);
    })
}

function forecast(cityName) {

    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(data){

        console.log(data);
    })
}















































})