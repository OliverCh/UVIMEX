<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);


	if(!isset($_POST["idTopic"]) || empty($_POST["idTopic"])){
		echo "wrong data";
		return;
	}
	if(!isset($_POST["idUser"]) || empty($_POST["idUser"])){
		echo "wrong data";
		return;
	}
	if(!isset($_POST["idCourse"]) || empty($_POST["idCourse"])){
		echo "wrong data";
		return;
	}

	$idUser = $_POST["idUser"];
	$idTopic = $_POST["idTopic"];
	$idCourse = $_POST["idCourse"];

	// Read json
	$dir = "../seenTopics/{$idUser}/{$idCourse}";
	if(!is_dir($dir)){
		mkdir($dir, 0777, TRUE);
	}
	$dir .= "/{$idTopic}.json";
	touch($dir);

	echo "jsjsj";

 ?>
