<?php

require("db-query-library.php");

function sendMailToAdmin($atrGameNamesJson, $atrUserTel, $atrUserEmail, $atrTotalPrice, $atrOrderId) {
    $db = DataBase::getDB();
    $gameNamesArr = json_decode($atrGameNamesJson);
    $userTel = $atrUserTel;
    $userEmail = $atrUserEmail;
    $totalPrice = $atrTotalPrice;
    $queryString = "SELECT * FROM users WHERE (userEmail = '" . $userEmail . "');";
    $user = $db->selectRow($queryString);
    $userName = $user["userFirstName"];
    $toWho = "semikin.in@gmail.com";
    $subject = "Заказ № $atrOrderId на сайте 'Games series'";
    $message = "Имя покупателя: " . $userName . PHP_EOL . "Телефон покупателя: " . $userTel . PHP_EOL;
    for ($i = 0; $i < count($gameNamesArr); $i++) {
        $queryGameString = "SELECT * FROM games WHERE (name_orig = '" . $gameNamesArr[$i] . "');";
        $game = $db->selectRow($queryGameString);
        $gameAmount = $game["count"];
        $message .= $i + 1 . ". " . $gameNamesArr[$i] . ($gameAmount === '0' ? " - нет в наличии" : "") . ";" . PHP_EOL;
    }
    $message .= "Всего на сумму: " . $totalPrice . " руб.";
    $headers = "From: " . "Games Series store <$userEmail>" . PHP_EOL . "Reply-To: " . $userEmail . PHP_EOL . "X-Mailer: PHP/" . phpversion();
    return mail($toWho, $subject, $message, $headers);
}

function sendMailToUser($atrGameNamesJson, $atrUserTel, $atrUserEmail, $atrTotalPrice, $atrOrderId) {
    $db = DataBase::getDB();
    $gameNamesArr = json_decode($atrGameNamesJson);
    $userTel = $atrUserTel;
    $userEmail = $atrUserEmail;
    $totalPrice = $atrTotalPrice;
    $queryUserString = "SELECT * FROM users WHERE (userEmail = '" . $userEmail . "');";
    $user = $db->selectRow($queryUserString);
    $userName = $user["userFirstName"];
    $toWho = $userEmail;
    $subject = "Заказ № $atrOrderId на сайте 'Games series'";
    $message = "Здравствуйте, " . $userName . PHP_EOL . "Вы сдлеали заказ № $atrOrderId на сайте 'Games Series': " . PHP_EOL;
    for ($i = 0; $i < count($gameNamesArr); $i++) {
        $queryGameString = "SELECT * FROM games WHERE (name_orig = '" . $gameNamesArr[$i] . "');";
        $game = $db->selectRow($queryGameString);
        $gameAmount = $game["count"];
        $message .= $i + 1 . ". " . $gameNamesArr[$i] . ($gameAmount === '0' ? " - нет в наличии" : "") . ";" . PHP_EOL;
    }
    $message .= "Всего на сумму: " . $totalPrice . " руб." . PHP_EOL . "При заказе Вы указали номер телефона: " . $userTel;
    $headers = "From: " . "Games Series store <semikin.in@gmail.com>" . PHP_EOL . "Reply-To: " . "semikin.in@gmail.com" . PHP_EOL . "X-Mailer: PHP/" . phpversion();
    return mail($toWho, $subject, $message, $headers);
}

function generateOrderId($atrUserId, $atrOrderDate) {
    $db = DataBase::getDB();
    $queryOrdersAmount = "SELECT count(idorders) FROM orders WHERE (user = " . $atrUserId . " AND date = str_to_date('" . $atrOrderDate . "', '%d.%m.%Y'));";
    $ordersAmount = $db->selectCell($queryOrdersAmount);
    $orderDateSplitted = explode(".", $atrOrderDate);
    $orderId = "gso-" . (int) $atrUserId . "-" . $orderDateSplitted[0] . $orderDateSplitted[1] . $orderDateSplitted[2] . "-" . ((int) $ordersAmount + 1);
    return $orderId;
}

if (is_string($_POST["functionFlag"]) && null !== ($_POST["functionFlag"])) {
    $db = DataBase::getDB();
    if ($_POST["functionFlag"] == "getGameInfo") {
        $gameNamesArr = json_decode($_POST["gameNamesJson"]);
        $queryString = "SELECT * FROM (games JOIN genres ON genre = idgenres) JOIN series ON series = idseries WHERE (name_orig = '" . $gameNamesArr[0] . "')";
        for ($i = 1; $i < count($gameNamesArr); $i++) {
            $queryString .= " OR (name_orig = '" . $gameNamesArr[$i] . "')";
        }
        $queryString .= ";";
        echo json_encode($db->select($queryString));
    }
    if ($_POST["functionFlag"] == "makeOrder") {
        $userEmail = $_POST["userEmail"];
        $totalPrice = $_POST["totalPrice"];
        $orderDate = date('d.m.Y');
        $gameNamesArr = json_decode($_POST["gameNamesJson"]);
        $queryUserId = "SELECT idusers FROM users WHERE (userEmail = '" . $userEmail . "');";
        $userId = $db->selectCell($queryUserId);
        $orderId = generateOrderId($userId, $orderDate);
        /* echo $orderId . '; '; */
        $queryAddOrder = "INSERT INTO orders (idorders, user, totalPrice, date, status) VALUES ('" . $orderId . "', " . (int) $userId . ", " . $totalPrice . ", str_to_date('" . $orderDate . "', '%d.%m.%Y'), " . 1 . ");";
        $db->insertRow($queryAddOrder);
        for ($i = 0; $i < count($gameNamesArr); $i++) {
            $queryGameId = "SELECT idgames FROM games WHERE (name_orig = '" . $gameNamesArr[$i] . "');";
            $gameId = $db->selectCell($queryGameId);
            /* echo ($gameId . '; '); */
            $queryGamePrice = "SELECT price FROM games WHERE (name_orig = '" . $gameNamesArr[$i] . "');";
            $gamePrice = $db->selectCell($queryGamePrice);
            $queryAddGame = "INSERT INTO order_list (`order`, game, selling_price) VALUES ('" . $orderId . "', " . (int) $gameId . ", '" . $gamePrice . "');";
            /* echo $queryAddGame; */
            $db->insertRow($queryAddGame);
        }
        $mailToAdminSent = sendMailToAdmin($_POST["gameNamesJson"], $_POST["userTel"], $_POST["userEmail"], $_POST["totalPrice"], $orderId);
        $mailToUserSent = sendMailToUser($_POST["gameNamesJson"], $_POST["userTel"], $_POST["userEmail"], $_POST["totalPrice"], $orderId);
        if ($mailToAdminSent && $mailToUserSent) {
            echo true;
        }
    }
}
?>