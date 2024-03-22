<?php
namespace src\database;

use InvalidArgumentException;
use mysqli_sql_exception;
use src\security\Connection;

class SqlTransaction{
	protected static $statements = [];
	protected static bool $transactionBegin = false;

	public static function appendStatement($statement):void{
		self::$statements[] = $statement;
	}

	public static function statements():array{
		return self::$statements;
	}

	public static function beginTransaction():void{
		self::$transactionBegin = true;
	}

	public static function transactionStarted():bool{
		return self::$transactionBegin;
	}

	public static function isTransactionalQuery(string $statement):bool{
		if(strpos($statement, 'SELECT') !== false && strpos($statement, 'UPDATE') !== false){
			return true;
		}
		return false;
	}

	public static function commitTransactions():void{
		mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
		$db = Connection::instance();
		mysqli_begin_transaction($db->connection());

		try {
			foreach(self::statements() as $statement){
				$stmt = mysqli_prepare($db->connection(), $statement);
				mysqli_stmt_execute($stmt);
			}

			mysqli_commit($db->connection());
		} catch (mysqli_sql_exception $exception) {
			mysqli_rollback($db->connection());
			throw new InvalidArgumentException($exception->getMessage());
		}
	}
}

?>