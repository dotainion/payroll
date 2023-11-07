<?php
namespace src\infrastructure;

use Exception;
use InvalidArgumentException;
use src\infrastructure\exeptions\InvalidRequirementException;
use src\infrastructure\exeptions\NoResultsException;
use src\infrastructure\exeptions\NotAuthenticatedException;
use src\infrastructure\exeptions\TokenExpiredException;
use Throwable;

class StatusCode{
    protected int $code;
    protected string $message;

    protected int $OK = 200;
    protected int $CREATED = 201;
    protected int $ACCEPTED = 202;
    protected int $NO_RESULTS = 204;
    protected int $BAD_REQUEST = 400;
    protected int $UNAUTHORIZED = 401;
    protected int $PAYMENT_REQUIRED = 402;
    protected int $FORBIDDEN = 403;
    protected int $NOT_FOUND = 404;
    protected int $INTERNAL_SERVER_ERROR = 500;
    protected int $SERVICE_UNAVAILABLE = 503;

    public function __construct(){
        session_start(); 
    }
    
    public function executeStatus(){
        header('Content-type: application/json');
        http_response_code($this->code());
    }

    public function code(){
        return $this->code;
    }

    public function setCode(int $code){
        $this->code = $code;
    }

    public function message(){
        return $this->message;
    }

    public function setMessage(string $message){
        $this->message = $message;
    }

    public function buildResponse():string{
        $response = [
            'error' => [
                'message' => $this->message(), 
                'meta' => ErrorMetaData::get()
            ]
        ];
        return json_encode($response);
    }

    public function handleExeption(callable $callBack){
        try{
            $this->setCode($this->OK);
            $callBack();
        }catch(NoResultsException $ex){
            $this->setCode($this->NO_RESULTS);
            $this->setMessage($ex->getMessage());
        }catch (NotAuthenticatedException $ex){
            $this->setCode($this->UNAUTHORIZED);
            $this->setMessage($ex->getMessage());
        }catch (TokenExpiredException $ex){
            $this->setCode($this->SERVICE_UNAVAILABLE);
            $this->setMessage($ex->getMessage());
        }catch (InvalidArgumentException $ex){
            $this->setCode($this->NOT_FOUND);
            $this->setMessage($ex->getMessage());
        }catch (InvalidRequirementException $ex){
            $this->setCode($this->NOT_FOUND);
            $this->setMessage($ex->getMessage());
        }catch (TokenExpiredException $ex){
            $this->setCode($this->FORBIDDEN);
            $this->setMessage($ex->getMessage());
        }catch (Exception $ex){
            $this->setCode($this->INTERNAL_SERVER_ERROR);
            $this->setMessage($ex->getMessage() . PHP_EOL . $ex->getTraceAsString());
        }catch(Throwable $ex){
            $this->setCode($this->INTERNAL_SERVER_ERROR);
            $this->setMessage($ex->getMessage() . PHP_EOL . $ex->getTraceAsString());
        }finally{
            if($this->code() !== $this->OK){
                $this->executeStatus();
                echo $this->buildResponse();
            }
        }
    }
}