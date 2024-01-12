// - Create a weather dashboard with form inputs.
//   - When a user searches for a city they are presented with current and future conditions for that city and that city is added to the search history
const APIkey = "5fe82d252dd8fa6c70f89de72b7ab0bd";

const cityName = $("#search-input").val().trim();

const limit = 6;

$("#search-button").on("click", function (event) {
  event.preventDefault();
  console.log(cityName);
});

createQueryUrl();

function createQueryUrl() {
  const queryUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${APIkey}`;

  console.log(queryUrl);
  console.log("I am here");
}

// function searchForCity() {

// }

//   - When a user views the current weather conditions for that city they are presented with:
//     - The city name
//     - The date
//     - An icon representation of weather conditions
//     - The temperature
//     - The humidity
//     - The wind speed
//   - When a user view future weather conditions for that city they are presented with a 5-day forecast that displays:
//     - The date
//     - An icon representation of weather conditions
//     - The temperature
//     - The humidity
//   - When a user click on a city in the search history they are again presented with current and future conditions for that city
