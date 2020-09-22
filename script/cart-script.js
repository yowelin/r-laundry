'use sctrict';
var gamesAmount = 0;
var orderPrice = 0;
var gamesInfoArr = [];
var gameNames;
var totalPrice;
function fillCartWithGames() {
    var cartWrapper = document.getElementById("cartWrapper");
    for (var i = 0; i < gamesInfoArr.length; i++) {
        var gameWrapper = document.createElement('div');
        gameWrapper.setAttribute('class', 'gameWrappers');
        gameWrapper.setAttribute('id', 'gameWrapper' + gamesInfoArr[i]['idgames']);
        cartWrapper.appendChild(gameWrapper);
        var gameImage = document.createElement('img');
        gameImage.setAttribute('class', 'gamesImages');
        gameImage.setAttribute('id', 'gameImage' + i);
        gameImage.setAttribute('src', './' + gamesInfoArr[i]['picture']);
        gameWrapper.appendChild(gameImage);
        var inputButtonRemoveFromCart = document.createElement('input');
        inputButtonRemoveFromCart.setAttribute('class', 'remove-from-cart__button');
        inputButtonRemoveFromCart.setAttribute('id', 'remove-from-cart__button' + gamesInfoArr[i]['idgames']);
        inputButtonRemoveFromCart.setAttribute('type', 'button');
        inputButtonRemoveFromCart.setAttribute('value', 'Удалить из корзины');
        gameWrapper.appendChild(inputButtonRemoveFromCart);
        var gameInfoWrapper = document.createElement('div');
        gameInfoWrapper.setAttribute('class', 'gameInfoWrapper');
        gameWrapper.appendChild(gameInfoWrapper);
        var divGameName = document.createElement('div');
        divGameName.setAttribute('class', 'gameInfo');
        divGameName.innerHTML = 'Название: ' + gamesInfoArr[i]['name_orig'] + ' (' + (gamesInfoArr[i]['name_alt'] === null ? '-' : gamesInfoArr[i]['name_alt']) + ')';
        gameInfoWrapper.appendChild(divGameName);
        var divGameSeries = document.createElement('div');
        divGameSeries.setAttribute('class', 'gameInfo');
        divGameSeries.innerHTML = 'Серия: ' + gamesInfoArr[i]['series_name'];
        gameInfoWrapper.appendChild(divGameSeries);
        var divGameAmount = document.createElement('div');
        divGameAmount.setAttribute('class', 'gameInfo');
        divGameAmount.innerHTML = 'Количество в наличии: ' + (gamesInfoArr[i]['count'] === '0' ? 'Нет в наличии' : gamesInfoArr[i]['count'] + ' шт.');
        gameInfoWrapper.appendChild(divGameAmount);
        var divGamePrice = document.createElement('div');
        divGamePrice.setAttribute('class', 'gameInfo');
        divGamePrice.innerHTML = 'Цена: ' + (gamesInfoArr[i]['count'] === '0' ? 'Нет в наличии' : gamesInfoArr[i]['price'] + ' р.');
        gameInfoWrapper.appendChild(divGamePrice);
        var divType = document.createElement('div');
        divType.setAttribute('class', 'gameInfo');
        divType.innerHTML = 'Оригинал/дополнение: ' + (gamesInfoArr[i]['type'] === 'original' ? 'Оригинал' : 'Дополнение');
        gameInfoWrapper.appendChild(divType);
        var divBox = document.createElement('div');
        divBox.setAttribute('class', 'gameInfo');
        divBox.innerHTML = 'Футляр: ' + ((gamesInfoArr[i]['box'] === 'Jewel-Case' || (gamesInfoArr[i]['box'] === 'DVD-BOX') ? gamesInfoArr[i]['box'] : 'Конверт'));
        gameInfoWrapper.appendChild(divBox);
        var divStatus = document.createElement('div');
        divStatus.setAttribute('class', 'gameInfo');
        divStatus.innerHTML = 'Статус активации: ' + (gamesInfoArr[i]['status'] === 'activated' ? 'Активирована' : 'Не активирована');
        gameInfoWrapper.appendChild(divStatus);
        var divDeveloper = document.createElement('div');
        divDeveloper.setAttribute('class', 'gameInfo');
        divDeveloper.innerHTML = 'Разработчик: ' + (gamesInfoArr[i]['developer'] === null ? '-' : gamesInfoArr[i]['developer']);
        gameInfoWrapper.appendChild(divDeveloper);
        var divPublisher = document.createElement('div');
        divPublisher.setAttribute('class', 'gameInfo');
        divPublisher.innerHTML = 'Издатель: ' + (gamesInfoArr[i]['distributor/publisher'] === null ? '-' : gamesInfoArr[i]['distributor/publisher']);
        gameInfoWrapper.appendChild(divPublisher);
    }
}
function analizePriceIntegerPart(atrTotalprice) {
    var currency = "";
    var integerPart = Math.floor(atrTotalprice);
    if ((integerPart % 10 === 1 && integerPart % 100 !== 11) || (integerPart % 10 !== 1 && integerPart % 100 === 11)) {
        currency = "рубль";
    } else if (((integerPart % 10 === 2 && integerPart % 100 !== 12) || (integerPart % 10 !== 2 && integerPart % 100 === 12)) || ((integerPart % 10 === 3 && integerPart % 100 !== 13) || (integerPart % 10 !== 3 && integerPart % 100 === 13)) || ((integerPart % 10 === 4 && integerPart % 100 !== 14) || (integerPart % 10 !== 4 && integerPart % 100 === 14))) {
        currency = "рубля";
    } else {
        currency = "рублей";
    }
    return currency;
}
function analizePriceFloatPart(atrTotalprice) {
    var currency = "";
    var floatPart = Math.floor(atrTotalprice * 100) % 100;
    if ((floatPart % 10 === 1 && floatPart % 100 !== 11) || (floatPart % 10 !== 1 && floatPart % 100 === 11)) {
        currency = "копейка";
    } else if (((floatPart % 10 === 2 && floatPart % 100 !== 12) || (floatPart % 10 !== 2 && floatPart % 100 === 12)) || ((floatPart % 10 === 3 && floatPart % 100 !== 13) || (floatPart % 10 !== 3 && floatPart % 100 === 13)) || ((floatPart % 10 === 4 && floatPart % 100 !== 14) || (floatPart % 10 !== 4 && floatPart % 100 === 14))) {
        currency = "копейки";
    } else {
        currency = "копеек";
    }
    return currency;
}
function getIntegerPart(atrTotalprice) {
    var integerPart = Math.floor(atrTotalprice);
    if (integerPart === 0) {
        integerPart = "0";
    }
    return integerPart;
}
function getFloatPart(atrTotalprice) {
    var floatPart = (atrTotalprice * 100) % 100;
    if (floatPart === 0) {
        floatPart = "00";
    }
    return floatPart;
}
function fillSummationInfo() {
    var summation = document.getElementById("summation");
    var totalGamesElem = document.createElement('div');
    totalGamesElem.setAttribute('id', 'gamesAmount');
    totalGamesElem.innerHTML = 'Количество заказанных игр: ' + gamesInfoArr.length;
    summation.appendChild(totalGamesElem);
    var totalGamesElem = document.createElement('div');
    totalGamesElem.setAttribute('id', 'totalPrice');
    totalGamesElem.innerHTML = 'Общая стоимость игр, которые есть в наличии: ' + getIntegerPart(totalPrice) + ' ' + analizePriceIntegerPart(totalPrice) + ' ' + getFloatPart(totalPrice) + ' ' + analizePriceFloatPart(totalPrice);
    summation.appendChild(totalGamesElem);
    var textBoxTelephon = document.createElement('input');
    textBoxTelephon.setAttribute('class', 'textBoxes');
    textBoxTelephon.setAttribute('id', 'textBoxTelephon');
    textBoxTelephon.setAttribute('type', 'text');
    textBoxTelephon.setAttribute('placeholder', 'Номер телефона +7(xxx)xxx-xxxx');
    textBoxTelephon.setAttribute('value', '+7(985)781-0578');
    summation.appendChild(textBoxTelephon);
    var confirmOrderButton = document.createElement('input');
    confirmOrderButton.setAttribute('id', 'confirmOrderButton');
    confirmOrderButton.setAttribute('type', 'button');
    confirmOrderButton.setAttribute('value', 'Подтвердить заказ');
    summation.appendChild(confirmOrderButton);
}
function getGamesInfoArr() {
    gameNamesJson = JSON.stringify(gameNames);
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            gamesInfoArr = JSON.parse(this.responseText);
            totalPrice = getSummationInfo();
            fillCartWithGames();
            fillSummationInfo();
        }
    };
    xhttp.open("POST", "./php/cart-page-functions.php", true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'getGameInfo'}&gameNamesJson=${gameNamesJson}`);

}
function clearCart() {
    document.getElementById('cartWrapper').innerHTML = "";
}
function clearSummation() {
    document.getElementById('summation').innerHTML = "";
}
function getSummationInfo() {
    var lclTotalPrice = 0;
    for (var i = 0; i < gamesInfoArr.length; i++) {
        if (gamesInfoArr[i]['count'] > 0) {
            lclTotalPrice += parseFloat(gamesInfoArr[i]['price']);
        }
    }
    return lclTotalPrice;
}
function confirmOrder(e) {
    if (e.target.id === "confirmOrderButton") {
        var telTxtBox = document.getElementById('textBoxTelephon');
        var formIsValid = [];
        if (telTxtBox.value !== "") {
            if (/\+7\(\d{3}\)\d{3}-\d{4}/.test(telTxtBox.value)) {
                telTxtBox.style.boxShadow = "0 0 10px 1px rgba(0,255,0,0.7)";
                formIsValid[0] = true;
            } else {
                telTxtBox.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
                formIsValid[0] = false;
            }
        } else {
            telTxtBox.style.boxShadow = "0 0 10px 1px rgba(255,0,0,0.7)";
            formIsValid[0] = false;
        }
        if (formIsValid[0]) {
            if (gamesInfoArr.length > 0) {
                if (userEmail) {
                    var cartCookieDate = new Date(new Date().getTime() - 60 * 1000 * 30);
                    var xhttp = new XMLHttpRequest();
                    var isEmailSent = false;
                    gameNamesJson = JSON.stringify(gameNames);
                    xhttp.onreadystatechange = function () {
                        if (this.readyState === 4 && this.status === 200) {
                            isEmailSent = (this.responseText === "1" ? true : false);
                            if (isEmailSent) {
                                alert('Заказ отправлен.');
                                document.cookie = cartCookieName + "=" + "[]" + "; path=/; expires=" + cartCookieDate.toUTCString();
                                analizeCookie(document.cookie);
                                gameNames = [];
                                gamesInfoArr = [];
                                clearCart();
                                totalPrice = getSummationInfo();
                                clearSummation();
                                fillSummationInfo();
                            }
                        }
                    };
                    xhttp.open("POST", "./php/cart-page-functions.php", true);
                    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
                    xhttp.send(`functionFlag=${'makeOrder'}&gameNamesJson=${gameNamesJson}&userTel=${telTxtBox.value}&userEmail=${userEmail}&totalPrice=${totalPrice}`);
                } else {
                    alert('Прежде, чем сделать заказ, нужно зарегистрироваться и войти.');
                }
            } else {
                alert('Корзина пустая.');
            }
        }
    }
}
function removeGameFromCart(e) {
    e = e || event;
    var target = e.target || e.srcElement;
    var gameId = parseInt(target.id.replace(/\D+/g, ""));
    var gameName;
    var cartCookieDate = new Date(new Date().getTime() + 60 * 1000 * 30);
    for (var i = 0; i < gamesInfoArr.length; i++) {
        if (parseInt(gamesInfoArr[i]['idgames']) === gameId) {
            gameName = gamesInfoArr[i]['name_orig'];
        }
    }
    for (var i = 0; i < gamesInfoArr.length; i++) {
        if (parseInt(gamesInfoArr[i]['idgames']) === gameId) {
            gamesInfoArr.splice(i, 1);
        }
    }
    for (var i = 0; i < gameNames.length; i++) {
        if (gameNames[i] === gameName) {
            gameNames.splice(i, 1);
        }
    }
    document.cookie = cartCookieName + "=" + JSON.stringify(gameNames) + "; path=/; expires=" + cartCookieDate.toUTCString();
    analizeCookie(document.cookie);
    clearCart();
    fillCartWithGames();
    totalPrice = getSummationInfo();
    clearSummation();
    fillSummationInfo();
}
window.addEventListener('load', function () {
    analizeCookie(document.cookie);
    if (cookieAssocArr['cart'] !== '' && cookieAssocArr['cart'] !== undefined) {
        gameNames = JSON.parse(cookieAssocArr['cart']);
    }
    getGamesInfoArr();
    document.getElementById('cartWrapper').onclick = removeGameFromCart;
    document.getElementById('summation').onclick = confirmOrder;
});

