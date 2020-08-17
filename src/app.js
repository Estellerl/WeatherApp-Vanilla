function createDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minuites = date.getMinutes();
  if (minuites < 10) {
    minuites = `0${miniutes}`;
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
  let temparature = document.querySelector("#temp");
  temparature.innerHTML = Math.round(response.data.main.temp);
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
}

let apiKey = "b9dcade6ea8b84ffbd9565650e525892";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bordeaux&appid=${apiKey}&units=metric`;

axios.get(apiUrl).then(displayMainTemparature);

//To do:
//Need to capitalise only one letter for description of weather
