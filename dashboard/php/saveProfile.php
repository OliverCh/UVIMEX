<?php

  include_once("dbHandler.php");
  include_once("../classes/clsUser.php");
  $arrayResponse=array();

try{
    $con = new dbHandler();
    $con->connect();
    $con-> beginTransaction();
    $nombre=$_POST["name"];
    $phone=$_POST["phone"];
    $address=$_POST["address"];
    $idUsuario=$_POST["userIdWP"];
    $bday=$_POST["bday"];
    $email=$_POST["email"];
    $user = new User($con->getConexion());
    //check if user exist on table that will depend if we update or we insert
    $user->pubf_LoadUser($idUsuario);
    $hidUser=null;
    if($user->idUserWordpress){
      $hidUser=$user->idUserWordpress;
    }
    $user->set_birthday($bday);
    $user->set_address($address);
    $user->set_phone($phone);
    $user->set_idUserWordpress($idUsuario);
    if($_FILES['profileImg']['name']!="" && $idUsuario!=""){
        $file_name =$_FILES['profileImg']['name'];
        $file_size =$_FILES['profileImg']['size'];
        $file_tmp =$_FILES['profileImg']['tmp_name'];
        $file_type=$_FILES['profileImg']['type'];
        $ext = strtolower(pathinfo($file_name, PATHINFO_EXTENSION));
        if(!is_dir("../assets/courseAssets/{$idUsuario}")){   //check if directory exists
            mkdir("../assets/courseAssets/{$idUsuario}", 0755);
        }
        if(!is_dir("../assets/courseAssets/{$idUsuario}/userProfile")){   //check if directory exists
            mkdir("../assets/courseAssets/{$idUsuario}/userProfile", 0755);
        }
        $currentFileOnServer="../assets/courseAssets/{$idUsuario}/userProfile/{$_POST["hprofileImg"]}";
        if( isset($_POST["hprofileImg"]) && $_POST["hprofileImg"]!=""  && $_POST["hprofileImg"] && file_exists($currentFileOnServer)){
           unlink($currentFileOnServer);
        }
        $urlImg=time().$idUsuario.".".$ext;
        $user->set_urlProfileImage($urlImg);
        $finalProfiletUrl="../assets/courseAssets/{$idUsuario}/userProfile/{$urlImg}";
        move_uploaded_file($file_tmp,$finalProfiletUrl);
    }else{
        $user->set_urlProfileImage($_POST["hprofileImg"]);
    }

    //*****
    if($hidUser){
      $user->pubf_EditUser();      
    }else{
      $user->pubf_SaveUser();
    }
    $con->commit();

    array_push($arrayResponse, array('success' => 'true', 'error' => 'false', 'idUsuario' =>  $idUsuario));
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);

  }catch(Exception $e){
    array_push($arrayResponse, array('success' => 'false', 'error' => 'true', 'idCurso' =>  '','errorM' => $e->getMessage()));
    $con->rollback();
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
  }
?>
