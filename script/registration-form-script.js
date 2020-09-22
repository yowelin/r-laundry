'use strict';
var txtFirstName;
var txtLastName;
var txtEmail1;
var txtEmail2;
var txtPassword1;
var txtPassword2;
var txtDateOfBirth;
var formIsValid = [];
function validateRegForm() {
    txtFirstName = document.getElementById('textBoxFirstName');
    txtLastName = document.getElementById('textBoxLastName');
    txtEmail1 = document.getElementById('textBoxE-mail1');
    txtEmail2 = document.getElementById('textBoxE-mail2');
    txtPassword1 = document.getElementById('textBoxPassword1');
    txtPassword2 = document.getElementById('textBoxPassword2');
    txtDateOfBirth = document.getElementById('textBoxDateofBirth');

    var tipFirstName = document.getElementById('tipFirstName');
    var tipLastName = document.getElementById('tipLastName');
    var tipEmail1 = document.getElementById('tipE-mail1');
    var tipEmail2 = document.getElementById('tipE-mail2');
    var tipPassword1 = document.getElementById('tipPassword1');
    var tipPassword2 = document.getElementById('tipPassword2');
    var tipDateOfBirth = document.getElementById('tipDateOfBirth');


    if (txtFirstName.value !== "") {
        if (/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(txtFirstName.value)) {
            txtFirstName.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
            tipFirstName.innerHTML = 'ok';
            formIsValid[0] = true;
        } else {
            txtFirstName.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            tipFirstName.innerHTML = 'ошибка';
            formIsValid[0] = false;
        }
    } else {
        txtFirstName.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        tipFirstName.innerHTML = 'введите имя';
        formIsValid[0] = false;
    }
    if (txtLastName.value !== "") {
        if (/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(txtLastName.value)) {
            txtLastName.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
            tipLastName.innerHTML = 'ok';
            formIsValid[1] = true;
        } else {
            txtLastName.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            tipLastName.innerHTML = 'ошибка';
            formIsValid[1] = false;
        }
    } else {
        txtLastName.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        tipLastName.innerHTML = 'введите фамилию';
        formIsValid[1] = false;
    }
    if (txtEmail1.value !== "") {
        if (/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/.test(txtEmail1.value)) {
            txtEmail1.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
            tipEmail1.innerHTML = 'ok';
            formIsValid[2] = true;
            if (txtEmail1.value === txtEmail2.value) {
                txtEmail2.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
                tipEmail2.innerHTML = 'ok';
                formIsValid[3] = true;
            } else {
                txtEmail2.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                tipEmail2.innerHTML = 'e-mail адресы не совпадают';
                formIsValid[3] = false;
            }
        } else {
            txtEmail1.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            tipEmail1.innerHTML = 'ошибка';
            formIsValid[2] = false;
        }
    } else {
        txtEmail1.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        tipEmail1.innerHTML = 'введите e-mail';
        formIsValid[2] = false;
    }
    if (txtPassword1.value !== "") {
        if (/^[a-zA-z0-9]{4,10}$/.test(txtPassword1.value)) {
            txtPassword1.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
            tipPassword1.innerHTML = 'ok';
            formIsValid[4] = true;
            if (txtPassword1.value === txtPassword2.value) {
                txtPassword2.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
                tipPassword2.innerHTML = 'ok';
                formIsValid[5] = true;
            } else {
                txtPassword2.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                tipPassword2.innerHTML = 'пароли не совпадают';
                formIsValid[5] = false;
            }
        } else {
            txtPassword1.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            tipPassword1.innerHTML = 'пароль может состоять только из английских букв или цифр и должен быть длиной от 4 до 10 символов';
            formIsValid[4] = false;
        }
    } else {
        txtPassword1.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        tipPassword1.innerHTML = 'введите пароль';
        formIsValid[4] = false;
    }
    if (txtDateOfBirth.value !== "") {
        var dateOfBirth;
        var dateOfBirthArr = [];
        var temp;
        var day = new Date().getDate();
        var month = new Date().getMonth() + 1;
        var year = new Date().getFullYear();
        var userAge;
        var MAX_AGE = 120;
        var MIN_AGE = 7;
        if (/^\d{2}\.\d{2}\.\d{4}$/.test(txtDateOfBirth.value)) {
            dateOfBirth = new Date(txtDateOfBirth.value);
            dateOfBirthArr = txtDateOfBirth.value.toString().split('.');
            temp = dateOfBirthArr[0];
            dateOfBirthArr[0] = dateOfBirthArr[1];
            dateOfBirthArr[1] = temp;
            dateOfBirth = new Date(dateOfBirthArr.join('.'));
            if (dateOfBirth.toString() !== 'Invalid Date') {
                userAge = Math.floor((new Date(month.toString() + '.' + day.toString() + '.' + year.toString()) - dateOfBirth) / 1000 / 60 / 60 / 24 / 365.25);
                if (userAge >= MIN_AGE && userAge <= MAX_AGE) {
                    txtDateOfBirth.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
                    tipDateOfBirth.innerHTML = 'ok';
                    formIsValid[6] = true;
                } else {
                    txtDateOfBirth.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                    tipDateOfBirth.innerHTML = 'допустимый возраст от 7 до 120 лет';
                    formIsValid[6] = false;
                }
            } else {
                txtDateOfBirth.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                tipDateOfBirth.innerHTML = 'ошибка';
                formIsValid[6] = false;
            }
        } else {
            txtDateOfBirth.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            tipDateOfBirth.innerHTML = 'введите дату в формате дд.мм.гггг';
            formIsValid[6] = false;
        }
    } else {
        txtDateOfBirth.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        tipDateOfBirth.innerHTML = 'введите дату рождения';
        formIsValid[6] = false;
    }
}
function sendRegForm() {
    validateRegForm();
    var formIsValidFlag = true;
    var tipEmail1 = document.getElementById('tipE-mail1');
    for (var i = 0; i < formIsValid.length; i++) {
        if (formIsValid[i] === false) {
            formIsValidFlag = false;
            break;
        }
    }
    if (formIsValidFlag) {
        var xhttp = new XMLHttpRequest();
        var isRegistrationComplete = false;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                isRegistrationComplete = (this.responseText === "1" ? true : false);
                if (isRegistrationComplete) {
                    alert('Регистрация прошла успешно.');
                } else {
                    txtEmail1.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                    tipEmail1.innerHTML = 'Пользователь с таким e-mail уже зарегистрирован';
                    formIsValid[3] = false;
                }
            }
        };
        xhttp.open("POST", "./php/registration-form-page-functions.php", true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(`functionFlag=${'registrateUser'}&userFirstName=${txtFirstName.value}&userLastName=${txtLastName.value}&userEmail=${txtEmail1.value}&userPassword=${txtPassword1.value}&userDateOfBirth=${txtDateOfBirth.value}`);
    } else {

    }
}
window.addEventListener('load', function () {
    document.getElementById('registrationButton').onclick = sendRegForm;
});