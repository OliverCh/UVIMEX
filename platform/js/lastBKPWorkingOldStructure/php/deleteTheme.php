<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsImage.php");
include_once("../classes/clsContent.php");
include_once("../classes/clsTheme.php");
include_once("../classes/clsCourse.php");
include_once("../classes/clsCourseFiles.php");
include_once("../classes/clsActivity.php");

$con = new dbHandler();
$con->connect();
$con-> beginTransaction();
if($_REQUEST['hIdTema']){
  $idTema=$_REQUEST['hIdTema'];
  $theme = new Theme($con->getConexion());
  $directoryImg="../uploads/images/";
  $directoryVideo="../uploads/videos/";
  $directoryAudio="../uploads/audio/";
  $themesArray = $con->selectAllQuery("select
                                              t1.idTema,
                                              t2.audio,
                                              t2.video,
                                              t2.contenido,
                                              t2.idContenido,
                                              t3.idActividad
                                        from temas t1
                                        left join contenido t2 on t1.idTema=t2.idTema
                                        left join actividad t3 on t1.idTema=t3.idTema
                                        where t1.idTema={$idTema}");

  foreach ($themesArray as $row) {
    if($row->idContenido){
        $arrayImages=$con->selectAllQuery("select * from imagenes where idContenido={$row->idContenido}");
        $content = new Content($con->getConexion());
        $activity = new Activity($con->getConexion());
        $content->set_idContenido($row->idContenido);
        //delete images
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
      //delete videos
        if($row->video){
          $currentVideoOnServer=$directoryVideo.$row->video;
          if(file_exists($currentVideoOnServer)){
            unlink($currentVideoOnServer);
            $content->pubf_DeleteContent();
          }
        }
      //delete audios
        if($row->audio){
          $currentAudioOnServer=$directoryAudio.$row->audio;
          if(file_exists($currentAudioOnServer)){
            unlink($currentAudioOnServer);
            $content->pubf_DeleteContent();
          }
        }
      //delete text
        if($row->contenido){
          $currentAudioOnServer=$directoryAudio.$row->audio;
          $content->pubf_DeleteContent();
        }
        //delete activity
        if($row->idActividad){
          $activity->set_idTema($row->idTema);
          $activity->pubf_DeleteActivity();
        }
      //delete theme
        $theme->set_idTema($row->idTema);
        $theme->pubf_DeleteTheme();
    }else{
      if($row->idTema){
        //delete theme
          $theme->set_idTema($row->idTema);
          $theme->pubf_DeleteTheme();
      }
    }
  }
}
$con->commit();

?>
