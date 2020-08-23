function createDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuites = date.getMinutes();
  if (minuites < 10) {
    minuites = `0${minuites}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];

  return `${day} ${formatHours(timestamp)}`;
}

function displayMainTemparature(response) {
  celciusTemp = response.data.main.temp;

  sunriseTime = response.data.sys.sunrise;

  sunsetTime = response.data.sys.sunset;

  let temparature = document.querySelector("#temp");
  temparature.innerHTML = Math.round(celciusTemp);

  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = response.data.name;

  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.weather[0].description;

  let windElement = document.querySelector("#wind");
  windElement.innerHTML = Math.round(response.data.wind.speed);

  let humidityElement = document.querySelector("#hum");
  humidityElement.innerHTML = response.data.main.humidity;

  let dateElement = document.querySelector("#currentDate");
  dateElement.innerHTML = createDate(response.data.dt * 1000);

  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `https://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  //let sunriseElement = document.querySelector("#sunrise");
  //sunriseElement.innerHTML = formatHours(response.data.sys.sunrise * 1000);

  //let sunsetElement = document.querySelector("#sunset");
  //sunsetElement.innerHTML = formatHours(response.data.sys.sunset * 1000);
}

function formatHours(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuites = date.getMinutes();
  if (minuites < 10) {
    minuites = `0${minuites}`;
  }

  return `${hours}:${minuites}`;
}

function displayFutureForcast(response) {
  let forcastElement = document.querySelector("#forcast");
  forcastElement.innerHTML = null;
  let forcast = null;

  for (let index = 0; index < 5; index++) {
    forcast = response.data.list[index];
    forcastElement.innerHTML += `
  
<div class="row weather-forecast" id="forcast">
        <div class="col-1" id="cast">
          <div id ="time">
           ${formatHours(forcast.dt * 1000)} 
          </div>
         <div id ="img"> <img
        src="http://openweathermap.org/img/wn/${forcast.weather[0].icon}@2x.png"
      /> </div>
          <div class="weather-forecast-temperature" id="degreesTemp">
            <strong>${Math.round(forcast.main.temp_max)}</strong>° ${Math.round(
      forcast.main.temp_min
    )}°
          </div>
        </div>
      </div>`;
  }
}

function search(city) {
  let apiKey = "b9dcade6ea8b84ffbd9565650e525892";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayMainTemparature);

  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayFutureForcast);

  //apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  //axios.get(apiUrl).then(showSunrise);
}

function enterSearch(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#cityInput");
  search(cityInputElement.value);
}

function showFaren(event) {
  event.preventDefault();
  let farenTemp = (celciusTemp * 9) / 5 + 32;
  conversiontoC.classList.remove("active");
  conversiontoF.classList.add("active");
  let temparature = document.querySelector("#temp");
  temparature.innerHTML = Math.round(farenTemp);
}

function showCelcius(event) {
  event.preventDefault();
  conversiontoF.classList.remove("active");
  conversiontoC.classList.add("active");
  let temp = document.querySelector("#temp");
  temp.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let conversiontoC = document.querySelector("#celcius");
conversiontoC.addEventListener("click", showCelcius);

let conversiontoF = document.querySelector("#faren");
conversiontoF.addEventListener("click", showFaren);

let form = document.querySelector("#searchEngine");
form.addEventListener("submit", enterSearch);

function searchCurrentLocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "21d207d4e5449385a0586090096515c7";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayMainTemparature);
  apiUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayFutureForcast);
}

function currentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchCurrentLocation);
}

let currentLoc = document.querySelector("#currentLocation");
currentLoc.addEventListener("click", currentLocation);

search("Bordeaux");

//To do:
//Need to capitalise only one letter for description of weather

// Add weather description to weather icon

//can you reload the page and bring it up to the top

//remove what you have searched for
