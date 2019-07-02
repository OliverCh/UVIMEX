<?php
	date_default_timezone_set('America/Monterrey');
	class dbHandler{
		public $dbh;
		public function connect(){
			try{
			$this -> dbh = new PDO('mysql:host=104.154.247.218;dbname=denlin_cursos_test', "b_lopez", "Blopez123/*");
			//$this -> dbh = new PDO('mysql:host=104.154.247.218;dbname=denlin_cursos_test', "b_lopez", "Blopez123/*");
			 //$this -> dbh = new PDO('mysql:host=104.154.247.218;dbname=UVIMEXCursos', "b_lopez", "Blopez123/*");
		  //$this -> dbh = new PDO('mysql:host=mysql_denlin_v2;dbname=denlin_cursos', "root", "123456");
			$this -> dbh -> setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
			}catch(PDOException $e){
				echo "No se pudo conectar a la base de datos: ".$this->getError($e, $strSql);
				die();
			}
		}

		public function selectAllQueryFetch($strSql){
			try{
				$exec = $this -> dbh -> prepare($strSql);
				$exec -> execute();
				return $exec -> fetchAll(PDO::FETCH_ASSOC);
			}catch(PDOException $e){
				$this->getError($e, $strSql);
			}
		}

		public function selectAllQuery($strSql){
			try{
				$exec = $this -> dbh -> prepare($strSql);
				$exec -> execute();
				return $exec -> fetchAll(PDO::FETCH_OBJ);
			}catch(PDOException $e){
				$this->getError($e, $strSql);
			}
		}

		public function selectQuery($strSql){
			try{
				$exec = $this -> dbh -> prepare($strSql);
				$exec -> execute();
				return $exec -> fetch(PDO::FETCH_OBJ);
			}catch(PDOException $e){
				$this->getError($e, $strSql);
			}
		}

		public function lastIdQuery() {
			return $this -> dbh -> lastInsertId();
		}

		public function desconectar(){
			$this -> dbh = null;
		}

		public function getConexion(){
			return $this -> dbh;
		}

		public function beginTransaction(){
	        $this -> dbh -> beginTransaction();
	    }

	    public function rollBack(){
	        $this -> dbh -> rollBack();
	    }

	    public function commit(){
	        $this -> dbh -> commit();
	    }


			public function prepare($strSql){
	        return $this -> dbh -> prepare($strSql);
	    }



		public function executeQuery($strSql){
			try{
				$this -> dbh -> exec ($strSql);
			}catch(PDOException $e){
				$this->getError($e, $strSql);
			}
		}

		public function executeQueryPrepare($sql){
			try{
				$sql->execute();
			}catch(PDOException $e){
				$this->getError($e, $sql->queryString);
			}
		}

		public function getError($e, $strSql){
			if($this->dbh->inTransaction()){
				$this->rollBack();
			}

		  $resultado = addslashes(json_encode($_REQUEST));
			//Insertar en una tabla tblLogSql falta crearla
			// $query = 'insert into tblLogSql(strSql, strUrl, strUsuario, datFechaHora, strUserAgent, strErrorSql, strPathAnterior, strRequest)
			// 					values(
			// 						"'.($strSql).'",
			// 						"'.$_SERVER["REQUEST_URI"].'",
			// 						'.((isset($_SESSION["user"])) ? "\"".$_SESSION["user"]."\"" : "NULL").',
			// 						'.date('"Y-m-d H:i:s"').',
			// 						"'.($_SERVER["HTTP_USER_AGENT"]).'",
			// 						"'.$e->getMessage().'",
			// 						'.((isset($_SERVER["HTTP_REFERER"])) ? "\"".$_SERVER["HTTP_REFERER"]."\"" : "NULL").',
			// 						'.((isset($resultado)) ? "\"".$resultado."\"" : "NULL").'
			// 					)';
			//
			// $query = str_replace("'", "", $query);
			// //$this -> executeQuery($query),
			// $this -> dbh -> exec ($query);
			// $maxLog=$this->lastIdQuery();

			  echo "<pre style='color:red;'>";
				// echo "Error #{$maxLog}";
				echo $e->getMessage();
				var_dump($e->getTrace());
				echo "</pre>";
			die();
		}

		function addReg($data){
			$query = "INSERT INTO ".$data['tab'];
			$cols = "";
			$vals = "";
			foreach ($data['datos'] as $col => $val) {
				$cols .= $col.",";
				$vals .= "'".$val."', ";
			}
			$query .= " (".$cols."user_crea, date_crea) VALUES (".$vals."'".$data['user']."', now())";
			executeQuery($query);
		}

		function updateReg($data){
			$query = "UPDATE ".$data['tab'];
			$cols = "";
			$vals = "";
			foreach ($data['datos'] as $col => $val) {
				$cols .= $col." = '".$val."', ";
			}
			$query .= " SET ".$cols."user_mod = '".$data['user']."', date_mod = now() WHERE ".$data["idName"]." = ".$data['id'];
			executeQuery($query);
		}

		function getReg($data){
			return $result = selectAllQuery("SELECT * FROM ".$data['tab']." WHERE ".$data["idName"]." = ".$data['id']);
		}
	}

	function print_object($s){
		echo "<pre>";
		var_dump($s);
		echo "</pre>";
	}

	function createToken(){
		return bin2hex(openssl_random_pseudo_bytes(6));
	}

	function displayPhpErrors(){
		ini_set('display_errors', 1);
		ini_set('display_startup_errors', 1);
		error_reporting(E_ALL);
	}
?>
