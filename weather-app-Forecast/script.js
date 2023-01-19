let result = document.getElementById("result");
let searchBtn = document.getElementById("search-btn");
let seven = document.getElementById("seven-day")
let cityRef = document.getElementById("city");
let p = document.getElementById("coords")

function unixToDay(timestamp) {
    let date = new Date(timestamp*1000);
    let weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let weekday = weekdays[date.getDay()];
    return weekday;
  }

function mpsToMph(mps) {
    return Math.round(mps/.44704);
  }


function kelvinToFahrenheit(kelvin) {
    return Math.round(kelvin * (9/5) - 459.67);
  }


function locationButtonClick (){
    console.log ("button was clicked", $("#zip").val());
    getWeatherData($("#zip").val());
    $(".displayCondition").css("display", "inline-block");
  }




let getWeather = () => {
    result.innerHTML =`
 <div id="grid-container">
   <div class="grid-child-1">
    <h3 id="day0"></h3>
    <h2 id="high0"></h2>
    <h2 id="low0"></h2>
    <h3 id="weather_desc0"></h3>
  </div><div class="grid-child-2">
    <h3 id="day1"></h3>
    <h2 id="high1"></h2>
    <h2 id="low1"></h2>
    <h3 id="weather_desc1"></h3>
  </div><div class="grid-child-3">
    <h3 id="day2"></h3>
    <h2 id="high2"></h2>
    <h2 id="low2"></h2>
    <h3 id="weather_desc2"></h3>
  </div><div class="grid-child-4">
    <h3 id="day3"></h3>
    <h2 id="high3"></h2>
    <h2 id="low3"></h2>
    <h3 id="weather_desc3"></h3>
  </div><div class="grid-child-5">
    <h3 id="day4"></h3>
    <h2 id="high4"></h2>
    <h2 id="low4"></h2>
    <h3 id="weather_desc4"></h3>
  </div><div class="grid-child-6">
    <h3 id="day5"></h3>
    <h2 id="high5"></h2>
    <h2 id="low5"></h2>
    <h3 id="weather_desc5"></h3>
  </div><div class="grid-child-7">
    <h3 id="day6"></h3>
    <h2 id="high6"></h2>
    <h2 id="low6"></h2>
    <h3 id="weather_desc6"></h3>
  </div>
  </div>`
    let cityValue = cityRef.value;
    if (cityValue.length == 0) {
        result.innerHTML = `<h3 class="msg">Please enter a city name</h3>`;
    }
    else {
    let url = `https://api.openweathermap.org/data/2.5/forecast/daily?q=${cityValue}&cnt=10&APPID=eec48f1630281ec926acbcbb20931f70`;

  
    fetch(url)
    .then((resp) => resp.json())
    .then((result) => {
      console.log(result)
      console.log(result.city.coord)
      p.innerText =  `lat: ${result.city.coord.lat}    lon: ${result.city.coord.lon}`




  for (var i = 0; i < 7; i++) {

    let int = i.toString();
    let day = document.getElementById("day"+int);
    let weather = document.getElementById("weather_desc"+int);
    let high = document.getElementById("high"+int)
    let low = document.getElementById("low"+int);


    
    let dayOfWeek = unixToDay(result.list[i].dt);
    console.log ("day ", result.list[i].dt);
    day.innerHTML = `${dayOfWeek}`;

    let cloudiness = result.list[i].weather[0].description;
    if (cloudiness == "heavy intensity rain") {
       weather.innerHTML = `heavy rain`;
    }else {
        weather.innerHTML = `${cloudiness}`
    }

    let highTemp = kelvinToFahrenheit(result.list[i].temp.max);
    let displayHighTemp = `High ${highTemp}&#176;F`;
    high.innerHTML = `${displayHighTemp}`;

    let lowTemp = kelvinToFahrenheit(result.list[i].temp.min);
    let displayLowTemp = `Low ${lowTemp}&#176;F`;
    low.innerHTML = `${displayLowTemp}`;
  };

})
}
}
searchBtn.addEventListener("click", getWeather);
searchBtn.addEventListener("touchstart", getWeather);
window.addEventListener("load", getWeather);