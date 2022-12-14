var pastCity = []
var city = ""
var key = "8afd31d9ff2d84f8448df6db8f666424"
var historyList = $("#searchHistory");

// Local storage for city search
var lastCity = JSON.parse(localStorage.getItem("lastCity")) || pastCity;
lastCity.forEach(city => {
    historyList = $(`<li class="list-group-item list-group-item-secondary" id="work">${city}</li>`);
    $("#searchHistory").append(historyList);
})

// Main function that displays weather content
function cityInput(event) {
    console.log(event)

    // Local storage display
    city = $("#inputCity").val().trim()
    lastCity.push(city)
    historyList = $(`<li class="list-group-item list-group-item-secondary" id="work">${city}</li>`);
    $("#searchHistory").append(historyList)
    localStorage.setItem("lastCity", JSON.stringify(lastCity))
    
    // Fetch weather API 
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
    .then((response) => response.json())
    .then((data) =>{
        console.log(data)

        // Adding fetch data to variables
        activeCityVal = data['name']
        activeTempVal = data['main']['temp']
        activeWindVal = data['wind']['speed']
        activeHumiVal = data['main']['humidity']
        weathrIconVal = data['weather'][0]['icon']
        activeLatitude = data['coord']['lat']
        activeLongitude = data['coord']['lon']

        // Removing decimal points
        activeWindVal = Math.trunc(activeWindVal)
        activeHumiVal = Math.trunc(activeHumiVal)

        // Kelvin to °F convertion
        activeTempVal = ((activeTempVal - 273.15) * 1.8) + 32;
        activeTempVal = Math.trunc(activeTempVal)

        //Display fetch data
        $("#actCity").text(" " + activeCityVal)
        $('#temp').text(" " + (activeTempVal) + '°F');
        $("#humidity").text(" " + activeHumiVal + "%");
        $("#wind").text(" " + activeWindVal + "mph");
        $(".weatherIcon").attr(
            "src",
            " http://openweathermap.org/img/wn/" + weathrIconVal +"@2x.png" 
        );

        // Active weather date (not displaying)
        $("#date").text(moment().format('ll'));

        Lat = activeLatitude
        Lon = activeLongitude
        // Fetch for the UV rays
        fetch(`https://api.openweathermap.org/data/2.5/uvi?appid=${key}&lat=${Lat}&lon=${Lon}`)
            .then(response => response.json())
            .then(data =>{
                console.log(data)

                // Adding fetch data to variable
                activeUvVal = data['value']
                activeUvVal = Math.trunc(activeUvVal);

                $("#Uv").text(" " + activeUvVal)

                if (activeUvVal >= 0 && activeUvVal <= 2) {
                    $("#Uv").text(" " + activeUvVal + " Low").css("color", "#3EA72D");
                } else if (activeUvVal >= 3 && activeUvVal <= 5) {
                    $("#Uv").text(" " + activeUvVal + " Moderate").css("color", "#EBEB00").css("font-weight", "bold");
                } else if (activeUvVal >= 6 && activeUvVal <= 7) {
                    $("#Uv").text(" " + activeUvVal + " High").css("color", "#F18B00").css("font-weight", "bold");
                } else if (activeUvVal >= 8 && activeUvVal <= 10) {
                    $("#Uv").text(" " + activeUvVal + " Very High").css("color", "#E53210");
                } else {
                    $("#Uv").text(" " + activeUvVal + " Extreme").css("color", "#B567A4"); 
                }; 

                // Fetch 5 day forcast API (not displaying but fetching data successfull)
                fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${Lat}&lon=${Lon}&appid=${key}&exclude=minutely,hourly`)
                .then(response => response.json())
                .then(data =>{
                    console.log(data);

                    var days = 0;
                    // Adding function for pull and display of 5 day forecast
                    for(let i = 6; i < 40; i += 8) {
                        var forecast = data.list[i]
                        var futureTemp = forecast.main.temp
                        var futureHum = forecast.main.humidity
                        var futureWind = forecast.wind.speed
                        var [date] = forecast.dt_txt.split(" ")
                        var icon = forecast.weather[0].icon
                        
                        // Temperture convertion to °F and removing decimal points
                        futureTemp = ((futureTemp-273.15)*1.8)+32;
                        futureTemp = Math.trunc(futureTemp)
                        futureWind = Math.trunc(futureWind)
                        
                        // Display content in 5 day forecast (not displaying)
                        $("#date" + days).text(date);
                        $("#temp" + days).text(" " + (futureTemp) + "°F");
                        $("#humidity" + days).text(" " + futureHum + "%");
                        $("#wind" + days).text(" " + futureWind + "mph");
                        $(".weatherIcon" + days).attr(
                            "src",
                            "http://openweathermap.org/img/wn/" + icon +"@2x.png" 
                        );
                        days++
                    }
                })
            })
    });
}

// Function to clear History
function deleteHistory(event) {
    console.log(event)
    pastCity = []
    localStorage.removeItem("lastCity");
    document.location.reload();
}

// Calling functions
$("#clearHistory").on("click", deleteHistory);
$("#searchBtn").on("click", cityInput);