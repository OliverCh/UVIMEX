<?php

	// Import PHPMailer classes into the global namespace
	// These must be at the top of your script, not inside a function
	use PHPMailer\PHPMailer\PHPMailer;
	use PHPMailer\PHPMailer\Exception;
	ini_set('display_errors', 1);ini_set('display_startup_errors', 1);error_reporting(E_ALL);

	// Load Composer's autoloader
	require 'vendor/autoload.php';

	// Instantiation and passing `true` enables exceptions
	$mail = new PHPMailer(true);

	$user = $_POST["userName"];
	$nick = $_POST["userNick"];
	$course = $_POST["courseName"];

	try {
		//Server settings
		#$mail->SMTPDebug = 2;                                       // Enable verbose debug output
		$mail->isSMTP();                                            // Set mailer to use SMTP
		$mail->Host       = 'smtp.gmail.com';  // Specify main and backup SMTP servers
		$mail->SMTPAuth   = true;                                   // Enable SMTP authentication
		$mail->Username   = 'm.rivas@denlin.com.mx';                     // SMTP username
		$mail->Password   = 'Marter#1665142';                               // SMTP password
		$mail->SMTPSecure = 'ssl';                                  // Enable TLS encryption, `ssl` also accepted
		$mail->Port       = 465;                                    // TCP port to connect to
		$mail->CharSet = 'utf-8';

		$mail->SMTPOptions = array(
			'ssl' => array(
				'verify_peer' => false,
				'verify_peer_name' => false,
				'allow_self_signed' => true
				)
			);

		//Recipients
		$mail->setFrom('from@example.com', 'Plataforma de cursos Kútura');
		$mail->addAddress('info@uvimex.com.mx');     // Add a recipient
		#$mail->addAddress('m.rivas@denlin.com.mx');
		#$mail->addAddress('ellen@example.com');               // Name is optional
		#$mail->addReplyTo('info@example.com', 'Information');
		#$mail->addCC('cc@example.com');
		#$mail->addBCC('bcc@example.com');

		// Attachments
		#$mail->addAttachment('/var/tmp/file.tar.gz');         // Add attachments
		//$mail->addAttachment(__DIR__."/a.jpg", 'XD.jpg');    // Optional name

		// Content
		$mail->isHTML(true);                                  // Set email format to HTML
		$mail->Subject = 'Solicitud de publicación de curso';
		$Body    = str_replace(array('\r', '\n'), array(chr(10), chr(13)), "Buenos días.\nEl usuario \"{$user} ({$nick})\" quiere publicar un curso llamado \"{$course}\"\n\n<a href=\"http://uvimex.com.mx/dashboard/dashboard/relateCourses.html\">Ir a relacion de cursos</a>");

		$AltBody    = str_replace(array('\r', '\n'), array(chr(10), chr(13)),"Buenos días.\nEl usuario \"{$user} ({$nick})\" quiere publicar un curso llamado \"{$course}\"\n\nIr a relacion de cursos: http://uvimex.com.mx/dashboard/dashboard/relateCourses.html");

		$mail->Body = $Body;
		$mail->AltBody = $AltBody;

		$mail->send();
		echo 'done';
	} catch (Exception $e) {
		echo "Message could not be sent. Mailer Error: {$mail->ErrorInfo}";
	}

?>