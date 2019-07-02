<?php  

include_once "api/core/config.php";
include_once __CORE__.'\db\dbHandler.php';
include_once __CORE__.'\core.php';



$tablas = array('QWER123' => 'cursos' ,'ASD123'=> 'modulos', 'FDFG343'=> 'tema', 'VFG24'=> 'subTema', 'HYF43'=>'multimedia', 'OFGD668'=> 'imagen' );
$selecTable = $_POST['tipo'];
$nombreCurso = $_POST['cursoName'];
$funcion = $_POST['funcion'];
$tabla = $tablas[$_POST['tipo']];
$constraint = $_POST['constraint'];
$idCurso = $_POST['idCurso'];
$dbHandler = new dbHandler();
 

switch (true) {

	case ($funcion == 'update'):
		
			$idTable = $dbHandler->getTableId($tabla);


			$factura[] = array("key"=> "nombre", "value"=> $nombreCurso); 

			$factura[] = array("key"=> "idCurso", "constraint"=> $constraint);

			$insertValues = $factura;
			      
			   echo $nombreCurso;
			$dbHandler->createUpdate($insertValues, $idTable);

			echo json_encode(array('newID' => $dbHandler->getInsertID()));
			return "OK";
				break;

	case ($funcion == 'insert' && $tabla == 'cursos'):
			var_dump($_POST);
			$idTable = $dbHandler->getTableId('cursos');

			$factura[] = array("key"=> "nombre", "value"=> $nombreCurso); 

			$insertValues = $factura;      
			
			
			$dbHandler->createInsert($insertValues, $idTable);

			//echo json_encode(array('newID' => $dbHandler->getInsertID()));
				cargaCursos($tabla);
			return "OK";
					break;

	case ($funcion == 'insert' && $tabla == 'tema'):
			
			$idTable = $dbHandler->getTableId('tema');

			$factura[] = array("key"=> "idCurso", "value"=> $idCurso); 
			$factura[] = array("key"=> "nombre", "value"=> $nombreCurso); 
			$factura[] = array("key"=> "descripcion", "value"=> 'tema1'); 
			$factura[] = array("key"=> "plantilla", "value"=> 1); 

			$insertValues = $factura;      
			
			
			$dbHandler->createInsert($insertValues, $idTable);
 
			//echo json_encode(array('newID' => $dbHandler->getInsertID()));
				cargaCursos($tabla);
			return "OK";
					break;		


	case ($funcion == 'insert' && $tabla == 'multimedia'):

			$idTema = $_POST['tema'];
			$tipoMultimedia = $_POST['multimedia'];
			$url = $_POST['url'];
			$ordenMultimedia = $_POST['orden'];
			$nombreMultimedia = $_POST['nombreMultimedia'];

			var_dump($_POST);
			$idTable = $dbHandler->getTableId('multimedia');

			$factura[] = array("key"=> "idTema", "value"=> $idTema); 
			$factura[] = array("key"=> "tipo", "value"=> $tipoMultimedia); 
			$factura[] = array("key"=> "url", "value"=> 'localhost/instructores/'. '1' . '/files/'. $idTema . '/'.$nombreMultimedia); 
			$factura[] = array("key"=> "orden", "value"=> $ordenMultimedia); 
			$factura[] = array("key"=> "nombre", "value"=> $nombreMultimedia); 

			$insertValues = $factura;      
			
			
			$dbHandler->createInsert($insertValues, $idTable);

			//echo json_encode(array('newID' => $dbHandler->getInsertID()));
				cargaCursos($tabla);
			return "OK";
					break;			
			
	case ($funcion == 'select' && $tabla == 'cursos'):


 		cargaCursos($tabla);

	return 'OK';
	break;

	case ($funcion == 'select' && $tabla == 'tema'):

 		cargaTemas($constraint);

	return 'OK';
	break;

	case ($funcion == 'select' && $tabla == 'multimedia'):

 		cargaMultimedia($constraint);

	return 'OK';
	break;
	default:
		# code...
		break;
}







/*FUNCIONES TEMPORALES*/



 function cargaCursos($tabla){

$cons_usuario="root";
$cons_contra="T{G-1}v1M:D4";
$cons_base_datos="portalCursos";
$cons_equipo="35.202.134.57";

$obj_conexion = mysqli_connect($cons_equipo,$cons_usuario,$cons_contra,$cons_base_datos);
if(!$obj_conexion)
{
    echo "<h3>No se ha podido conectar PHP - MySQL, verifique sus datos.</h3><hr><br>";
}
else
{
    echo "<h3>Conexion Exitosa PHP - MySQL</h3><hr><br>";
}

/* ejemplo de una consulta */

$var_consulta= "select * from ".$tabla ;
$var_resultado = $obj_conexion->query($var_consulta);

if($var_resultado->num_rows>0)
  {


while ($var_fila=$var_resultado->fetch_array())
{
	echo '<option value='.$var_fila["idCurso"].'>'.$var_fila["nombre"].'</option>';
    
    

 }
}
else
  {
    echo "No hay Registros";

  }

}






 function cargaTemas($constraint){

$cons_usuario="root";
$cons_contra="T{G-1}v1M:D4";
$cons_base_datos="portalCursos";
$cons_equipo="35.202.134.57";

$obj_conexion = mysqli_connect($cons_equipo,$cons_usuario,$cons_contra,$cons_base_datos);
if(!$obj_conexion)
{
    echo "<h3>No se ha podido conectar PHP - MySQL, verifique sus datos.</h3><hr><br>";
}
else
{
 //   echo "<h3>Conexion Exitosa PHP - MySQL</h3><hr><br>";
}

/* ejemplo de una consulta */

$var_consulta= "select * from tema where idCurso=".$constraint;
$var_resultado = $obj_conexion->query($var_consulta);

if($var_resultado->num_rows>0)
  {


while ($var_fila=$var_resultado->fetch_array())
{
	
    echo '<div class="den-curso-title" onClick="cargaTmp('.$var_fila["plantilla"].','.$var_fila["noTema"].');" id="titlePantalla_'.$var_fila["noTema"].'" data-tema="'.$var_fila["nombre"].' "><p>'.$var_fila["nombre"].'</p></div>';
    

 }
}
else
  {
    echo "No hay Registros";

  }

}



 function cargaMultimedia($constraint){

$multimedia = array();
$cons_usuario="root";
$cons_contra="T{G-1}v1M:D4";
$cons_base_datos="portalCursos";
$cons_equipo="35.202.134.57";

$obj_conexion = mysqli_connect($cons_equipo,$cons_usuario,$cons_contra,$cons_base_datos);
if(!$obj_conexion)
{
    echo "<h3>No se ha podido conectar PHP - MySQL, verifique sus datos.</h3><hr><br>";
}
else
{
 //   echo "<h3>Conexion Exitosa PHP - MySQL</h3><hr><br>";
}

/* ejemplo de una consulta */

$var_consulta= "select * from multimedia where idTema=".$constraint;
$var_resultado = $obj_conexion->query($var_consulta);

if($var_resultado->num_rows>0)
  {


while ($var_fila=$var_resultado->fetch_array())
{
 
 	$multimedia[] = array("tipo"=> $var_fila["tipo"],"url"=> $var_fila["url"],"nombre"=> $var_fila["nombre"],"orden"=> $var_fila["orden"]);
  
	//echo  $var_fila["url"];
   //var_dump($multimedia);
    

 }
 echo json_encode($multimedia);
}
else
  {
    echo "No hay Registros";

  }

 
}
//$multimedia = json_encode($multimedia);
 

?>
