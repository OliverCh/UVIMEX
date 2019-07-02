<?php

	function updateCourseInfo($data){
		echo "asd";
		$usuario = $data[0];
		$nombreAnterior = $data[1];
		$info = $data[2];
		echo $info["title"];
		$route = "Instructores/".$usuario;

		if(!file_exists($route."/".$nombreAnterior)){
			mkdir($route."/".$nombreAnterior);
		}
		rename($route."/".$nombreAnterior, $route."/".$info["title"]);


		$infoFIle = fopen($route."/".$info["title"]."/info.json", "w");
		fwrite($infoFIle, json_encode($info));
		fclose($infoFIle);

	}

?>