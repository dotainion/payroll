<?php
namespace src\security;

use Exception;

class Connection extends DatabseSecurity{
	protected $connection;
	protected $statement;
	protected $reference;
	protected $results;

	private function assertConnected():bool{
		if (mysqli_connect_errno()) {
			echo "Failed to connect to MySQL: " . mysqli_connect_error();
			exit();
		}
		if(! $this->connection){
			throw new Exception('Database not connected.');
		}
		return true;
	}

	public function query($statement):self{
		$this->statement = $statement;
		$this->reference = mysqli_query($this->connection(), $this->statement);
		return $this;
	}

	public function commit():void{
		$this->results = mysqli_fetch_all($this->reference, MYSQLI_ASSOC);
	}

	public function close():void{
		mysqli_close($this->connection());
	}

	public function connect(){
		$this->connection = mysqli_connect(
            $this->server(), 
            $this->username(), 
            $this->password(), 
            $this->database()
        );
		$this->assertConnected();
		return $this;
	}

	public function connection(){
		return $this->connection;
	}

	public function statement():string{
		return $this->statement;
	}

	public function results():?array{
		return $this->results;
	}
}

?>