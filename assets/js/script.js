var pastCity = []
var city = ""
var key = "8afd31d9ff2d84f8448df6db8f666424"


function cityInput(event) {
    console.log(event)

    city = $("#inputCity").val().trim()
    // Fetch API 
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

        // $("#actCity") = activeCityVal;
        // $("#temp") = activeTempVal
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

    });


}

// Calling functions
$("#searchBtn").on("click", cityInput);