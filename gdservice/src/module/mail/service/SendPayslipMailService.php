<?php
namespace src\module\mail\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\user\logic\FetchUser;

class SendPayslipMailService extends Service{
    protected FetchUser $user;

    public function __construct(){
        parent::__construct();
        $this->user = new FetchUser();
    }
    
    public function process($userId, $reportId, $subject, $body, $attatchments){
        Assert::validUuid($userId, 'User not found.');

        $collector = $this->user->user((new Id())->set($userId));
        $user = $collector->first();

        $service = (new SendMailService())->process($subject, $body, [[
            'userId' => $user->id()->toString(),
            'recipient' => $user->email(),
        ]], $attatchments);

        $this->mergeOutput($service);
        return $this;
    }
}