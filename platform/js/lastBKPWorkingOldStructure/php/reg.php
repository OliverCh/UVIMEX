<?php

	#ini_set('display_errors', 1);ini_set('display_startup_errors', 1);error_reporting(E_ALL);

	function createFolder($data){
		$ret = array();
		if (!file_exists('Instructores')) {
			$ret[] = "Instructores creado";
		    mkdir('Instructores', 0777, true);
		}

		if (!file_exists('Instructores/'.$data)) {
			$ret[] = "Instructores/$data creado";
		    mkdir('Instructores/'.$data, 0777, true);
		}
		return json_encode($ret);
	}

?>