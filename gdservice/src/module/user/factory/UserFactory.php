<?php
namespace src\module\user\factory;

use src\infrastructure\Collector;
use src\infrastructure\Factory;
use src\infrastructure\IUser;
use src\module\user\objects\User;

class UserFactory extends Collector{
    use Factory;

    public function __construct(){
    }

    public function mapResult($record):IUser{
        $user = new User();
        $user->setId($this->uuid($record['id']));
        $user->setUserId($record['userId'] ?? '');
        $user->setName($record['name'] ?? '');
        $user->setEmail($record['email'] ?? '');
        $user->setHide($record['hide'] ?? false);
        $user->setGender($record['gender'] ?? '');
        $user->setNumber($record['number'] ?? '');
        $user->setSalary($record['salary'] ?? '');
        $user->setDob($record['dob'] ?? '');
        $user->setTaxId($record['taxId'] ?? '');
        $user->setNisId($record['nisId'] ?? '');
        $user->setOtRate($record['otRate'] ?? '');
        $user->setCity($record['city'] ?? '');
        $user->setState($record['state'] ?? '');
        $user->setAddress($record['address'] ?? '');
        $user->setDepartment($record['department'] ?? '');
        $user->setEmergencyNumber($record['emergencyNumber'] ?? '');
        $user->setRegistrationDate($record['registrationDate'] ?? '');
        return $user;
    }
}