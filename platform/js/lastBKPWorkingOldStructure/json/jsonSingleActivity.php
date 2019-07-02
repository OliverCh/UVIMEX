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
                  t1.idCurso,
                  t1.nombre as nombreCurso,
                  t2.idTema,
                  t2.nombre as nombreTema,
                  t2.temaPadre as plantilla,
                  t3.idActividad,
                  t3.strPregunta,
                  t3.strTemplate as plantillaActividad,
                  t3.intPage as numPag,
                  t3.intValor as valorPreg,
                  t5.idRespuesta,
                  t5.strRespuesta,
                  (SELECT count(distinct(st1.intPage))
                   FROM actividad st1 where st1.idTema={$idTema}
                  ) as 'totalPages'
                from cursos t1
                left join temas t2 on t1.idCurso=t2.idCurso
                left join actividad t3 on t3.idTema=t2.idTema
                left join actividadrespuesta t4 on t4.idActividad=t3.idActividad
                left join respuesta t5 on t5.idRespuesta=t4.idRespuesta
                where t2.idTema={$idTema}
                order by t3.intPage,t3.idActividad
              ";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
  	$arrayData['idCurso'] = $row->idCurso;
  	$arrayData['nombreCurso'] = $row->nombreCurso;
    $arrayData['idTema'] = $row->idTema;
  	$arrayData['nombreTema'] = $row->nombreTema;
    $arrayData['plantilla'] = $row->plantilla;
    $arrayData['idActividad'] = $row->idActividad;
    $arrayData['strPregunta'] = $row->strPregunta;
    $arrayData['plantillaActividad'] = $row->plantillaActividad;
    $arrayData['numPag'] = $row->numPag;
    $arrayData['valorPreg'] = $row->valorPreg;
    $arrayData['idRespuesta'] = $row->idRespuesta;
    $arrayData['strRespuesta'] = $row->strRespuesta;
    $arrayData['totalPages'] = $row->totalPages;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
