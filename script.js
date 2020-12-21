// console.log('hello');

var apiKey = '44caa7ffd0618edcab3a952d49f6d96c'

//This builds the URL needed to query the database
var queryURL = `api.openweathermap.org/data/2.5/forecast?q=Sacramento&appid=${apiKey}`

//This runs the AJAX call to the OpenWeatherMap API
$.ajax({
    url: queryURL,
    method: "GET"
})

//This stores all the retrieved data inside of an object named "response"
.then(function(response) {

    //Log the queryURL
    console.log(queryURL);

    //Log the resulting object
    console.log(response);

    //Transfer content to HTML
    $(".city").html("<h1>" + response.name + " Weather Details</h1>");
    $(".wind").text("Wind Speed: " + response.wind.speed);
    $(".humidity").text("Humidity: " + response.main.hummidity);

    //Convert temperature to Fahrenheit
    var tempF = (response.main.temp - 273.15) * 1.80 + 32;

    //Add temperature content to html
    $(".temp").text("Temperature (K) " + response.main.temp);
    $(".tempF").text("Temperature (F) " + tempF.toFixed(2));  

}