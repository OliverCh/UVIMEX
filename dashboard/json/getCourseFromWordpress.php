<?php

	include "../php/dbHandler.php";

	$courses = (isset($_POST["courses"]))?$_POST["courses"]:[];

	//var_dump($courses);

	$where = "false";

	foreach ($courses as $key => $value) {
		$where .= " or idCursoWP = ".$value["post_id"];
	}

	$where = "(".$where.")";


	$db = new dbHandler();
	$db->connect();

	$sql = "SELECT idCurso, idCursoWP from wordpressUvimex where {$where};";
	//echo $sql;
	$result = $db->selectAllQuery($sql);

	for ($i=0; $i < count($courses); $i++) { 

		foreach ($result as $iRow => $row) {

			//var_dump($course[$i]);
			//echo "*********".$courses[$i]["post_id"]." - > ".$row->idCursoWP."\n";
			if($courses[$i]["post_id"] == $row->idCursoWP){
				//echo "CHANGE".$courses[$i]["post_id"]."to";
				$courses[$i]["post_id"] = $row->idCurso;
				//echo $courses[$i]."\n";
			}
		}
	}
	echo json_encode($courses);
?>