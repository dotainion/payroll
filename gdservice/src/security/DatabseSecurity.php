<?php
namespace src\security;

use src\infrastructure\Env;

class DatabseSecurity{
	protected ?string $server = null;
	protected ?string $username = null;
	protected ?string $password = null;
	protected ?string $database = null;

    public function __construct(){
		$this->server = Env::server();
		$this->username = Env::username();
		$this->password = Env::password();
		$this->database = Env::database();
	
    }

	public function username():string{
		return $this->username;
	}

	public function password():string{
		return $this->password;
	}

	public function server():string{
		return $this->server;
	}

	public function database():string{
		return $this->database;
	}
}

?>