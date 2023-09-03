<?php
namespace src\module\business\service;

use src\infrastructure\Assert;
use src\infrastructure\Service;
use src\module\business\factory\BusinessFactory;
use src\module\business\logic\EditBusiness;
use src\module\business\logic\FetchBusiness;

class EditBusinessRegistrationService extends Service{
    protected BusinessFactory $factory;
    protected EditBusiness $edit;
    protected FetchBusiness $fetch;

    public function __construct(){
        parent::__construct(false);
        $this->factory = new BusinessFactory();
        $this->edit = new EditBusiness();
        $this->fetch = new FetchBusiness();
    }
    
    public function process($id, $name, $email, $city, $country, $address, $isOrganization){
        Assert::validUuid($id, 'Business not found.');

        $business = $this->factory->mapResult([
            'id' => $id,
            'name' => $name,
            'email' => $email,
            'hide' => false,
            'date' => null,
            'city' => $city,
            'state' => $country,
            'address' => $address,
            'isOrganization' => $isOrganization
        ]);

        $this->edit->edit($business);

        $collector = $this->fetch->business();

        $this->setOutput($collector);
        
        return $this;
    }
}