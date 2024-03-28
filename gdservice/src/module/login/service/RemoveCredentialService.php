<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\login\logic\RemoveHasCredential;
use src\module\mail\logic\RecoveryTemplate;
use src\module\mail\service\SendMailService;
use src\module\user\logic\FetchUser;

class RemoveCredentialService extends Service{
    protected FetchUser $fetch;
    protected RemoveHasCredential $credential;
    protected RecoveryTemplate $template;

    public function __construct(){
        parent::__construct(false);
        $this->fetch = new FetchUser();
        $this->credential = new RemoveHasCredential();
        $this->template = new RecoveryTemplate();
    }
    
    public function process($id){
        Assert::validUuid($id, 'User not found.');
        
        $userId = new Id();
        $userId->set($id);

        $user = $this->fetch->user($userId);

        $service = (new SendMailService())->process('Credentials', $this->template->removeCredential(), [[
            'userId' => $user->first()->id()->toString(),
            'recipient' => $user->first()->email(),
        ]]);

        $this->credential->remove($userId);
        
        $this->mergeOutput($service);
        return $this;
    }
}