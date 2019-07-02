<?php
#ini_set('display_errors', 1);ini_set('display_startup_errors', 1);error_reporting(E_ALL);

	include_once("login.php");
	include_once("reg.php");
	include_once("CreateCourse.php");
	include_once("UpdateCourse.php");
	include_once("GetDiaps.php");
	include_once("GetCourses.php");
	include_once("UpdateCourseInfo.php");
	
	switch ($_POST["action"]) {
		case 'login':
			echo createFolder($_POST["data"]);
			break;

		case 'registro':
			echo createFolder($_POST["data"]);
			break;

		case 'crearCurso':
			echo createCourse($_POST["data"]);
			break;	
		case 'guardarCurso':
			echo updateCourse($_POST["data"]);
			break;
		case 'getDiaps':
			echo getDiaps($_POST["data"]);
			break;
		case 'getCourses':
			echo getCourses($_POST["data"]);
			break;
		case 'updateInfo':
			echo updateCourseInfo($_POST["data"]);
			break;
		default:
			echo "not defined";
			echo $_POST["data"];
			break;
	}
?>