<?php

require("db-query-library.php");
session_start();
if (is_string($_POST["functionFlag"]) && null !== ($_POST["functionFlag"])) {
    $db = DataBase::getDB();
    /* $_SESSION["signedInUser"] = ""; */
    $userLogin = $_POST["userLogin"];
    $userPassword = $_POST["userPassword"];
    if ($_SESSION["signedInUser"] == "") {
        if ($_POST["functionFlag"] == "signInUser") {
            $queryString = "SELECT * FROM users WHERE (userEmail = '" . $userLogin . "');";
            $user = $db->selectRow($queryString);
            if ($user != null) {
                if (password_verify($userPassword, $user["userPassword"])) {
                    $_SESSION["signedInUser"] = $user;
                    echo '1; ' . json_encode($_SESSION["signedInUser"]["userFirstName"]) . '; ' . json_encode($_SESSION["signedInUser"]["userEmail"]);
                } else {
                    echo '2; Пароль неправильный';
                }
            } else {
                echo '3; Пользователь не найден';
            }
        }
    } else {
        if ($_POST["functionFlag"] == "getSignedInUser") {
            echo '4; ' . json_encode($_SESSION["signedInUser"]["userFirstName"]) . '; ' . json_encode($_SESSION["signedInUser"]["userEmail"]);
        }
        if ($_POST["functionFlag"] == "signOutUser") {
            $_SESSION["signedInUser"] = "";
            session_write_close();
            echo '5; ' . json_encode($_SESSION["signedInUser"]["userFirstName"]) . '; ' . json_encode($_SESSION["signedInUser"]["userEmail"]);
        }
    }
}
?>