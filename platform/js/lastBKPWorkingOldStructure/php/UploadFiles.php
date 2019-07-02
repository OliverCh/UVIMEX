<?php
	#ini_set('display_errors', 1);ini_set('display_startup_errors', 1);error_reporting(E_ALL);

	$data = split(",", $_POST['data']);

	$filename = $_FILES['file']['name'];
	$folder = $location = "Instructores/".$data[0]."/".$data[1]."/media/";
	$location = $folder.$filename;

	if(!file_exists($folder)){
		mkdir($folder);
	}

	/* Upload file */
	if(move_uploaded_file($_FILES['file']['tmp_name'],$location)){
		echo json_encode(array('location' => $location, 'fileName' => $filename));
	}
?>