<?php
	include_once("dbHandler.php");
	$con = new dbHandler();
	$con->connect();

	if(isset($_POST['ass'])){
		if($_POST['ass'] == 1){
			$query = "INSERT INTO event_assistance(idUser, idEvent, idCourse) VALUES ('".$_POST['user']."','".$_POST['eid']."','".$_POST['course']."')";
			$con->executeQuery($query);
			echo json_encode(array('assist' => 1));
		}
		else{
			$query = "DELETE FROM event_assistance WHERE  idUser = '".$_POST['user']."' AND idEvent = '".$_POST['eid']."' AND idCourse = '".$_POST['course']."'";
			$con->executeQuery($query);
			echo json_encode(array('assist' => 1));
		}
	}
	else{
		$query = "SELECT * FROM event_assistance WHERE idUser = '".$_POST['user']."' AND idEvent = '".$_POST['event']."'";
		$res = $con->selectAllQueryFetch($query);
		if(count($res) == 0){
			echo json_encode(array('assist' => 0));
		}
		else{
			echo json_encode(array('assist' => 1));
		}
	}
?>