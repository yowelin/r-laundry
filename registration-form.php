<!DOCTYPE html>

<html>
    <head>
        <title>Интернет-магазин 'Games Series' - Регистрация</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <script type="text/javascript" src="./script/signin-form.js"></script>
        <script type="text/javascript" src="./script/user-menu.js"></script>
        <script type="text/javascript" src="./script/registration-form-script.js"></script>
        <link rel="stylesheet" href="./css/registration-form-styles.css">
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
        <div id="registrationWrapperBackground">
            <div id="registrationWrapper">
                <div class="infoWrapper" id="firstNameWrapper"><label class="labels" id="labelFirstName">Имя</label><input type="text" class="textBoxes" id="textBoxFirstName" placeholder="Ваше Имя"><label class="tips" id="tipFirstName"></label></div>
                <div class="infoWrapper" id="lastNameWrapper"><label class="labels" id="labelLastName">Фамилия</label><input type="text" class="textBoxes" id="textBoxLastName" placeholder="Ваша Фамилия"><label class="tips" id="tipLastName"></label></div>
                <div class="infoWrapper" id="e-mail1Wrapper"><label class="labels" id="labelE-mail1">E-mail</label><input type="text" class="textBoxes" id="textBoxE-mail1" placeholder="Ваш e-mail"><label class="tips" id="tipE-mail1"></label></div>
                <div class="infoWrapper" id="e-mail2Wrapper"><label class="labels" id="labelE-mail2">E-mail повторно</label><input type="text" class="textBoxes" id="textBoxE-mail2" placeholder="Ваш e-mail повторно"><label class="tips" id="tipE-mail2"></label></div>
                <div class="infoWrapper" id="password1Wrapper"><label class="labels" id="labelPassword1">Пароль</label><input type="password" class="textBoxes" id="textBoxPassword1" placeholder="Ваш пароль"><label class="tips" id="tipPassword1"></label></div>
                <div class="infoWrapper" id="password2Wrapper"><label class="labels" id="labelPassword2">Пароль повторно</label><input type="password" class="textBoxes" id="textBoxPassword2" placeholder="Ваш пароль повторно"><label class="tips" id="tipPassword2"></label></div>
                <div class="infoWrapper" id="dateOfBirthWrapper"><label class="labels" id="labelDateOfBirth">Дата рождения</label><input type="text" class="textBoxes" id="textBoxDateofBirth" placeholder="Ваша дата рождения (дд.мм.гггг)"><label class="tips" id="tipDateOfBirth"></label></div>
                <input id="registrationButton" type="button" value="Зарегистрироваться">
            </div>
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