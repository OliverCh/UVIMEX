<?php
	class dbHandler{
		private $dbConnection;
		private $queryList = array();
		private $tables = array();

		private function findTable($id){
			foreach ($this->tables as $key => $value) {
				if($key == $id){
					return $value;
				}
			}
		}

		private function loadTables(){
			$tablesList = mysqli_query($this->dbConnection, 'SHOW TABLES');
			$tables_ = array();
			while($table = mysqli_fetch_array($tablesList)) {
				$tableId = random_str(5, md5($table[0]));
				$tables_[$tableId] = $table[0];
			}
			if(!isset($_SESSION['tables'])){
				$_SESSION['tables'] = json_encode($tables_);
				$this->tables = $tables_;
			}
			else{
				$countTables = count($tables_);
				$countSession = count(json_decode($_SESSION['tables'], true));
				//echo $countTables." > ".$countSession;
				//echo ($countTables > $countSession);
				//var_dump(json_decode($_SESSION['tables'], true));
				if($countTables > $countSession){
					$_SESSION['tables'] = json_encode($tables_);
					$this->tables = $tables_;
				}
				else{
					$this->tables = json_decode($_SESSION['tables'], true);
				}
			}
			
		}

		private function connectDB(){
			$this->dbConnection = mysqli_connect(DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME);
			mysqli_set_charset($this->dbConnection,'utf8');
		}

		private function getPasswordHash($pwd, $key){
			$pwdStr = md5($pwd.$key);
			return 'SHA2(CONCAT("'.$key.'","'.$pwdStr.'"), 512)';
		}

		public function __construct(){
			include (__CORE__.'/db/dbObjects/query.php');
			include (__MODULES__.'/auxiliarFunctions.php');
			$this->connectDB();
			$this->loadTables();
		}

		public function createInsert($values, $table){
			$tb = $this->findTable($table);
			$query = new query($this->dbConnection, $tb, 'insert');
			
			foreach ($values as $key => $value) {
				$query->pushVal($value["key"], $value["value"]);
			}

			$query->execute();
		}

		public function createSelect($values,  $table, $join = false){
			$tb = $this->findTable($table);
			$query = new query($this->dbConnection, $tb, 'select');

			if($join){
				foreach ($join as $key => $value) {
					if(isset($value['table2'])){
						$query->createJOIN($value['type'], $value['table'], $value['col1'], $value['col2'], $value['table2']);
					}
					else{
						$query->createJOIN($value['type'], $value['table'], $value['col1'], $value['col2']);
					}
				}
			}
			
			foreach ($values as $key => $value) {
				if(array_key_exists('value', $value)){
					$query->pushVal($value["key"], "=".$value["value"]);
				}
				else{
					$query->pushVal($value["key"], "");
				}
			}

			$query->execute(); //añadir mas constraints
			return $query->getResult();
		}

		public function createSelectExists($values1, $table1, $values2, $table2){
			$tb = $this->findTable($table2);
			$tb1 = $this->findTable($table1);

			$queryConstraint = new query($this->dbConnection, $tb1, 'select');
			$query = new query($this->dbConnection, $tb, 'select');

			foreach ($values1 as $key => $value) {
				if(array_key_exists('value', $value)){
					$queryConstraint->pushVal($value["key"], "=".$value["value"]);
				}
				else{
					$queryConstraint->pushVal($value["key"], "");
				}
			}

			foreach ($values2 as $key => $value) {
				$query->pushVal($value["key"], "");
			}

			$query->pushVal(' EXISTS ', "=(".$queryConstraint->getQuery().")");

			$queryConstraint = null;
			$query->execute(); //añadir mas constraints
			return $query->getResult();

		}

		public function createUpdate($values, $table){
			$tb = $this->findTable($table);
			$query = new query($this->dbConnection, $tb, 'update');
			
			foreach ($values as $key => $value) {
				if(array_key_exists('constraint', $value)){
					$query->pushVal($value["key"], "=".$value["constraint"]);
				}
				else{
					$query->pushVal($value["key"], $value["value"]);
				}
			}

			$query->execute(); //añadir mas constraints	
		}

		public function createDelete($values, $table){
			$tb = $this->findTable($table);
			$query = new query($this->dbConnection, $tb, 'delete');
			
			foreach ($values as $key => $value) {
				$query->pushVal($value["key"], $value["value"]);
			}

			$query->execute(); //añadir mas constraints
		}

		public function createUser($values, $table, $pwdKey, $pwdColumn){
			$tb = $this->findTable($table);
			$query = new query($this->dbConnection, $tb, 'insert');
			
			foreach ($values as $key => $value) {
				if($value['key'] === $pwdKey){
					$query->pushVal($pwdColumn, "-p".$this->getPasswordHash($value["value"], $tb));
				}
				else{
					$query->pushVal($value["key"], $value["value"]);
				}
			}

			$query->execute();
		}

		public function updateUser($values, $table, $pwdKey, $pwdColumn){
			$tb = $this->findTable($table);
			$query = new query($this->dbConnection, $tb, 'update');
			
			foreach ($values as $key => $value) {
				if(array_key_exists('constraint', $value)){
					$query->pushVal($value["key"], "=".$value["constraint"]);
				}
				else if($value['key'] === $pwdKey){
					$query->pushVal($pwdColumn, "-p".$this->getPasswordHash($value["value"], $tb));
				}
				else{
					$query->pushVal($value["key"], $value["value"]);
				}
			}

			$query->execute(); //añadir mas constraints	
		}

		public function getTableId($tableName){
			foreach ($this->tables as $key => $value) {
				if($tableName == $value){
					return $key;
				}
			}
		}

		public function getIdCol($table){
			$tb = $this->findTable($table);
			$query = new query($this->dbConnection, $tb, 'select');
			$query->pushVal("*", "");
			$query->addConstraint(" LIMIT 1 ");
			$query->execute();
			$cols = $query->getResult();
			reset($cols[0]);
			return (key($cols[0]));
		}

		public function getInsertID(){
			try{
				return mysqli_insert_id($this->dbConnection);
			}
			catch(Exception $e){
				return -1;
			}
		}
	}
?>