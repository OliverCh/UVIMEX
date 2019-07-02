<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	include "dbHandler.php";

	if(isset($_POST["idTemas"]))
		$ids = $_POST["idTemas"];
	else{
		return "Error con argumentos";
	}

	$where = "false";
	foreach ($ids as $key => $value) {
		if($where != ""){
			$where .= " or ";
		}
		$where .= " idTema = $value ";
	}

	$db = new dbHandler();
	$db->connect();

	$sql = "SELECT a.idActividad, strPregunta, strTemplate,idTema from actividad a where (strTemplate = \"actividad6\" or strTemplate = \"actividad5\" or strTemplate = \"actividad2\") and ($where)";
	$result = $db->selectAllQuery($sql);

	$myResult = [];
	foreach ($result as $key => $value) {
		$db_idActividad = $value->idActividad;
		$db_pregunta = $value->strPregunta;
		$db_tipo = $value->strTemplate;
		$db_idTema = $value->idTema;

		switch ($db_tipo) {
			case 'actividad2':
				//falsetrue
				$db_tipo = "radiobtn";
				break;
			case 'actividad5':
				$db_tipo = "radiobtn";
				break;
			case 'actividad6':
				$db_tipo = "checkbtn";
				break;
			default:
				$db_tipo = "idk";
				break;
		}

		$myResult[] = (object)[
			"idActividad" => $db_idActividad,
			"tipo" => $db_tipo,
			"pregunta" => $db_pregunta,
			"idTema" => $db_idTema
		];
	}
	

	echo json_encode($myResult);

?>