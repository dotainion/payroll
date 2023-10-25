<?php
namespace src\module\tax\service;

use InvalidArgumentException;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\tax\logic\DeleteTaxSettings;
use src\module\tax\logic\FetchTaxSetting;

class DeleteTaxSettingsService extends Service{
    protected DeleteTaxSettings $tax;
    protected FetchTaxSetting $fech;

    public function __construct(){
        parent::__construct();
        $this->tax = new DeleteTaxSettings();
        $this->fech = new FetchTaxSetting();
    }
    
    public function process($id){
        $idObj = new Id();
        $idObj->set($id);

        $collector = $this->fech->fetch($idObj);
        if(!$collector->hasItem()){
            throw new InvalidArgumentException('Tax setting not found.');
        }
        $this->tax->delete($idObj);

        $this->setOutput($collector);
        return $this;
    }
}