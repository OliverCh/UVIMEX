<?php 
	require('../../../wp-load.php');
	$mysqli = new mysqli('104.154.247.218', 'b_lopez', 'Blopez123/*', 'denlin_cursos_test');
	$query = "SELECT * FROM eventos_stream WHERE idES = '".$_POST['eid']."'";

	$event = array();
	if ($resultado = $mysqli->query($query)) {
		if ($resultado->num_rows === 0) {
			
		}
		else{
			$res = $resultado->fetch_assoc();
			$event[] = $res;
			$results = $wpdb->get_results("SELECT t3.display_name,
					FROM   wp_lifterlms_user_postmeta t1
					JOIN   wp_posts t2
					ON t1.post_id = t2.id
					JOIN wp_users t3
					ON t2.post_author = t3.id
			WHERE t1.meta_value = 'enrolled' AND t3.id = '".$res['idInstructor']."'");

			if(!empty($results)){
				$event[] = array(
					"eventName" => $res['nombre'],
					"courseName" => $res['nombreCurso'],
					"eventDest" => $res["descripcion"],
					"date1" => $res['fechaInicio'],
					"date2" => $res['fechaFinal']
				);
			}
		}
	}

	echo json_encode($event);
?>