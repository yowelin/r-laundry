'use strict';
var isSignInFormHidden = true;
var textBoxLogin;
var textBoxPassword;
var formIsValid = [];
var userEmail;
var loginCookieName = 'login';
var cartCookieName = 'cart';
var cookieAssocArr = [];
function analizeCookie(atrCookie) {
    var cookieArr = atrCookie.toString().split('; ');
    var separateCookie = [];
    cookieAssocArr = [];
    for (var key in cookieArr) {
        separateCookie = cookieArr[key].toString().split('=');
        cookieAssocArr[separateCookie[0]] = separateCookie[1];
    }
}
function showSignInForm(e) {
    /*if (e.target.id !== 'signin') {
     isSignInFormHidden = true;
     }*/
    if (e.target.id === 'signin') {
        var signInFormWrapper = document.getElementById('signInFormWrapper');
        var signin = document.getElementById('signin');
        if (isSignInFormHidden === true) {
            signInFormWrapper.style.maxHeight = '100px';
            signInFormWrapper.style.zIndex = '500';
            signin.style = "background-color: grey; outline: 1px solid black;";
            isSignInFormHidden = false;
        } else {
            signInFormWrapper.style.maxHeight = '0px';
            signInFormWrapper.style.zIndex = '-1';
            signin.style = "background-color: ''; outline: '';";
            isSignInFormHidden = true;
        }
    }
}
function validateSignInForm(e) {
    if (e.target.id === 'signInFormButton') {
        textBoxLogin = document.getElementById('signInFormLogin');
        textBoxPassword = document.getElementById('signInFormPassword');
        if (textBoxLogin.value !== "") {
            if (/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/.test(textBoxLogin.value)) {
                textBoxLogin.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
                formIsValid[0] = true;
            } else {
                textBoxLogin.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                formIsValid[0] = false;
            }
        } else {
            textBoxLogin.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            formIsValid[0] = false;
        }
        if (textBoxPassword.value !== "") {
            if (/^[a-zA-z0-9]{4,10}$/.test(textBoxPassword.value)) {
                textBoxPassword.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
                formIsValid[1] = true;
            } else {
                textBoxPassword.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                formIsValid[1] = false;
            }
        } else {
            textBoxPassword.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            formIsValid[1] = false;
        }
        if (formIsValid[0] && formIsValid[1]) {
            return true;
        } else {
            return false;
        }
    }
}
function createSignedInUserMenu(atrResponseSplitted) {
    var userMenuWrapper = document.getElementById('userMenuWrapper');
    userMenuWrapper.innerHTML = '';
    var userMenu = document.createElement('div');
    userMenu.setAttribute('id', 'userMenu');
    userMenu.innerHTML = 'Здравствуйте, ' + JSON.parse(atrResponseSplitted[1]);
    userMenuWrapper.appendChild(userMenu);
    var userMenuButtonsWrapper = document.createElement('div');
    userMenuButtonsWrapper.setAttribute('id', 'userMenuButtonsWrapper');
    userMenuWrapper.appendChild(userMenuButtonsWrapper);
    var ordersButton = document.createElement('div');
    ordersButton.setAttribute('class', 'userMenuButtons');
    ordersButton.setAttribute('id', 'ordersButton');
    userMenuButtonsWrapper.appendChild(ordersButton);
    var ordersHref = document.createElement('a');
    ordersHref.setAttribute('class', 'userMenuHrefs');
    ordersHref.setAttribute('id', 'ordersHref');
    ordersHref.setAttribute('href', './orders.php');
    ordersHref.innerHTML = 'Мои заказы';
    ordersButton.appendChild(ordersHref);
    var settingsButton = document.createElement('div');
    settingsButton.setAttribute('class', 'userMenuButtons');
    settingsButton.setAttribute('id', 'settingsButton');
    userMenuButtonsWrapper.appendChild(settingsButton);
    var settingsHref = document.createElement('a');
    settingsHref.setAttribute('class', 'userMenuHrefs');
    settingsHref.setAttribute('id', 'settingsHref');
    settingsHref.setAttribute('href', './settings.php');
    settingsHref.innerHTML = 'Настройки';
    settingsButton.appendChild(settingsHref);
    var singOutButton = document.createElement('div');
    singOutButton.setAttribute('class', 'userMenuButtons');
    singOutButton.setAttribute('id', 'singOutButton');
    var singOutHref = document.createElement('a');
    singOutHref.setAttribute('class', 'userMenuHrefs');
    singOutHref.setAttribute('id', 'singOutHref');
    singOutHref.setAttribute('href', './index.php');
    singOutHref.innerHTML = 'Выйти';
    singOutButton.appendChild(singOutHref);
    userMenuButtonsWrapper.appendChild(singOutButton);
}
function requestSignedInUser() {
    analizeCookie(document.cookie);
    if (cookieAssocArr['login'] !== '' && cookieAssocArr['login'] !== undefined) {
        userEmail = cookieAssocArr['login'];
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var responseSplitted = [];
            var response = this.responseText;
            responseSplitted = response.split('; ');
            if (responseSplitted[0] === '4') {
                createSignedInUserMenu(responseSplitted);
            } else {
                /*console.log(responseSplitted[1]);*/
            }
        }
    };
    xhttp.open('POST', './php/session-manager-functions.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'getSignedInUser'}`);
}
function sendSignInForm(e) {
    if (validateSignInForm(e)) {
        var xhttp = new XMLHttpRequest();
        var loginCookieDate = new Date(new Date().getTime() + 60 * 1000 * 180);
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var responseSplitted = [];
                var response = this.responseText;

                responseSplitted = response.toString().split('; ');
                if (responseSplitted[0] === '1') {
                    createSignedInUserMenu(responseSplitted);
                    document.cookie = loginCookieName + '=' + JSON.parse(responseSplitted[2]) + '; path=/; expires=' + loginCookieDate.toUTCString();
                    analizeCookie(document.cookie);
                    userEmail = cookieAssocArr['login'];
                } else {
                    if (responseSplitted[0] === '2') {
                        textBoxPassword.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                        formIsValid[1] = false;
                    }
                    if (responseSplitted[0] === '3') {
                        textBoxLogin.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                        formIsValid[0] = false;
                    }
                }
            }
        };
        xhttp.open('POST', './php/session-manager-functions.php', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(`functionFlag=${'signInUser'}&userLogin=${textBoxLogin.value}&userPassword=${textBoxPassword.value}`);
    }
}
window.addEventListener('load', function () {
    requestSignedInUser();
    document.getElementById('userMenuWrapper').addEventListener('click', showSignInForm);
    document.getElementById('userMenuWrapper').addEventListener('click', sendSignInForm);
});