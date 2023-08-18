<?php

namespace src\infrastructure;

class UserId implements IId{
    protected ?string $uuid = null;

    final public function __toString():string{
        return $this->toString();
    }

    final public function hasId():bool{
        return $this->uuid !== null;
    }

    final public function set(string $uuid):self{
        $this->uuid = $uuid;
        return $this;
    }

    public function toString():string{
        return $this->uuid;
    }
}
