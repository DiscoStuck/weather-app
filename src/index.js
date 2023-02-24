import "/src/reset.css";
import "/src/styles.css";

// Getting report

async function getReport(city) {
  return fetch(
    "https://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "&appid=246e205230a52c204da000096f55bd93&units=metric"
  )
    .then((response) => response.json())
    .then((response) => {
      return response;
    });
}

// Displaying report

async function displayReport(city) {
  const json = await getReport(city);
  if (json.cod == "200") {
    // Description
    document.querySelector(".description").innerHTML =
      json.weather[0].description;
    // Icon
    document.querySelector(".icon").src =
      "http://openweathermap.org/img/w/" + json.weather[0].icon + ".png";
    // Temperature
    document.querySelector(".temperature").innerHTML =
      Math.floor(json.main.temp) + " C°";
    // City
    document.querySelector(".city").innerHTML = json.name;
    // Wind
    document.querySelector(".wind").innerHTML = json.wind.speed + " m/s";
    // Humidity
    document.querySelector(".humidity").innerHTML = json.main.humidity + " %";
    // Max Temperature
    document.querySelector(".maxTemp").innerHTML = json.main.temp_max + " °";
    // Min Temperature
    document.querySelector(".minTemp").innerHTML = json.main.temp_min + " °";
    // Background
    document.querySelector(
      "body"
    ).style.backgroundImage = `url('https://source.unsplash.com/random/? + ${city}')`;
  }
}

// Event Listener

const searchBar = document.querySelector("input");

searchBar.addEventListener("keyup", (e) => {
  if (e.key === "Enter") {
    console.log(searchBar.value);
    displayReport(searchBar.value);
  }
});

//Calling functions

getReport("Hanoi").then((response) => {
  console.log(response);
});

displayReport("Hanoi");
