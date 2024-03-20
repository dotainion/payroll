<?php
namespace src\infrastructure;

use InvalidArgumentException;
use src\infrastructure\exeptions\NoResultsException;

class Collector{
    protected $collected = [];

    public function add($item):self{
        $this->collected[] = $item;
        return $this;
    }

    public function prepend($item):self{
        $this->collected = [$item, ...$this->collected];
        return $this;
    }

    public function mergeCollection(Collector $collector):self{
        foreach($collector->list() as $item){
            $this->add($item);
        }
        return $this;
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

    public function assertHasItemForUi(string $message='No results'):bool{
        if(!$this->hasItem()){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public function assertItemNotExist(string $message='Already exist'):bool{
        if($this->hasItem()){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public function toIdArray():array{
        $idArray = [];
        foreach($this->list() as $item){
            $idArray[] = $item->id();
        }
        return $idArray;
    }
}