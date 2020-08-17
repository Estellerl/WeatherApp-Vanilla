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
}

let apiKey = "b9dcade6ea8b84ffbd9565650e525892";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Bordeaux&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayMainTemparature);
