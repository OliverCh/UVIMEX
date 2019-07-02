<?php
	include_once("dbHandler.php");
	$con = new dbHandler();
    $con->connect();

	$query = "DELETE FROM eventos_stream WHERE idES = '".$_POST['eID']."'";

	$con->executeQuery($query);

	echo 1;
?>