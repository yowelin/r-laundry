'use sctrict';

var currentPage = 1;
var searchString;
var pagesAmount = 1;
var BLOCK_SIZE_CONST = 2;
var firstPage = 1;
var lastBlockSize;
var blockAmount = 1;
var currentBlock = 1;
var gameNames = [];
var searchBy = '';
var gameName = '';
var parametrizedSearchString = '';
function arrowNextPrev(atrId) {
    if (atrId === 'blockNext') {
        blockAmount = Math.ceil(pagesAmount / BLOCK_SIZE_CONST);
        lastBlockSize = pagesAmount % BLOCK_SIZE_CONST;
        if (currentBlock < blockAmount - 1) {
            currentBlock++;
            removeBottomMenu();
            firstPage += BLOCK_SIZE_CONST;
            createBottomMenu(pagesAmount, firstPage, BLOCK_SIZE_CONST, firstPage);
        } else if (currentBlock < blockAmount) {
            currentBlock++;
            removeBottomMenu();
            firstPage += BLOCK_SIZE_CONST;
            if (lastBlockSize === 0) {
                lastBlockSize = BLOCK_SIZE_CONST;
            }
            createBottomMenu(pagesAmount, firstPage, lastBlockSize, firstPage);
        }
    }
    if (atrId === 'blockPrevious') {
        if (currentBlock > 1) {
            currentBlock--;
            removeBottomMenu();
            firstPage -= BLOCK_SIZE_CONST;
            createBottomMenu(pagesAmount, firstPage, BLOCK_SIZE_CONST, firstPage);
        }
    }
}
function createBottomMenu(atrPagesAmount, atrCurrentPage, atrPageBlockSize, atrFirstPage) {
    var bottomMenuWrapper = document.getElementById('bottom__menu');
    if (atrPagesAmount < BLOCK_SIZE_CONST) {
        atrPageBlockSize = atrPagesAmount;
    }
    for (let i = atrFirstPage; i < atrFirstPage + atrPageBlockSize; i++) {
        var pageNumberListItem = document.createElement('li');
        pageNumberListItem.setAttribute('class', 'mbp bottom_menu__list-item');
        pageNumberListItem.setAttribute('id', 'pageListItem' + i);
        var pageNumberLink = document.createElement('a');
        pageNumberLink.setAttribute('class', 'bottom_menu__list-link' + (i === atrCurrentPage ? ' bottom_menu__current' : ''));
        pageNumberLink.setAttribute('id', 'pageNumber' + i);
        pageNumberLink.innerHTML = i;
        bottomMenuWrapper.appendChild(pageNumberListItem);
        pageNumberListItem.appendChild(pageNumberLink);
        if (i === atrFirstPage + atrPageBlockSize - 1) {
            createArrow('&lt;');
            createArrow('&gt;');
        }
    }
}
function removeBottomMenu() {
    var bottomMenuWrapper = document.getElementById('bottom__menu');
    bottomMenuWrapper.innerHTML = null;
    removeArrows();
}
function createArrow(atrType) {
    var bottomMenuArrowsWrapper = document.getElementById('next__previous__menu');
    var arrowWrapper = document.createElement('div');
    arrowWrapper.setAttribute('class', 'mbp bottom_menu__list-item');
    var arrowLink = document.createElement('a');
    arrowLink.setAttribute('class', 'bottom_menu__list-link');
    if (atrType === '&lt;') {
        arrowLink.setAttribute('id', 'blockPrevious');
        arrowWrapper.setAttribute('id', 'blockPreviousWrapper');
    }
    if (atrType === '&gt;') {
        arrowLink.setAttribute('id', 'blockNext');
        arrowWrapper.setAttribute('id', 'blockNextWrapper');
    }
    arrowLink.innerHTML = atrType;
    bottomMenuArrowsWrapper.appendChild(arrowWrapper);
    arrowWrapper.appendChild(arrowLink);
}
function removeArrows() {
    var bottomMenuArrowsWrapper = document.getElementById('next__previous__menu');
    bottomMenuArrowsWrapper.innerHTML = null;
}
function createTable(rowsAmount, columnsAmount) {
    for (let i = 1; i <= rowsAmount; i++) {
        for (let j = 1; j <= columnsAmount; j++) {
            var row = document.getElementById('row' + i);
            var tableData = document.createElement('td');
            tableData.setAttribute('class', 'mbp cell column' + j);
            tableData.setAttribute('id', 'cell' + i + j);
            row.appendChild(tableData);
        }
    }
}
function removeTable(rowsAmount, columnsAmount) {
    for (let i = 1; i <= rowsAmount; i++) {
        for (let j = 1; j <= columnsAmount; j++) {
            var row = document.getElementById('row' + i);
            var tableData = document.getElementById('cell' + i + j);
            row.removeChild(tableData);
        }
    }
}
function getCurrentPage(e) {
    e = e || event;
    var target = e.target || e.srcElement;
    var pageNumber = parseInt(target.id.replace(/\D+/g, ''));
    return pageNumber;
}
function getArrowId(e) {
    e = e || event;
    var target = e.target || e.srcElement;
    return target.id;
}
function getPressedButtonNumber(e) {
    e = e || event;
    var target = e.target || e.srcElement;
    var buttonNumber = parseInt(target.id.replace(/\D+/g, ''));
    return buttonNumber;
}
function getNumberFromId(atrId) {
    return parseInt(atrId.replace(/\D+/g, ''));
}
function loadGenres() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var genresArray = JSON.parse(this.responseText);
            var checkboxesGenresWrapper = document.getElementById('checkboxesGenresWrapper');
            for (var i = 0; i < genresArray.length; i++) {
                var checkboxWrapper = document.createElement('div');
                checkboxWrapper.setAttribute('class', 'checkboxWrapper');
                var checkbox = document.createElement('input');
                checkbox.setAttribute('class', 'mbp genreCheckboxes');
                checkbox.setAttribute('id', 'checkbox' + i);
                checkbox.setAttribute('type', 'checkbox');
                checkbox.setAttribute('name', 'checkbox' + i);
                checkbox.setAttribute('value', genresArray[i]['genre_name']);
                if (i === 0) {
                    checkbox.checked = true;
                }
                var checkboxLabel = document.createElement('label');
                checkboxLabel.setAttribute('class', 'mbp');
                checkboxLabel.setAttribute('id', 'label' + i);
                checkboxLabel.setAttribute('for', 'checkbox' + i);
                checkboxesGenresWrapper.appendChild(checkboxWrapper).appendChild(checkbox);
                checkboxWrapper.appendChild(checkboxLabel);
                checkboxLabel.innerHTML = genresArray[i]['genre_name'];
            }
        }
    };
    xhttp.open('POST', './php/index-page-functions.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'genresList'}`);
}
function loadSeries() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var seriesArray = JSON.parse(this.responseText);
            var selectSeries = document.getElementById('selectSeries');
            for (var i = 0; i < seriesArray.length; i++) {
                var option = document.createElement('option');
                option.setAttribute('id', seriesArray[i]['idseries']);
                option.innerHTML = seriesArray[i]['series_name'];
                selectSeries.appendChild(option);
            }
        }
    };
    xhttp.open('POST', './php/index-page-functions.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'seriesList'}`);
}
function loadYears() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            var yearsArray = JSON.parse(this.responseText);
            var rowsAmount = Math.ceil(yearsArray.length / 3);
            var lastRowItemsAmount = yearsArray.length % 3;
            if (lastRowItemsAmount === 0) {
                lastRowItemsAmount = 2;
            }
            var yearsTable = document.getElementById('yearsTable');
            var k = 0;
            outer: for (var i = 0; i < rowsAmount; i++) {
                var yearsTableRow = document.createElement('tr');
                yearsTableRow.setAttribute('class', 'mbp');
                yearsTableRow.setAttribute('id', 'yearsTableRow' + i);
                yearsTable.appendChild(yearsTableRow);
                for (let j = 0; j < 3; j++) {
                    var yearTableData = document.createElement('td');
                    yearTableData.setAttribute('class', 'mbp');
                    yearsTableRow.appendChild(yearTableData);
                    var checkBox = document.createElement('input');
                    checkBox.setAttribute('class', 'mbp yearCheckboxes');
                    checkBox.setAttribute('id', 'yearCheckbox' + k);
                    checkBox.setAttribute('type', 'checkbox');
                    yearTableData.appendChild(checkBox);
                    var label = document.createElement('label');
                    label.setAttribute('id', 'yearLabel' + k);
                    label.setAttribute('for', 'yearCheckbox' + k);
                    label.innerHTML = yearsArray[k]['year'];
                    yearTableData.appendChild(label);
                    if (i === rowsAmount - 1 && j === lastRowItemsAmount) {
                        break outer;
                    }
                    k++;
                }
            }
        }
    };
    xhttp.open('POST', './php/index-page-functions.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'yearsList'}`);
}
function getSearchInfo(e) {
    var genresForSearch = [];
    var yearsForSearch = [];
    gameName = document.getElementById('gameName').value;
    if (document.getElementById('radio__genre').checked) {
        var genreCheckboxes = document.getElementsByClassName('genreCheckboxes');
        j = 0;
        for (var i = 0; i < genreCheckboxes.length; i++) {
            var checkBox = document.getElementById('checkbox' + i);
            if (checkBox.checked) {
                var label = document.getElementById('label' + i);
                genresForSearch[j] = label.innerHTML;
                j++;
            }
        }
        parametrizedSearchString = JSON.stringify(genresForSearch);
        searchBy = 'Genres';
    }
    if (document.getElementById('radio__series').checked) {
        parametrizedSearchString = document.getElementById('selectSeries').value;
        searchBy = 'Series';
    }
    if (document.getElementById('radio__year').checked) {
        var yearCheckboxes = document.getElementsByClassName('yearCheckboxes');
        j = 0;
        for (var i = 0; i < yearCheckboxes.length; i++) {
            var checkBox = document.getElementById('yearCheckbox' + i);
            if (checkBox.checked) {
                var label = document.getElementById('yearLabel' + i);
                yearsForSearch[j] = label.innerHTML;
                j++;
            }
        }
        parametrizedSearchString = JSON.stringify(yearsForSearch);
        searchBy = 'Years';
    }
    Search(e, 1, searchBy, gameName, parametrizedSearchString, 1);
}

