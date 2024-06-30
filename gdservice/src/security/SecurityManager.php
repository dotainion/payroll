<?php
namespace src\security;

use src\infrastructure\Email;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\ICredential;
use src\infrastructure\IUser;
use src\infrastructure\Password;
use src\infrastructure\Token;

class SecurityManager{

    use PasswordTrait;

    protected string $SESSION_KEY = 'session-key';
    protected Login $login;
    protected Logout $logout;

    public function __construct(){
        $this->login = new Login();
        $this->logout = new Logout();
    }

    private function _updateAccessToken(Security $credential):ICredential{
        $token = new Token();
        $this->login->updateToken($credential->user()->id(), $token->new());
        $credential->user()->setToken($token->toString());
        $credential->setToken($token->toString());
        return $credential;
    }

    public function login(Email $email, Password $password):void{
        $collector = $this->login->login($email);
        if(!$collector->first()->hasPassword()){
            throw new NotAuthenticatedException('This account do not have login access.');
        }
        $this->assertSignInPass($collector->first()->password(), $password);
        $credential = $collector->first();
        $credential = $this->_updateAccessToken($credential);
        $this->startSession($credential);
    }

    public function hasSession(): bool{
        return (array_key_exists($this->SESSION_KEY, $_SESSION) && unserialize($_SESSION[$this->SESSION_KEY]) !== false);
    }

    public function user():IUser{
        $this->assertUserAccess();
        return $this->session()->user();
    }

    public function session():?ICredential{
        $session = unserialize($_SESSION[$this->SESSION_KEY]);
        if(!$session instanceof ICredential){
            throw new NotAuthenticatedException('You are not logged in.');
        }
        return $session;
    }

    public function assertUserAccess():bool{
        $session = $this->session();
        if(!$session instanceof ICredential || !$session->token()){
            throw new NotAuthenticatedException('You are not logged in.');
        }
        return true;
    }

    public function startSession(ICredential $user){
        $_SESSION[$this->SESSION_KEY] = serialize($user);
    }

    public function logout(){
        $this->logout->logout($this->user()->id());
        unset($_SESSION[$this->SESSION_KEY]);
        session_destroy();
    }
}