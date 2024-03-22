<?php
namespace src\security;

use Exception;
use src\database\SqlTransaction;

//https://www.tutorialspoint.com/php/php_function_mysqli_begin_transaction.htm
//https://www.php.net/manual/en/mysqli.begin-transaction.php
//https://www.linkedin.com/advice/3/what-common-causes-solutions-mysqli-rollback-working-innodb#:~:text=One%20of%20the%20most%20common,a%20transaction%20with%20mysqli_begin_transaction().
class Connection extends DatabseSecurity{
	protected $connection;
	protected $statement;
	protected $reference;
	protected $results;
	protected static $instance = null;

	public static function instance():self{
		if(self::$instance === null){
			self::$instance = new self();
		}
		return self::$instance;
	}

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
		if(SqlTransaction::transactionStarted() && SqlTransaction::isTransactionalQuery($this->statement)){
			SqlTransaction::appendStatement($this->reference);
			return $this;
		}
		$this->reference = mysqli_query($this->connection(), $this->statement);
		return $this;
	}

	public function commit():void{
		if(SqlTransaction::transactionStarted() && SqlTransaction::isTransactionalQuery($this->statement)){
			return;
		}
		mysqli_stmt_execute($this->connection());
		mysqli_commit($this->connection());
		$this->results = mysqli_fetch_all($this->reference, MYSQLI_ASSOC);
	}

	public function close():void{
		if(SqlTransaction::transactionStarted() && SqlTransaction::isTransactionalQuery($this->statement)){
			return;
		}
		mysqli_close($this->connection());
	}

	public function connect(){
		mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
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