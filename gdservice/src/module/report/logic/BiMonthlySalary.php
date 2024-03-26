<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Period;
use src\module\prorate\objects\Prorate;
use src\module\settings\logic\FetchProrateSettings;
use src\module\user\objects\User;

class BiMonthlySalary{
    protected User $user;
    protected Period $period;
    protected ?Prorate $prorate;
    protected float $net;
    protected FetchProrateSettings $settings;

    public function __construct(){
        $this->settings = new FetchProrateSettings();
    }

    public function set(User $user, Period $period, ?Prorate $prorate):self{
        $this->user = $user;
        $this->period = $period;
        $this->prorate = $prorate;
        return $this;
    }

    private function runCalculation(float $net):float{
        $daysBetweenPeriod = (new DateHelper())->difference($this->period->from(), $this->period->to()) + 1;
        $daysBetweenProrate = (new DateHelper())->difference($this->prorate->from(), $this->prorate->to()) + 1;

        //$daysInMonth = $this->prorate->from()->daysInMonth();

        $percentage = ($net / $daysBetweenPeriod);
        return ($percentage * $daysBetweenProrate);
    }

    public function runProrate():void{
        $this->net = $this->runCalculation($this->net);
    }

    public function toFullSalary():self{
        $this->net = (float)$this->user->salary();
        return $this;
    }

    public function calculate():self{
        $collector = $this->settings->prorate();

        if(!$collector->hasItem()){
            return $this->toFullSalary();
        }

        $prorate = $collector->first();

        if(!$prorate->off()){
            $this->toFullSalary();
        }elseif($prorate->biMonthly()){
            $this->net = (float)$this->user->salary() / 2;
        }

        if($this->prorate !== null){
            $this->runProrate();
        }
        
        return $this;
    }

    public function exemptSalary():void{
        $this->net = 0;
    }

    public function total():float{
        return $this->net;
    }

    public function prorate():?Prorate{
        return $this->prorate;
    }

    public function prorateAsCollection():Collector{
        $collector = new Collector();
        if($this->prorate() !== null){
            $collector->add($this->prorate());
        }
        return $collector;
    }
}