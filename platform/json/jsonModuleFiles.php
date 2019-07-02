<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');

$idModulo=$_REQUEST['idModulo'];
$sqlQuery="
                select
                      t1.idArchivosPorCurso,
                      t1.idTema,
                      t1.strArchivo,
                      t1.strNombreArchivo
                FROM `archivosporcurso` t1
                left join temas t2 on t1.idTema=t2.idTema
                where t2.idModulo={$idModulo}
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
