<?php
namespace src\infrastructure\documents;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class CostTypes implements IObjects{
    const PERCENTAGE = '2';
    const DOLLARAMOUNT = '3';
    const RATE = '1';

    public function id():IId{
        return (new Id())->new();
    }

    public function rate(){
        return [
            'name' => 'Rate', 
            'value' => self::RATE
        ];
    }

    public function percentage(){
        return [
            'name' => 'Percentage', 
            'value' => self::PERCENTAGE
        ];
    }

    public function dollarAmount(){
        return [
            'name' => 'Dollar amount', 
            'value' => self::DOLLARAMOUNT
        ];
    }
}
