'use sctrict';
var userEmail;
var cookieAssocArr = [];

function addOrdersList(atrOrdersArr) {
    var ordersListWrapper = document.getElementById('ordersListWrapper');

    for (let i = 0; i < atrOrdersArr.length; i++) {
        var orderWrapper = document.createElement('div');
        var separateDate = atrOrdersArr[i]['date'].toString().split('-');
        var orderDate = new Date(separateDate[1] + '.' + separateDate[2] + '.' + separateDate[0]);
        var statusString;
        var orderId = atrOrdersArr[i]['idorders'];
        if (atrOrdersArr[i]['status_name'] == 'pending') {
            statusString = 'в ожидании';
        } else if (atrOrdersArr[i]['status_name'] == 'processed') {
            statusString = 'обрабатывается';
        } else if (atrOrdersArr[i]['status_name'] == 'completed') {
            statusString = 'выполнен';
        }
        orderWrapper.setAttribute('class', 'orderWrappers');
        orderWrapper.setAttribute('id', orderId);
        orderWrapper.innerHTML = 'Заказ №: ' + atrOrdersArr[i]['idorders'] + ', на сумму: ' + atrOrdersArr[i]['totalPrice'] + ' руб., от ' + orderDate.toLocaleDateString() + ', статус: ' + statusString + ':';
        ordersListWrapper.appendChild(orderWrapper);
        getOrderInfo(orderId);
    }
}
function addOrderInfo(atrOrderGamesArr, atrOrderId) {
    var orderWrapper = document.getElementById(atrOrderId);

    for (let i = 0; i < atrOrderGamesArr.length; i++) {
        var gameInfoWrapper = document.createElement('div');
        gameInfoWrapper.setAttribute('class', 'gameInfo');
        gameInfoWrapper.setAttribute('id', atrOrderGamesArr[i]['idgames']);
        gameInfoWrapper.innerHTML = (i + 1) + '. ' + atrOrderGamesArr[i]['name_orig'] + ' - ' + atrOrderGamesArr[i]['selling_price'] + ' руб.;';
        orderWrapper.appendChild(gameInfoWrapper);
    }
}
function getOrderInfo(atrOrderId) {
    var xhttp = new XMLHttpRequest();
    var orderGamesArr;
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            orderGamesArr = JSON.parse(this.responseText);
            addOrderInfo(orderGamesArr, atrOrderId);
        }
    };
    xhttp.open('POST', './php/orders-page-functions.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'getOrderInfo'}&oderId=${atrOrderId}`);

}
function getOrdersList() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
             var ordersArr = JSON.parse(this.responseText);
            addOrdersList(ordersArr);
        }
    };
    xhttp.open('POST', './php/orders-page-functions.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'getOrdersList'}&userEmail=${userEmail}`);
}
window.addEventListener('load', function () {
    getOrdersList();
});

