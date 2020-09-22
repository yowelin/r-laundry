<?php

require("db-query-library.php");
if (is_string($_POST["functionFlag"]) && null !== ($_POST["functionFlag"])) {
    $db = DataBase::getDB();
    if ($_POST["functionFlag"] == "commonSearch") {
        $searchString = $_POST["searchString"];
        $wordsNumber = 0;
        for ($i = 0; $i < mb_strlen($searchString . " "); $i++) {
            $symbol = mb_substr($searchString . " ", $i, 1);
            if ($symbol > "A" && $symbol < "z" || $symbol > "А" && $symbol < "я" || $symbol > "0" && $symbol < "9") {
                $words[$wordsNumber] .= $symbol;
            } else {
                if (strlen($words[$wordsNumber]) > 0) {
                    $wordsNumber++;
                }
            }
        }
        if (count($words) > 0) {
            $queryString = "SELECT * FROM (games JOIN genres ON genre = idgenres) JOIN series ON series = idseries WHERE (name_orig LIKE '%" . $words[0] . "%') OR (name_alt LIKE '%" . $words[0] . "%')";
            for ($i = 1; $i < count($words); $i++) {
                $queryString .= "AND (name_orig LIKE '%" . $words[$i] . "%') OR (name_alt LIKE '%" . $words[$i] . "%')";
            }
            $queryString .= ";";
            echo json_encode($db->select($queryString));
        }
    }
    if ($_POST["functionFlag"] == "searchByGenres") {
        $gameName = $_POST["gameNameString"];
        $genreArr = json_decode($_POST["searchString"]);
        $wordsNumber = 0;
        for ($i = 0; $i < mb_strlen($gameName . " "); $i++) {
            $symbol = mb_substr($gameName . " ", $i, 1);
            if ($symbol > "A" && $symbol < "z" || $symbol > "А" && $symbol < "я" || $symbol > "0" && $symbol < "9") {
                $words[$wordsNumber] .= $symbol;
            } else {
                if (strlen($words[$wordsNumber]) > 0) {
                    $wordsNumber++;
                }
            }
        }
        $queryString = "SELECT * FROM (games JOIN genres ON genre = idgenres) JOIN series ON series = idseries WHERE (";
        if (count($words) > 0) {
            $queryString .= "((name_orig LIKE '%" . $words[0] . "%') OR (name_alt LIKE '%" . $words[0] . "%'))";
            for ($i = 1; $i < count($words); $i++) {
                $queryString .= " AND ((name_orig LIKE '%" . $words[$i] . "%') OR (name_alt LIKE '%" . $words[$i] . "%'))";
            }
        }
        if (count($words) > 0 && count($genreArr) > 0) {
            $queryString .= ") AND (";
        }
        if (count($genreArr) > 0) {
            $queryString .= "(genre_name = '" . $genreArr[0] . "')";
            for ($i = 1; $i < count($genreArr); $i++) {
                $queryString .= " OR (genre_name = '" . $genreArr[$i] . "')";
            }
        }
        $queryString .= ");";
        $sqlResult = $db->select($queryString);
        if ($sqlResult !== null) {
            echo json_encode($sqlResult);
        }
    }
    if ($_POST["functionFlag"] == "searchBySeries") {
        $gameName = $_POST["gameNameString"];
        $seriesName = $_POST["searchString"];
        $wordsNumber = 0;
        for ($i = 0; $i < mb_strlen($gameName . " "); $i++) {
            $symbol = mb_substr($gameName . " ", $i, 1);
            if ($symbol > "A" && $symbol < "z" || $symbol > "А" && $symbol < "я" || $symbol > "0" && $symbol < "9") {
                $words[$wordsNumber] .= $symbol;
            } else {
                if (strlen($words[$wordsNumber]) > 0) {
                    $wordsNumber++;
                }
            }
        }
        $queryString = "SELECT * FROM (games JOIN genres ON genre = idgenres) JOIN series ON series = idseries WHERE (";
        if (count($words) > 0) {
            $queryString .= "((name_orig LIKE '%" . $words[0] . "%') OR (name_alt LIKE '%" . $words[0] . "%'))";
            for ($i = 1; $i < count($words); $i++) {
                $queryString .= " AND ((name_orig LIKE '%" . $words[$i] . "%') OR (name_alt LIKE '%" . $words[$i] . "%'))";
            }
        }
        if (count($words) > 0 && strlen($seriesName) > 0) {
            $queryString .= ") AND (";
        }
        if (strlen($seriesName) > 0) {
            $queryString .= "series_name = '" . $seriesName . "'";
        }
        $queryString .= ");";
        $sqlResult = $db->select($queryString);
        if ($sqlResult !== null) {
            echo json_encode($sqlResult);
        }
    }
    if ($_POST["functionFlag"] == "searchByYears") {
        $gameName = $_POST["gameNameString"];
        $yearsArr = json_decode($_POST["searchString"]);
        $wordsNumber = 0;
        for ($i = 0; $i < mb_strlen($gameName . " "); $i++) {
            $symbol = mb_substr($gameName . " ", $i, 1);
            if ($symbol > "A" && $symbol < "z" || $symbol > "А" && $symbol < "я" || $symbol > "0" && $symbol < "9") {
                $words[$wordsNumber] .= $symbol;
            } else {
                if (strlen($words[$wordsNumber]) > 0) {
                    $wordsNumber++;
                }
            }
        }
        $queryString = "SELECT * FROM (games JOIN genres ON genre = idgenres) JOIN series ON series = idseries WHERE (";
        if (count($words) > 0) {
            $queryString .= "((name_orig LIKE '%" . $words[0] . "%') OR (name_alt LIKE '%" . $words[0] . "%'))";
            for ($i = 1; $i < count($words); $i++) {
                $queryString .= " AND ((name_orig LIKE '%" . $words[$i] . "%') OR (name_alt LIKE '%" . $words[$i] . "%'))";
            }
        }
        if (count($words) > 0 && count($yearsArr) > 0) {
            $queryString .= ") AND (";
        }
        if (count($yearsArr) > 0) {
            $queryString .= "(year = '" . $yearsArr[0] . "')";
            for ($i = 1; $i < count($yearsArr); $i++) {
                $queryString .= " OR (year = '" . $yearsArr[$i] . "')";
            }
        }
        $queryString .= ");";
        $sqlResult = $db->select($queryString);
        if ($sqlResult !== null) {
            echo json_encode($sqlResult);
        }
    }
    if ($_POST["functionFlag"] == "genresList") {
        $queryString = "SELECT genre_name FROM genres;";
        echo json_encode($db->select($queryString));
    }
    if ($_POST["functionFlag"] == "seriesList") {
        $queryString = "SELECT * FROM series;";
        echo json_encode($db->select($queryString));
    }
    if ($_POST["functionFlag"] == "yearsList") {
        $queryString = "SELECT DISTINCT year FROM games ORDER BY year;";
        echo json_encode($db->select($queryString));
    }
}
?>
