<?php
namespace src\module\mail\service;

use src\infrastructure\Assert;
use src\infrastructure\Id;
use src\infrastructure\SendMail;
use src\infrastructure\Service;
use src\module\mail\factory\MailFactory;
use src\module\mail\factory\RecipientFactory;

class SendMailService extends Service{
    protected SendMail $mail;
    protected MailFactory $factory;
    protected RecipientFactory $recipientsFactory;

    public function __construct(){
        parent::__construct();
        $this->mail = new SendMail();
        $this->factory = new MailFactory();
        $this->recipientsFactory = new RecipientFactory();
    }
    
    public function process($subject, $body, $recipients){
        Assert::stringNotEmpty($subject, 'Mail subject is required.');
        Assert::stringNotEmpty($body, 'Mail body is required.');
        Assert::isArray($recipients, 'Recipients must be an array.');

        $mail = $this->factory->mapResult([
            'id' => (new Id())->new()->toString(),
            'subject' => $subject,
            'body' => $body,
        ]);

        foreach($recipients as $recip){
            $recipient = $this->recipientsFactory->mapResult([
                'id' => (new Id())->new()->toString(),
                'userId' => $recip['userId'],
                'recipient' => $recip['recipient'],
            ]);
            $this->recipientsFactory->add($recipient);
        }

        $mail->setRecipients($this->recipientsFactory);
        
        $this->mail->setMail($mail)->send();

        $this->setOutput($mail);
        return $this;
    }
}