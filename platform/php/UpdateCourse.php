<?php

	function updateCourse($data){
		$user = $data[0];
		$courseName = $data[1];
		$course = $data[2];
		$route = 'Instructores/'.$user."/".$courseName;

		if(!file_exists($route))
			mkdir($route);

		$infoFile = fopen($route."/course.json", "w");
		fwrite($infoFile, json_encode($course));
		fclose($infoFile);

		$ret = array();
		foreach ($course["contenido"] as $slide) {
			$ret[] = deleteUnnecesaryFiles($slide);
		}

		return json_encode($ret);
	}

	function deleteUnnecesaryFiles($slide){
		$ret = array();

		$images = $slide['imagenes'];
		$video = $slide['video'];
		$audio = $slide['audio'];

		foreach ($images as $image) {
			$url = $image['ruta'];
			$fileName = split('/', $url);
			$fileName = $fileName[count($fileName)-1];

			$ret[] = $fileName;
		}

		$ret[] = $video;
		$ret[] = $audio;
		return $ret;
	}

?>
