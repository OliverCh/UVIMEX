<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');
$arrayData= array();
if(isset($_GET['idModulo']) && $_GET['idModulo'] ){
    foreach ($_GET['arrCourses'] as $key => $value) {
      $currentCourseArr =$con->selectQuery("SELECT
                                                  t1.idCurso AS 'idC',
                                                  t1.nombre AS 'nombreCurso',
                                                  t1.descripcion AS 'descripcionCurso',
                                                  t1.idUsuario AS 'idAuth',
                                                  t1.urlPortada,
                                                  t2.nombre AS 'nombreModulo',
                                                  t3.idwordpressUvimex,
                                                  t2.idModulo,
                                                  t2.url
                                                  FROM cursos t1
                                                  JOIN modulos t2
                                                  ON t1.idCurso=t2.idCurso
                                                  LEFT JOIN wordpressUvimex t3
                                                  on t3.idCurso=t1.idCurso
                                                  WHERE t3.idCursoWP={$value["post_id"]}
                                                  and t2.idModulo={$_GET['idModulo']}
                                                  ORDER BY t1.idCurso desc                                                ;
                                               ");
      if($currentCourseArr){
        foreach ($currentCourseArr as $key => $course) {
          $arrayData['idC']=$currentCourseArr->idC;
          $arrayData['courseName']=$currentCourseArr->nombreCurso;
          $arrayData['descripcionCurso']=$currentCourseArr->descripcionCurso;
          $arrayData['idAuth']=$currentCourseArr->idAuth;
          $arrayData['authorName']=$value["author"];
          $arrayData['nameModule1']=$currentCourseArr->nombreModulo;
          $arrayData['urlModule1']=$currentCourseArr->url;
          $arrayData['idModulo']=$currentCourseArr->idModulo;
          $arrayData['idwordpressUvimex']=$currentCourseArr->idwordpressUvimex;
          $arrayData['urlPortada']=$currentCourseArr->urlPortada;
        }
       $arrayResponse[] = $arrayData;
      }
    }
    if(isset($_GET['user']) && $_GET['user'] && empty($currentCourseArr)){
      $isUserRequestingCreator =$con->selectQuery(" SELECT
                                                    t1.idCurso,
                                                    t1.idUsuario
                                                    FROM cursos t1
                                                    JOIN modulos t2
                                                    ON t1.idCurso=t2.idCurso
                                                    WHERE t1.idUsuario={$_GET['user']}
                                                    and t2.idModulo={$_GET['idModulo']}
                                                    ORDER BY t1.idCurso desc
                                                 ");
      $arrayData['userCreatorDetected']= $isUserRequestingCreator && $isUserRequestingCreator->idUsuario ? 'HasAccess' :'Denied';
      $arrayResponse[] = $arrayData;
     }
  echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
}




?>
