<?php
namespace src\module\report\objects;

use Exception;
use src\infrastructure\Collector;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IObjects;
use src\infrastructure\NumberHelper;
use src\module\user\objects\User;

class Report implements IObjects{
    protected Id $id;
    protected Id $userId;
    protected string $totalDeduction;
    protected string $totalAllowance;
    protected string $totalSalary;
    protected string $netSalary;
    protected ?float $ytd = null;
    protected Collector $allAllowances;
    protected Collector $allDeductions;
    protected DateHelper $date;
    protected ?User $user = null;
    protected bool $hide;
    protected DateHelper $periodFrom;
    protected DateHelper $periodTo;
    protected bool $approved;

    public function __construct(){
        $this->id = new Id();
        $this->userId = new Id();//user id points to the id of user table and not user id
        $this->allAllowances = new Collector();
        $this->allDeductions = new Collector();
        $this->date = new DateHelper();
        $this->periodFrom = new DateHelper();
        $this->periodTo = new DateHelper();
    }
        
    public function id():IId{
        return $this->id;
    }

    public function hide():bool{
        return $this->hide;
    }
        
    public function userId():IId{
        return $this->userId;
    }
        
    public function approved():bool{
        return $this->approved;
    }
        
    public function user():?User{
        return $this->user;
    }
        
    public function totalDeduction():string{
        return $this->totalDeduction;
    }
        
    public function totalAllowance():string{
        return $this->totalAllowance;
    }
        
    public function totalSalary():string{
        return $this->totalSalary;
    }

    public function net(){
        return $this->netSalary();
    }

    public function netSalary():string{
        return $this->netSalary;
    }
        
    public function date():DateHelper{
        return $this->date;
    }
        
    public function ytd():?string{
        return $this->ytd;
    }
        
    public function periodFrom():DateHelper{
        return $this->periodFrom;
    }
        
    public function periodTo():DateHelper{
        return $this->periodTo;
    }
    
    public function allAllowances():Collector{
        return $this->allAllowances;
    }

    public function allDeductions():Collector{
        return $this->allDeductions;
    }

    public function setId(string $id):void{
        $this->id->set($id);
    }
        
    public function setUserId(string $userId):void{
        $this->userId->set($userId);
    }
        
    public function setDate(string $date):void{
        $this->date->set($date);
    }
        
    public function setUser(User $user):void{
        $this->user = $user;
    }
        
    public function setTotalDeduction(string $totalDeduction):void{
        $this->totalDeduction = NumberHelper::to2dp($totalDeduction);
    }
        
    public function setTotalAllowance(string $totalAllowance):void{
        $this->totalAllowance = NumberHelper::to2dp($totalAllowance);
    }
        
    public function setTotalSalary(string $totalSalary):void{
        $this->totalSalary = NumberHelper::to2dp($totalSalary);
    }

    public function setNetSalary(string $netSalary):void{
        $this->netSalary = NumberHelper::to2dp($netSalary);
    }
        
    public function setYtd(float $ytd):void{
        $this->ytd = NumberHelper::to2dp($ytd);
    }
        
    public function setPeriodFrom(string $periodFrom):void{
        $this->periodFrom->set($periodFrom);
    }
        
    public function setPeriodTo(string $periodTo):void{
        $this->periodTo->set($periodTo);
    }

    public function setHide(bool $hide):void{
        $this->hide = $hide;
    }
    
    public function setToAllAllowancesCollection($collector):void{
        if($collector instanceof Collector){
            foreach($collector->list() as $item){
                $this->allAllowances->add($item);
            }
        }else if ($collector instanceof IObjects){
            $this->allAllowances->add($collector);
        }else{
            throw new Exception('setToAllAllowancesCollection property in report object can only be a Collector or IObject');
        }
    }

    public function setToAllDeductionsCollection($collector):void{
        if($collector instanceof Collector){
            foreach($collector->list() as $item){
                $this->allDeductions->add($item);
            }
        }else if ($collector instanceof IObjects){
            $this->allDeductions->add($collector);
        }else{
            throw new Exception('setToAllDeductionsCollection property in report object can only be a Collector or IObject');
        }
    }
        
    public function setApproved(bool $approved):void{
        $this->approved = $approved;
    }
}