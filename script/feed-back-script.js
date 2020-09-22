'use strict';
var txtName;
var txtEmail;
var txtMessage;
var formIsValid = [];
function getFeedBackInfo() {
    if (txtName.value !== "") {
        if (/^[a-zA-Zа-яА-ЯёЁ'][a-zA-Z-а-яА-ЯёЁ' ]+[a-zA-Zа-яА-ЯёЁ']?$/.test(txtName.value)) {
            txtName.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
            formIsValid[0] = true;
        } else {
            txtName.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            formIsValid[0] = false;
        }
    } else {
        txtName.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        formIsValid[0] = false;
    }
    if (txtEmail.value !== "") {
        if (/^[-._a-z0-9]+@(?:[a-z0-9][-a-z0-9]+\.)+[a-z]{2,6}$/.test(txtEmail.value)) {
            txtEmail.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
            formIsValid[1] = true;
        } else {
            txtEmail.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            formIsValid[1] = false;
        }
    } else {
        txtEmail.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        formIsValid[1] = false;
    }
    if (txtMessage.value !== "") {
        txtMessage.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
        formIsValid[2] = true;
    } else {
        txtMessage.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
        formIsValid[2] = false;
    }
}
function sendFeedBack() {
    getFeedBackInfo();
    if (formIsValid[0] && formIsValid[1] && formIsValid[2]) {
        var xhttp = new XMLHttpRequest();
        var isFeedBackSent = false;
        xhttp.onreadystatechange = function () {
            if (this.readyState === 4 && this.status === 200) {
                isFeedBackSent = (this.responseText === "1" ? true : false);
                if (isFeedBackSent) {
                    alert('Сообщение отправлено.');
                    txtName.value = "";
                    txtEmail.value = "";
                    txtMessage.value = "";
                    txtName.style.boxShadow = "";
                    txtEmail.style.boxShadow = "";
                    txtMessage.style.boxShadow = "";
                }
            }
        };
        xhttp.open("POST", "./php/feed-back-page-functions.php", true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhttp.send(`functionFlag=${'sendFeedBack'}&userName=${txtName.value}&userEmail=${txtEmail.value}&userMessage=${txtMessage.value}`);
    }
}
window.addEventListener('load', function () {
    document.getElementById('sendMessageButton').onclick = sendFeedBack;
    txtName = document.getElementById('textBoxName');
    txtEmail = document.getElementById('textBoxE-mail');
    txtMessage = document.getElementById('textArea');
});