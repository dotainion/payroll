<?php

namespace src\infrastructure;

use Ramsey\Uuid\Uuid;

class Id implements IId, IObjects{
    protected $uuid;

    final public function __toString():string{
        return $this->toString();
    }

    final public function id():IId{
        return $this;
    }

    final public function fromBytes(string $uuid):self{
        $this->uuid = (string)Uuid::fromBytes($uuid);
        return $this;
    }

    final public function hasId():bool{
        return $this->uuid !== null;
    }

    final public function new():self{
        $this->uuid = Uuid::uuid4();
        return $this;
    }

    final public function set(string $uuid):self{
        Assert::validUuid($uuid);
        $this->uuid = (string)Uuid::fromString($uuid);
        return $this;
    }

    public function isValid(string $uuid):bool{
        return Uuid::isValid($this->_replace($uuid));
    }

    public function toString():string{
        return $this->_replace((string)$this->uuid);
    }

    public function toBytes(string $uuid):string{
      return $this->_replace(Uuid::fromString($uuid)->getBytes());
    }

    private function _replace(string $uuid){
        return str_replace('"', '~~~~~', $uuid);
    }
}
