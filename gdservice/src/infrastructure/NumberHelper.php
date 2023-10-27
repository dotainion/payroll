<?php
namespace src\infrastructure;

class NumberHelper
{
    public static function to2dp($number):string{
        return number_format((float)$number, 2, '.', '');
    }
}

?>