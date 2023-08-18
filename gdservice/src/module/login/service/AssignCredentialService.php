<?php
namespace src\module\login\service;

use src\infrastructure\Assert;
use src\infrastructure\DateHelper;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\infrastructure\Token;
use src\module\login\factory\HasCredentialFactory;
use src\module\login\logic\CreateHasCredential;
use src\module\mail\service\SendMailService;
use src\module\user\logic\FetchUser;

class AssignCredentialService extends Service{
    protected FetchUser $fetch;
    protected HasCredentialFactory $factory;
    protected CreateHasCredential $credential;

    public function __construct(){
        parent::__construct(false);
        $this->fetch = new FetchUser();
        $this->factory = new HasCredentialFactory();
        $this->credential = new CreateHasCredential();
    }
    
    public function process($id){
        Assert::validUuid($id, 'User not found.');
        
        $userId = new Id();
        $userId->set($id);

        $credential = $this->factory->mapResult([
            'id' => $userId->toString(),
            'expire' => (new DateHelper())->new()->addDays(30)->toString(),
            'refreshToken' => (new Token())->new()->toString()
        ]);

        $user = $this->fetch->user($userId);

        $domainName = $_SERVER['SERVER_NAME'];
        $route = '/update/credential/by/token/';
        $refreshToken = $credential->refreshToken();
        $dir = '/gdbuild';

        $body = '
            <h2><b>Pay Roll Application</b></h2>
            <a href="'.$domainName.$dir.'/#'.$route.$refreshToken.'">Click here to accept access to this platform and create a password</a>
        ';

        $service = (new SendMailService())->process('Credentials', $body, [[
            'userId' => $user->first()->id()->toString(),
            'recipient' => $user->first()->email(),
        ]]);


        $this->credential->create($credential);
        
        $this->mergeOutput($service);
        return $this;
    }
}