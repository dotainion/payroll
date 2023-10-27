<?php
namespace src\infrastructure\documents;

class CheckAllowDeducIdLink{
    const NIS = 'NIS';
    const TAX = 'TAX';

    public function isValid(?string $cmd):bool{
        if(in_array($cmd, [AllowDeducIdLink::NIS, AllowDeducIdLink::TAX])){
            return true;
        }
        return false;
    }
}
