<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
  if(isset($_POST["answersArray"]) && !empty($_POST["answersArray"])){
      $jsonAnswers=array();
      $jsonAnswersParentKey=array();
      $jsonAnswersParentForIndex=array();
      $idTema=null;
      $idActivity=null;
      $idUser=null;
      $tipoActividad=null;
      $accurate=null;
      //Create JSON structure
      foreach ($_POST["answersArray"] as $key => $value) {
        $idTema=$value["idTema"];
        $idUser=$value["idUser"];
        array_push($jsonAnswers, array("idActividad" => $value["idActividad"], "answer" => $value["answer"], "accurate" => isset($value['accurate']) ? $value['accurate']: null , "time" =>date("m/d/Y h:i:s a", time()) ));
      }
      $jsonAnswersParentKey['activityAnswers']=$jsonAnswers;
      //Saving JSON
      $directoryAnswers = "../jsonAnswers/{$idUser}";  //if first time we create user answers folder
      if(!is_dir($directoryAnswers)){   //check if directory exists
          mkdir($directoryAnswers, 0755);
      }
      $directoryAnswers.="/{$idTema}.json";
      if(!file_exists($directoryAnswers)){
        //echo "el directorio es".$directoryAnswers;
        $file = fopen($directoryAnswers,'w+');
        $jsonAnswersParentForIndex["0"]=$jsonAnswersParentKey;
        $jsonAnswersEncodedFirstTime=json_encode($jsonAnswersParentForIndex,JSON_PRETTY_PRINT);
        fwrite($file, $jsonAnswersEncodedFirstTime);
        fclose($file);
      }else{
        $inp = file_get_contents($directoryAnswers);
        $tempArray =  json_decode($inp, true);
        $tempArray[]=$jsonAnswersParentKey;
        $jsonData = json_encode($tempArray,JSON_PRETTY_PRINT);
        file_put_contents($directoryAnswers, $jsonData);
      }
  }




  function print_object($s){
		echo "<pre>";
		var_dump($s);
		echo "</pre>";
	}

 ?>
