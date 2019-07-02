<?php
	include_once("dbHandler.php");
	$con = new dbHandler();
	$con->connect();

	$query = "SELECT * FROM eventos_stream WHERE fechaInicio >= '".$_POST['eventStarto']."' AND fechaFinal <= '".$_POST['eventEnd']."'";
	$res = $con->selectAllQueryFetch($query);

	if(count($res) > 0){
		echo json_encode(array('eventOccupied' => $res));
	}
	else{
		$query = "UPDATE eventos_stream SET nombre = '".$_POST['eventName']."', descripcion = '".$_POST['eventDesc']."', nombreCurso = '".$_POST['courseName']."', idCurso = '".$_POST['courseID']."' WHERE idES = '".$_POST['eventID']."'";

		$con->executeQuery($query);

		echo json_encode(array('newEvent' => $con->lastIdQuery()));
	}
?>