<?php
error_reporting(E_ALL);
ini_set('display_errors', 1);
ini_set('allow_url_fopen', 1);
	if(isset($_GET['server'])){
		$method = $_SERVER['REQUEST_METHOD'];
		$endp = explode('/', trim($_SERVER['PATH_INFO'], '/'));

		if(count($endp) == 0){
			header('HTTP/1.1 403 Endpoint not found');
			exit();
		}

		$endp = $endp[0];

		$serverAddress = "http://35.202.134.57";
		$serverPort = 0;

		$servers = file_get_contents('./servers.json');
		$servers = json_decode($servers, true);

		$server = $_GET['server'];
		foreach ($servers as $key => $value) {
			if($value['name'] == $server){
				$serverPort = $value['port'];
			}
		}

		if($serverPort == 0){
			header('HTTP/1.1 403 Server not found');
			exit();
		}
		else{
			$path = $serverAddress.":".$serverPort."/".$endp;
			
			$headers = array(
				'Content-type' => 'application/json'
			);

			$data = ($method == "POST" ? $_POST : $_GET);

			$opts = array('http' => array(
				'method' => $method,
				'header' => 'Content-type: application/json',
				'content' => json_encode($data)
			));

			$context = stream_context_create($opts);
			$result = file_get_contents($path, false, $context);

			echo $result;
		}
	}
	else{
		header('HTTP/1.1 403 Server not found');
		exit();
	}

?>