<?php
session_start();
header('Content-Type: application/json');
include_once("../php/dbHandler.php");

$con = new dbHandler();
$con->connect();
if($_GET["user"]){
  $usrId=$_GET["user"];
  $sqlQuery=" SELECT
              idUser,
              birthday,
              address,
              phone,
              urlProfileImage,
              idUserWordpress
              FROM users
              WHERE idUserWordpress={$usrId}
            ";
  $data=$con->selectQuery($sqlQuery);
  $arrayData= array();
    $arrayData['idUser'] = $data->idUser;
    $arrayData['birthday'] = $data->birthday;
    $arrayData['address'] = $data->address;
    $arrayData['phone'] = $data->phone;
    $arrayData['urlProfileImage'] = $data->urlProfileImage;
    $arrayData['idUserWordpress'] = $data->idUserWordpress;
    $arrayResponse[] = $arrayData;

  echo json_encode($arrayResponse, JSON_PRETTY_PRINT);
}
?>
