<?php

  include_once("dbHandler.php");
  include_once("../classes/clsModule.php");

    $con = new dbHandler();
    $con->connect();
    $con-> beginTransaction();
    $curso = new Module($con->getConexion());
    $curso->set_nombre(utf8_decode($_REQUEST["nombre"]));
    $curso->set_idUsuario($_REQUEST["userId"]);
    $curso->set_idCurso($_REQUEST["idCurso"]);

    $curso->pubf_SaveModule();
    echo $curso->lastIdQuery();
    $con->commit();
?>
