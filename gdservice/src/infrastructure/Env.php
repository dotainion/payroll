<?php
namespace src\infrastructure;

class Env{
    protected array $messages = [];

    public static function dir():string{
        $filter = explode('/', self::uri());
        $trimed = array_filter($filter);
        $index = 0;
        foreach($trimed as $value) {  
            $trimed[$index] = $value;
            $index ++;
        } 
        return $trimed[0] ?? null;
    }

    public static function rootDir():string{
        return $_SERVER['DOCUMENT_ROOT'];
    }

    public static function domain():string{
        return $_SERVER['HTTP_HOST'];
    }

    public static function ip():string{
        return $_SERVER['REMOTE_ADDR'];
    }

    public static function uri():string{
        return $_SERVER['REQUEST_URI'];
    }

    public static function server():string{
        return 'localhost';
    }

    public static function username():string{
        return 'ccagrena_postal';
    }

    public static function password():string{
        return 'CCAGrenada#1568';
    }

    public static function database():string{
        return 'ccagrena_grenada_postal_service';
    }
}