function Search(atrEvent, atrCurrentPage, atrSearchBy, atrGameName, atrParametrizedSearchString, atrFirstPage) {
    var lclPageBlockSize = BLOCK_SIZE_CONST;
    if (atrEvent.type === 'load') {
        searchBy = atrSearchBy;
        gameName = atrGameName;
        parametrizedSearchString = atrParametrizedSearchString;
    }
    if (atrEvent.type !== 'load' && atrEvent.target.id !== 'button_parametrized_search') {
        atrFirstPage = firstPage;
        blockAmount = Math.ceil(pagesAmount / BLOCK_SIZE_CONST);
        lastBlockSize = pagesAmount % BLOCK_SIZE_CONST;
        if (currentBlock === blockAmount) {
            lastBlockSize === 0 ? lclPageBlockSize = BLOCK_SIZE_CONST : lclPageBlockSize = lastBlockSize;
        }
    } else {
        currentPage = 1;
        currentBlock = 1;
        firstPage = 1;
    }
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            if (this.responseText !== '[]' && this.responseText !== '' && this.responseText !== 'false') {
                var SearchResult = JSON.parse(this.responseText);
                pagesAmount = Math.ceil(SearchResult.length / 12);
                if (SearchResult.length % 12 === 0) {
                    lastPageRowsAmount = 4;
                    lastRowItemsAmount = 3;
                } else {
                    lastPageItemsAmount = SearchResult.length % 12;
                    lastPageRowsAmount = Math.ceil(lastPageItemsAmount / 3);
                    if (lastPageItemsAmount % 3 === 0) {
                        lastRowItemsAmount = 3;
                    } else {
                        lastRowItemsAmount = lastPageItemsAmount % 3;
                    }
                }
                removeTable(4, 3);
                createTable(4, 3);
                removeBottomMenu();
                createBottomMenu(pagesAmount, atrCurrentPage, lclPageBlockSize, atrFirstPage);
                var k = 0;
                analizeCookie(document.cookie);
                if (cookieAssocArr['cart'] !== '' && cookieAssocArr['cart'] !== undefined) {
                    gameNames = JSON.parse(cookieAssocArr['cart']);
                }
                outer: for (let i = 1; i <= 4; i++) {
                    for (let j = 1; j <= 3; j++) {
                        var gameNameIsFound = false;
                        var img = document.createElement('img');
                        img.setAttribute('class', 'product_image');
                        img.setAttribute('id', 'image' + i + j);
                        img.setAttribute('src', './' + SearchResult[k + 12 * (atrCurrentPage - 1)]['picture']);
                        img.setAttribute('alt', '');
                        var pName = document.createElement('p');
                        pName.setAttribute('class', 'mbp product_name');
                        pName.innerHTML = 'Название: ';
                        var aName = document.createElement('a');
                        aName.setAttribute('class', 'name_href');
                        aName.setAttribute('id', 'name' + i + j);
                        aName.innerHTML = SearchResult[k + 12 * (atrCurrentPage - 1)]['name_orig'];
                        var pPrice = document.createElement('p');
                        pPrice.setAttribute('class', 'mbp product_price');
                        pPrice.innerHTML = 'Цена: ' + SearchResult[k + 12 * (atrCurrentPage - 1)]['price'] + ' р.';
                        var inputButtonToCart = document.createElement('input');
                        inputButtonToCart.setAttribute('class', 'mbp add-to-cart__button');
                        inputButtonToCart.setAttribute('id', 'add-to-cart__button' + i + j);
                        inputButtonToCart.setAttribute('type', 'button');
                        for (var gameName in gameNames) {
                            if (SearchResult[k + 12 * (atrCurrentPage - 1)]['name_orig'] === gameNames[gameName]) {
                                gameNameIsFound = true;
                                break;
                            }
                        }
                        if (gameNameIsFound) {
                            inputButtonToCart.setAttribute('value', 'Добавлено');
                            inputButtonToCart.style.boxShadow = '0 0 5px 1px #4d7380';
                            img.style.boxShadow = '0 0 10px 5px #4d7380';
                        } else {
                            inputButtonToCart.setAttribute('value', 'В корзину');
                        }
                        var column = document.getElementById('cell' + i + j);
                        column.appendChild(img);
                        column.appendChild(pName);
                        pName.appendChild(aName);
                        column.appendChild(pPrice);
                        column.appendChild(inputButtonToCart);
                        k++;
                        if (atrCurrentPage === pagesAmount && i === lastPageRowsAmount && j === lastRowItemsAmount) {
                            break outer;
                        }
                    }
                }
            } else {
                alert('Ничего не найдено.');
            }
        }
    };
    xhttp.open('POST', './php/index-page-functions.php', true);
    xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhttp.send(`functionFlag=${'searchBy' + atrSearchBy}&gameNameString=${atrGameName}&searchString=${atrParametrizedSearchString}`);
}

