<?php	
    ini_set('display_errors', 1);
    ini_set('display_startup_errors', 1);
    error_reporting(E_ALL);

	include ('../../../wp-load.php');

	$vato = wp_get_current_user();
	$vatoArray = (array) $vato;
	echo json_encode($vatoArray['data']);

?>