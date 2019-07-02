<?php  


	include "dbHandler.php";
	$query = $_POST["query"];

	$db = new dbHandler();
	$db->connect();

	$result = $db->selectAllQuery($query);
	echo json_encode($result);


?>