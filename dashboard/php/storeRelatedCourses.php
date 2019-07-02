<?php

  include_once("dbHandler.php");
  include_once("../classes/clsCourse.php");
  displayPhpErrors();
    $con = new dbHandler();
    $con->connect();
    $con-> beginTransaction();
    $idCurso=$_POST["hidCursoUv"];
    $idCursoWP=$_POST["idCursoWP"];
    $idWordpressUvimex=$_POST["hidWPUvimex"];

    $course = new Course($con->getConexion());
    $course->set_idCurso($idCurso);
    $course->set_idStatus(3);
    $course->pubf_EditCourseStatus();
    if($idWordpressUvimex!=""){
      pubf_EditRelatedCourses($con,$idWordpressUvimex,$idCurso,$idCursoWP);
    }else{
      pubf_SaveRelatedCourses($con,$idCurso,$idCursoWP);
    }
    $arrayResponse=[];
    if($con->lastIdQuery() !=0 || $idWordpressUvimex!=""){
    array_push($arrayResponse, array('success' => 'true', 'error' => 'false', 'idWPUvimex' =>  $con->lastIdQuery()!=0 ? $con->lastIdQuery() :$idWordpressUvimex));
    $con->commit();
    }else{
      array_push($arrayResponse, array('success' => 'false', 'error' => 'true', 'idWPUvimex' =>  $con->lastIdQuery()));
      $con->rollback();
    }
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);


    function pubf_SaveRelatedCourses($con,$idCurso,$idCursoWP)
  	{
      $strSQLSaveRelatedCourses= $con->dbh->prepare("INSERT INTO wordpressUvimex (idCurso,idCursoWP) VALUES (:idCurso,:idCursoWP)");
      $strSQLSaveRelatedCourses->bindParam(':idCurso' , $idCurso);
      $strSQLSaveRelatedCourses->bindParam(':idCursoWP' , $idCursoWP);

      $con->executeQueryPrepare($strSQLSaveRelatedCourses);
  	}

  	function pubf_EditRelatedCourses($con,$idWordpressUvimex,$idCurso,$idCursoWP)
  	{
  		$strSQLEditRelatedCourses= $con->dbh->prepare("UPDATE wordpressUvimex SET idCurso=:idCurso, idCursoWP=:idCursoWP where idWordpressUvimex=:idWordpressUvimex");
  		$strSQLEditRelatedCourses->bindParam(':idCurso', $idCurso);
  		$strSQLEditRelatedCourses->bindParam(':idCursoWP' , $idCursoWP);
      $strSQLEditRelatedCourses->bindParam(':idWordpressUvimex' , $idWordpressUvimex);

  		$con->executeQueryPrepare($strSQLEditRelatedCourses);
  	}
?>
