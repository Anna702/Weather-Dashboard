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
          console.log(`Got weatherData ${JSON.stringify(weatherData)}`);
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
