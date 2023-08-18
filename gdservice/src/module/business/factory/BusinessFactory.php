<?php
namespace src\module\business\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\infrastructure\IUser;
use src\module\business\objects\Business;

class BusinessFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):IUser{
        $business = new Business();
        $business->setId($this->uuid($record['id']));
        $business->setName($record['name']);
        $business->setEmail($record['email']);
        $business->setCity($record['city']);
        $business->setState($record['state']);
        $business->setDate($record['date']);
        $business->setHide($record['hide']);
        $business->setAddress($record['address']);
        $business->setIsOrganization((bool)$record['isOrganization']);
        return $business;
    }
}