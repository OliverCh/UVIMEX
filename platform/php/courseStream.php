<?php
	$mysqli = new mysqli('104.154.247.218', 'b_lopez', 'Blopez123/*', 'denlin_cursos_test');
	$query = "SELECT cursos.idCurso, cursos.streaming FROM cursos INNER JOIN modulos ON cursos.idCurso = modulos.idCurso WHERE idModulo = '".$_POST['module']."'";

	if ($resultado = $mysqli->query($query)) {
		if ($resultado->num_rows == 0) {
			echo json_encode(array('noStream' => 1));
		}
		else{
			$res = $resultado->fetch_assoc();
			if($res['streaming'] == 1){
				$query = "SELECT * FROM eventos_stream WHERE idCurso = '".$res['idCurso']."' AND fechaFinal >= '".$_POST['date']."'";
				if($scheduled = $mysqli->query($query)){
					if($scheduled->num_rows == 0){
						echo json_encode(array('noStreamScheduled' => 1));
					}
					else{
						$query = "SELECT * FROM eventos_stream WHERE idCurso = '".$res['idCurso']."' AND fechaInicio <= '".$_POST['date']."' AND fechaFinal >= '".$_POST['date']."'";
						if($currentStream = $mysqli->query($query)){
							if($currentStream->num_rows == 0){
								echo json_encode($scheduled->fetch_assoc());	
							}
							else{
								$cr = $currentStream->fetch_assoc();
								$query = "SELECT * FROM event_assistance WHERE idCourse = '".$res['idCurso']."' AND idUser = '".$_POST['idUser']."' AND idEvent = '".$cr['idES']."'";
								if($evento = $mysqli->query($query)){
									if($evento->num_rows == 0){
										echo json_encode(array('noAssist' => 1));
									}
									else{
										echo json_encode(array('stream' => 1));
									}
								}
								else{
									echo json_encode(array('error' => 'Error al ejecutar el query 4', $query));
								}
							}
						}
						else{							
							echo json_encode(array('error' => 'Error al ejecutar el query 3'));
						}
					}
				}
				else{
					echo json_encode(array('error' => 'Error al ejecutar el query 2'));
				}
			}
			else{
				echo json_encode(array('noStream' => 1));
			}
		}
	}
	else{
		echo json_encode(array('error' => 'Error al ejecutar el query'));
	}
?>