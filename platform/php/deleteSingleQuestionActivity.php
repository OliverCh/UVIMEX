<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsActivity.php");
  $con = new dbHandler();
  $con->connect();
  $con->beginTransaction();
  $arrayResponse=array();
  $activity= new Activity($con->getConexion());
  if($_REQUEST['hIdActivity']){
    $idActividad=$_REQUEST['hIdActivity'];
    $activity->set_idActividad($idActividad);
    $activity->pubf_DeleteSinglePageActivity();
    $con->commit();
    array_push($arrayResponse, array('success' => 'true', 'error' => 'false'));
  }


  header('Content-Type: application/json');
  echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
