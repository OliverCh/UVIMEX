<?php

	$mysqli = new mysqli('104.154.247.218', 'b_lopez', 'Blopez123/*', 'denlin_cursos_test');

	$query = "SELECT idCurso FROM modulos WHERE idModulo = '".$_POST['course']."'";



	if ($resultado = $mysqli->query($query)) {

		if ($resultado->num_rows === 0) {

			echo json_encode(array('isStreamable' => 0));

		}

		else{

			$res = $resultado->fetch_assoc();

			$query = "SELECT webexID FROM instructorXwebex inner join eventos_stream on instructorXwebex.idInstructor = eventos_stream.idInstructor WHERE idCurso = '".$res['idCurso']."' AND fechaInicio <= '".$_POST['date']."' AND fechaFinal >= '".$_POST['date']."'";



			if ($mysqli->connect_errno) {

				echo json_encode(array('error' => 'connection error', 'message' => $mysqli->connect_error, 'num' => $mysqli->connect_errno));

				exit;

			}



			if (!$resultado = $mysqli->query($query)) {

				echo json_encode(array('error' => 'query error', 'message' => $mysqli->connect_error, 'num' => $mysqli->connect_errno, 'query' => $query));

				exit;

			}



			if ($resultado->num_rows === 0) {

				echo json_encode(array('roomID' => 0, 'query' => $query));

				exit;

			}



			echo json_encode($resultado->fetch_assoc());

		}

	}

?>