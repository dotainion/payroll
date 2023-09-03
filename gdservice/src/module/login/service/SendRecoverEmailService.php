<?php
namespace src\module\login\service;

use InvalidArgumentException;
use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Email;
use src\infrastructure\Service;
use src\infrastructure\Token;
use src\module\login\factory\HasCredentialFactory;
use src\module\login\logic\CreateHasCredential;
use src\module\mail\logic\RecoveryTemplate;
use src\module\mail\service\SendMailService;
use src\module\user\logic\FetchUser;

class SendRecoverEmailService extends Service{
    protected FetchUser $fetch;
    protected HasCredentialFactory $factory;
    protected CreateHasCredential $credential;
    protected RecoveryTemplate $template;

    public function __construct(){
        parent::__construct(false);
        $this->fetch = new FetchUser();
        $this->factory = new HasCredentialFactory();
        $this->credential = new CreateHasCredential();
        $this->template = new RecoveryTemplate();
    }
    
    public function process($email){
        Assert::validEmail($email, 'Invalid email.');
        
        $emailObj = new Email();
        $emailObj->set($email);

        $user = $this->fetch->userByEmail($emailObj);
        if(!$user->hasItem()){
            throw new InvalidArgumentException('There is no account under this email: '.$email);
        }

        $credential = $this->factory->mapResult([
            'id' => $user->first()->id()->toString(),
            'expire' => (new DateHelper())->new()->addDays(30)->toString(),
            'refreshToken' => (new Token())->new()->toString()
        ]);

        $this->template->setToken($credential->refreshToken());

        $service = (new SendMailService())->process('Credentials', $this->template->recovery(), [[
            'userId' => $user->first()->id()->toString(),
            'recipient' => $user->first()->email(),
        ]]);

        $this->credential->create($credential);
        
        $this->mergeOutput($service);
        return $this;
    }
}