<?php
namespace src\infrastructure;

use InvalidArgumentException;
use src\database\Repository;
use src\security\ValidatePassword;

class Assert extends Repository{
    public static function stringNotEmpty($string, string $message = 'String is empty.'):bool{
        if(empty($string)){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function arrayNotEmpty($array, string $message = 'Array is empty.'):bool{
        self::isArray($array, 'Must be an array.');
        return self::stringNotEmpty($array, $message);
    }

    public static function isArray($array, string $message = 'Not an array.'):bool{
        if(!is_array($array)){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function positiveNumber($number, string $message = 'Must be a positive number.'):bool{
        if(((float)$number??0) <= 0){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function validEmail($email, string $message = 'Invalid email format.'):bool{
        if(filter_var($email, FILTER_VALIDATE_EMAIL) === false){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function validUuid($uuid, string $message = 'Invalid id.'):bool{
        if(!(new Id())->isValid((string)$uuid)){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function validToken($token, string $message = 'Invalid token.'):bool{
        if(!(new Id())->isValid((string)$token)){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function validDate($uuid, string $message = 'Invalid date.'):bool{
        if(!(new DateHelper())->isValid((string)$uuid)){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function validPassword($password, string $message = 'Invalid Password.'):bool{
        $validate = new ValidatePassword();
        $validate->validate($password);
        if($validate->chain()->hasError()){
            $validate->chain()->prependMessage($message);
            throw new InvalidArgumentException($validate->chain()->messages());
        }
        return true;
    }

    public static function validPasswordMatch($password, $confirmPassword, string $message = 'Password Mismatch.'):bool{
        Assert::validPassword($password, 'Invalid Password.');
        Assert::validPassword($confirmPassword, 'Invalid confirm Password.');
        if($password !== $confirmPassword){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function inArray($string, array $list, string $message = 'Not in list.'):bool{
        if(!in_array($string, $list)){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function validNumericValue($string, string $message = 'Must be a number.'):bool{
        if(!is_numeric($string)){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function validTaxNotification($string, string $message = 'Invalid tax notification value.'):bool{
        TaxHelper::valid($string, $message);
        return true;
    }

    public static function emailExist($email, string $message = 'Email not found'):bool{
        $users = (new AssertRepository())->fetchUser(['email' => $email, 'hide' => 0]);
        $businesses = (new AssertRepository())->fetchUser(['email' => $email, 'hide' => 0]);
        if(!$users->hasItem() && !$businesses->hasItem()){
            throw new InvalidArgumentException($message);
        }
        return true;
    }

    public static function emailNotExist($email, string $message = 'Email already exist.'):bool{
        $users = (new AssertRepository())->fetchUser(['email' => $email, 'hide' => 0]);
        $businesses = (new AssertRepository())->fetchUser(['email' => $email, 'hide' => 0]);
        if($users->hasItem() || $businesses->hasItem()){
            throw new InvalidArgumentException($message);
        }
        return true;
    }
}