<?php
session_start();

include_once("../php/dbHandler.php");
$con = new dbHandler();
$con->connect();
$sqlQuery=" select t1.*,
            t2.idCategoria,
            t2.strCategoria,
            t2.status as statusCategory,
            t3.idStatus,
            t3.strStatus
            from cursos t1
            join categoria t2 on t1.idCategoria=t2.idCategoria
            join statuscurso t3 on t3.idStatus=t1.idStatus
            where t1.idCurso ={$_GET['idCurso']}
          ";
$data=$con->selectAllQuery($sqlQuery);
$arrayResponse=[];
$arrayData= array();
foreach($data as $row){
	$arrayData['idCurso'] = $row->idCurso;
	$arrayData['nombre'] = ($row->nombre);
  $arrayData['descripcion'] = ($row->descripcion);
	$arrayData['costo'] = $row->costo;
  $arrayData['idUsuario'] = $row->idUsuario;
  $arrayData['idStatusCurso'] = $row->idStatus;
  $arrayData['statusCurso'] = $row->strStatus;
  $arrTag = explode('-',trim($row->tag));
  $arrTag=array_diff($arrTag, array(''));
  $arrayData['tags'] = $arrTag;
  $arrayData['streaming'] = $row->streaming;
  $arrayData['duracion'] = $row->duracion;
  $arrayData['idCategoria'] = $row->idCategoria;
  $arrayData['strCategoria'] = ($row->strCategoria);
  $arrayData['urlPortada'] = ($row->urlPortada);
  $arrayData['totalCourseTime'] = ($row->totalCourseTime);
  $arrayData['mandatoryCourses'] = $con->selectAllQuery("SELECT
                                                         t2.idcursosobligatorios,
                                                         t2.idCurso,
                                                         t1.nombre as 'parentC',
                                                         t2.idCursoHijo,
                                                         t3.nombre as 'childC'
                                                         FROM cursos t1
                                                         JOIN cursosobligatorios t2 on t1.idcurso=t2.idcurso
                                                         JOIN cursos t3 on t2.idcursoHijo=t3.idcurso
                                                         WHERE t1.idCurso={$_GET['idCurso']}"
                                                       );
                                       // uncomment when fields are added to DB
                                    $totalACtivities=  $con->selectQuery("SELECT
                                                                           count(t3.idTema) as 'totalActivities'
                                                                           FROM cursos t1
                                                                           JOIN modulos t2 on t1.idCurso=t2.idCurso
                                                                           JOIN temas t3 on t2.idModulo=t3.idModulo
                                                                           WHERE t1.idCurso={$_GET['idCurso']}
                                                                           AND t3.temaPadre='template3'
                                                                           AND t1.idUsuario={$_GET['idUsuario']}
                                                                           ;"
                                                      );
   $arrayData['totalActivities'] =$totalACtivities->totalActivities;
   $arrayData['modulesFromCourse']= $con->selectAllQuery("SELECT
                                                                 t1.idModulo,
                                                                 t1.nombre as moduleName,
                                                                 t2.idTema,
                                                                 t2.nombre as themeName,
                                                                 t1.idUsuario,
                                                                 t1.url,
                                                                 t1.idCurso
                                                           FROM modulos t1
                                                           LEFT JOIN temas t2 on t1.idModulo=t2.idModulo
                                                           WHERE t1.idCurso={$_GET['idCurso']}
                                                           AND t1.idUsuario={$_GET['idUsuario']}
                                                           AND t1.url is not null
                                                           order by t1.idModulo;
                                                         ");
                                                         $totalCourseMedia=$con->selectQuery("SELECT
                                                                                             round(SUM(t3.duracion)/60,2) AS totalTime
                                                                                             FROM modulos t1
                                                                                             JOIN temas t2 on t1.idModulo=t2.idModulo
                                                                                             JOIN contenido t3 on t3.idTema=t2.idTema
                                                                                             WHERE t1.idCurso={$_GET['idCurso']}
                                                                                             AND t1.idUsuario={$_GET['idUsuario']}
                                                                                           ");
                                                         $arrayData['totalCourseMedia']= $totalCourseMedia->totalTime;
	$arrayResponse[] = $arrayData;
}
header('Content-Type: application/json');
echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
?>
