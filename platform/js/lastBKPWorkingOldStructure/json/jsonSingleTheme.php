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
                  t1.idTema,
                  t1.idCurso,
                  t1.nombre,
                  t1.temaPadre,
                  t2.idContenido,
                  t2.contenido,
                  t2.video,
                  t2.audio,
                  t2.titulo,
                  t2.subtitulo,
                  t2.orden,
                  t3.idImg,
                  t3.idContenido as idContenidoPadreImg,
                  t3.url,
                  t3.tiempo
                from temas t1
                left join contenido t2 on t1.idTema=t2.idTema
                left join imagenes t3 on t3.idContenido=t2.idContenido
                where t1.idTema={$idTema}
              ";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
  	$arrayData['idTema'] = $row->idTema;
  	$arrayData['idCurso'] = $row->idCurso;
  	$arrayData['nombre'] = $row->nombre;
  	$arrayData['temaPadre'] = $row->temaPadre;
    $arrayData['idContenido'] = $row->idContenido;
    $arrayData['contenido'] = $row->contenido;
    $arrayData['video'] = $row->video;
    $arrayData['audio'] = $row->audio;
    $arrayData['titulo'] = $row->titulo;
    $arrayData['subtitulo'] = $row->subtitulo;
    $arrayData['orden'] = $row->orden;
    $arrayData['idImg'] = $row->idImg;
    $arrayData['idContenidoPadreImg'] = $row->idContenidoPadreImg;
    $arrayData['url'] = $row->url;
    $arrayData['tiempo'] = $row->tiempo;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
