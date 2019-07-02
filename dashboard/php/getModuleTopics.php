<?php

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

	include "dbHandler.php";

	if(!isset($_GET["idModulo"]) || !isset($_GET["idUser"])){
		echo "bad";
		return;
	}

	$idModule = $_GET["idModulo"];
	$idUser = $_GET["idUser"];

	$db = new dbHandler();
	$db->connect();

	$sql = "SELECT idTema, t.nombre, m.idCurso as idCourse from temas t, modulos m where t.idModulo = m.idModulo AND m.idModulo = {$idModule};";
	$result = $db->selectAllQuery($sql);

	for ($i=0; $i < count($result) ; $i++) { 
		$idTopic = $result[$i]->idTema;
		$idCourse = $result[$i]->idCourse;
		$dir = "../../platform/seenTopics/{$idUser}/{$idCourse}/{$idTopic}.json";
		if(file_exists($dir)){
			$result[$i]->seen = 1;
		}
		else{
			$result[$i]->seen = 0;
		}
	}
	
	echo json_encode($result);
?>