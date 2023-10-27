<?php
namespace src\module\report\factory;

use ReflectionClass;
use src\infrastructure\Assert;
use src\infrastructure\documents\AllowDeducIdLink;

trait AllowanceDeductionFactoryTrait{

    public function getAllowDeducAttribute($cmd):?string{
        Assert::validAllowDeducOption($cmd);

        $link = new AllowDeducIdLink();
        $reflection = new ReflectionClass($link);

        foreach($reflection->getMethods() as $method){
            $method = $method->getName();
            if($method === 'id'){
                continue;
            }
            $option = $link->$method();
            if($option['cmd'] === $cmd){
                return $option['attribute'];
            }
        }
        return null;
    }
}