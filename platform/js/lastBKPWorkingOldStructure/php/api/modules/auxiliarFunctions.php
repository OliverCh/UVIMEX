<?php
	function random_str($length, $keyspace = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'){
		$pieces = [];
		$max = mb_strlen($keyspace, '8bit') - 1;
		for ($i = 0; $i < $length; ++$i) {
			$pieces []= $keyspace[random_int(0, $max)];
		}
		return implode('', $pieces);
	}

	function checkBool($string){
		$string = strtolower($string);
		return (in_array($string, array("true", "false", "1", "0", "yes", "no"), true));
	}

	function loadTable($table, $loc){
		switch ($loc) {
				case 'table7':
					if($table == 'catAeropuerto'){
						$tbID = $GLOBALS['dbH']->getTableId("aeropuerto");
						$selectValues = array();
						$selectValues[] = array('key' => 'aeropuerto.idAeropuerto');
						$selectValues[] = array('key' => 'aeropuerto.nombre');
						$selectValues[] = array('key' => 'aeropuerto.descripcion');
						$selectValues[] = array('key' => 'aeropuerto.ubicacion');						
						$selectValues[] = array('key' => "ciudad.nombre AS 'ciudad'");
						$selectValues[] = array('key' => "estado.nombre AS 'estado'");

						$joinValues = array();
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'ciudad', 'col1' => 'idCiudad', 'col2' => 'idCiudad');
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'estado', 'table2' => 'ciudad', 'col1' => 'idEstado', 'col2' => 'idEstado');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID, $joinValues);
						echo json_encode($result);
					}
					break;
				case 'table2':
					if($table == 'catComisiones'){
						$tbID = $GLOBALS['dbH']->getTableId("comisiones");
						$selectValues = array();
						$selectValues[] = array('key' => '*');
						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID);
						echo json_encode($result);
					}
					break;
				case 'table3':
					if($table == 'catTarifas'){
						$tbID = $GLOBALS['dbH']->getTableId("traifas");
						$selectValues = array();
						$selects = $_GET['keys'];
						$selectValues[] = array('key' => $selects);
						$selectValues[] = array('key' => 'tipo', 'value' => 1);
						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID);
						echo json_encode($result);
					}
					break;
				case 'table4':
					if($table == 'catServicios'){
						$tbID = $GLOBALS['dbH']->getTableId("tiposervicio");
						$selectValues = array();
						$selectValues[] = array('key' => '*');
						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID);
						echo json_encode($result);
					}
					break;
				case 'table5':
					if($table == 'catTC'){
						$tbID = $GLOBALS['dbH']->getTableId("monedastc");
						$selectValues = array();
						$selectValues[] = array('key' => 'monedasTC.idMTC');
						$selectValues[] = array('key' => 'monedasTC.moneda');
						$selectValues[] = array('key' => 'monedasTC.simbolo');
						$selectValues[] = array('key' => 'monedasTC.tc');
						$selectValues[] = array('key' => "pais.nombre AS 'pais'");

						$joinValues = array();
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'pais', 'col1' => 'idPais', 'col2' => 'idPais');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID, $joinValues);
						echo json_encode($result);
					}
					break;
				case 'table6':
					if($table == 'catZona'){
						$tbID = $GLOBALS['dbH']->getTableId("zona");
						$selectValues = array();
						$selectValues[] = array('key' => 'zona.idZona');
						$selectValues[] = array('key' => 'zona.nombre');
						$selectValues[] = array('key' => "aeropuerto.nombre AS 'aeropuerto'");
						$selectValues[] = array('key' => "ciudad.nombre AS 'ciudad'");

						$joinValues = array();
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'aeropuerto', 'col1' => 'idAeropuerto', 'col2' => 'idAeropuerto');
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'ciudad', 'col1' => 'idCiudad', 'col2' => 'idCiudad', 'table2' => 'aeropuerto');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID, $joinValues);
						echo json_encode($result);
					}
					break;
				case 'table9':
					if($table == 'catEstado'){
						$tbID = $GLOBALS['dbH']->getTableId("estado");
						$selectValues = array();
						$selectValues[] = array('key' => 'estado.idEstado');
						$selectValues[] = array('key' => 'estado.nombre');
						$selectValues[] = array('key' => 'estado.codigo');
						$selectValues[] = array('key' => "pais.nombre AS 'pais'");

						$joinValues = array();
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'pais', 'col1' => 'idPais', 'col2' => 'idPais');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID, $joinValues);
						echo json_encode($result);
					}
					break;
				case 'table8':
					if($table == 'catPaises'){
						$tbID = $GLOBALS['dbH']->getTableId("pais");
						$selectValues = array();
						$selectValues[] = array('key' => '*');
						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID);
						echo json_encode($result);
					}
				break;
				case 'table10':
					if($table == 'catCiudades'){
						$tbID = $GLOBALS['dbH']->getTableId("ciudad");
						$selectValues = array();
						$selectValues[] = array('key' => 'ciudad.idCiudad');
						$selectValues[] = array('key' => 'ciudad.nombre');						
						$selectValues[] = array('key' => "pais.nombre AS 'pais'");
						$selectValues[] = array('key' => "estado.nombre AS 'estado'");

						$joinValues = array();
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'estado', 'col1' => 'idEstado', 'col2' => 'idEstado');
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'pais', 'table2' => 'estado', 'col1' => 'idPais', 'col2' => 'idPais');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID, $joinValues);
						echo json_encode($result);					
					}
					break;
				case 'table11':
					if($table == 'catGrupos'){
						$tbID = $GLOBALS['dbH']->getTableId("groups_tb");
						$selectValues = array();
						$selectValues[] = array('key' => 'grou_id');
						$selectValues[] = array('key' => 'grou_name');
						$selectValues[] = array('key' => 'grou_description');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID);
						echo json_encode($result);					
					}
					break;
				case 'table12':
					if($table == 'catEmpleados'){
						$tbID = $GLOBALS['dbH']->getTableId("employee_tb");
						$selectValues = array();
						$selectValues[] = array('key' => 'employee_tb.empl_id');
						$selectValues[] = array('key' => 'employee_tb.empl_name');
						$selectValues[] = array('key' => 'employee_tb.empl_lastname');
						$selectValues[] = array('key' => 'groups_tb.grou_name');
						

						$joinValues = array();
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'groups_tb', 'col1' => 'empl_group_id', 'col2' => 'grou_id');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID, $joinValues);
						echo json_encode($result);					
					}
					break;
				case 'table13':
					if($table == 'catUsuarios'){
						$tbID = $GLOBALS['dbH']->getTableId("users_tb");
						$selectValues = array();
						$selectValues[] = array('key' => 'employee_tb.empl_name AS "nombre"');
						$selectValues[] = array('key' => 'users_tb.user_username');
						$selectValues[] = array('key' => 'users_tb.user_id');
						

						$joinValues = array();
						$joinValues[] = array('type' => 'INNER JOIN', 'table' => 'employee_tb', 'col1' => 'user_employee_id', 'col2' => 'empl_id');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID, $joinValues);
						echo json_encode($result);					
					}				
					break;
				case 'table14':
					if($table == 'catPerfiles'){
						$tbSections = $GLOBALS['dbH']->getTableId("menu");
						$tbID = $GLOBALS['dbH']->getTableId("perfiles");
						$tbActions = $GLOBALS['dbH']->getTableId("acciones");

						$selectValues = array();
						$selectValues[] = array('key' => '*');

						$result = $GLOBALS['dbH']->createSelect($selectValues, $tbID);

						$sections = $GLOBALS['dbH']->createSelect($selectValues, $tbSections);

						$actions = $GLOBALS['dbH']->createSelect($selectValues, $tbActions);

						$ret = array();
						$ret['perfiles'] = $result;
						$ret['secciones'] = $sections;
						$ret['acciones'] = $actions;

						echo json_encode($ret);
					}
					break;
				default:
					header('HTTP/1.1 400 Bad request');
					break;
			}
	}

	function getIDinfo($table, $id){
		$idCol = $GLOBALS['dbH']->getIdCol($table);
		$selectValues = array();
		$selectValues[] = array('key' => '*');
		$selectValues[] = array('key' => $idCol, 'value' => $_GET['id']);

		$result = $GLOBALS['dbH']->createSelect($selectValues, $table);
		$result = $result[0];
		unset($result[$idCol]);
		echo json_encode($result);	
	}
?>