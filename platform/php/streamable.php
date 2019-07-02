<?php 
	$mysqli = new mysqli('104.154.247.218', 'b_lopez', 'Blopez123/*', 'denlin_cursos_test');
	$query = "SELECT idCurso FROM modulos WHERE idModulo = '".$_POST['course']."'";

	if ($resultado = $mysqli->query($query)) {
		if ($resultado->num_rows === 0) {
			echo json_encode(array('isStreamable' => 0, 'query' => $query));
		}
		else{
			$res = $resultado->fetch_assoc();
			$query = "SELECT * FROM cursos WHERE idCurso = '".$res['idCurso']."' AND streaming = 1";
			if($resultado2 = $mysqli->query($query)){
				if($resultado2->num_rows === 0){
					echo json_encode(array('isStreamable' => 0, 'course' => $res['idCurso']));
				}
				else{
					echo json_encode(array('isStreamable' => 1));
				}
			}
		}
	}
?>