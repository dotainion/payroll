<?php
namespace src\module\tax\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\infrastructure\TaxHelper;
use src\module\tax\factory\TaxSettingsFactory;
use src\module\tax\logic\SetTaxSettings;

class SetTaxSettingsService extends Service{
    protected TaxSettingsFactory $factory;
    protected SetTaxSettings $update;

    public function __construct(){
        parent::__construct();
        $this->factory = new TaxSettingsFactory();
        $this->update = new SetTaxSettings();
    }
    
    public function process($id, $active, $percentage, $limitAmount, $notify, $auto, $notifyAndAuto){
        $taxSettingsId = new Id();
        $taxSettingsId->isValid($id??'') 
            ? $taxSettingsId->set($id)
            : $taxSettingsId->new();

        $auto && $alert = TaxHelper::AUTO;
        $notify && $alert = TaxHelper::NOTIFY;
        $notifyAndAuto && $alert = TaxHelper::NOTIFY_AND_AUTO;

        if($active){
            Assert::stringNotEmpty($percentage, 'To turn on this settings you must first add a valid percentage amount.');
            Assert::stringNotEmpty($limitAmount, 'To turn on this settings you must first add a valid salary limit.');
            Assert::validTaxNotification($alert, 'To turn on this settings you must first choose a valid notification option.');
        }

        $taxSettings = $this->factory->mapResult([
            'id' => $taxSettingsId->toString(),
            'active' => $active ?? false,
            'percentage' => $percentage ?? null,
            'limitAmount' => $limitAmount ?? null,
            'alert' => $alert ?? null
        ]);

        $this->update->set($taxSettings);

        $this->setOutput($taxSettings);
        return $this;
    }
}