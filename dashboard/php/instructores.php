<?php
	require('../../../wp-load.php');

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
			$newInstructorsArray = array(
				"user_id"  => $row ->id,
				"usernice" => $row->usernice,
				"userName"=> $row->display_name,
				"email"=> $row->email,
				"type_User" => $row->type_User,
				"phoneNumber" => $row->phoneNumber
			);
			array_push($instructorsArray,$newInstructorsArray);
		}
	}
	echo json_encode($instructorsArray);
?>