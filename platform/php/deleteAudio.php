<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsImage.php");
include_once("../classes/clsContent.php");

$con = new dbHandler();
$con->connect();
$con-> beginTransaction();
if($_REQUEST['hIdContenido']){
  $directoryImg="../uploads/images/";
  $arrayImages=$con->selectAllQuery("select * from imagenes where idContenido={$_REQUEST['hIdContenido']}");
  if($arrayImages && !empty($arrayImages)){
      foreach ($arrayImages as $key => $value) {
        $image = new Image($con->getConexion());
        $image->set_idImg($value->idImg);
        $currentImgOnServer=$directoryImg.$value->idImg;
        if($value->idImg && file_exists($currentImgOnServer)){
           unlink($currentImgOnServer);
           $image->pubf_DeleteImage();
        }
      }
  }

  $directoryVideo="../uploads/audio/";
  $content = new Content($con->getConexion());
  $content->set_idContenido($_REQUEST['hIdContenido']);
  $currentVideoOnServer=$directoryVideo.$_REQUEST['hIdAudio'];
  if($_REQUEST['hIdAudio'] && file_exists($currentVideoOnServer)){
    $content->pubf_DeleteContent();

  }
}
$con->commit();

?>
