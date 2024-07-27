let nav = document.querySelector(".navigation-wrap");
window.onscroll = function () {

        if (document.documentElement.scrollTop > 10) {
            nav.classList.add("scroll-on");
        }
        else {
            nav.classList.remove("scroll-on");
        }
    }
// nav bar hide
let navbar =document.querySelectorAll('.nav-link');
let navCollapse =document.querySelector('.navbar-collapse.collapse');
navbar.forEach(function(a){
    a.addEventListener("click",function(){
        navCollapse.classList.remove("show");
    })
})

document.addEventListener('DOMContentLoaded', function() {
    const allButton = document.querySelectorAll('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchClose = document.getElementById('searchClose');

    if (allButton.length > 0 && searchBar && searchInput && searchClose) {
        for (let i = 0; i < allButton.length; i++) {
            allButton[i].addEventListener('click', function() {
                searchBar.style.visibility = 'visible';
                searchBar.classList.add('open');
                this.setAttribute('aria-expanded', 'true');
                searchInput.focus();
            });
        }

        searchClose.addEventListener('click', function() {
            searchBar.style.visibility = 'hidden';
            searchBar.classList.remove('open');
            allButton.forEach(button => button.setAttribute('aria-expanded', 'false'));
        });
    } else {
        console.error('One or more elements not found.');
    }
});
// 'http://api.openweathermap.org/data/2.5/weather?q=Pune&units=metric&appid=b14425a6554d189a2d7dc1';

// https://api.openweathermap.org/data/2.5/weather?units=metric&q=tokyo&appid=65ec89d04d3d00c44c849c374bd157c1


// const apikey = "65ec89d04d3d00c44c849c374bd157c1";
// const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
// const searchBox = document.querySelector(".input-group input");
// const searchBtn = document.querySelector(".input-group button");
// const weatherIcon = document.querySelector(".weather-icon");

// async function checkWeather(city) {
//     const response = await fetch(apiUrl + city + `&appid=${apikey}`);
//     if (response.status == 404) {
//         document.querySelector(".error").style.display = "block";
//         document.querySelector(".weather").style.display = "none";
//     } else {
//         var data = await response.json();
//         console.log(data);
//         document.querySelector(".city").innerHTML = data.name;
//         document.querySelector(".temp").innerHTML = Math.round(data.main.temp) + "°C";
//         document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
//         document.querySelector(".wind").innerHTML = data.wind.speed + "km/h";

//         switch (data.weather[0].main) {
//             case "Clouds":
//                 weatherIcon.src = "/img/clouds.png";
//                 break;
//             case "Clear":
//                 weatherIcon.src = "/img/clear.png";
//                 break;
//             case "Drizzle":
//                 weatherIcon.src = "/img/drizzle.png";
//                 break;
//             case "Mist":
//                 weatherIcon.src = "/img/mist.png";
//                 break;
//             case "Rain":
//                 weatherIcon.src = "/img/rain.png";
//                 break;
//             case "Snow":
//                 weatherIcon.src = "/img/snow.png";
//                 break;
//         }

//         document.querySelector(".weather").style.display = "block";
//         document.querySelector(".error").style.display = "none";
//     }
// }

// checkWeather("New Delhi"); // Call with a default city to load initial weather

// searchBtn.addEventListener("click", () => {
//     checkWeather(searchBox.value);
// });



document.getElementById('search-btn').addEventListener('click', async () => {
    const city = document.getElementById('city-input').value;
    const weatherInfo = document.getElementById('weather-info');
    const errorMsg = document.getElementById('error-msg');
    
    try {
        const response = await fetch(`/weather?city=${city}`);
        if (!response.ok) {
            throw new Error('City not found');
        }
        const data = await response.json();
        const weatherData = data.weatherData;

        if (!data.hasWeatherData) {
            throw new Error('No weather data available');
        }

        // Update the DOM with weather data
        document.getElementById('weather-icon').src = `/img/${weatherData.weather[0].main.toLowerCase()}.png`;
        document.getElementById('temp').textContent = `${weatherData.main.temp}°C`;
        document.getElementById('city-name').textContent = `${weatherData.name}, ${weatherData.sys.country}`;
        document.getElementById('humidity').textContent = `${weatherData.main.humidity}%`;
        document.getElementById('wind-speed').textContent = `${weatherData.wind.speed} km/h`;

        weatherInfo.style.display = 'block';
        errorMsg.style.display = 'none';
    } catch (error) {
        console.error(error);
        weatherInfo.style.display = 'none';
        errorMsg.textContent = error.message;
        errorMsg.style.display = 'block';
    }
});
