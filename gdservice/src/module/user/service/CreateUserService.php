<?php
namespace src\module\user\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Email;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\bank\logic\AssertBankExist;
use src\module\bank\logic\AssertBankLinkExist;
use src\module\bank\service\CreateBankLinkService;
use src\module\user\factory\UserFactory;
use src\module\user\logic\AssertUserInfo;
use src\module\user\logic\CreateUser;

class CreateUserService extends Service{
    protected CreateUser $user;
    protected UserFactory $factory;
    protected AssertBankExist $assert;
    protected AssertBankLinkExist $assertLink;
    protected AssertUserInfo $assertUser;

    public function __construct(){
        parent::__construct(false);
        $this->user = new CreateUser();
        $this->factory = new UserFactory();
        $this->assert = new AssertBankExist();
        $this->assertLink = new AssertBankLinkExist();
        $this->assertUser = new AssertUserInfo();
    }
    
    public function process(
        $userId,
        $name,
        $email,
        $hide,
        $salary,
        $dob,
        $taxId,
        $otRate,
        $gender,
        $number,
        $city,
        $state,
        $address,
        $department,
        $emergencyNumber,
        $registrationDate,
        $banks
    ){
        foreach($banks as $bank){
            Assert::validUuid($bank['bankId'], 'Bank not found.');
            Assert::stringNotEmpty($bank['number'], 'Bank number is required.');
            $this->assert->assertBankExistById((new Id())->set($bank['bankId']));
            $this->assertLink->assertBankLinkNotExistByNumber($bank['number']);
        }

        $this->assertUser->assertUniquteEmail($email);
        $this->assertUser->assertUniquteUserId($userId);

        $user = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'userId' => $userId,
            'name' => $name,
            'email' => (new Email())->set($email)->toString(),
            'hide' => $hide,
            'salary' => $salary,
            'dob' => (new DateHelper())->set($dob)->toString(),
            'taxId' => $taxId,
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
        
        $this->user->create($user);
        
        foreach($banks as $bank){
            $createUserBankLink = new CreateBankLinkService();
            $createUserBankLink->process($bank['bankId'], $user->id()->toString(), $bank['number']);
        }

        $this->setOutput($user);
        return $this;
    }
}