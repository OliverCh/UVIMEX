<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');

$idTema=$_REQUEST['idTema'];
$sqlQuery="
                select
                      idArchivosPorCurso,
                      idTema,
                      strArchivo,
                      strNombreArchivo
                from archivosporcurso
                where idTema={$idTema}
              ";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
  	$arrayData['idArchivosPorCurso'] = $row->idArchivosPorCurso;
  	$arrayData['idTema'] = $row->idTema;
  	$arrayData['strArchivo'] = $row->strArchivo;
  	$arrayData['strNombreArchivo'] = $row->strNombreArchivo;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
