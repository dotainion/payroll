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

class CalculateTaxReportToFactory{
    protected TaxFactory $factory;
    protected ListTaxSettings $settings;
    protected Collector $taxDeductions;
    protected array $notified;
    protected User $user;
    protected Collector $matchingSetting;
    protected Collector $settingsAppliedToTaxDeduction;
    protected bool $stopExecution;
    protected float $net;
    protected float $netAfterTax;

    public function __construct(){
        $this->factory = new TaxFactory();
        $this->settings = new ListTaxSettings();
        $this->taxDeductions = new Collector();
        $this->matchingSetting = new Collector();
        $this->settingsAppliedToTaxDeduction = new Collector();
    }

    public function parseActiveTaxSettings(Collector $collector):void{
        $settingsList = $collector->list();
        usort($settingsList, fn($a, $b)=>strcmp($a->limitAmount(), $b->limitAmount()));
        $settingsList = array_reverse($settingsList);

        //settings starts from highest to lowest
        foreach($settingsList as $setting){
            if(!$setting->active() || !$setting->limitAmount() || !$setting->percentage()){
                continue;
            }
            $this->matchingSetting->add($setting);
        }
    }
    
    public function nextHighestTaxSettings(int $currentTaxSettingsIndex):?TaxSettings{
        return $this->matchingSetting->list()[$currentTaxSettingsIndex -1] ?? null;
    }
    
    public function toValueAmount(TaxSettings $setting, ?TaxSettings $nextTax):float{
        //get difference from net againts limit amount and divide the difference by 100 then multiply by percentage amount.
        if($nextTax === null || $nextTax->limitAmount() > $this->netAfterTax){
            $limitAmountToReach = $this->netAfterTax;
        }else{
            $limitAmountToReach = $nextTax->limitAmount();
        }
        $difference = $limitAmountToReach - $setting->limitAmount();
        return  ($difference / 100) * $setting->percentage();
    }

    public function initializeTaxDeduction(bool $stopExecution, User $user, Id $reportId, float $net, array $notified):void{
        $this->net = $net;
        $this->user = $user;
        $this->notified = $notified;
        $this->stopExecution = $stopExecution;

        $this->parseActiveTaxSettings($this->settings->listActive());

        $this->netAfterTax = $this->net;

        //settings starts from highest to lowest
        foreach($this->matchingSetting->list() as $index => $setting){
            if($this->netAfterTax < $setting->limitAmount()){
                continue;
            }

            $nextTax = $this->nextHighestTaxSettings($index);
            $tax = $this->factory->mapResult([
                'id' => (new Id())->new()->toString(),
                'userId' => $user->id()->toString(),
                'reportId' => $reportId->toString(),
                'name' => 'Tax deduction',
                'amount' => $this->toValueAmount($setting, $nextTax),
                'date' => (new DateHelper())->new()->toString(),
                'hide' => false,
            ]);
            $this->taxDeductions->add($tax);
            $this->settingsAppliedToTaxDeduction->add($setting);
            $this->netAfterTax = $this->netAfterTax - (float)$tax->amount();
        }
    }

    public function assertTaxDeduction():bool{
        $errors = [];
        if($this->hasTaxDeduction()){
            foreach($this->settingsAppliedToTaxDeduction->list() as $setting){
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