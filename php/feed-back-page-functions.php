<?php
if (is_string($_POST["functionFlag"]) && null !== ($_POST["functionFlag"])) {

    if ($_POST["functionFlag"] == "sendFeedBack") {
        $userName = $_POST["userName"];
        $userEmail = $_POST["userEmail"];
        $userMessage = $_POST["userMessage"];
        $to = "semikin.in@gmail.com";
        $subject = "Сообщение с сайта Games series";
        $message = $userMessage;
        $headers = "From: " . $userEmail . PHP_EOL .
                "Reply-To: " . $userEmail . PHP_EOL .
                "X-Mailer: PHP/" . phpversion();
        
        echo mail($to, $subject, $message, $headers);
    }
}
?>