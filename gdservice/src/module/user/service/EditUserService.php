<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Email;
use src\infrastructure\Service;
use src\module\user\factory\UserFactory;
use src\module\user\logic\AssertUserInfo;
use src\module\user\logic\EditUser;

class EditUserService extends Service{
    protected EditUser $user;
    protected UserFactory $factory;
    protected AssertUserInfo $assert;

    public function __construct(){
        parent::__construct();
        $this->user = new EditUser();
        $this->factory = new UserFactory();
        $this->assert = new AssertUserInfo();
    }
    
    public function process(
        $id,
        $userId,
        $name,
        $email,
        $hide,
        $salary,
        $dob,
        $taxId,
        $nisId,
        $otRate,
        $gender,
        $number,
        $city,
        $state,
        $address,
        $department,
        $emergencyNumber,
        $registrationDate
    ){
        Assert::stringNotEmpty($userId, 'Invalid user');
        Assert::validEmail($email, 'Invalid email');

        $user = $this->factory->mapResult([
            'id' => $id,
            'userId' => $userId,
            'name' => $name,
            'email' => (new Email())->set($email)->toString(),
            'hide' => $hide,
            'salary' => $salary,
            'dob' => (new DateHelper())->set($dob)->toString(),
            'taxId' => $taxId,
            'nisId' => $nisId,
            'otRate' => $otRate,
            'gender' => $gender,
            'number' => $number,
            'city' => $city,
            'state' => $state,
            'address' => $address,
            'department' => $department,
            'emergencyNumber' => $emergencyNumber,
            'registrationDate' => $registrationDate,
        ]);

        $this->assert->assertUniquteEmail($email, $user->id());
        $this->assert->assertUniquteUserId($userId, $user->id());
        
        $this->user->edit($user);

        $this->setOutput($user);
        return $this;
    }
}