<?php
namespace src\database;

use Exception;
use InvalidArgumentException;
use mysqli_sql_exception;
use src\infrastructure\Id;
use src\security\Connection;

class Repository{
	protected Connection $db;
	protected string $set;
	protected array $add;
	protected string $where;
	protected string $orderBy;
	protected string $limit;
	protected string $alias;
	protected string $column;
	protected string $statement;
	protected ?string $parentTableName;

	public function __construct(){
		$this->db = Connection::instance();
	}

	private function reset():void{
		$this->set = '';
		$this->add = ['key'=>[], 'value'=>[]];
		$this->where = '';
		$this->orderBy = '';
		$this->limit = '';
		$this->alias = '';
		$this->column = '';
		$this->statement = '';
		$this->parentTableName = null;
	}

	private function setParentTableName($tableName){
		if(!$this->parentTableName){
			$this->parentTableName = $tableName;
		}
	}

	private function parseAlias(string $column):string{
		if(str_contains($column, ' as ')){
			$col = explode(' as ', $column)[0];
			$alias = explode(' as ', $column)[1];
			return '`'.$col.'` as `'.$alias.'`';
		}
		return '`'.$column.'`';
	}

	public function connect():void{
		$this->reset();
		$this->db->connect();
	}

	public function escapeValue($value){
		if(is_array($value)){
			return $value;
		}
		return mysqli_real_escape_string($this->db->connection(), $value);
	}

	public function query($statement):void{
		try {
			$this->forceSemicolon($statement);
			$this->db->query($statement);
			$this->db->commit();
			$this->db->close();
		} catch (mysqli_sql_exception $exception) {
			throw new InvalidArgumentException($exception->getMessage());
		}
	}

	public function alias($tableName, ...$columns):self{
		foreach($columns as $column){
			if(!empty($this->alias)){
				$this->alias .= ', ';
			}
			$this->alias .= '`'.$tableName.'`.'.$this->parseAlias($column);
		}
		return $this;
	}

	public function select($tableName):self{
		$this->connect();
		$this->setParentTableName($tableName);
		$this->statement = 'SELECT * FROM `'.$tableName.'` ';
		return $this;
	}

	public function insert($tableName):self{
		$this->connect();
		$this->setParentTableName($tableName);
		$this->statement = 'INSERT INTO `'.$tableName.'` ';
		return $this;
	}

	public function update($tableName):self{
		$this->connect();
		$this->setParentTableName($tableName);
		$this->statement = 'UPDATE `'.$tableName.'` SET ';
		return $this;
	}

	public function delete($tableName):self{
		$this->connect();
		$this->setParentTableName($tableName);
		$this->statement = 'DELETE FROM `'.$tableName.'` ';
		return $this;
	}

	public function rowCount($tableName):self{
		$this->connect();
		$this->setParentTableName($tableName);
		$this->statement = 'SELECT COUNT(*) FROM `'.$tableName.'` ';
		return $this;
	}

	public function add($column, $value):self{
		$value = $this->escapeValue($value);
		if(strpos($this->statement, 'INSERT') === false){
			throw new Exception('add must only work with insert');
		}
		$this->add['key'][] = '`'.$column.'`';
		$this->add['value'][] = "'".$value."'";
		return $this;
	}

	public function set($column, $value):self{
		$value = $this->escapeValue($value);
		if(strpos($this->statement, 'UPDATE') === false){
			throw new Exception('set must only work with update');
		}
		if($this->set){
			$this->set .= ',';
		}
		$this->set .= '`'.$column.'` = "'.$value.'"';
		return $this;
	}

	public function leftJoin($tableName, $column, $joinTableName, $joinColumn):self{
		$this->statement .= ' LEFT JOIN `'.$tableName.'` ON `'.$joinTableName.'`.`'.$joinColumn.'` = `'.$tableName.'`.`'.$column.'`';
		return $this;
	}

	public function innerJoin($tableName, $column, $joinTableName, $joinColumn):self{
		$this->statement .= ' INNER JOIN `'.$tableName.'` ON `'.$joinTableName.'`.`'.$joinColumn.'` = `'.$tableName.'`.`'.$column.'`';
		return $this;
	}

	public function orderByDesc($column, $tableName = null):self{
		if(!$tableName){
			$tableName = $this->parentTableName;
		}
		$this->orderBy .= ' ORDER BY `'.$tableName.'`.`'.$column.'` DESC ';
		return $this;
	}

	public function orderByAsc($column, $tableName = null):self{
		if(!$tableName){
			$tableName = $this->parentTableName;
		}
		$this->orderBy .= ' ORDER BY `'.$tableName.'`.`'.$column.'` ASC ';
		return $this;
	}

	public function where($column, $value, $tableName = null):self{
		$value = $this->escapeValue($value);
		if(! $this->where){
			$this->where = ' WHERE ';
		}else{
			$this->where .= ' AND ';
		}
		if(!$tableName){
			$tableName = $this->parentTableName;
		}
		if(is_array($value)){
			$vals = null;
			foreach($value as $val){
				if($vals){
					$vals .= ', ';
				}
				$vals .= '"'.$val.'"';
			}
			$this->where .= '`'.$tableName.'`.`'.$column.'` IN ('.$vals.')';
			return $this;
		}
		$this->where .= '`'.$tableName.'`.`'.$column.'` = "'.$value.'"';
		return $this;
	}

	public function between($column, $from, $to, $tableName = null){
		if(! $this->where){
			$this->where = ' WHERE ';
		}else{
			$this->where .= ' AND ';
		}
		if(!$tableName){
			$tableName = $this->parentTableName;
		}
		$this->where .= '`'.$tableName.'`.`'.$column.'` >= "'.$from.'" AND `'.$tableName.'`.`'.$column.'` <= "'.$to.'"';
	}

	public function lessThan($column, $value, $tableName = null){
		$this->conditional($column, $value, '<', $tableName);
	}

	public function moreThan($column, $value, $tableName = null){
		$this->conditional($column, $value, '>', $tableName);
	}

	public function conditional($column, $value, $operator, $tableName = null){
		if(! $this->where){
			$this->where = ' WHERE ';
		}else{
			$this->where .= ' AND ';
		}
		if(!$tableName){
			$tableName = $this->parentTableName;
		}
		$this->where .= '`'.$tableName.'`.`'.$column.'` '.$operator.' "'.$value.'"';
	}

	public function limit(int $limit){
		$this->limit = ' LIMIT '.$limit;
	}

	public function execute():self{
		if(!empty($this->add['key'])){
			$this->statement .= '('.implode(', ', $this->add['key']).') ';
			$this->statement .= 'VALUES ('.implode(', ', $this->add['value']).') ';
		}
		if(!empty($this->alias)){
			$this->statement = str_replace('*', $this->alias, $this->statement);
		}
		$this->statement .= $this->set . $this->where . $this->orderBy . $this->limit.';';
		$this->query($this->statement);
		return $this;
	}

	public function statement(){
		return $this->db->statement();
	}

	public function results(){
		return $this->db->results() ?? [];
	}

	public function uuid($uuid){
		if(is_array($uuid)){
			$ids = [];
			foreach($uuid as $id){
				$ids[] = (new Id())->toBytes((string)$id);
			}
			return $ids;
		}
		return (new Id())->toBytes((string)$uuid);
	}

	private function forceSemicolon(&$statement){
		$statement = trim($statement, ' ');
		$semicolon = substr($statement, strlen($statement) -1);
		if($semicolon === ';'){
			return $statement;
		}
		$statement.=' ;';
	}
}

?>