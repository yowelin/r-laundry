<!DOCTYPE html>

<html>
    <head>
        <title>Интернет-магазин 'Games Series' - Главная страница</title>
        <meta charset="UTF-8">
        <meta http-equiv="Content-Type" Content="text/html; Charset=UTF-8">
        <meta http-equiv="Content-Language" Content="ru">
        <meta name="author" Content="Семикин Иван">
        <meta name="description" Content="Продажа игр по серии и поштучно">
        <meta name="keywords" Content ="games-series, компьютерные игры, игры для ПК, игры на компьютер, серии игр, б/у игры, купить">
        <meta name="Publisher-Email" Content="semikin.in@gmail.com">
        <meta name="Publisher-URL" Content="https://vk.com/i.semikin">
        <meta name="revisit-after" Content="1 day">
        <script type="text/javascript" src="./script/signin-form.js"></script>
        <script type="text/javascript" src="./script/user-menu.js"></script>
        <script type="text/javascript" src="./script/index-script.js"></script>
        <link rel="stylesheet" href="./css/index-styles.css">
        <link rel="stylesheet" href="./css/login-form-styles.css">
        <link rel="stylesheet" href="./css/user-menu-styles.css">
        <link rel="shortcut icon" href="./img/favicon.png" type="image/png">
    </head>

    <body class="mbp">
        <header class="mbp header__background">
            <div class="mbp" id="menu__search">
                <menu class="mbp" id="main__menu">
                    <li class="mbp menu__list-item"><a class="menu__list-link menu__current" id="index__page" href="./index.php">Главная страница</a></li>
                    <li class="mbp menu__list-item"><a class="menu__list-link" id="cart__page" href="./cart.php">Корзина</a></li>
                    <li class="mbp menu__list-item"><a class="menu__list-link" id="feed-back__page" href="./feed-back.php">Обратная связь</a></li>
                </menu>
                <div class="mbp contacts">
                    <p class="mbp e-mail">e-mail: <a class="e-mail__link" href="mailto:semikin.in@gmail.com">Отправить e-mail</a></p>
                </div>
                <div id="userMenuWrapper">
                    <div class="authorization" id="singup"><a class="regFormHref" href="./registration-form.php">Регистрация</a></div>
                    <div class="authorization" id="signin">Вход</div>
                    <div id="signInFormWrapper">
                        <input class="signInFormInputsText" id="signInFormLogin" type="text" placeholder="e-mail">
                        <input class="signInFormInputsText" id="signInFormPassword" type="password" placeholder="пароль">
                        <input class="signInFormInputsButton" id="signInFormButton" type="button" value="Войти">
                    </div>
                    <!--<div id="userMenu">Здравствуйте, Иван.</div>
                    <div id="userMenuButtonsWrapper">
                        <input class="userMenuButtons" id="ordersButton" type="button" value="Мои заказы">
                        <input class="userMenuButtons" id="settingsButton" type="button" value="Настройки">
                        <input class="userMenuButtons" id="singOutButton" type="button" value="Выйти">
                    </div>-->
                </div>
            </div>
        </header>
        <div class="mbp catalog">
            <div class="mbp catalog__side-menu">
                <form class="mbp form__background search_form_scrollbar">
                    <p class="mbp tip">Введите название, выберите жанр, серию или год издания.</p>
                    <input class="" id="gameName" type="text" name="game__name" placeholder="Название игры">
                    <input class="mbp" id="radio__genre" type="radio" name="searching__group" value="genre" checked>
                    <label class="" for="radio__genre">Искать по жанру</label>
                    <div id="checkboxesGenresWrapper"></div>
                    <input class="mbp" id="radio__series" type="radio" name="searching__group" value="series">
                    <label class="" for="radio__series">Искать по серии</label>
                    <div id="selectSeriesWrapper">
                        <select name="game__series" id="selectSeries">
                        </select>
                    </div>
                    <input class="mbp" id="radio__year" type="radio" name="searching__group" value="year">
                    <label class="" for="radio__year">Искать по году выпуска</label>
                    <div id="yearsTableWrapper">
                        <table class="" id="yearsTable" cellpadding="0" cellspacing="1">
                        </table>
                    </div>
                    <input class="" id="button_parametrized_search" value="Найти" type="button"></input>
                </form>
            </div>
            <div class="mbp catalog__content">
                <div class="mbp content__background">
                    <table class="catalogTable" cellpadding="0" cellspacing="0" id="catalogTable">
                        <tr class="mbp" id="row1"></tr>
                        <tr class="mbp" id="row2"></tr>
                        <tr class="mbp" id="row3"></tr>
                        <tr class="mbp" id="row4"></tr>
                    </table>
                    <menu class="mbp bottom__menu" id="bottom__menu"></menu><menu class="mbp next__previous__menu" id="next__previous__menu"></menu>
                </div>
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