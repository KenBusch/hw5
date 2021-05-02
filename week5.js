window.addEventListener('DOMContentLoaded', async function() {
    // Get a reference to the "get weather" button
    let getWeatherButton = document.querySelector(`.get-weather`)
  
    // When the "get weather" button is clicked:
    getWeatherButton.addEventListener(`click`, async function(event) {
      // - Ignore the default behavior of the button
      event.preventDefault()
  
      // - Get a reference to the element containing the user-entered location
      let locationInput = document.querySelector(`#location`)

      // - Get a reference to the element containing the user-entered days
      let daysInput = document.querySelector(`#days`)

      // - Get the user-entered location from the element's value
      let location = locationInput.value

      // - Get the user-entered location from the element's value
      let days = daysInput.value

      //Declaring some variables now for a totally optional feature later
      let dayForecastTitle
      if (days == 1) {
        dayForecastTitle = ``
      } else if (days == 2) {
        dayForecastTitle = ``
      } else if (days == 3) {
        dayForecastTitle = ``
      } else if (days == 0) {
        dayForecastTitle = `...Not much of a forecast if you want zero days eh?... Here's today anyway!`
      } else if (days < 0 ) {
        dayForecastTitle = `....You can't have a negative day forecast!... because that would be historical data as opposed to a forecast now wouldn't it? Enjoy Today's Weather Instead!`
      } else {
        dayForecastTitle = `...Sorry! Only up to 3 Days with the free API! What? Do you think I'm some sort of meteorologist?`
      }

      // - Check to see if the user entered anything; if so:
      if (location.length > 0) {
        // - Construct a URL to call the WeatherAPI.com API
        let url = `https://api.weatherapi.com/v1/forecast.json?key=53a0155e46494151b76200952212604&q=${location}&days=${days}`
  
        // - Fetch the url, wait for a response, store the response in memory
        let response = await fetch(url)
  
        // - Ask for the json-formatted data from the response, wait for the data, store it in memory
        let json = await response.json()
  
        // - Write the json-formatted data to the JavaScript console
        console.log(json)
  
        // - Store the returned location, current weather conditions, the forecast as three separate variables
        let interpretedLocation = json.location
        let currentWeather = json.current
        
        // Store a reference to the "current" element
        let currentElement = document.querySelector(`.current`)
  
        // Fill the current element with the location and current weather conditions
        currentElement.innerHTML = `
          <div class="text-center space-y-2">
            <div class="font-bold text-3xl">Current Weather for ${interpretedLocation.name}, ${interpretedLocation.region}</div>
            <div class="font-bold">
              <img src="https:${currentWeather.condition.icon}" class="inline-block">
              <span class="temperature">${currentWeather.temp_f}</span>° 
              and
              <span class="conditions">${currentWeather.condition.text}</span>
            </div>
          </div>
        `
        //Store a reference to the "current" element
        let forecastElement = document.querySelector(`.forecast`)

        //Fill the forecast element with forecast day title
        forecastElement.innerHTML = `
        <div class="text-center space-y-8">
        <div class="font-bold text-3xl">${days} Day Forecast ${dayForecastTitle}</div>
        `
        //Create for loop to loop through daily forcast data
        for (let i=0; i < json.forecast.forecastday.length; i++){

        //Declare variable for daily forecast Icon
        let dailyForecastIcon = json.forecast.forecastday[i].day.condition.icon
        //Declare variable for daily forecast Date
        let dailyForecastDate = json.forecast.forecastday[i].date
        //Declare variable for daily forecast Max Temp
        let dailyForecastMaxTemp = json.forecast.forecastday[i].day.maxtemp_f
        //Declare variable for daily forecast Min Temp
        let dailyForecastMinTemp = json.forecast.forecastday[i].day.mintemp_f
        //Declare variable for daily forecast Text
        let dailyForecastText = json.forecast.forecastday[i].day.condition.text

        //Fill the forecast element with the forecasted weather conditions
        forecastElement.insertAdjacentHTML(`beforeend`,`
        <div class = text-center>
          <img src="https:${dailyForecastIcon}" class="mx-auto">
          <h1 class="text-2xl text-bold text-gray-500">${dailyForecastDate}</h1>
          <h2 class="text-xl">High ${dailyForecastMaxTemp}° – Low ${dailyForecastMinTemp}°</h2>
          <p class="text-gray-500">${dailyForecastText}</h1>
        </div>
        `)
      }}
    })
  })