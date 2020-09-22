<?php

require("db-query-library.php");
if (is_string($_POST["functionFlag"]) && null !== ($_POST["functionFlag"])) {
    $db = DataBase::getDB();
    if ($_POST["functionFlag"] == "registrateUser") {
        $userFirstName = $_POST["userFirstName"];
        $userLastName = $_POST["userLastName"];
        $userEmail = $_POST["userEmail"];
        $userPasswordHash = password_hash($_POST["userPassword"], PASSWORD_DEFAULT);
        $userDateOfBirth = $_POST["userDateOfBirth"];
        $queryString = "SELECT userEmail FROM users WHERE userEmail = '" . $userEmail . "';";

        $queryResult = $db->selectRow($queryString);
        if ($queryResult == "") {
            $queryString = "INSERT INTO users (userFirstName, userLastName, userEmail, userPassword, dateOfBirth) VALUES ('" . $userFirstName . "', '" . $userLastName . "', '" . $userEmail . "', '" . $userPasswordHash . "', str_to_date('" . $userDateOfBirth . "', '%d.%m.%Y'));";
            echo $db->insertRow($queryString);
        } else {
            echo false;
        }
    }
}
?>