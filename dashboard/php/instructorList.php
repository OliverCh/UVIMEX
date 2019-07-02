<?php
	require('../../../wp-load.php');
	$mysqli = new mysqli('104.154.247.218', 'b_lopez', 'Blopez123/*', 'denlin_cursos_test');

	$results = $wpdb->get_results("SELECT  DISTINCT(t3.user_nicename) as 'usernice',
	t3.display_name,
	t3.id 
	FROM   wp_lifterlms_user_postmeta t1
	JOIN   wp_posts t2
	ON t1.post_id=t2.id
	JOIN wp_users t3
	ON t2.post_author=t3.id
	WHERE t1.meta_value= 'enrolled'");
	$instructorsArray = array();
	if(!empty($results)){
		foreach($results as $row){
			$query = "SELECT webexID FROM instructorXwebex WHERE idInstructor = '".$row->id."'";
			if ($resultado = $mysqli->query($query)) {
				if ($resultado->num_rows === 0) {
					continue;
				}
				else{
					$res = $resultado->fetch_assoc();
					$newInstructorsArray = array(
						"user_id"  => $row ->id,
						"usernice" => $row->usernice,
						"userName"=> $row->display_name,
						"email"=> $res['webexID']
					);
					array_push($instructorsArray,$newInstructorsArray);
				}
			}
		}
	}
	echo json_encode($instructorsArray);
?>