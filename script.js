$(document).ready(function () {
    var cities = []
    var clear = `http://openweathermap.org/img/wn/01d@2x.png`
    var fewClouds = `http://openweathermap.org/img/wn/02d@2x.png`
    var scatteredClouds = `http://openweathermap.org/img/wn/03d@2x.png`
    var brokenClouds = `http://openweathermap.org/img/wn/04d@2x.png`
    var showerRain = `http://openweathermap.org/img/wn/09d@2x.png`
    var rain = `http://openweathermap.org/img/wn/10d@2x.png`
    var thunderStorm = `http://openweathermap.org/img/wn/11d@2x.png`
    var snow = `http://openweathermap.org/img/wn/13d@2x.png`

    //Creating a variable where the city name is equal to the user input


    $(".search").on("click", (e) => {
        e.preventDefault()
        var cityName = $("#userinput").val().trim()
        start(cityName)
        cities.push(cityName)
    })
    //Storing the api key in a variable
    var apiKey = '44caa7ffd0618edcab3a952d49f6d96c'



    function start(cityName) {
        //This builds the URL needed to query the database
        var queryURL = `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&appid=${apiKey}`

        //This runs the AJAX call to the OpenWeatherMap API
        $.ajax({
            url: queryURL,
            method: "GET"
        })

            //This stores all the retrieved data inside of an object named "response"
            .then(function (response) {

                //Log the queryURL
                console.log(queryURL);

                //Log the resulting object
                console.log(response);
                //Transfer content to HTML
                $(".city").html("<h1>" + response.city.name + " Weather Details</h1>");
                $(".wind").text("Wind Speed: " + response.list[0].wind.speed);
                $(".humidity").text("Humidity: " + response.list[0].main.humidity);

                //Convert temperature to Fahrenheit
                var tempF = (response.list[0].main.temp - 273.15) * 1.80 + 32;

                //Add temperature content to html
                $(".tempF").text("Temperature (F) " + tempF.toFixed(2));

                for (var i = 0; i < response.list.length; i += 8) {

                    $(`.date${i}`).text(response.list[i].dt_txt.slice(0, -9))
                    $(`.humidity${i}`).text(response.list[i].main.humidity)
                    $(`.temp${i}`).text(response.list[i].main.temp)

                    switch(response.list[i].weather[0].icon){
                        case `01d` || `01n`:
                            $(`.icon${i}`).attr(`src`, clear)
                    }

                }

            })
    }

})