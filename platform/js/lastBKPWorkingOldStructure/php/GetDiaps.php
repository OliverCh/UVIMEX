<?php

	function getDiaps($data){
		$usuario = $data[0];
		$curso = $data[1];
		$route = "Instructores/".$usuario."/".$curso;

		if(!file_exists($route))
			mkdir($route);

		$json ="{\"contenido\":{}}";
		if(!file_exists($route."/course.json")){
			$file = fopen($route."/course.json", "w");
			fwrite($file, $json);
			fclose($file);
		}
		$courseFile = fopen($route."/course.json", "r");
		$json = fread($courseFile, filesize($route."/course.json"));
		fclose($courseFile);
		$json = $json;
		return $json;
	}

?>