<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');

$idModulo=$_REQUEST['idModulo'] ? $_REQUEST['idModulo'] : $con->selectQuery("select idModulo from temas where idTema={$_REQUEST['idTema']}")->idModulo;
$sqlQuery="
            SELECT t3.idModulo,
                   t3.nombre,
                   t3.url
            FROM  cursos t1
            JOIN modulos t2 ON t1.idCurso=t2.idCurso and t2.idModulo={$idModulo}
            JOIN modulos t3 ON t3.idCurso=t2.idCurso;
";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
  	$arrayData['idModulo'] = $row->idModulo;
    $arrayData['nombreModulo'] = $row->nombre;
  	$arrayData['url'] = $row->url;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
