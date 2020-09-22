var isUserMenuHidden = true;
var cookieAssocArr = [];
function showUserMenu(e) {
    /*if (e.target.id !== 'userMenu') {
     isUserMenuHidden = true;
     }*/
    if (e.target.id === 'userMenu') {
        var userMenuButtonsWrapper = document.getElementById('userMenuButtonsWrapper');
        var userMenu = document.getElementById('userMenu');
        if (isUserMenuHidden === true) {
            userMenuButtonsWrapper.style.maxHeight = '100px';
            userMenuButtonsWrapper.style.zIndex = '500';
            userMenu.style.backgroundColor = 'grey';
            isUserMenuHidden = false;
        } else {
            userMenuButtonsWrapper.style.maxHeight = '0px';
            userMenuButtonsWrapper.style.zIndex = '-1';
            userMenu.style.backgroundColor = '';
            isUserMenuHidden = true;
        }
    }
}
function createSignedOutUserMenu() {
    var userMenuWrapper = document.getElementById('userMenuWrapper');
    userMenuWrapper.innerHTML = '';
    var signUp = document.createElement('div');
    signUp.setAttribute('class', 'authorization');
    signUp.setAttribute('id', 'singup');
    userMenuWrapper.appendChild(signUp);
    var regFormHref = document.createElement('a');
    regFormHref.setAttribute('class', 'regFormHref');
    regFormHref.setAttribute('href', './registration-form.php');
    regFormHref.innerHTML = 'Регистрация';
    signUp.appendChild(regFormHref);
    var signIn = document.createElement('div');
    signIn.setAttribute('class', 'authorization');
    signIn.setAttribute('id', 'signin');
    signIn.innerHTML = 'Вход';
    userMenuWrapper.appendChild(signIn);
    var signInFormWrapper = document.createElement('div');
    signInFormWrapper.setAttribute('id', 'signInFormWrapper');
    userMenuWrapper.appendChild(signInFormWrapper);
    var signInFormLogin = document.createElement('input');
    signInFormLogin.setAttribute('class', 'signInFormInputsText');
    signInFormLogin.setAttribute('id', 'signInFormLogin');
    signInFormLogin.setAttribute('type', 'text');
    signInFormLogin.setAttribute('placeholder', 'e-mail');
    signInFormWrapper.appendChild(signInFormLogin);
    var signInFormInputsText = document.createElement('input');
    signInFormInputsText.setAttribute('class', 'signInFormInputsText');
    signInFormInputsText.setAttribute('id', 'signInFormPassword');
    signInFormInputsText.setAttribute('type', 'password');
    signInFormInputsText.setAttribute('placeholder', 'пароль');
    signInFormWrapper.appendChild(signInFormInputsText);
    var signInFormButton = document.createElement('input');
    signInFormButton.setAttribute('class', 'signInFormInputsButton');
    signInFormButton.setAttribute('id', 'signInFormButton');
    signInFormButton.setAttribute('type', 'button');
    signInFormButton.setAttribute('value', 'Войти');
    signInFormWrapper.appendChild(signInFormButton);
}
function signOutUser(e) {
    if (e.target.id === 'singOutHref') {
        var xhttp = new XMLHttpRequest();
        var loginCookieDate = new Date(new Date().getTime() - 60 * 1000 * 180);
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                var responseSplitted = [];
                var response = this.responseText;
                responseSplitted = response.toString().split('; ');
                if (responseSplitted[0] === '5') {
                    createSignedOutUserMenu();
                    document.cookie = loginCookieName + "=" + JSON.parse(responseSplitted[2]) + '; path=/; expires=' + loginCookieDate.toUTCString();
                    analizeCookie(document.cookie);
                    userEmail = cookieAssocArr['login'];
                } else {
                    /*console.log(responseSplitted[1]);*/
                }
            }
        };
        xhttp.open('POST', './php/session-manager-functions.php', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(`functionFlag=${'signOutUser'}`);
    }
}
window.addEventListener('load', function () {
    document.getElementById('userMenuWrapper').addEventListener('click', showUserMenu);
    document.getElementById('userMenuWrapper').addEventListener('click', signOutUser);
});