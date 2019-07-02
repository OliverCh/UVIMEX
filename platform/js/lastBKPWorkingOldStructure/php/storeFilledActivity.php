<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsActivity.php");
include_once("../classes/clsTheme.php");
  $con = new dbHandler();
  $con->connect();
  $con-> beginTransaction();

  $theme= new Theme($con->getConexion());
  $activity= new Activity($con->getConexion());
  $idActividad="";
  foreach ($_REQUEST["belongerActivity"] as $key => $value) {
    if(isset($_REQUEST["question{$value}"]) &&  $_REQUEST["question{$value}"] ){
      foreach($_REQUEST["question{$value}"] as $key2 => $val){
        if($val && $val != "" && (isset($_REQUEST["qValue{$key}"][$key2]) && $_REQUEST["qValue{$key}"][$key2]) ){
          $activity->set_idTema($_REQUEST["idTemaActivity"]);
          $activity->set_strPregunta($val);
          $activity->set_strTemplate($_REQUEST["templateActivity"]);
          $activity->set_intPage($value);
          $activity->set_intValor($_REQUEST["qValue{$key}"][$key2]);
          if(isset($_REQUEST["hIdActivity{$value}"][$key2]) && $_REQUEST["hIdActivity{$value}"][$key2] !="" ){
            //echo "entro el valor={$_REQUEST["hIdActivity{$value}"][$key2]}";
            $activity->pubf_EditActivity($_REQUEST["hIdActivity{$value}"][$key2]);
          }else{
            $activity->pubf_SaveActivity();

          }
          $idActividad=$activity->lastIdQuery();
        }
      }
    }
  }

    $arrayResponse=array();
    array_push($arrayResponse, array('success' => 'true', 'error' => 'false', 'idActividad' =>  $idActividad));
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);

 $con->commit();
?>
