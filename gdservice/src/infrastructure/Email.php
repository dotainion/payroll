<?php

namespace src\infrastructure;

class Email{
    protected ?string $email = null;

    final public function __toString():string{
        return $this->toString();
    }

    final public function hasEmail():bool{
        return $this->email !== null;
    }

    final public function set(string $email):self{
        Assert::validEmail($email);
        $this->email = $email;
        return $this;
    }

    public function toString():string{
        return $this->email;
    }
}
