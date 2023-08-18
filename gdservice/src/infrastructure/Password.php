<?php

namespace src\infrastructure;

class Password{

    protected ?string $password = null;
    protected int $cost = 10;

    public function __toString():string{
        return $this->toString();
    }

    public function hasPassword():bool{
        return $this->password !== null;
    }

    public function set(string $password):self{
        Assert::validPassword($password);
        $this->password = $password;
        return $this;
    }

    public function toString():string{
        return $this->password;
    }

    public function toHash():string{
        return password_hash($this->password, PASSWORD_BCRYPT, ['cost' => $this->cost]);
    }

    public function setCost(int $cost):void{
        if ($cost < 4 || $cost > 12) {
            throw new \InvalidArgumentException('Cost must be in the range of 4-31.');
        }
        $this->cost = $cost;
    }
}
