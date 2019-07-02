<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsContent.php");
include_once("../classes/clsTheme.php");
include_once("../classes/clsImage.php");
include_once("../classes/clsCourseFiles.php");
  $con = new dbHandler();
  $con->connect();
  $con-> beginTransaction();

    $content= new Content($con->getConexion());
    $theme= new Theme($con->getConexion());
    $image= new Image($con->getConexion());
    $courseFile= new CourseFiles($con->getConexion());
    $idContenido="";
    $idContenidoResponse="";
    $videosArray=array();
    $imagesArray=array();
    $audioArray=array();
    if($_REQUEST['idTema']){
      $theme->pubf_LoadTheme($_REQUEST['idTema']);
      $content->pubf_LoadContent($_REQUEST['idTema']);
    }

    $idContenido= $content->idContenido ? $content->idContenido: "";

    //Stores the template that user selected
    if(isset($_REQUEST['temaPadre'])){
     $theme->set_temaPadre($_REQUEST['temaPadre']);
     $theme->pubf_EditThemeTemplate();
    }
    //Stores Theme
    if(isset($_REQUEST['idTema'])){
     $content->set_idTema(intval($_REQUEST['idTema']));
    }
    //Stores  Title
    if(isset($_REQUEST['title'])){
      $content->set_titulo(utf8_decode($_REQUEST['title']));
    }
    //stores Subtitle
    if(isset($_REQUEST['subtitle'])){
      $content->set_subtitulo(utf8_decode($_REQUEST['subtitle']));
    }
    //stores Content Description
    if(isset($_REQUEST['descripcionCurso'])){
      $content->set_contenido(utf8_decode($_REQUEST['descripcionCurso']));
    }



      //if goes inside the conditional means its only text
    if( (!isset($_FILES['video'])) && (!isset($_FILES['audio'])) && isset($_REQUEST['descripcionCurso']) ){
        if($content->idTema && $content->idContenido){
          $content->pubf_EditContent();
          $idContenidoResponse=$content->idTema;

        }else{

          $content->pubf_SaveContent();
          $idContenido=$content->lastIdQuery();
          $idContenidoResponse=$idContenido;
        }
    }
    //Saving multimedia functions
    // echo "el idContenido=".$idContenido;
         // // print_object($_REQUEST);

    //[insert-Edit videos or videos+images]
        // echo 'entro a video';
        $directoryVideos="../uploads/videos/";
        if(!empty($_REQUEST['belonger']) && ($_REQUEST['temaPadre']=="template0" || $_REQUEST['temaPadre']=="template1")){
          foreach($_REQUEST['belonger'] as $llave => $key){
              $hidContenido=null;
              $idContenido=null;
                //INSERT-UPDATE VIDEO
              if(isset($_FILES['video']['name'][$key]) && !empty($_FILES['video']['name'][$key])){
                  if($_FILES['video']['name'][$key]!=""){
                      /*Starts delete video*/
                      if(isset($_REQUEST["hvideo"][$key])){
                          $currentFileOnServer=$directoryVideos.$_REQUEST["hvideo"][$key];
                          if($_REQUEST["hvideo"][$key] && file_exists($currentFileOnServer)){
                             unlink($currentFileOnServer);
                             $hidContenido=$_REQUEST["hidContenido"][$key];
                          }
                      }
                      /*Ends delete video*/
                      $file_name = $key.$_FILES['video']['name'][$key];
                      $file_size =$_FILES['video']['size'][$key];
                      $file_tmp =$_FILES['video']['tmp_name'][$key];
                      $file_type=$_FILES['video']['type'][$key];
                      $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
                      $fileName=time().createToken().'.'.$ext;
                      $finalUrl=$directoryVideos.$fileName;
                      $newdata = array ( 'file_name' => $file_name, 'file_size' => $file_size, 'file_tmp' => $file_tmp, 'file_type' => $file_type, 'file_ext' => $ext, 'save_Dir' => $directoryVideos, 'fileNameServer' => $fileName );
                      array_push($videosArray,$newdata);
                      move_uploaded_file($file_tmp,$finalUrl);
                      $content->set_video($fileName);
                      $content->set_orden($_REQUEST['orden'][$key]);
                      // // print_object($content);
                      if($hidContenido){
                        $content->set_idContenido($hidContenido);
                        $content->pubf_EditContent();
                        $idContenidoResponse=$hidContenido;
                      }else{

                        $content->pubf_SaveContent();
                        $idContenido=$content->lastIdQuery();
                        $idContenidoResponse=$idContenido;
                        //echo "el idContenido es".$idContenido;
                      }
                  }
              }else{
                    //Only for edit
                    if(isset($_REQUEST['orden'][$key])){
                      $content->set_orden($_REQUEST['orden'][$key]);
                      $content->set_idContenido($_REQUEST["hidContenido"][$key]);
                      $idContenidoResponse=$_REQUEST["hidContenido"][$key];
                      $content->pubf_EditContent();
                    }

              }

                      //****Store imgs related to video******
                        // echo "el id contenido es".$idContenido;
                          $directoryImg="../uploads/images/";
                      if(isset($_FILES["img{$key}"])) {
                              foreach($_FILES["img{$key}"][ 'tmp_name' ] as $key2 => $value){
                                  $hidImg=NULL;
                                  if( isset($_FILES["img{$key}"]['name'][$key2]) && !empty($_FILES["img{$key}"]['name'][$key2]) ) {
                                      if($_FILES["img{$key}"]['name'][$key2]!=""){
                                          if(isset($_REQUEST["hurl{$key}"][$key2])){
                                            //echo 'el valor es '.$_REQUEST["hurl{$key}"][$key2];
                                              $currentFileOnServer=$directoryImg.$_REQUEST["hurl{$key}"][$key2];
                                              /*Starts delete video*/
                                              if($_REQUEST["hurl{$key}"][$key2] && file_exists($currentFileOnServer)){
                                                   unlink($currentFileOnServer);
                                                   $hidImg=$_REQUEST["hidImg{$key}"][$key2];
                                              }
                                          }
                                          /*Ends delete video*/
                                          $idContenido=($idContenido && $idContenido!="") ? $idContenido: (isset($_REQUEST["hidContenido"][$key]) ? $_REQUEST["hidContenido"][$key]:'a ninguno')  ;
                                          $file_name = $key2.'_'.$_FILES["img{$key}"]['name'][$key2];
                                          $file_size =$_FILES["img{$key}"]['size'][$key2];
                                          $file_tmp =$_FILES["img{$key}"]['tmp_name'][$key2];
                                          $file_type=$_FILES["img{$key}"]['type'][$key2];
                                          $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
                                          $fileName=time().createToken().'.'.$ext;
                                          $finalUrl=$directoryImg.$fileName;
                                          move_uploaded_file($file_tmp,$finalUrl);

                                          $image->set_idContenido($idContenido);
                                          $image->set_url($fileName);
                                          $tiempo=isset($_REQUEST["minutes{$key}"][$key2]) && $_REQUEST["minutes{$key}"][$key2]!="" ? $_REQUEST["minutes{$key}"][$key2] : 0;
                                          $tiempo.=":";
                                          $tiempo.=isset($_REQUEST["seconds{$key}"][$key2]) && $_REQUEST["seconds{$key}"][$key2]!="" ? $_REQUEST["seconds{$key}"][$key2] : 0;
                                          $image->set_tiempo($tiempo);
                                          if($hidImg){
                                            $image->set_idImg($hidImg);
                                            $image->pubf_EditImage();
                                          }else{
                                            $image->pubf_SaveImage();
                                          }
                                     }
                                    }
                                }
                        }else{
                            //solo editara los tiempos
                            if(isset($_REQUEST["minutes{$key}"])){
                              foreach ($_REQUEST["minutes{$key}"] as $key2 => $value) {
                                $tiempo=isset($_REQUEST["minutes{$key}"][$key2]) && $_REQUEST["minutes{$key}"][$key2]!="" ? $_REQUEST["minutes{$key}"][$key2] : 0;
                                $tiempo.=":";
                                $tiempo.=isset($_REQUEST["seconds{$key}"][$key2]) && $_REQUEST["seconds{$key}"][$key2]!="" ? $_REQUEST["seconds{$key}"][$key2] : 0;
                                $image->set_tiempo($tiempo);
                                $image->set_idImg($_REQUEST["hidImg{$key}"][$key2]);
                                $image->pubf_EditImageTime();
                              }
                            }

                        }

            }

        }


        /*
          Starts code to upload audio + images
        */
        $directoryAudios="../uploads/audio/";
        if(!empty($_REQUEST['belongerAudio']) && ($_REQUEST['temaPadre']=="template3")){
          foreach($_REQUEST['belongerAudio'] as $llave => $key){
              $hidContenido=null;
              $idContenido=null;
                //INSERT-UPDATE AUDIO
              if(isset($_FILES['audio']['name'][$key]) && !empty($_FILES['audio']['name'][$key])){
                  if($_FILES['audio']['name'][$key]!=""){
                      /*Starts delete audio*/
                      if(isset($_REQUEST["haudio"][$key])){
                          $currentFileOnServer=$directoryAudios.$_REQUEST["haudio"][$key];
                          if($_REQUEST["haudio"][$key] && file_exists($currentFileOnServer)){
                             unlink($currentFileOnServer);
                             $hidContenido=$_REQUEST["hidContenido"][$key];
                          }
                      }
                      /*Ends delete audio*/
                      $file_name = $key.$_FILES['audio']['name'][$key];
                      $file_size =$_FILES['audio']['size'][$key];
                      $file_tmp =$_FILES['audio']['tmp_name'][$key];
                      $file_type=$_FILES['audio']['type'][$key];
                      $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
                      $fileName=time().createToken().'.'.$ext;
                      $finalUrl=$directoryAudios.$fileName;
                      $newdata = array ( 'file_name' => $file_name, 'file_size' => $file_size, 'file_tmp' => $file_tmp, 'file_type' => $file_type, 'file_ext' => $ext, 'save_Dir' => $directoryVideos, 'fileNameServer' => $fileName );
                      array_push($videosArray,$newdata);
                      move_uploaded_file($file_tmp,$finalUrl);
                      $content->set_audio($fileName);
                      $content->set_orden($_REQUEST['orden'][$key]);
                      // // print_object($content);
                      if($hidContenido){
                        $content->set_idContenido($hidContenido);
                        $content->pubf_EditContent();
                        $idContenidoResponse=$hidContenido;
                      }else{
                        $content->pubf_SaveContent();
                        $idContenido=$content->lastIdQuery();
                        $idContenidoResponse=$idContenido;
                        //echo "el idContenido es".$idContenido;
                      }
                  }
              }else{
                    //Only for edit
                    if(isset($_REQUEST['orden'][$key])){
                      $content->set_orden($_REQUEST['orden'][$key]);
                      $content->set_idContenido($_REQUEST["hidContenido"][$key]);
                      $idContenidoResponse=$_REQUEST["hidContenido"][$key];
                      $content->pubf_EditContent();
                    }

              }

                      //****Store imgs related to audio*****
                        // echo "el id contenido es".$idContenido;
                          $directoryImg="../uploads/images/";
                           // print_r($_FILES["img{$key}"]);
                      if(isset($_FILES["img{$key}"])){
                              foreach($_FILES["img{$key}"][ 'tmp_name' ] as $key2 => $value){
                                  $hidImg=NULL;
                                  if( isset($_FILES["img{$key}"]['name'][$key2]) && !empty($_FILES["img{$key}"]['name'][$key2]) ) {
                                      if($_FILES["img{$key}"]['name'][$key2]!=""){
                                          if(isset($_REQUEST["hurl{$key}"][$key2])){
                                            //echo 'el valor es '.$_REQUEST["hurl{$key}"][$key2];
                                              $currentFileOnServer=$directoryImg.$_REQUEST["hurl{$key}"][$key2];
                                              /*Starts delete video*/
                                              if($_REQUEST["hurl{$key}"][$key2] && file_exists($currentFileOnServer)){
                                                   unlink($currentFileOnServer);
                                                   $hidImg=$_REQUEST["hidImg{$key}"][$key2];
                                              }
                                          }
                                          /*Ends delete video*/
                                          $idContenido=($idContenido && $idContenido!="") ? $idContenido: (isset($_REQUEST["hidContenido"][$key]) ? $_REQUEST["hidContenido"][$key]:'a ninguno')  ;
                                          $file_name = $key2.'_'.$_FILES["img{$key}"]['name'][$key2];
                                          $file_size =$_FILES["img{$key}"]['size'][$key2];
                                          $file_tmp =$_FILES["img{$key}"]['tmp_name'][$key2];
                                          $file_type=$_FILES["img{$key}"]['type'][$key2];
                                          $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
                                          $fileName=time().createToken().'.'.$ext;
                                          $finalUrl=$directoryImg.$fileName;
                                          move_uploaded_file($file_tmp,$finalUrl);

                                          $image->set_idContenido($idContenido);
                                          $image->set_url($fileName);
                                          $tiempo=isset($_REQUEST["minutes{$key}"][$key2]) && $_REQUEST["minutes{$key}"][$key2]!="" ? $_REQUEST["minutes{$key}"][$key2] : 0;
                                          $tiempo.=":";
                                          $tiempo.=isset($_REQUEST["seconds{$key}"][$key2]) && $_REQUEST["seconds{$key}"][$key2]!="" ? $_REQUEST["seconds{$key}"][$key2] : 0;
                                          $image->set_tiempo($tiempo);
                                          if($hidImg){
                                            $image->set_idImg($hidImg);
                                            $image->pubf_EditImage();
                                          }else{
                                            $image->pubf_SaveImage();
                                          }
                                     }
                               }
                          }
                      }else{
                            //solo editara los tiempos                              
                            if(isset($_REQUEST["minutes{$key}"])){
                              foreach ($_REQUEST["minutes{$key}"] as $key2 => $value) {
                                $tiempo=isset($_REQUEST["minutes{$key}"][$key2]) && $_REQUEST["minutes{$key}"][$key2]!="" ? $_REQUEST["minutes{$key}"][$key2] : 0;
                                $tiempo.=":";
                                $tiempo.=isset($_REQUEST["seconds{$key}"][$key2]) && $_REQUEST["seconds{$key}"][$key2]!="" ? $_REQUEST["seconds{$key}"][$key2] : 0;
                                $image->set_tiempo($tiempo);
                                $image->set_idImg($_REQUEST["hidImg{$key}"][$key2]);
                                $image->pubf_EditImageTime();
                              }
                            }

                      }

            }

        }
        /*Ends code to upload audio + images*/

        //upload template 2
        if(!empty($_REQUEST['belonger']) && ($_REQUEST['temaPadre']=="template2")){
          foreach($_REQUEST['belonger'] as $llave => $key){
              $hidContenido=null;
              $idContenido=null;
                //INSERT-UPDATE VIDEO
              if(isset($_FILES['video']['name'][$key]) && !empty($_FILES['video']['name'][$key])){
                /*Starts delete video*/
                if(isset($_REQUEST["hvideo"][$key])){
                    $currentFileOnServer=$directoryVideos.$_REQUEST["hvideo"][$key];
                    if($_REQUEST["hvideo"][$key] && file_exists($currentFileOnServer)){
                       unlink($currentFileOnServer);
                       $hidContenido=$_REQUEST["hidContenido"][$key];
                    }
                }
                /*Ends delete video*/
                $file_name = $key.$_FILES['video']['name'][$key];
                $file_size =$_FILES['video']['size'][$key];
                $file_tmp =$_FILES['video']['tmp_name'][$key];
                $file_type=$_FILES['video']['type'][$key];
                $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
                $fileName=time().createToken().'.'.$ext;
                $finalUrl=$directoryVideos.$fileName;
                $newdata = array ( 'file_name' => $file_name, 'file_size' => $file_size, 'file_tmp' => $file_tmp, 'file_type' => $file_type, 'file_ext' => $ext, 'save_Dir' => $directoryVideos, 'fileNameServer' => $fileName );
                array_push($videosArray,$newdata);
                move_uploaded_file($file_tmp,$finalUrl);
                $content->set_video($fileName);
                $content->set_orden($_REQUEST['orden'][$key]);
                // // print_object($content);
                if($hidContenido){
                  $content->set_idContenido($hidContenido);
                  $content->pubf_EditContent();
                  $idContenidoResponse=$hidContenido;
                }else{
                  $content->pubf_SaveContent();
                  $idContenido=$content->lastIdQuery();
                  $idContenidoResponse=$idContenido;
                  //echo "el idContenido es".$idContenido;
                }
              }
          }
        }




    if(isset($_FILES['archivo'])){
        /*create if needed first folder*/
        $directoryCourseFiles = "../uploads/{$theme->idTema}";
        if(!is_dir($directoryCourseFiles)){
            mkdir($directoryCourseFiles, 0755);
        }
        /*create if needed second folder*/
        $directoryCourseFiles = "../uploads/{$theme->idTema}/Files";
        if(!is_dir($directoryCourseFiles)){
            mkdir($directoryCourseFiles, 0755);
        }
        $directoryCourseFiles.="/";
        foreach($_FILES['archivo']['tmp_name'] as $key => $tmp_name)
        {
          $hIdArchivosPorCurso=null;
            if($_FILES['archivo']['name'][$key]!=""){
              /*Starts delete video*/
              if(isset($_REQUEST["hIdArchivosPorCurso"][$key])){
                  $currentFileOnServer=$directoryCourseFiles.$_REQUEST["hstrArchivo"][$key];
                  if($_REQUEST["hIdArchivosPorCurso"][$key] && file_exists($currentFileOnServer)){
                     unlink($currentFileOnServer);
                     $hIdArchivosPorCurso=$_REQUEST["hIdArchivosPorCurso"][$key];
                  }
              }
              /*Ends delete video*/

                $file_name = $key.$_FILES['archivo']['name'][$key];
                $file_size =$_FILES['archivo']['size'][$key];
                $file_tmp =$_FILES['archivo']['tmp_name'][$key];
                $file_type=$_FILES['archivo']['type'][$key];
                $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
                $fileName=time().createToken().".".$ext;
                $finalUrl=$directoryCourseFiles.$fileName;
                move_uploaded_file($file_tmp,$finalUrl);
                $courseFile->set_strArchivo($fileName);
                $courseFile->set_strNombreArchivo($_REQUEST['strNombreArchivo'][$key]);
                $courseFile->set_idTema($theme->idTema);
                if($hIdArchivosPorCurso){
                  $courseFile->set_idArchivosPorCurso($hIdArchivosPorCurso);
                  $courseFile->pubf_UpdateCourseFiles();
                }else{
                    $courseFile->pubf_SaveCourseFiles();
                }

            }
        }
    }

    $arrayResponse=array();
    array_push($arrayResponse, array('success' => 'true', 'error' => 'false', 'idContenido' =>  $idContenidoResponse));
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);

 $con->commit();
?>
