<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'PHPMailer/PHPMailer.php';
require 'PHPMailer/Exception.php';
require 'PHPMailer/SMTP.php';



// Llamando a los campos (input)
$nombre = $_GET['name'];
$correo = $_GET['email'];
$asunto = $_GET['subject'];
$mensaje = $_GET['message'];


$carta = "De: $nombre <br>";
$carta .= "Correo: $correo <br>";
$carta .= "Asunto: $asunto <br>";
$carta .= "Mensaje: $mensaje";




//Instantiation and passing `true` enables exceptions
$mail = new PHPMailer(true);

try {
    //Server settings
    $mail->SMTPDebug = 2;  //Enable verbose debug output
    $mail->isSMTP();     //Send using SMTP
    $mail->Host       = 'smtp.gmail.com';  //Set the SMTP server to send through
    $mail->SMTPAuth   = true;    //Enable SMTP authentication
    $mail->Username   = "saulito644@gmail.com";  //SMTP username
    $mail->Password   = 'saulito644';  //SMTP password
    $mail->SMTPSecure = 'tls';     //Enable TLS encryption; `PHPMailer::ENCRYPTION_SMTPS` encouraged
    $mail->Port       = 587;        //TCP port to connect to, use 465 for `PHPMailer::ENCRYPTION_SMTPS` above

    //Recipients
    $mail->setFrom('saulito644@gmail.com', 'Saul');
    $mail->addAddress('saumaimu@epsg.upv.es', 'Saul UPV'); //Add a recipient

    //Content
    $mail->isHTML(true); //Set email format to HTML
    $mail->Subject = $asunto;
    $mail->Body = $carta;

    if ($mail->send()){
        //$exito = 1;
        //header("Location: ../index.html#contact");
	 //   exit();
    }
} catch (Exception $e) {
    echo 'Algo no ha funcionado';
}