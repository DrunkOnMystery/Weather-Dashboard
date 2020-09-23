//Establish global variables

var cityLat = "";
var cityLon = "";
var searches = [];
var cityButton;
var cityNameEl;

//Set function for opening of page
$(document).ready(function () {

//Set onclick actions for weather button
    $("#weather-btn").on("click", function(event) {
        event.preventDefault();

    var citySearch = $("#weather-input").val().trim();

    console.log(citySearch);
    currentWeather(citySearch);

})

//Set the many, many actions to be taken when the weather input button is clicked
function currentWeather(cityName) {

//Set the ajax for the first api to be grabbed
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(data){
        $("#current-weather").empty();
        console.log(data);

//Creating divs for the cards to be put into
        var weatherDiv = $("<div>");
        weatherDiv.addClass("card-body");
        var weatherCardDiv = $("<div>");
        weatherCardDiv.addClass("card");

//Creating temporary variables for the application
        var temp =data.main.temp;
        var humidity = data.main.humidity;
        var wind = data.wind;
        cityLat = data.coord.lat;
        cityLon = data.coord.lon;

//Creating output variables for the three key factors being pulled from this API       
        var tempOutput = $("<h4>").text("Temperature: " + Math.floor((temp - 273.15) * 9/5 + 32) + "\xB0" + "F");
        var humOutput = $("<h4>").text("Humidity: " + humidity + "%");
        var windOutput = $("<h4>").text("Wind: " + wind.speed + "mph at " + wind.deg + " degrees.");
        
//Appending those new outputs to the weatherDiv
        weatherDiv.append(tempOutput);
        weatherDiv.append(humOutput);
        weatherDiv.append(windOutput);
    
//Set the ajax for the second api by plugging the latitude and longitude variables from the first ajax into the search
    $.ajax({
        method: "GET",
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + cityLat + "&lon=" + cityLon + "&exclude=current,minutely,hourly,alerts&appid=b5f7425c4176b3da6c51c8c289b206a6"
    })

    .then(function(forecastData){
        console.log(forecastData);
        $("#forecast").empty();

//Create a for-loop to make the 5 day forecast work properly        
        for (i=0; i < 5; i++) {

//Create a pair of divs, one inside the other, to establish card relationships            
        var forecastDiv = $("<div>");
        forecastDiv.addClass("card-body");
        var cardDiv = $("<div>");
        cardDiv.addClass("card2 card");

//Grab the variables needed for the five day forecast
        var dt = forecastData.daily[i].dt;
        var forecastTemp =forecastData.daily[i].temp.day;
        var forecastHum = forecastData.daily[i].humidity;
        console.log("time", moment.unix(dt).format("MMM Do YYYY"))

//Create output variables
        var forecastDTOut = $("<h5>").text(moment.unix(dt).format("MMM Do YYYY"));
        var forecastTempOut = $("<h5>").text("Temperature: " + Math.floor((forecastTemp-273.15) * 9/5 +32) + "\xB0" + "F");
        var forecastHumOut = $("<h5>").text("Humidity: " + forecastHum + "%");
 
//Append output variables to the forecast Div        
        forecastDiv.append(forecastDTOut);
        forecastDiv.append(forecastTempOut);
        forecastDiv.append(forecastHumOut);

//Append the forecastDiv to the cardDiv and the cardDiv into the html
        $(cardDiv).append(forecastDiv);
        $("#forecast").append(cardDiv);
        }

//Grab the uvi variable from the second ajax that is needed for today's weather
        var uvi = forecastData.daily[0].uvi;
        var uviDiv = $("<div>");
        uviDiv.addClass("card3");
        var uviOut = $("<h4>").text("UVI: " + uvi);

//Append the UVI into the WeatherDiv
        uviDiv.append(uviOut);
        weatherDiv.append(uviDiv);

//Create a series of questions to determine the background color of the UVI div        
        if (uvi < 2) {
            uviDiv.addClass("background-color-green");
        }

        else if (uvi >= 2 && uvi < 6) {
            uviDiv.addClass("background-color-yellow");
        }

        else if (uvi >= 6 && uvi < 9) {
            uviDiv.addClass("background-color-orange");
        }

        else {
            uviDiv.addClass("background-color-red");
        }

//Appending the city name into the forecast       
        var cityNameEl = data.name;
        var cityNameOut =  $("<h3>").text(cityNameEl);
        weatherDiv.prepend(cityNameOut);
        weatherCardDiv.append(weatherDiv);
        $("#current-weather").prepend(weatherCardDiv);

//Creating a new button with each search with the city name as its text        
        searches.push(cityNameEl);
        cityButton = $("<button>");
        cityButton.text(cityNameEl);        
        $("#search-column").prepend(cityButton);

//Establish actions to take if one of the newly created city buttons is pressed        
        $(cityButton).on("click", function (searchAgain) {
            searchAgain.preventDefault();
            currentWeather(cityNameEl);
        })
    })})}})


    