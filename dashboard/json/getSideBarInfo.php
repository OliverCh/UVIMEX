<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");
$con = new dbHandler();
$con->connect();

$sqlQuery=" SELECT
            COUNT(t1.idCurso) AS 'cursosTotales'
            FROM cursos t1
            WHERE t1.idUsuario ={$_GET['idUsr']}
          ";
$data=$con->selectQuery($sqlQuery);
$arrayData= array();
$arrayResponse['cursosTotales'] = $data->cursosTotales;
echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
