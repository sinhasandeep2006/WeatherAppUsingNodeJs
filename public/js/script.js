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

document.addEventListener('DOMContentLoaded', function() {
    const passwordField = document.getElementById('password');
    const togglePassword = document.getElementById('togglePassword');
    
    togglePassword.addEventListener('click', function() {
        const type = passwordField.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordField.setAttribute('type', type);
        this.innerHTML = type === 'password' ? '<i class="fas fa-eye"></i>' : '<i class="fas fa-eye-slash"></i>';
    });
});

const apikey = "65ec89d04d3d00c44c849c374bd157c1";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

async function checkWeather(city, elementId) {
    const response = await fetch(apiUrl + city + `&appid=${apikey}`);
    const element = document.querySelector(`#${elementId}`);
    
    if (response.status === 404) {
        element.style.display = "none";
    } else {
        const data = await response.json();
        element.getElementsByClassName("city")[0].innerHTML = data.name;
        element.getElementsByClassName("temp")[0].innerHTML = Math.round(data.main.temp) + "°C";
        const weatherIcon = element.getElementsByClassName("weather-icon")[0];

        switch (data.weather[0].main) {
            case "Clouds":
                weatherIcon.src = "/img/clouds.png";
                break;
            case "Clear":
                weatherIcon.src = "/img/clear.png";
                break;
            case "Drizzle":
                weatherIcon.src = "/img/drizzle.png";
                break;
            case "Mist":
                weatherIcon.src = "/img/mist.png";
                break;
            case "Rain":
                weatherIcon.src = "/img/rain.png";
                break;
            case "Snow":
                weatherIcon.src = "/img/snow.png";
                break;
        }
        element.style.display = "block";
    }
}


document.addEventListener("DOMContentLoaded", () => {
    checkWeather("New Delhi", "weather-new-delhi");
    checkWeather("USA", "weather-usa");
    checkWeather("Tokyo", "weather-tokyo");
    checkWeather("Russia", "weather-russia");
});

