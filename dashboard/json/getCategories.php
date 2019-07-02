<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');

$sqlQuery=" select t1.idCategoria,
            t1.strCategoria,
            t1.status
            from categoria t1
          ";
$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
foreach($data as $row){
	$arrayData['idC'] = $row->idCategoria;
	$arrayData['nombreCat'] = $row->strCategoria;
  $arrayData['status'] = $row->status;
	$arrayResponse[] = $arrayData;
}

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
