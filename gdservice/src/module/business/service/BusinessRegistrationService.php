<?php
namespace src\module\business\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\business\factory\BusinessFactory;
use src\module\business\logic\CreateBusiness;
use src\module\business\logic\FetchBusiness;
use src\module\login\service\CreateCredentialService;
use src\schema\Schema;

class BusinessRegistrationService extends Service{
    protected BusinessFactory $factory;
    protected CreateCredentialService $credential;
    protected CreateBusiness $create;
    protected FetchBusiness $fetch;

    public function __construct(){
        parent::__construct(false);
        $this->factory = new BusinessFactory();
        $this->credential = new CreateCredentialService();
        $this->create = new CreateBusiness();
        $this->fetch = new FetchBusiness();
    }
    
    public function process($name, $email, $city, $country, $address, $password, $confirmPassword, $isOrganization){
        Assert::validPassword($password, 'Invalid password.');
        Assert::validPasswordMatch($password, $confirmPassword);

        $collector = $this->fetch->business();
        if($collector->hasItem()){
            throw new InvalidArgumentException('Business already set up.');
        }

        $business = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'name' => $name,
            'email' => $email,
            'hide' => false,
            'date' => (new DateHelper())->new()->toString(),
            'city' => $city,
            'state' => $country,
            'address' => $address,
            'isOrganization' => $isOrganization
        ]);

        (new Schema())->run();

        $this->credential->process($business->id()->toString(), $password);

        $this->create->create($business);

        $this->setOutput($business);
        
        return $this;
    }
}