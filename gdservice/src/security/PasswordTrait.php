<?php
namespace src\security;

use src\infrastructure\Assert;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\Password;

trait PasswordTrait
{
    public function assertSignInPass(Password $hasPassword, string $plainPassword): bool
    {
        Assert::validPassword($plainPassword, 'Invalid password.');
        $isValid = password_verify($plainPassword, $hasPassword->toString());
        if(!$isValid){
            throw new NotAuthenticatedException('Invalid password.');
        }
        return true;
    }
}