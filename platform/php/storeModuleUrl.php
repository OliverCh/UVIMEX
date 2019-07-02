<?php
  include_once("dbHandler.php");
  include_once("../classes/clsModule.php");
  include_once("../classes/clsCourse.php");
  displayPhpErrors();
try{
    $con = new dbHandler();
    $con->connect();
    $con-> beginTransaction();
    //get idCurso
    $idCurso=new Module($con->getConexion());
    $idCurso->pubf_LoadModule($_POST["idModulo"]);
    $course = new Course($con->getConexion());
    $course->set_idCurso($idCurso->idCurso);
    $course->set_idStatus(2);
    $course->pubf_EditCourseStatus();
    $module = new Module($con->getConexion());
    $module->set_idModulo($_POST["idModulo"]);
    $url="idmodule='{$_POST['idModulo']}'";
    $module->set_url($url);
    $module->pubf_SaveUrl();
    $arrayResponse=array();
    $con->commit();
    array_push($arrayResponse, array('success' => 'true', 'error' => 'false', 'idModulo' =>  $_POST["idModulo"]));
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);

  }catch(Exception $e){
    array_push($arrayResponse, array('success' => 'false', 'error' => 'true', 'idContenido' =>  $_POST["idModulo"]));
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
  }
?>
