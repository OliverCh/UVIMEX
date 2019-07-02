<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');

$idCurso=$_REQUEST['idCurso'] ? $_REQUEST['idCurso'] : $con->selectQuery("select idCurso from temas where idTema={$_REQUEST['idTema']}")->idCurso;
$sqlQuery="
                select
                      idTema,
                      idCurso,
                      nombre,
                      temaPadre
                from temas
                where idCurso={$idCurso}
              ";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
  	$arrayData['idTema'] = $row->idTema;
  	$arrayData['idCurso'] = $row->idCurso;
  	$arrayData['nombre'] = $row->nombre;
  	$arrayData['temaPadre'] = $row->temaPadre;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
