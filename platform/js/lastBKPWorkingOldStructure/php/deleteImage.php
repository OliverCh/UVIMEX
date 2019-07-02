<?php
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);
include_once("dbHandler.php");
include_once("../classes/clsImage.php");

$con = new dbHandler();
$con->connect();
$con-> beginTransaction();
$directoryImg="../uploads/images/";
$image = new Image($con->getConexion());
$image->set_idImg($_REQUEST["hidImg"]);
$currentFileOnServer=$directoryImg.$_REQUEST["hurl"];
if($_REQUEST["hurl"] && file_exists($currentFileOnServer)){
     unlink($currentFileOnServer);
     $image->pubf_DeleteImage();
}
$con->commit();
?>
