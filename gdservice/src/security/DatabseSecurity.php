<?php
namespace src\security;

class DatabseSecurity{
	protected $server = 'localhost';
	protected $username = 'ccagrena_postal';
	protected $password = 'CCAGrenada#1568';
	protected $database = 'ccagrena_grenada_postal_service';

	public function username(){
		return $this->username;
	}

	public function password(){
		return $this->password;
	}

	public function server(){
		return $this->server;
	}

	public function database(){
		return $this->database;
	}
}

?>