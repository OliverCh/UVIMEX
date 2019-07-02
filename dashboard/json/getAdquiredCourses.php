<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
$con->executeQuery('SET NAMES utf8');
$arrayResponse= array();
foreach ($_GET['coursesArray'] as $key => $value) {
  $currentCourseArr =$con->selectAllQuery("SELECT
                                                t1.idCurso AS 'idC',
                                                t1.nombre AS 'nombreCurso',
                                                t1.descripcion AS 'descripcionCurso',
                                                t1.idUsuario AS 'idAuth',
                                                t1.urlPortada,
                                                t2.nombre AS 'nombreModulo',
                                                t3.idwordpressUvimex,
                                                t2.url
                                                FROM cursos t1
                                                JOIN modulos t2
                                                ON t1.idCurso=t2.idCurso
                                                LEFT JOIN wordpressUvimex t3
                                                on t3.idCurso=t1.idCurso
                                                WHERE t3.idCursoWP={$value["post_id"]}
                                                GROUP BY t1.idCurso
                                                ORDER BY t1.idCurso desc                                                ;
                                             ");
   $currentUser=$_GET['user'];
   $courseStatus=null;  // 0 -> not started, 1 on course, 2 finished.
   $isCourseDone=null;//query that will get executed to check if course its done
   foreach ($currentCourseArr as $key => $course) {
     $folderUrl="../../platform/seenTopics/{$currentUser}";
     $dir="{$folderUrl}/{$course->idC}";
     if (!is_dir($dir) || is_dir_empty($dir)) { //check if course has been started
       $courseStatus=0;
     }else{
       $totalThemesPerCourse=$con->selectQuery("SELECT COUNT(idTema) as totalThemes
                                                FROM cursos t1
                                                JOIN modulos t2
                                                  ON t1.idCurso=t2.idCurso
                                                JOIN temas t3
                                                  ON t2.idModulo=t3.idModulo
                                                WHERE t1.idCurso={$course->idC}");
       $totalFilesInDirectory =iterator_count(new FilesystemIterator($folderUrl, FilesystemIterator::SKIP_DOTS) ); //count number of files inside directory
       $courseStatus=$totalThemesPerCourse->totalThemes==$totalFilesInDirectory ? 2 : 1;
     }
     $arrayData['courseStatus']=$courseStatus;
     $arrayData['idC']=$course->idC;
     $arrayData['courseName']=$course->nombreCurso;
     $arrayData['descripcionCurso']=$course->descripcionCurso;
     $arrayData['idAuth']=$course->idAuth;
     $arrayData['authorName']=$value["author"];
     $arrayData['nameModule1']=$course->nombreModulo;
     $arrayData['urlModule1']=$course->url;
     $arrayData['idwordpressUvimex']=$course->idwordpressUvimex;
     $arrayData['urlPortada']=$course->urlPortada;
   }
  $arrayResponse[] = $arrayData;
}

function is_dir_empty($dir) {
  if (!is_readable($dir)) return NULL;
  return (count(scandir($dir)) == 2);
}
// function is_dir_empty($dir) {
//     foreach (new DirectoryIterator($dir) as $fileInfo) {
//         if($fileInfo->isDot()) continue;
//         return false;
//     }
//     return true;
// }

echo json_encode($arrayResponse, JSON_PRETTY_PRINT);


?>