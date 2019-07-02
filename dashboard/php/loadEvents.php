<?php
	include_once("../../../wp-load.php");
	include_once("dbHandler.php");
	$con = new dbHandler();
	$con->connect();

	if($_GET['role'] == "author" || $_GET['role'] == 'instructor' || $_GET['role'] == "administrator"){
		$query = "SELECT * FROM eventos_stream WHERE idInstructor = '".$_GET['user']."' AND fechaInicio >= '".$_GET['dateIn']."' AND fechaFinal <= '".$_GET['dateOut']."'";
		$res = $con->selectAllQueryFetch($query);
		echo json_encode(array('result' => $res));
	}
	else{
		$con->executeQuery('SET NAMES utf8');
		$arrayData = array();
		$results = $wpdb->get_results("SELECT t2.id FROM      wp_lifterlms_user_postmeta t1 LEFT JOIN wp_posts t2 ON        t1.post_id = t2.id LEFT JOIN wp_users t3 ON        t1.user_id = t3.id LEFT JOIN wp_users t4 ON        t4.id=t2.post_author WHERE t1.meta_value= 'enrolled' AND       t2.post_type='course' AND t3.id='".$_GET['user']."';");

		if(!empty($results))
		{
		  foreach($results as $row){
				$query = "SELECT * FROM eventos_stream INNER JOIN wordpressUvimex ON eventos_stream.idCurso = wordpressUvimex.idCurso WHERE wordpressUvimex.idCursoWP = '".$row->id."' AND eventos_stream.fechaInicio >= '".$_GET['dateIn']."' AND eventos_stream.fechaFinal <= '".$_GET['dateOut']."'";
				$events = $con->selectAllQueryFetch($query);
				foreach ($events as $key => $value) {
					$arrayData[] = $value;
				}
		  }
		}

		echo json_encode(array('result' => $arrayData));
	}

?>