window.addEventListener('load', function (e) {
    loadGenres();
    loadSeries();
    loadYears();
    createTable(4, 3);
    createBottomMenu(1, 1, 1, 1);
    Search(e, 1, 'Series', '', 'Grand Theft Auto', 1);
    var checkboxesGenresWrapper = document.getElementById('checkboxesGenresWrapper');
    var selectSeriesWrapper = document.getElementById('selectSeriesWrapper');
    var yearsTableWrapper = document.getElementById('yearsTableWrapper');
    checkboxesGenresWrapper.style.maxHeight = '100%';
    selectSeriesWrapper.style.maxHeight = '0px';
    yearsTableWrapper.style.maxHeight = '0px';

    document.getElementById('catalogTable').onclick = function (e) {
        if (e.target.type === 'button') {
            analizeCookie(document.cookie);
            var cartCookieDate = new Date(new Date().getTime() + 60 * 1000 * 30);
            var gameToAdd = document.getElementById('name' + getPressedButtonNumber(e)).innerHTML;
            var gameImg = document.getElementById('image' + getPressedButtonNumber(e));
            var inputButtonToCart = document.getElementById(e.target.id);
            var gameIsFound = false;
            if (cookieAssocArr['cart'] !== '' && cookieAssocArr['cart'] !== undefined) {
                gameNames = JSON.parse(cookieAssocArr['cart']);
            }
            for (var i = 0; i < gameNames.length; i++) {
                if (gameNames[i] === gameToAdd) {
                    gameIsFound = true;
                    break;
                }
            }
            if (!gameIsFound) {
                gameNames[gameNames.length] = document.getElementById('name' + getPressedButtonNumber(e)).innerHTML;
                document.cookie = cartCookieName + '=' + JSON.stringify(gameNames) + '; path=/; expires=' + cartCookieDate.toUTCString();
            }
            inputButtonToCart.setAttribute('value', 'Добавлено');
            inputButtonToCart.style.boxShadow = '0 0 5px 1px #4d7380';
            gameImg.style.boxShadow = '0 0 10px 5px #4d7380';
        }
    };
    document.getElementById('bottom__menu').onmouseup = function (e) {
        currentPage = getCurrentPage(e);
        Search(e, currentPage, searchBy, gameName, parametrizedSearchString, firstPage);
    };
    document.getElementById('next__previous__menu').onclick = function (e) {
        if (getArrowId(e) === 'blockNext') {
            blockAmount = Math.ceil(pagesAmount / BLOCK_SIZE_CONST);
            if ((currentBlock >= 1 && currentBlock < blockAmount)) {
                arrowNextPrev(getArrowId(e));
                Search(e, firstPage, searchBy, gameName, parametrizedSearchString, firstPage);
            }
        } else if (getArrowId(e) === 'blockPrevious') {
            blockAmount = Math.ceil(pagesAmount / BLOCK_SIZE_CONST);
            if ((currentBlock <= blockAmount && currentBlock > 1)) {
                arrowNextPrev(getArrowId(e));
                Search(e, firstPage, searchBy, gameName, parametrizedSearchString, firstPage);
            }
        }
    };
    document.getElementById('radio__genre').onchange = function () {
        checkboxesGenresWrapper.style.maxHeight = '100%';
        selectSeriesWrapper.style.maxHeight = '0px';
        yearsTableWrapper.style.maxHeight = '0px';
    };
    document.getElementById('radio__series').onchange = function () {
        checkboxesGenresWrapper.style.maxHeight = '0px';
        selectSeriesWrapper.style.maxHeight = '100%';
        yearsTableWrapper.style.maxHeight = '0px';
    };
    document.getElementById('radio__year').onchange = function () {
        checkboxesGenresWrapper.style.maxHeight = '0px';
        selectSeriesWrapper.style.maxHeight = '0px';
        yearsTableWrapper.style.maxHeight = '100%';
    };
    document.getElementById('button_parametrized_search').onclick = getSearchInfo;
});