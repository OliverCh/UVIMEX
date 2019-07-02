<?php

	ini_set('display_errors', 1);
	ini_set('display_startup_errors', 1);
	error_reporting(E_ALL);

	include "dbHandler.php";

	$ids = (isset($_POST["idTemas"]))?$_POST["idTemas"]:[];
	$idUser = (isset($_POST["idUser"]))?$_POST["idUser"]:[];

	// Obtencion de respuestas del usuario
	$answersUser = [];
	$dir = getcwd();
	chdir("../../");
	foreach ($ids as $key => $value) {

		$filename = getcwd()."/platform/jsonAnswers/$idUser/{$value}.json";
		//echo $filename;	
		if(file_exists($filename)){
			$file = fopen($filename, "r");
			$jsonFile = "";
			try { $jsonFile = json_decode(fread($file, filesize($filename))); } 
			catch (Exception $e) { echo $e; }
			if($jsonFile == ""){
				continue;
			}

			

			// Go to the last attempt instead of iterating becouse I hate everyone
			$lastAttempt = [];
			if(count($jsonFile) > 0){
				$lastAttempt = $jsonFile[count($jsonFile) - 1]->activityAnswers;
			}
			else
				continue;

			$answActivities = array();
			// Save all answers on objects
			for ($i=0; $i < count($lastAttempt); $i++) { 
				if($lastAttempt[$i]->accurate != "1"){
					//echo $lastAttempt[$i]->answer." no esta chida\n";
					continue;
				}
				$idActivity = $lastAttempt[$i]->idActividad;

				if(!isset($answActivities[$idActivity])){
					$answActivities[$idActivity] = [];
				}
				$answActivities[$idActivity][] = (object)[
					"idRespuesta" => $lastAttempt[$i]->answer
				];
			}

			$answersUser[$value] = $answActivities;




			/*// Json Root iteration through attempts. Is useless
			foreach ($jsonFile as $key => $value) {
				$activityAnswers = $value["activityAnswers"];

				// Activity answers iteration
				foreach ($variable as $key => $value) {
					
				}

				if(isset($savedAnswers[$value["idActividad"]]){
					$savedAnswer = $savedAnswers[$value["idActividad"]];

					$savedAnswerDate = strtotime($savedAnswer["time"]);
					$newAnswerDate = strtotime($value["time"]);
					if($newAnswerDate > $savedAnswerDate){
						$savedAnswerDate["answer"] = $value["answer"];
						$savedAnswerDate["time"] = $value["time"];
					}
				}
				else{
					$savedAnswers[$value["idActividad"]] = [];
					$savedAnswer = $savedAnswers[$value["idActividad"]];

					$savedAnswer["answer"] = $value["answer"];
					$savedAnswer["time"] = $value["time"];
					$savedAnswer["correctness"] = 0;
				}
			}
			$answTemas[$value] = $savedAnswers;*/

		}
	}

	// echo "e".json_encode($answersUser);
	// echo "\n";



	// Obtencion de respuestas correctas
	$where = "";
	foreach ($ids as $key => $value) {
		if($where != ""){
			$where .= " or ";
		}
		$where .= " idTema = $value ";
	}
	if($where != ""){
		$where = "and (".$where.")";
	}

	$db = new dbHandler();
	$db->connect();

	$sql = "SELECT a.idActividad, strPregunta, idTema, strTemplate, r.idRespuesta, intValor, strRespuesta, intCorrecta from actividad a, actividadrespuesta ar, respuesta r where a.idActividad = ar.idActividad and ar.idRespuesta = r.idRespuesta and (strTemplate = \"actividad6\" or strTemplate = \"actividad5\" or strTemplate = \"actividad2\") $where order by idTema ASC;";
	//echo $sql;
	$result = $db->selectAllQuery($sql);

	$answersDB = [];
	for ($i=0; $i < count($result); $i++) { 
		$row = $result[$i];
		$idTopic = $row->idTema;
		if(!isset($answersDB[$idTopic])){
			$answersDB[$idTopic] = [];
		}

		$idActividad = $row->idActividad;
		if(!isset($answersDB[$idTopic][$idActividad])){
			$answersDB[$idTopic][$idActividad] = [];
		}

		$idAnswer = $row->idRespuesta;
		$template = $row->strTemplate;
		$isCorrect = ($row->intCorrecta == 1)?1:0;
		$txtAnswer = $row->strRespuesta;
		$activityValue = $row->intValor;
		//echo "creando respuesta $idAnswer\n";

		$obj = (object)[
			"r" => $txtAnswer,
			"s" => "idk"
		];

		if(isset($answersUser[$idTopic]) && isset($answersUser[$idTopic][$idActividad])){
			if($template == "actividad6" && $isCorrect == 1){
				//echo "esta vacia :o";
				$obj->s = 0;
			}

			foreach ($answersUser[$idTopic][$idActividad] as $ii => $question) {
				if($question->idRespuesta == $idAnswer){
					if($template == "actividad2" && empty($activityValue)){
						//echo "string";
						$isCorrect = 1;
					}
					//echo $row->strPregunta."-".$idActividad;
					$obj->s = $isCorrect;
				}
			}
		}

		$answersDB[$idTopic][$idActividad][] = $obj;

	}

	echo json_encode($answersDB);


	/*foreach ($result as $key => $value) {

		$idTopic = $value->idTema;
		if (!isset($answTemas[$idTopic])) {
			continue;
		}
		$answTopic = $answTemas[$idTopic];

		$idActivity = $value->idActividad;
		if(!isset($answTopic[$idActivity])){
			continue;
		}
		$answActivity = $answTopic[$idActivity];

		$idAnswer = $value->idRespuesta;
		$template = $value->strTemplate;
		$isCorrect = $value->intCorrecta == 1;
		$txtAnswer = $value->strRespuesta;
		for ($i=0; $i < count($answActivity); $i++) { 
			$answer = $answActivity[$i];

			if($answer["idRespuesta"] != $idAnswer)
				continue;

			$answer["respuesta"] = $txtAnswer;
			$answer["ok"] = ($template == "actividad5" || $isCorrect);
		}

	}*/
	

	//echo json_encode($answTemas);
?>