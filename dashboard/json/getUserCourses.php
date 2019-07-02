<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');
if($_GET['idUsr']!=1){
  $sqlQuery=" select t1.*,
              t2.idStatus,
              t2.strStatus,
              t3.url
              from cursos t1
              join statuscurso t2 on t1.idStatus=t2.idStatus
              left join modulos t3 on t1.idCurso=t3.idCurso
              where t1.idUsuario ={$_GET['idUsr']}
              group by t1.idCurso
            ";
}else{
  $sqlQuery=" select t1.*,t2.*
              from cursos t1
              join statuscurso t2 on t1.idStatus=t2.idStatus
            ";
}

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
foreach($data as $row){
	$arrayData['idCurso'] = $row->idCurso;
	$arrayData['nombre'] = $row->nombre;
  $arrayData['descripcion'] = $row->descripcion;
	$arrayData['costo'] = $row->costo;
  $arrayData['idStatusCurso'] = $row->idStatus;
  $arrayData['statusCurso'] = $row->strStatus;
  $arrayData['idUsuario'] = $row->idUsuario;
  $arrayData['idCategoria'] = $row->idCategoria;
  $arrTag = explode('-',trim($row->tag));
  $arrTag=array_diff($arrTag, array(''));
  $arrayData['tags'] = $arrTag;
  $arrayData['urlCurso'] = ($row->url);
  $arrayData['urlPortada'] = ($row->urlPortada);
  $arrayData['streaming'] = $row->streaming;
  $arrayData['duracion'] = $row->duracion;
  $arrayData['idcursobl'] = $row->idcursobl;
  $arrayData['idCursoHijo'] = $row->idCursoHijo;
	$arrayResponse[] = $arrayData;
}

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
