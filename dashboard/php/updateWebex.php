<?php
	$mysqli = new mysqli('104.154.247.218', 'b_lopez', 'Blopez123/*', 'denlin_cursos_test');

	if(isset($_POST['instructor'])){
		$query = "DELETE FROM instructorXwebex WHERE idInstructor = '".$_POST['instructor']."'";

		if ($mysqli->connect_errno) {
			echo json_encode(array('error' => 'connection error', 'message' => $mysqli->connect_error, 'num' => $mysqli->connect_errno));
			exit;
		}

		if (!$resultado = $mysqli->query($query)) {
			echo json_encode(array('error' => 'query error', 'message' => $mysqli->connect_error, 'num' => $mysqli->connect_errno));
			exit;
		}

		echo $query;
	}
	else{
		$query = "SELECT * FROM instructorXwebex WHERE idInstructor = '".$_POST['usr']."'";

		if ($mysqli->connect_errno) {
			echo json_encode(array('error' => 'connection error', 'message' => $mysqli->connect_error, 'num' => $mysqli->connect_errno));
			exit;
		}

		if (!$resultado = $mysqli->query($query)) {
			echo json_encode(array('error' => 'query error', 'message' => $mysqli->connect_error, 'num' => $mysqli->connect_errno));
			exit;
		}

		if ($resultado->num_rows === 0) {
			$query = "INSERT INTO instructorXwebex(idInstructor, webexID) VALUES ('".$_POST['usr']."', '".$_POST['webex']."')";
		}
		else{
			$query = "UPDATE instructorXwebex SET webexID = '".$_POST['webex']."' WHERE idInstructor = '".$_POST['usr']."'";
		}


		if (!$resultado = $mysqli->query($query)) {
			echo json_encode(array('error' => 'query error', 'message' => $mysqli->connect_error, 'num' => $mysqli->connect_errno));
			exit;
		}
		else{
			echo 1;
		}
	}
?>