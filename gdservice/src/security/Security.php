<?php
namespace src\security;

use src\infrastructure\DateHelper;
use src\infrastructure\ICredential;
use src\infrastructure\Id;
use src\infrastructure\IId;
use src\infrastructure\IUser;
use src\infrastructure\Password;
use src\infrastructure\Token;

class Security implements ICredential{
	protected Id $id;
	protected Token $token;
	protected ?IUser $user = null;
	protected ?DateHelper $expire = null;
	protected Password $password;
	protected ?string $refreshToken = null;
	protected ?bool $isOrganization = null;

	public function __construct(){
		$this->id = new Id();
		$this->token = new Token();
		$this->password = new Password();
	}

	public function id():IId{
		return $this->id;
	}

	public function user():?IUser{
		return $this->user;
	}

	public function token():Token{
		return $this->token;
	}

	public function expire():?DateHelper{
		return $this->expire;
	}

	public function hasPassword():bool{
		return $this->password->hasPassword();
	}

	public function password():Password{
		return $this->password;
	}

	public function refreshToken():?string{
		return $this->refreshToken;
	}	

	public function isOrganization():?bool{
		return $this->isOrganization;
	}

	public function setId(string $id):void{
		$this->id->set($id);
	}	

	public function setUser(IUser $user):void{
		$this->user = $user;
	}

	public function setToken(string $token):void{
		if(!$this->token->stringIsValid($token)){
			return;
		}
		$this->token->set($token);
	}

	public function setExpire(?string $expire):void{
		if($expire === null){
			return;
		}
		$this->expire = (new DateHelper())->set($expire);
	}

	public function setPassword(string $password):void{
		$this->password->set($password);
	}

	public function setRefreshToken(?string $refreshToken):void{
		if($refreshToken === null){
			return;
		}
		$this->refreshToken = $refreshToken;
	}	

	public function setIsOrganization(?bool $isOrganization):void{
		$this->isOrganization = $isOrganization;
	}
}

?>