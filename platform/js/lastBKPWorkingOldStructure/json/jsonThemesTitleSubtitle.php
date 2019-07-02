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
              t1.idCurso,
              t1.idTema,
              t1.nombre as nombreTema,
              t1.temaPadre,
              t2.titulo,
              t2.subtitulo
              from temas t1
              left join contenido t2 on t1.idTema=t2.idTema
              where t1.idCurso={$idCurso} group by t1.idTema;
              ";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
  	$arrayData['idCurso'] = $row->idCurso;
    $arrayData['idTema'] = $row->idTema;
  	$arrayData['nombreTema'] = $row->nombreTema;
  	$arrayData['temaPadre'] = $row->temaPadre;
    $arrayData['titulo'] = $row->titulo;
    $arrayData['subtitulo'] = $row->subtitulo;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
