<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\ErrorMetaData;
use src\infrastructure\exeptions\InvalidRequirementException;
use src\infrastructure\GlobalData;
use src\infrastructure\Id;
use src\module\report\factory\TaxFactory;
use src\module\tax\logic\ListTaxSettings;
use src\module\tax\objects\TaxSettings;
use src\module\user\objects\User;

class TaxReportToFactory{
    protected TaxFactory $factory;
    protected ListTaxSettings $settings;
    protected Collector $taxDeductions;
    protected array $notified;
    protected User $user;
    protected Collector $matchingSetting;
    protected bool $stopExecution;
    protected float $net;

    public function __construct(){
        $this->factory = new TaxFactory();
        $this->settings = new ListTaxSettings();
        $this->taxDeductions = new Collector();
        $this->matchingSetting = new Collector();
    }

    public function _initializeValidSetting_(Collector $collector):void{
        $limitNumber = [];
        foreach($collector->list() as $setting){
            $limitNumber[] = (float)$setting->limitAmount();
        }
        sort($limitNumber);
        $reversed = array_reverse($limitNumber);
        foreach($reversed as $limit){
            foreach($collector->list() as $setting){
                if((float)$setting->limitAmount() !== $limit){
                    continue;
                }
                if(!$setting->active() || !$setting->limitAmount() || !$setting->percentage()){
                    continue;
                }
                $this->matchingSetting->add($setting);
            }
        }
    }
    
    public function toFactory():void{
        
    }
    
    public function toValueAmount(float $net, TaxSettings $setting):float{
        //get difference from net agains limit about and take out the percentage from the diffrence.
        $difference = (float)$net - (float)$setting->limitAmount();
        return ($difference / 100) * ((float)$setting->percentage());
    }

    public function initializeTaxDeduction(bool $stopExecution, User $user, Id $reportId, float $net, array $notified):void{
        $this->net = $net;
        $this->user = $user;
        $this->notified = $notified;
        $this->stopExecution = $stopExecution;

        $this->_initializeValidSetting_($this->settings->list());

        $tempNet = $this->net;

        foreach($this->matchingSetting->list() as $setting){
            if($tempNet < (float)$setting->limitAmount()){
                continue;
            }

            $tax = $this->factory->mapResult([
                'id' => (new Id())->new()->toString(),
                'userId' => $user->id()->toString(),
                'reportId' => $reportId->toString(),
                'name' => 'Tax deduction',
                'amount' => $this->toValueAmount($tempNet, $setting),
                'date' => (new DateHelper())->new()->toString(),
                'hide' => false,
            ]);
            $this->taxDeductions->add($tax);
            $tempNet = $tempNet - (float)$tax->amount();
        }
    }

    public function assertTaxDeduction():bool{
        $errors = [];
        if($this->hasTaxDeduction()){
            foreach($this->matchingSetting->list() as $setting){
                $errors[] = [
                    'id' => $setting->id()->toString(),
                    'active' => $setting->active(),
                    'auto' => $setting->auto(),
                    'notify' => $setting->notify(),
                    'notifyAndAuto' => $setting->notifyAndAuto(),
                    'percentage' => $setting->percentage(),
                    'hasTaxDeduction' => true,
                ];
            }
            if(!empty($errors) && $this->stopExecution || !$this->stopExecution && $this->notNotified()){
                if(GlobalData::get('createBunkNotify') === 'on' && !$this->notNotified()){
                    return true;
                }
                ErrorMetaData::set('data', $errors);
                throw new InvalidRequirementException('Tax deduction is required for ('.$this->user->name().').');
            }
        }
        return true;
    }

    public function notNotified():bool{
        if(empty($this->notified)) return true;
        foreach($this->notified as $notify){
            if(!$notify['notify']){
                return true;
            }
        }
        return false;
    }

    public function hasTaxDeduction():bool{
        return $this->taxDeductions->hasItem();
    }

    public function taxDeductions():Collector{
        return $this->taxDeductions;
    }
}