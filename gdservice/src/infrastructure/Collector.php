<?php
namespace src\infrastructure;

use InvalidArgumentException;
use src\infrastructure\exeptions\NoResultsException;

class Collector{
    protected $collected = [];

    public function add($item):void{
        $this->collected[] = $item;
    }

    public function prepend($item):void{
        $this->collected = [$item, ...$this->collected];
    }

    public function mergeCollection(Collector $collector):void{
        foreach($collector->list() as $item){
            $this->add($item);
        }
    }
    
    public function list():array{
        return $this->collected;
    }
    
    public function first(){
        return $this->collected[0] ?? null;
    }
    
    public function last(){
        return $this->collected[count($this->collected) -1] ?? null;
    }

    public function count():int{
        return count($this->collected);
    }

    public function clear():self{
        $this->collected = [];
        return $this;
    }

    public function hasItem():bool{
        return !empty($this->collected);
    }

    public function assertHasItem(string $message='No results'):bool{
        if(!$this->hasItem()){
            throw new NoResultsException($message);
        }
        return true;
    }

    public function assertItemNotExist(string $message='Already exist'):bool{
        if($this->hasItem()){
            throw new InvalidArgumentException($message);
        }
        return true;
    }
}