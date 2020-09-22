<!DOCTYPE html>

<html>
    <head>
        <title>Интернет-магазин 'Games Series' - Заказы</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="./script/signin-form.js"></script>
        <script type="text/javascript" src="./script/user-menu.js"></script>
        <script type="text/javascript" src="./script/orders-script.js"></script>
        <link rel="stylesheet" href="./css/orders-styles.css">
        <link rel="stylesheet" href="./css/login-form-styles.css">
        <link rel="stylesheet" href="./css/user-menu-styles.css">
        <link rel="shortcut icon" href="./img/favicon.png" type="image/png">
    </head>
    <body class="mbp">
        <header class="mbp header__background">
            <div class="mbp" id="menu__search">
                <menu class="mbp" id="main__menu">
                    <li class="mbp menu__list-item"><a class="menu__list-link" href="./index.php">Главная страница</a></li>
                    <li class="mbp menu__list-item"><a class="menu__list-link" href="./cart.php">Корзина</a></li>
                    <li class="mbp menu__list-item"><a class="menu__list-link" href="./feed-back.php">Обратная связь</a></li>
                </menu>
                <div class="mbp contacts">
                    <p class="mbp e-mail">e-mail: <a class="e-mail__link" href="mailto:semikin.in@gmail.com">Отправить e-mail</a></p>
                </div>
                <div id="userMenuWrapper">
                    <div class="authorization" id="singup"><a class="regFormHref" href="./registration-form.php">Регистрация</a></div>
                    <div class="authorization" id="signin">Вход</div>
                    <div id="signInFormWrapper">
                        <input class="signInFormInputsText" id="signInFormLogin" type="text" placeholder="e-mail" required>
                        <input class="signInFormInputsText" id="signInFormPassword" type="password" placeholder="пароль" required>
                        <input class="signInFormInputsButton" id="signInFormButton" type="button" value="Войти">
                    </div>
                </div>
            </div>
        </header>
        <div class="mainBlock">
            <div class="ordersListWrapper ordersListWrapperScrollbar" id="ordersListWrapper"></div>
        </div>
        <footer class="mbp footer__background">
            <div class="mbp" id="footer__info">
                <p class="mbp e-mail__footer">e-mail: <a class="e-mail__link__footer" href="mailto:semikin.in@gmail.com">Отправить e-mail</a></p>
                <p class="mbp text__footer">Добро пожаловать, в интернет-магазин 'Games-series'. В нём Вы можете найти игры из моей личной коллекции. 
                    Я собрал множество игр целыми сериями. Большинство игр от российских издателей, те же игры, что не выходили официально в России представлены в иностранном варианте на английском языке. 
                    На сайте есть регистрация, и все заказы фиксируются по электронной почте и базе данных. Также Вы можете позвонить мне по телефону +7(985)781-05-78 и узнать все подробности, которые Вас интересуют.</p>
            </div>
        </footer>
    </body>
</html>
