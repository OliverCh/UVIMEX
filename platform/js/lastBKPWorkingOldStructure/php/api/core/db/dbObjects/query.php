<?php
	class Query{
		private $conn;
		private $type = "";
		private $table = "";
		private $queryStart = "";
		private $queryBody = "";
		private $querySubBody = "";
		private $queryEnd = "";
		private $queryRes;
		private $joinCount = 0;
		private $constraints = "";

		public function __construct($dbCon, $dbtable, $qtype){
			$this->conn = $dbCon;
			$this->type = $qtype;
			$this->table = $dbtable;


			$this->getStart();
		}

		private function getStart(){
			switch($this->type){
				case "insert":
					$this->queryStart = "INSERT INTO ".$this->table;
				break;

				case "select":
					$this->queryStart = "SELECT ";
				break;		

				case "update":
					$this->queryStart = "UPDATE ".$this->table." SET ";
				break;
				
				case "delete":
					$this->queryStart = "DELETE FROM ".$this->table;
				break;
			}
		}

		public function pushVal($key, $value){
			switch($this->type){
				case "insert":
					$this->queryBody .= $key.",";
					if(checkBool($value)){
						$this->querySubBody .= $value.",";
					}
					else if(strpos($value,"-p") !== false){
							$this->querySubBody .= ltrim($value, "-p").",";
					}
					else{
						$this->querySubBody .= "'".$value."',";
					}
				break;

				case "select":
					if($key == "*"){
						$this->queryBody = " * ";
					}
					else{
						if(strpos($value,"=") !== false){
							if(strpos($value,"=") == 0){
								$this->querySubBody .= $key." = '".ltrim($value, "=")."',";
							}
							else{
								$val = explode("=", $value);
								$this->querySubBody .= $val[0]." = '".$val[1]."',";
							}
						}
						else{
							if($this->queryBody != "*")
								$this->queryBody .= $key.",";
						}
					}
				break;		

				case "update":
					if(strpos($value,"=") !== false){
						if(strpos($value,"=") == 0){
							$this->querySubBody .= $key." = '".ltrim($value, "=")."',";
						}
						else{
							$val = explode("=", $value);
							$this->querySubBody .= $val[0]." = '".$val[1]."',";
						}
					}
					else if(strpos($value,"-p") !== false){
						$this->queryBody .= $key." = ".ltrim($value, "-p").",";
					}
					else{
						$this->queryBody .= $key." = '".$value."',";
					}
				break;
				
				case "delete":
					$this->queryBody .= $key." = '".$value."',";
				break;
			}
		}

		public function addConstraint($constraint){
			if($this->constraints = ""){
				$this->constraints = $constraint;
			}
			else{
				$this->constraints .= $constraint;
			}
		}

		public function createJOIN($type, $table2, $col1, $col2, $table3 = ""){
			if($this->joinCount === 0){
				$this->queryEnd = " ".$type." ".$table2." ON ".$this->table.".".$col1." = ".$table2.".".$col2;
				$this->joinCount++;
			}
			else{
				$this->queryEnd .= ") ".$type." ".$table2." ON ".$table3.".".$col1." = ".$table2.".".$col2.")";
				$this->joinCount++;
			}
		}

		public function getQuery(){
			$this->queryBody = rtrim($this->queryBody, ",");
			$this->querySubBody = rtrim($this->querySubBody, ",");
			switch($this->type){
				case "insert":
					return $this->queryStart." (".$this->queryBody.") VALUES (".$this->querySubBody.")";
				break;

				case "select":
					$query = $this->queryStart.$this->queryBody." FROM ".$this->table;
					if($this->joinCount == 1){
						$query .= " ".$this->queryEnd;
					}
					elseif ($this->joinCount > 1) {
						$c = "";
						for ($i=0; $i < $this->joinCount; $i++) { 
							$c .="(";
						}
						$query = str_replace('FROM ', 'FROM '.$c, $query);
						$query .= $this->queryEnd;
					}
					if($this->querySubBody != ""){
						$query .= " WHERE ".$this->querySubBody;
					}
					if($this->constraints != ""){
						$query .= $this->constraints;	
					}
					return $query;
				break;		

				case "update":
					if($this->querySubBody == ""){
						return false;
					}
					return $this->queryStart.$this->queryBody." WHERE ".$this->querySubBody;
				break;
				
				case "delete":
					if($this->queryBody == ""){
						return false;
					}
					return $this->queryStart." WHERE ".$this->queryBody;
				break;
			}	
		}

		public function getResult(){
			$rows = array();
			while ($row = mysqli_fetch_assoc($this->queryRes)) {
				$rows[] = $row;
			}
			return $rows;
		}

		public function execute(){
			echo $this->getQuery();
			$this->queryRes = mysqli_query($this->conn, $this->getQuery());
		}

	}
?>