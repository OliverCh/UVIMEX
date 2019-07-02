<?php

	function getCourses($usuario){
		$route = "Instructores/".$usuario;

		if(!file_exists($route))
			mkdir($route);

		$folders = scandir($route);
		$folders = array_diff($folders, [".", ".."]);
#		echo json_encode("asd".$folders);
		$courses = array();
		foreach ($folders as $value){ 
			$infoFile = fopen($route."/".$value."/info.json", "r");
			$json = json_decode(fread($infoFile, filesize($route."/".$value."/info.json")));
			fclose($infoFile);
			$courses[] = $json;
		}
		echo json_encode($courses);
	}

?>