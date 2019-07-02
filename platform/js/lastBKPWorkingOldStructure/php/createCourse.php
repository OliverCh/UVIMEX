<?php

  include_once("dbHandler.php");
  include_once("../classes/clsCourse.php");

    $con = new dbHandler();
    $con->connect();
    $con-> beginTransaction();
    $curso = new Course($con->getConexion());
    $curso->set_nombre(utf8_decode($_REQUEST["nombre"]));
    $curso->set_descripcion(utf8_decode($_REQUEST["descripcion"]));
    $curso->set_costo($_REQUEST["costo"]);
    $curso->set_idUsuario($_REQUEST["userId"]);

    $curso->pubf_SaveCourse();
    echo $curso->lastIdQuery();
    $con->commit();
?>
