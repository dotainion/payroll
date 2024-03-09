<?php
namespace src\module\todo\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\Service;
use src\module\todo\logic\AssignTo;
use src\module\user\logic\FetchUser;

class AssignToService extends Service{
    protected AssignTo $assign;
    protected FetchUser $user;

    public function __construct(){
        parent::__construct();
        $this->assign = new AssignTo();
        $this->user = new FetchUser();
    }
    
    public function process($id, $userId){
        Assert::validUuid($id, 'Todo not found.');
        Assert::validUuid($userId, 'User not found.');
        
        $idObj = new Id();
        $userIdObj = new Id();
        $collector = $this->assign->to($idObj->set($id), $userIdObj->set($userId));
        $collector->assertHasItemForUi('Todo not found.');
        $todo = $collector->first();
        if($idObj->isValid($todo->assignToId()??'')){
            $user = $this->user->user($todo->assignToId());
            $user->hasItem() && $todo->setUserAssign($user->first());
        }

        $this->setOutput($todo);
        return $this;
    }
}