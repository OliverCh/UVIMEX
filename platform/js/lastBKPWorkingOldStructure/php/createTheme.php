<?php

  include_once("dbHandler.php");
  include_once("../classes/clsTheme.php");

    $con = new dbHandler();
    $con->connect();
    $con-> beginTransaction();
    $tema = new Theme($con->getConexion());
    $tema->set_idCurso($_REQUEST["idCurso"]);
    $tema->set_nombre(utf8_decode($_REQUEST["cursoName"]));
    $tema->set_temaPadre("unknown");

    $tema->pubf_SaveTheme();
    echo $tema->lastIdQuery();
    $con->commit();


?>
