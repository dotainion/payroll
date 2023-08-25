<?php
namespace src\schema;

use Exception;
use src\database\Table;

class Schema{
    protected $sql = null;

    public function __construct(){
        $this->sql = new Table();
    }

    public function sickLeaveSettings(){
        $this->sql->create('sickLeaveSettings')
            ->column('id')->bindary()
            ->column('days')->string()
            ->column('editable')->bool()
            ->column('includeSalary')->bool()
            ->column('excludedDays')->string()
            ->column('percentageOfSalary')->string()
            ->column('includeAllowances')->string()
            ->column('includeDeductions')->string();
        return $this->sql->execute();
    }

    public function business(){
        $this->sql->create('business')
            ->column('id')->bindary()
            ->column('name')->string()
            ->column('email')->string()
            ->column('isOrganization')->bool()
            ->column('city')->string()
            ->column('state')->string()
            ->column('address')->string()
            ->column('date')->timestamp()
            ->column('hide')->bool();
        return $this->sql->execute();
    }

    public function user(){
        $this->sql->create('user')
            ->column('id')->bindary()
            ->column('userId')->string()
            ->column('name')->string()
            ->column('email')->string()
            ->column('hide')->bool()
            ->column('salary')->string()
            ->column('dob')->timestamp()
            ->column('taxId')->string()
            ->column('otRate')->string()
            ->column('gender')->string()
            ->column('number')->string()
            ->column('city')->string()
            ->column('state')->string()
            ->column('address')->string()
            ->column('department')->string()
            ->column('emergencyNumber')->string()
            ->column('registrationDate')->string();
        return $this->sql->execute();
    }

    public function bank(){
        $this->sql->create('bank')
            ->column('bankId')->bindary()
            ->column('bankHide')->bool()
            ->column('bankName')->string();
        return $this->sql->execute();
    }

    public function bankLink(){
        $this->sql->create('bankLink')
            ->column('bankLinkId')->bindary()
            ->column('bankId')->bindary()
            ->column('userId')->bindary()
            ->column('bankHide')->bool()
            ->column('bankNumber')->string();
        return $this->sql->execute();
    }

    public function credential(){
        $this->sql->create('credential')
            ->column('id')->bindary()
            ->column('expire')->timestamp()
            ->column('password')->string()
            ->column('token')->string()
            ->column('isOrganization')->bool()
            ->column('refreshToken')->string();
        return $this->sql->execute();
    }

    public function allowance(){
        $this->sql->create('allowance')
            ->column('aId')->bindary()
            ->column('aName')->string()
            ->column('aRate')->string()
            ->column('aType')->string()
            ->column('aAmount')->string()
            ->column('aHide')->bool()
            ->column('aRateAmount')->string();
        return $this->sql->execute();
    }

    public function deduction(){
        $this->sql->create('deduction')
            ->column('dId')->bindary()
            ->column('dName')->string()
            ->column('dRate')->string()
            ->column('dType')->string()
            ->column('dAmount')->string()
            ->column('dHide')->bool()
            ->column('dRateAmount')->string();
        return $this->sql->execute();
    }

    public function reportAllowance(){
        $this->sql->create('reportAllowance')
            ->column('rAId')->bindary()
            ->column('rADate')->timestamp()
            ->column('rAName')->string()
            ->column('rAType')->string()
            ->column('rARate')->string()
            ->column('rAHide')->bool()
            ->column('rAReportId')->bindary()
            ->column('rAAmount')->string()
            ->column('rARateAmount')->string()
            ->column('rATotalAmount')->string();
        return $this->sql->execute();
    }

    public function reportDeduction(){
        $this->sql->create('reportDeduction')
            ->column('rDId')->bindary()
            ->column('rDDate')->timestamp()
            ->column('rDName')->string()
            ->column('rDType')->string()
            ->column('rDRate')->string()
            ->column('rDHide')->bool()
            ->column('rDReportId')->bindary()
            ->column('rDAmount')->string()
            ->column('rDRateAmount')->string()
            ->column('rDTotalAmount')->string();
        return $this->sql->execute();
    }

    public function reportLoanAllowance(){
        $this->sql->create('reportLoanAllowance')
            ->column('rLAId')->bindary()
            ->column('userId')->bindary()
            ->column('rLADate')->timestamp()
            ->column('rLAName')->string()
            ->column('rLANumber')->string()
            ->column('rLAAmount')->string()
            ->column('rLAHide')->bool()
            ->column('rLAReportId')->bindary();
        return $this->sql->execute();
    }

    public function reportLoanDeduction(){
        $this->sql->create('reportLoanDeduction')
            ->column('rLDId')->bindary()
            ->column('userId')->bindary()
            ->column('rLDDate')->timestamp()
            ->column('rLDName')->string()
            ->column('rLDNumber')->string()
            ->column('rLDAmount')->string()
            ->column('rLDHide')->bool()
            ->column('rLDReportId')->bindary();
        return $this->sql->execute();
    }

    public function reportNoPayLeaveAllowance(){
        $this->sql->create('reportNoPayLeaveAllowance')
            ->column('nPLAId')->bindary()
            ->column('userId')->bindary()
            ->column('nPLAName')->string()
            ->column('nPLADate')->timestamp()
            ->column('nPLAFrom')->timestamp()
            ->column('nPLATo')->timestamp()
            ->column('nPLAFileId')->bindary()
            ->column('nPLAAmount')->string()
            ->column('nPLAHide')->bool()
            ->column('nPLAReportId')->bindary();
        return $this->sql->execute();
    }

    public function reportNoPayLeaveDeduction(){
        $this->sql->create('reportNoPayLeaveDeduction')
            ->column('nPLDId')->bindary()
            ->column('userId')->bindary()
            ->column('nPLDName')->string()
            ->column('nPLDDate')->timestamp()
            ->column('nPLDFrom')->timestamp()
            ->column('nPLDTo')->timestamp()
            ->column('nPLDFileId')->bindary()
            ->column('nPLDAmount')->string()
            ->column('nPLDHide')->bool()
            ->column('nPLDReportId')->bindary();
        return $this->sql->execute();
    }

    public function sickLeave(){
        $this->sql->create('reportSickLeave')
            ->column('sLId')->bindary()
            ->column('userId')->bindary()
            ->column('sLName')->string()
            ->column('sLDate')->timestamp()
            ->column('sLFrom')->timestamp()
            ->column('sLTo')->timestamp()
            ->column('sLFileId')->bindary()
            ->column('sLAmount')->string()
            ->column('sLHide')->bool()
            ->column('sLReportId')->bindary();
        return $this->sql->execute();
    }

    public function report(){
        $this->sql->create('report')
            ->column('reportId')->bindary()
            ->column('userId')->bindary()
            ->column('date')->timestamp()
            ->column('hide')->bool()
            ->column('totalDeduction')->string()
            ->column('totalAllowance')->string()
            ->column('totalSalary')->string()
            ->column('netSalary')->string();
        return $this->sql->execute();
    }

    public function run(){
        foreach(get_class_methods($this) as $method){
            if($method === '__construct' || $method === 'run') continue;
            if (!is_callable([$this, $method])) {
                throw new Exception($method.' is not callable');
            }
            $this->$method()->reset();
        }
    }
}
