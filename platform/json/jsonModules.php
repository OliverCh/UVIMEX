<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');
if($_GET['userId'] && $_GET['idCurso']){

$sqlQuery="
                select
                      t1.idCurso,
                      t2.idModulo,
                      t2.nombre,
                      t2.descripcion,
                      t2.costo,
                      t2.idUsuario
                from cursos t1
                join modulos t2 on t1.idCurso=t2.idCurso
                where t2.idUsuario ={$_GET['userId']}
                and t1.idCurso={$_GET['idCurso']}
              ";
$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
foreach($data as $row){
  $arrayData['idCurso'] = $row->idModulo;
	$arrayData['idModulo'] = $row->idModulo;
	$arrayData['nombre'] = $row->nombre;
  $arrayData['descripcion'] = $row->descripcion;
	$arrayData['costo'] = $row->costo;
	$arrayResponse[] = $arrayData;
}

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
}
?>
