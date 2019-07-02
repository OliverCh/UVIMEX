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
		$query = "INSERT INTO eventos_stream (idCurso, idInstructor, nombre, descripcion, fechaInicio, fechaFinal, nombreCurso) VALUES (
			".$_POST['courseSelect'].",
			'".$_POST['idUser']."',
			'".$_POST['eventName']."',
			'".$_POST['eventDesc']."',
			'".$_POST['eventStarto']."',
			'".$_POST['eventEnd']."',
			'".$_POST['courseName']."')";

		$con->executeQuery($query);

		echo json_encode(array('newEvent' => $con->lastIdQuery()));
	}
?>