<?php
namespace src\module\report\logic;

use InvalidArgumentException;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\module\report\factory\TaxFactory;
use src\module\report\objects\Tax;
use src\module\tax\logic\ListTaxSettings;
use src\module\tax\objects\TaxSettings;
use src\module\user\objects\User;

class TaxReportToFactory{
    protected TaxFactory $factory;
    protected ListTaxSettings $settings;
    protected ?Tax $taxDeduction = null;
    protected ?bool $notified = false;
    protected ?TaxSettings $setting = null;
    protected User $user;

    public function __construct(){
        $this->factory = new TaxFactory();
        $this->settings = new ListTaxSettings();
    }

    public function findClosestMatchingSetting(Collector $collector, float $net):?TaxSettings{
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
                if($setting->active() && (float)$net > (float)$setting->limitAmount()){
                    return $setting;
                }
            }
        }
        return null;
    }
    
    public function toFactory():void{
        
    }

    public function initializeTaxDeduction(User $user, Id $reportId, float $net, ?bool $notified):void{
        $this->user = $user;
        $this->notified = $notified;
        $collector = $this->settings->list();
        if(!$collector->hasItem()){
            return;
        }
        $this->setting = $this->findClosestMatchingSetting($collector, $net);
        if($this->setting === null || !$this->setting->active() || (float)$net < (float)$this->setting->limitAmount()){
            return;
        }

        //get difference from net agains limit about and take out the percentage from the diffrence.
        $difference = (float)$net - (float)$this->setting->limitAmount();

        $percentageAmount = ($difference / 100) * ((float)$this->setting->percentage());

        $this->taxDeduction = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'userId' => $user->id()->toString(),
            'reportId' => $reportId->toString(),
            'name' => 'Tax deduction',
            'amount' => $percentageAmount,
            'date' => (new DateHelper())->new()->toString(),
            'hide' => false,
        ]);
    }

    public function assertTaxDeduction():bool{
        if($this->hasTaxDeduction()){
            if($this->setting->notify() && !$this->notified){
                throw new InvalidArgumentException('Tax deduction is required for ('.$this->user->name().').');
            }
        }
        return true;
    }

    public function hasTaxDeduction():bool{
        return $this->taxDeduction !== null;
    }

    public function taxDeduction():?Tax{
        return $this->taxDeduction;
    }
}