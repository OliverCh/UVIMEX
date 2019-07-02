<?php
	function login($data){
		$usr = $data['usr'];
		$pass = $data['pass'];

		function openDB(){
			$servername = "104.154.247.218";
			$username = "b_lopez";
			$password = "Blopez123/*";
			$dbname = "captura";
			$conn = new mysqli($servername, $username, $password, $dbname);	
			$conn->set_charset("utf8");
			if ($conn->connect_error) {
				die("\nLa conexión falló: " . $conn->connect_error);
			}
			else{
				return $conn;
			}
		}
		return $data;
	}
?>