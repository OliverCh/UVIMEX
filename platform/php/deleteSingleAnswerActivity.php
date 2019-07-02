<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

include_once("dbHandler.php");
include_once("../classes/clsAnswer.php");
  $con = new dbHandler();
  $con->connect();
  $con->beginTransaction();
  $arrayResponse=array();
  $answer= new Answer($con->getConexion());
  if($_REQUEST['hIdRespuesta']){
    $idRespuesta=$_REQUEST['hIdRespuesta'];
    $answer->set_idRespuesta($idRespuesta);
    $answer->pubf_DeleteSingleAnswer();
    $con->commit();
    array_push($arrayResponse, array('success' => 'true', 'error' => 'false'));
  }


  header('Content-Type: application/json');
  echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
