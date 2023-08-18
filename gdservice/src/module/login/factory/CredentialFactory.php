<?php
namespace src\module\login\factory;

use src\security\SecurityFactory;

class CredentialFactory extends SecurityFactory{

    public function __construct(){
        parent::__construct();
    }
}