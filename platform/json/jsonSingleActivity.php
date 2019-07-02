<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');
$idTema=$_REQUEST['idTema'];
$sqlQuery="   select
                  t1.idModulo,
                  t1.nombre as nombreCurso,
                  t2.idTema,
                  t2.nombre as nombreTema,
                  t2.temaPadre as plantilla,
                  t3.idActividad,
                  t3.strPregunta,
                  t3.strTemplate as plantillaActividad,
                  t3.intPage as numPag,
                  t3.intValor as valorPreg,
                  (SELECT count(distinct(st1.intPage))
                   FROM actividad st1 where st1.idTema={$idTema}
                  ) as 'totalPages'
                from modulos t1
                left join temas t2 on t1.idModulo=t2.idModulo
                left join actividad t3 on t3.idTema=t2.idTema
                left join actividadrespuesta t4 on t4.idActividad=t3.idActividad
                where t2.idTema={$idTema}
                group by t3.strPregunta,t4.idActividad
                order by t3.intPage,t3.idActividad
              ";

$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
$arrayResponse=array();
  foreach($data as $row){
    $answersArr=$con->selectAllQuery("SELECT t2.idRespuesta,
                                            t2.strRespuesta,
                                            t2.intValorRespuesta as 'valorRes',
                                            t2.intCorrecta as correcta
                                     FROM actividadrespuesta t1
                                     LEFT JOIN respuesta t2 on t1.idRespuesta=t2.idRespuesta
                                     WHERE t1.idActividad={$row->idActividad}
                                   ");

  	$arrayData['idModulo'] = $row->idModulo;
  	$arrayData['nombreCurso'] = $row->nombreCurso;
    $arrayData['idTema'] = $row->idTema;
  	$arrayData['nombreTema'] = $row->nombreTema;
    $arrayData['plantilla'] = $row->plantilla;
    $arrayData['idActividad'] = $row->idActividad;
    $arrayData['strPregunta'] = $row->strPregunta;
    $arrayData['plantillaActividad'] = $row->plantillaActividad;
    $arrayData['numPag'] = $row->numPag;
    $arrayData['valorPreg'] = $row->valorPreg;
    $arrayData['respuestasArr'] = $answersArr;
    $arrayData['totalPages'] = $row->totalPages;
  	$arrayResponse[] = $arrayData;
  }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
