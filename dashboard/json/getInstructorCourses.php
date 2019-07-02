<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$arrayResponse=[];
if(isset($_GET['idUser'])) {
  $sqlQuery=" SELECT t1.idCurso FROM wordpressUvimex t1
              JOIN cursos t2
              ON t1.idCurso=t2.idCurso
              WHERE t2.idUsuario={$_GET['idUser']};";
  $data=$con->selectAllQuery($sqlQuery);
  $arrayData= array();
  foreach($data as $row){

  	$arrayData['idCurso'] = $row->idCurso ? $row->idCurso : 'sinCursos';
  	$arrayResponse[] = $arrayData;
  }
  echo json_encode($arrayResponse , JSON_PRETTY_PRINT);
}else{
  exit(0);
}



?>
