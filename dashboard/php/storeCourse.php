<?php

  include_once("dbHandler.php");
  include_once("../classes/clsCourse.php");
  $arrayResponse=array();

try{
    $con = new dbHandler();
    $con->connect();
    $con-> beginTransaction();
    $nombre=$_POST["name"];
    $descripcion=$_POST["desc"];
    $costo=$_POST["cost"];
    $idUsuario=intVal($_POST["idusr"]);
    $idCategoria=intVal($_POST["idCat"]);
    $hIdCurso=$_POST["hIdCurso"];
    $streaming=$_POST['streaming'];
    $urlPortada=$_POST['portrait'];
    $totalCourseTime=$_POST['totalCourseTime'];
    $idCourse=null;
    $duracion=null;//we have to define duration
    $course = new Course($con->getConexion());
    $course->set_nombre($nombre);
    $course->set_descripcion($descripcion);
    $course->set_costo($costo);
    $course->set_idUsuario($idUsuario);
    $course->set_idCategoria($idCategoria);
    $course->set_idStatus(1);//En Edición
    if(isset($_POST['tagsArr'])){
      $strTag="";
      foreach ($_POST['tagsArr'] as $key => $value) {
        $strTag.="{$value}-";
      }
      $course->set_tag($strTag);
    }
    $course->set_streaming($streaming);
    $course->set_duracion($duracion);
    if(isset($_POST["hportrait"]) && $_POST["hportrait"]!="") {
        $course->set_urlPortada($_POST["hportrait"]);
    }else{
      $course->set_urlPortada(null);
    }

    $course->set_totalCourseTime($totalCourseTime);
    //*****
    if($hIdCurso){
      $course->set_idCurso($hIdCurso);
      $course->pubf_EditCourse();
      $idCourse=$hIdCurso;
    }else{
      $course->pubf_SaveCourse();
      $idCourse=$course->lastIdQuery();
    }

    //***store url Portada
      if($_FILES['portrait']['name']!="" && $idUsuario!="" && $idCourse!=""){
          $directoryPortrait="../assets/courseAssets/{$idUsuario}/$idCourse/portraits/";
          /*Starts delete video*/
          if(isset($_POST["hportrait"])){
              $currentFileOnServer=$directoryPortrait.$_POST["hportrait"];
              if($_POST["hportrait"] && file_exists($currentFileOnServer)){
                 unlink($currentFileOnServer);
              }
          }
          //create user's folder where all portraits will be stored
          if(!is_dir("../assets/courseAssets/{$idUsuario}")){   //check if directory exists
              mkdir("../assets/courseAssets/{$idUsuario}", 0755);
          }
          if(!is_dir("../assets/courseAssets/{$idUsuario}/{$idCourse}")){   //check if directory exists
              mkdir("../assets/courseAssets/{$idUsuario}/{$idCourse}", 0755);
          }
          if(!is_dir($directoryPortrait)){   //check if directory exists
              mkdir($directoryPortrait, 0755);
          }
          $file_name =$_FILES['portrait']['name'];
          $file_size =$_FILES['portrait']['size'];
          $file_tmp =$_FILES['portrait']['tmp_name'];
          $file_type=$_FILES['portrait']['type'];
          $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
          $portraitName=time().createToken().'.'.$ext;
          $finalPortraitUrl=$directoryPortrait.$portraitName;
          move_uploaded_file($file_tmp,$finalPortraitUrl);
          $course->set_urlPortada($portraitName);
          $course->set_idCurso($idCourse);
          $course->pubf_EditCourse();
      }
    //saveMandatoryCourses
    if(!empty($_POST['mandatoryArr'])){
      //delete first courses
      $checkExistance=$con->selectAllQuery("select * from cursosobligatorios where idCurso={$idCourse}");
      $mandatoryCourse = new Course($con->getConexion());
      foreach ($checkExistance as $key => $value) {
        $mandatoryCourse->pubf_DeleteMandatoryCourse($idCourse,$value->idCursoHijo);
      }
      //ends deleting
      //add new selected
      foreach ($_POST['mandatoryArr'] as $key => $value) {
        if($value){
           $mandatoryCourse->pubf_SaveMandatoryCourse($idCourse,$value);
        }
      }
    }
    $con->commit();

    array_push($arrayResponse, array('success' => 'true', 'error' => 'false', 'idCurso' =>  $idCourse));
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);

  }catch(Exception $e){
    array_push($arrayResponse, array('success' => 'false', 'error' => 'true', 'idCurso' =>  '','errorM' => $e->getMessage()));
    $con->rollback();
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
  }
?>
