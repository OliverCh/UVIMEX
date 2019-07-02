<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');
$idModulo=$_REQUEST['idModulo'] ? $_REQUEST['idModulo'] : $con->selectQuery("select idModulo from temas where idTema={$_REQUEST['idTema']}")->idModulo;
$sqlQuery="
                select
                      idTema,
                      idModulo,
                      nombre,
                      temaPadre
                from temas
                where idModulo={$idModulo}
              ";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
  	$arrayData['idTema'] = $row->idTema;
  	$arrayData['idModulo'] = $row->idModulo;
  	$arrayData['nombre'] = $row->nombre;
  	$arrayData['temaPadre'] = $row->temaPadre;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
