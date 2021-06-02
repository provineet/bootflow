<?php

function dd( $var, $die = false ){

    echo "<pre>";
    var_dump($var);
    echo "</pre>";

    ($die === true) && die();

}

