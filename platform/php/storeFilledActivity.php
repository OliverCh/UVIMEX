<?php

include_once("dbHandler.php");
include_once("../classes/clsActivity.php");
include_once("../classes/clsActivityAnswer.php");
include_once("../classes/clsAnswer.php");
include_once("../classes/clsTheme.php");
  $con = new dbHandler();
  $con->connect();
  $con-> beginTransaction();

  $theme= new Theme($con->getConexion());
  $activity= new Activity($con->getConexion());
  $answer= new Answer($con->getConexion());
  $activityAnswer= new ActivityAnswer($con->getConexion());
  $idActividad="";
  foreach ($_REQUEST["belongerActivity"] as $key => $value) {
    if(isset($_REQUEST["question{$value}"]) &&  $_REQUEST["question{$value}"] ){
      foreach($_REQUEST["question{$value}"] as $key2 => $val){
        if( ($val && $val != "") &&  ( (isset($_REQUEST["qValue{$key}"][$key2]) && $_REQUEST["qValue{$key}"][$key2]!="") || (isset($_REQUEST["rValue{$key}"][$key2]) && $_REQUEST["rValue{$key}"][$key2]!=""))) {
          /*We save questions first*/
            switch($_REQUEST['templateActivity']){
              case 'actividad3':
                $activity->set_idTema($_REQUEST["idTemaActivity"]);
                $activity->set_strPregunta(utf8_decode($val));
                $activity->set_strTemplate($_REQUEST["templateActivity"]);
                $activity->set_intPage($value);
                $activity->set_intValor($_REQUEST["qValue{$key}"][$key2]);
              break;
              case 'actividad5':
                $activity->set_idTema($_REQUEST["idTemaActivity"]);
                $activity->set_strPregunta(utf8_decode($val));
                $activity->set_strTemplate($_REQUEST["templateActivity"]);
                $activity->set_intPage($value);
                $activity->set_intValor(null);
              case 'actividad1':
              case 'actividad2':
              case 'actividad6':
              $activity->set_idTema($_REQUEST["idTemaActivity"]);
              $activity->set_strPregunta(utf8_decode($val));
              $activity->set_strTemplate($_REQUEST["templateActivity"]);
              $activity->set_intPage($value);
              $activity->set_intValor( isset($_REQUEST["qValue{$key}"][$key2]) && $_REQUEST["qValue{$key}"][$key2]!="" ? $_REQUEST["qValue{$key}"][$key2] : null);
              break;
            }
          if(isset($_REQUEST["hIdActivity{$value}"][$key2]) && $_REQUEST["hIdActivity{$value}"][$key2] !="" ){
            //echo "entro el valor={$_REQUEST["hIdActivity{$value}"][$key2]}";
            $activity->pubf_EditActivity($_REQUEST["hIdActivity{$value}"][$key2]);
            $idActividad= $_REQUEST["hIdActivity{$value}"][$key2];
          }else{
            $activity->pubf_SaveActivity();
            $idActividad=$activity->lastIdQuery();
          }

          /*Save Answers */
          switch($_REQUEST['templateActivity']){
            //case 'actividad2':
              // $activity->set_idTema($_REQUEST["idTemaActivity"]);
              // $activity->set_strPregunta(utf8_decode($val));
              // $activity->set_strTemplate($_REQUEST["templateActivity"]);
              // $activity->set_intPage($value);
              // $activity->set_intValor($_REQUEST["qValue{$key}"][$key2]);
            //break;
            case 'actividad1':
            case 'actividad2':
            case 'actividad5':
            case 'actividad6':
              //*answer**//
              if( (isset($_REQUEST["respuesta{$key}"]) && !empty($_REQUEST["respuesta{$key}"])) ){
                  foreach ($_REQUEST["respuesta{$key}"][$key2] as $keyR2 => $valueR2) {
                    $answer->set_strRespuesta($valueR2);
                    $answer->set_intValorRespuesta( isset($_REQUEST["rValue{$key}"][$key2][$keyR2]) && $_REQUEST["rValue{$key}"][$key2][$keyR2]!="" ? $_REQUEST["rValue{$key}"][$key2][$keyR2] : null);
                    $answer->set_intCorrecta( isset($_REQUEST["rSelected{$key}"][$key2][$keyR2]) ? $_REQUEST["rSelected{$key}"][$key2][$keyR2] : null);
                    if(isset($_REQUEST["hidRespuesta{$key}"][$key2][$keyR2]) && $_REQUEST["hidRespuesta{$key}"][$key2][$keyR2]!=""){
                       $answer->idRespuesta=$_REQUEST["hidRespuesta{$key}"][$key2][$keyR2];
                       $answer->pubf_EditAnswer();
                    }else{
                        $answer->pubf_SaveAnswer();
                    }

                     $idanswer=$answer->lastIdQuery() ? $answer->lastIdQuery() : $answer->idRespuesta;
                    // //store relationship ActivityAnswer
                    $activityAnswer->pubf_LoadActivityAnswer($idActividad,$idanswer);
                    if(!$activityAnswer->idActividad){
                      $activityAnswer->set_idActividad($idActividad);
                      $activityAnswer->set_idRespuesta($idanswer);
                      $activityAnswer->pubf_SaveActivityAnswer();
                    }
                  }
              }
            break;

          }
        }
      }
    }
  }

    $arrayResponse=array();
    array_push($arrayResponse, array('success' => 'true', 'error' => 'false', 'idActividad' =>  $idActividad));
    header('Content-Type: application/json');
    echo json_encode($arrayResponse, JSON_PRETTY_PRINT);

 $con->commit();
?>
