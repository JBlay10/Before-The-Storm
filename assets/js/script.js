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
        activeHumidityVal = data['main']['humidity']
        iconVal = data['weather'][0]['icon']

        $("#actCity") = activeCityVal;
        $("#temp") = activeTempVal
        $("#wind") = Math.trunc(activeWindVal)
        $("#humidity") = Math.trunc(activeHumidityVal)
        $("#weatherIcon") = iconVal

        // Kelvin to °F convertion
        $("#temp") = (($("#temp") - 273.15) * 1.8) + 32;
        $("#temp") = Math.trunc($("#temp"))

        //Display fetch data
        $("#actCity").text(" " + $("#actCity"))

    });


}

// Calling functions
$("#searchBtn").on("click", cityInput);