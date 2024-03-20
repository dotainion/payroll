<?php
namespace src\module\settings\logic;

use src\module\settings\objects\ProrateSettings;
use src\module\settings\repository\ProrateSettingsRepository;

class SetProrateSettings{
    protected FetchProrateSettings $fetch;
    protected ProrateSettingsRepository $repo;

    public function __construct(){
        $this->fetch = new FetchProrateSettings();
        $this->repo = new ProrateSettingsRepository();
    }

    public function prorate(ProrateSettings $prorate):void{
        $collector = $this->fetch->prorate();
        if($collector->hasItem()){
            $this->repo->edit($prorate);
        }else{
            $this->repo->create($prorate);
        }
    }
}