<?php
namespace src\database;

use src\security\Connection;

class Table extends Connection{
	protected $statement;
	protected $column = '';
	protected $isCreating = false;

	public function create($tableName){
		$this->connect();
		$this->isCreating = true;
		$this->statement = 'CREATE TABLE IF NOT EXISTS `'.$tableName.'` ';
		return $this;
	}

	public function drop($tableName){
		$this->statement = 'DROP TABLE `'.$tableName.'`;';
	}

	public function truncate($tableName){
		$this->connect();
		$this->statement = 'TRUNCATE TABLE `'.$tableName.'`;';
	}

	public function column($columnName){
		if($this->column){
			$this->column .= ',';
		}
		$this->column .= '`'.$columnName.'` ';
		return $this;
	}

	public function customQuery($statement){
		$this->query($statement);
		$this->commit();
	}

	public function execute(){
		$this->isCreating && $this->endTransaction();
		$this->customQuery($this->statement);
		return $this;
	}

	public function endTransaction(){
		$this->statement .= "(".$this->column .") ENGINE=InnoDB CHARACTER SET utf8mb4;";
		return $this;
	}

	public function reset(){
		$this->column = "";
		$this->statement = "";
		return $this;
	}

	public function statement():string{
		return str_replace(PHP_EOL, '', $this->statement);
	}

	public function bindary(){
		$this->column.="binary(16) NOT NULL";
		return $this;
	}

	public function nullableBindary(){
		$this->column.="binary(16) DEFAULT NULL";
		return $this;
	}

	public function timestamp(){
		$this->column.="timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP";
		return $this;
	}

	public function int(){
		$this->column.="tinyint";
		return $this;
	}

	public function bool(){
		$this->column.="tinyint(1) NOT NULL  DEFAULT '0'";
		return $this;
	}

	public function string(){
		$this->column.="varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
		return $this;
	}

	public function paragraph(){
		$this->column.="varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci";
		return $this;
	}
}

?>