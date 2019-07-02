<?php
 ini_set('display_errors', 1);
 ini_set('display_startup_errors', 1);
 error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsImage.php");
include_once("../classes/clsContent.php");
include_once("../classes/clsTheme.php");
include_once("../classes/clsModule.php");
include_once("../classes/clsCourseFiles.php");

$con = new dbHandler();
$con->connect();
$con-> beginTransaction();
if($_REQUEST['hidModulo']){
  $idModulo=$_REQUEST['hidModulo'];
  $module = new Module($con->getConexion());
  $theme = new Theme($con->getConexion());
  $directoryImg="../uploads/images/";
  $directoryVideo="../uploads/videos/";
  $directoryAudio="../uploads/audio/";
  $themesArray = $con->selectAllQuery(" select
                                        t1.idTema,
                                        t2.audio,
                                        t2.video,
                                        t2.contenido,
                                        t2.idContenido
                                        from temas t1
                                        left join contenido t2 on t1.idTema=t2.idTema
                                        where idModulo={$idModulo}");

  foreach ($themesArray as $row) {
    if($row->idContenido){
        $arrayImages=$con->selectAllQuery("select * from imagenes where idContenido={$row->idContenido}");
        $content = new Content($con->getConexion());
        $content->set_idContenido($row->idContenido);
        //delete images
          if($arrayImages && !empty($arrayImages)){
              foreach ($arrayImages as $key => $value) {
                $image = new Image($con->getConexion());
                $image->set_idImg($value->idImg);
                $currentImgOnServer=$directoryImg.$value->url;
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
  //delete Module
  $module->set_idModulo($idModulo);
  $module->pubf_DeleteModule();

}
$con->commit();

?>
