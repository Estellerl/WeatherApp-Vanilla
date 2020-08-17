function displayTemparature(response) {
  console.log(response.data);
}

let city = "New York";
let apiKey = "b9dcade6ea8b84ffbd9565650e525892";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

console.log(apiUrl);

axios.get(apiUrl).then(displayTemparature);
