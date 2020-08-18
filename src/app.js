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

  return `${day} ${hours}: ${minuites}`;
}

function displayMainTemparature(response) {
  celciusTemp = response.data.main.temp;

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
}

function search(city) {
  let apiKey = "b9dcade6ea8b84ffbd9565650e525892";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayMainTemparature);
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
  let temparature = document.querySelector("#temp");
  temp.innerHTML = Math.round(celciusTemp);
}

let celciusTemp = null;

let conversiontoC = document.querySelector("#celcius");
conversiontoC.addEventListener("click", showCelcius);

let conversiontoF = document.querySelector("#faren");
conversiontoF.addEventListener("click", showFaren);

let form = document.querySelector("#searchEngine");
form.addEventListener("submit", enterSearch);

//To do:
//Need to capitalise only one letter for description of weather

// Add weather description to weather icon

//Add background city

//can you reload the page and bring it up to the top
