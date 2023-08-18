<?php
namespace src\infrastructure;

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;
use src\module\mail\objects\Mail;
use Throwable;

class SendMail{
    protected PHPMailer $mail;

    public function __construct(){
        $this->mail = new PHPMailer(true);
        //Server settings
        //$this->mail->SMTPDebug = SMTP::DEBUG_SERVER;                      //Enable verbose debug output
        $this->mail->isSMTP();                                            //Send using SMTP
        $this->mail->Host       = 'smtp.gmail.com';                     //Set the SMTP server to send through
        $this->mail->SMTPAuth   = true;                                   //Enable SMTP authentication
        $this->mail->Username   = 'areset0000@gmail.com';                     //SMTP username
        $this->mail->Password   = 'nmczpulryktsbisr';                               //SMTP password
        $this->mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;            //Enable implicit TLS encryption
        $this->mail->Port       = 587;                                    //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`

        //Recipients
        $this->mail->setFrom('areset0000@gmail.com', 'Mailer');
        /*$this->mail->addAddress('ellen@example.com');               //Name is optional
        $this->mail->addReplyTo('info@example.com', 'Information');
        $this->mail->addCC('cc@example.com');
        $this->mail->addBCC('bcc@example.com');*/

        //Attachments
        //$this->mail->addAttachment('/var/tmp/file.tar.gz');         //Add attachments
        //$this->mail->addAttachment('/tmp/image.jpg', 'new.jpg');    //Optional name

        //Content
        $this->mail->isHTML(true);        
        //$this->mail->AltBody = 'This is the body in plain text for non-HTML mail clients';
    }

    public function setMail(Mail $mail):self{                          
        $this->mail->Subject = $mail->subject();
        $this->mail->Body    = $mail->body();
        foreach($mail->recipients()->list() as $recip){
            $this->mail->addAddress($recip->recipient());
        }
        return $this;
    }

    public function send():void{
        $this->mail->send();

    }
}