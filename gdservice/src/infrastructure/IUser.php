<?php
namespace src\infrastructure;

interface IUser{
    public function id():IId;

    public function token():?string;

    public function setToken(string $token):void;
}