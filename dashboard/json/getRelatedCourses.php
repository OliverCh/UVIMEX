<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');

$sqlQuery=" SELECT
            t1.idCurso AS 'idC',
            t1.descripcion,
            t1.costo,
            t1.tag,
            t1.totalCoursetime,
            t4.idStatus,
            t4.strStatus,
            t3.idwordpressUvimex,
            t3.idCursoWP,
            t1.nombre AS 'nombreCurso',
            t1.idUsuario AS 'autor',
            t2.nombre AS 'nombreModulo',
            GROUP_CONCAT(t2.url SEPARATOR ', ') as 'urlModulos'
            FROM cursos t1
              JOIN modulos t2
                ON t1.idCurso=t2.IdCurso
              LEFT JOIN wordpressUvimex t3
                ON t3.idCurso=t1.idCurso
              JOIN statuscurso t4
                ON t4.idStatus=t1.idStatus
            WHERE t2.url IS NOT NULL
            GROUP BY t1.idCurso
            ORDER BY t1.idCurso;
          ";
$data=$con->selectAllQuery($sqlQuery);
$arrayData= array();
foreach($data as $row){
	$arrayData['idC'] = $row->idC;
  $arrayData['descripcion'] = $row->descripcion;
  $arrayData['costo'] = $row->costo;
	$arrayData['nombreCurso'] = $row->nombreCurso;
  $arrayData['autor'] = $row->autor;
  $arrayData['nombreModulo'] = $row->nombreModulo;
  $arrayData['urlModulos'] = $row->urlModulos;
  $arrayData['idWPUvimex'] = $row->idwordpressUvimex;
  $arrayData['idCursoWP'] = $row->idCursoWP;
  $arrayData['idStatus'] =$row->idStatus;
  $arrayData['status'] =$row->strStatus;
  $arrayData['tag'] =$row->tag;
  $arrayData['totalCoursetime'] =$row->totalCoursetime;  
	$arrayResponse[] = $arrayData;
}

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
