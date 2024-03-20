<?php
namespace src\module\report\logic;

use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\module\prorate\objects\Prorate;
use src\module\settings\logic\FetchProrateSettings;
use src\module\user\objects\User;

class BiMonthlySalary{
    protected User $user;
    protected ?Prorate $prorate;
    protected float $net;
    protected FetchProrateSettings $settings;

    public function __construct(){
        $this->settings = new FetchProrateSettings();
    }

    public function set(User $user, ?Prorate $proratePeriod):self{
        $this->user = $user;
        $this->prorate = $proratePeriod;
        return $this;
    }

    private function runCalculation(float $net):float{
        $daysBetween = (int)(new DateHelper())->difference($this->prorate->from(), $this->prorate->to()) + 1;
        $daysInMonth = $this->prorate->from()->daysInMonth();
        $percentage = ($net / $daysInMonth);
        return ($percentage * $daysBetween);
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

        if($prorate->off()){
            $this->toFullSalary();
        }elseif($prorate->biMonthly()){
            $this->net = (float)$this->user->salary() / 2;
        }

        if($this->prorate !== null){
            $this->runProrate();
        }
        
        return $this;
    }

    public function net():float{
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