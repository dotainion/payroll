<?php
namespace src\module\report\logic;

use src\infrastructure\DateHelper;
use src\module\user\objects\User;

class BiMonthlySalary{
    protected User $user;
    protected DateHelper $startDate;
    protected DateHelper $endDate;
    protected float $biMonthlySalary;
    protected float $biMonthlyAllowance;

    public function __construct(){
        
    }

    public function set(User $user, DateHelper $periodFrom, DateHelper $periodTo):self{
        $this->user = $user;
        $this->startDate = $periodFrom;
        $this->endDate = $periodTo;
        return $this;
    }

    private function runCalculation(float $net):float{
        $daysBetween = (int)(new DateHelper())->difference($this->startDate, $this->endDate) + 1;
        $daysInMonth = $this->startDate->daysInMonth();
        $percentage = ($net / $daysInMonth);
        return ($percentage * $daysBetween);
    }

    public function calculate():self{
        $this->biMonthlySalary = $this->runCalculation((float)$this->user->salary());
        return $this;
    }

    public function biMonthlySalary():float{
        return $this->biMonthlySalary;
    }
}