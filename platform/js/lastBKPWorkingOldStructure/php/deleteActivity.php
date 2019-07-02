<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsActivity.php");

$con = new dbHandler();
$con->connect();
$con-> beginTransaction();
if($_REQUEST['hIdTema']){
  $idTema=$_REQUEST['hIdTema'];
  $activity = new Activity($con->getConexion());
  $activity->set_idTema($idTema);
  $activity->pubf_DeleteActivity();
}

$con->commit();

$arrayResponse=array();
array_push($arrayResponse, array('success' => 'true', 'error' => 'false'));
header('Content-Type: application/json');
echo json_encode($arrayResponse, JSON_PRETTY_PRINT);

?>
