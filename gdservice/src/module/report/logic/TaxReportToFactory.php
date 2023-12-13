<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\ErrorMetaData;
use src\infrastructure\exeptions\InvalidRequirementException;
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
    protected ?TaxSettings $setting = null;
    protected User $user;
    protected Collector $matchingSetting;
    protected bool $stopExecution;

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
                if(!$setting->limitAmount() || !$setting->percentage()){
                    continue;
                }
                if(!$setting->active()){
                    continue;
                }
                $this->matchingSetting->add($setting);
            }
        }
    }
    
    public function toFactory():void{
        
    }

    public function initializeTaxDeduction(bool $stopExecution, User $user, Id $reportId, float $net, array $notified):void{
        $this->user = $user;
        $this->notified = $notified;
        $this->stopExecution = $stopExecution;

        $this->_initializeValidSetting_($this->settings->list());

        foreach($this->matchingSetting->list() as $settings){
            if((float)$net < (float)$settings->limitAmount()){
                continue;
            }

            //get difference from net agains limit about and take out the percentage from the diffrence.
            $difference = (float)$net - (float)$settings->limitAmount();

            $percentageAmount = ($difference / 100) * ((float)$settings->percentage());

            $tax = $this->factory->mapResult([
                'id' => (new Id())->new()->toString(),
                'userId' => $user->id()->toString(),
                'reportId' => $reportId->toString(),
                'name' => 'Tax deduction',
                'amount' => $percentageAmount,
                'date' => (new DateHelper())->new()->toString(),
                'hide' => false,
            ]);
            $this->taxDeductions->add($tax);
        }
    }

    public function assertTaxDeduction():bool{
        $errors = [];
        if($this->hasTaxDeduction()){
            foreach($this->matchingSetting->list() as $setting){
                if($setting->notify() && !$this->notified || $setting->notifyAndAuto() && !$this->notified){
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
            }
            if(!empty($errors) && $this->stopExecution || !$this->stopExecution && $this->notNotified()){
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