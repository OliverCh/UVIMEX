<?php
	include "dbHandler.php";

	$id = $_POST["idCurso"];

	$db = new dbHandler();
	$db->connect();

	$sql = "SELECT idModulo, nombre from modulos where idCurso = {$id};";
	$result = $db->selectAllQuery($sql);
	echo json_encode($result);
?>