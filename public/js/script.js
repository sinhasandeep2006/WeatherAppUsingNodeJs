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