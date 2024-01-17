const APIkey = "5fe82d252dd8fa6c70f89de72b7ab0bd";
const limit = 6;

$("#search-button").on("click", function (event) {
  event.preventDefault();
  //find the city name
  let cityName = $("#search-input").val().trim();
  if (cityName.length < 2) {
    alert("City name must be at least 3 letter long");
    return;
  }
  callApi(cityName);
});

function callApi(cityName) {
  //creating a query url
  let queryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${APIkey}`;

  // an asynchronous request to retrieve JSON data
  $.getJSON(queryUrl)

    //if request is successful - execute callback function
    .done(function (geoData) {
      if (geoData.length !== 1) {
        alert("Can not find such city, try again, please.");
        return;
      }
      //todo: check that the city is the expected one and not just some random
      console.log(`found city ${JSON.stringify(geoData[0])}`);

      //creating a new URL for the second API call - with latitude and longitude from the geoData
      queryUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${geoData[0]["lat"]}&lon=${geoData[0]["lon"]}&appid=${APIkey}`;

      $.getJSON(queryUrl)
        .done(function (weatherData) {
          const dataWeather = `${JSON.stringify(weatherData)}`;
          console.log(`it is a dataweather: ${dataWeather}`);

          //add fetched data to the screen

          const todayDate = "   (" + dayjs().format("DD/M/YYYY") + ")";

          const icon = weatherData.list[0].weather[0].icon;
          const iconSrc = `https://openweathermap.org/img/wn/${icon}@2x.png`;
          const iconImg = $("<img>").attr("src", iconSrc);

          const mainInfo = cityName + todayDate;

          const temperature = $("<p>").text(
            `Temp: ${Math.round(weatherData.list[0].main.temp - 273.15)}°C`
          );

          const wind = $("<p>").text(
            `Wind: ${weatherData.list[0].wind.speed} KPH`
          );

          const humidity = $("<p>").text(
            `Humidity: ${weatherData.list[0].main.humidity} %`
          );

          $("#today").append(mainInfo, iconImg, temperature, wind, humidity);
          $("#today").addClass("today-weather");
          // todo: got weather data, add city to the list
        })
        //If the Weather API call fails - an alert is shown
        .fail(function () {
          alert("Could not get city data");
        });
    })
    //If the Geo API call fails - an alert is shown
    .fail(function () {
      alert("Could not find such city");
    });
}
