<?php
namespace src\infrastructure\documents;

use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;

class AllowDeducIdLink implements IObjects{
    const NIS = 'NIS';
    const TAX = 'TAX';

    public function id():IId{
        return (new Id())->new();
    }

    public function nis(){
        return [
            'message' => 'Link user NIS ID', 
            'cmd' => self::NIS,
            'attribute' => 'nisId'
        ];
    }

    public function tax(){
        return [
            'message' => 'Link user TAX ID', 
            'cmd' => self::TAX,
            'attribute' => 'taxId'
        ];
    }
}
