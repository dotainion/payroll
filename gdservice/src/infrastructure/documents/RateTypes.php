<?php
namespace src\infrastructure\documents;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class RateTypes implements IObjects{
    const HOUR = 'h';
    const DAY = 'd';
    const WEEK = 'w';
    const MONTH = 'm';
    const YEAR = 'y';

    public function id():IId{
        return (new Id())->new();
    }

    public function hour(){
        return [
            'name' => 'Per Hour', 
            'value' => self::HOUR
        ];
    }

    public function day(){
        return [
            'name' => 'Per Day', 
            'value' => self::DAY
        ];
    }

    public function week(){
        return [
            'name' => 'Per Week', 
            'value' => self::WEEK
        ];
    }

    public function month(){
        return [
            'name' => 'Per Month', 
            'value' => self::MONTH
        ];
    }   

    public function year(){
        return [
            'name' => 'Per Year', 
            'value' => self::YEAR
        ];
    }
}
