<?php

require("db-query-library.php");
if (is_string($_POST["functionFlag"]) && null !== ($_POST["functionFlag"])) {
    $db = DataBase::getDB();
    $userId;
    if ($_POST["functionFlag"] == "getOrdersList") {
        $userEmail = $_POST["userEmail"];
        $userIdQuery = "SELECT `idusers` FROM `users` WHERE `userEmail` = '$userEmail';";
        $userId = $db->selectCell($userIdQuery);
        $userOrdersQuery = "SELECT * FROM `orders` JOIN `statuses` ON `status`=`idstatuses` WHERE `user` = '" . (int) $userId . "';";
        $userOrders = json_encode($db->select($userOrdersQuery));
        echo $userOrders;
    }
    if ($_POST["functionFlag"] == "getOrderInfo") {
        $oderId = $_POST["oderId"];
        $orderInfoQuery = "SELECT * FROM `order_list` JOIN `games` ON `game`=`idgames` WHERE `order` = '" . $oderId . "';";
        $orderInfo = json_encode($db->select($orderInfoQuery));
        echo $orderInfo;
    }
}
?>