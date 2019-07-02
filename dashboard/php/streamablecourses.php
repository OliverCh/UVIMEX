<?php 
	$mysqli = new mysqli('104.154.247.218', 'b_lopez', 'Blopez123/*', 'denlin_cursos_test');
	$query = "SELECT * FROM cursos WHERE idUsuario = '".($_GET['user'] == 1 ? 999 : $_GET['user'])."' AND streaming = 1";

	if ($resultado = $mysqli->query($query)) {
		if ($resultado->num_rows === 0) {
			echo $query;
			echo 0;
		}
		else{
			$arr = array();
			while($row = $resultado->fetch_assoc()){
				$arr[] = array(
					'idCursoWordPress' => $row['idCurso'],
					'author' => $row['nombre']
				);
			}
			echo json_encode($arr);
		}
	}
?>