<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');

$sqlQuery="
                select
                      idCurso,
                      nombre,
                      descripcion,
                      costo,
                      idUsuario
                from cursos
                where idUsuario ={$_REQUEST['userId']}
              ";
$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
foreach($data as $row){
	$arrayData['idCurso'] = $row->idCurso;
	$arrayData['nombre'] = $row->nombre;
  $arrayData['descripcion'] = $row->descripcion;
	$arrayData['costo'] = $row->costo;
	$arrayResponse[] = $arrayData;
}

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
