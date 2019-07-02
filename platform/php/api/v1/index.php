<?php
	include_once "../core/config.php";
	include_once __CORE__.'\db\dbHandler.php';
	include_once __CORE__.'\core.php';
/*
	$insertValues = json_decode('["0",{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"}]', true);

	$selectValues = json_decode('["1",{"key":"key","value":"value"},{"key":"key","value":"value"},{"key":"key"},{"key":"key"},{"key":"key"}]', true);

	$updateValues = json_decode('["1",{"key":"key","value":"value"},{"key":"key","constraint":"value"},{"key":"key","value":"value"},{"key":"key","value":"value"}]', true);
	
	

	##insert y delete
	$insertTable = $insertValues[0];
	unset($insertValues[0]);	
	$dbHandler->createInsert($insertValues, $insertTable);

	$dbHandler->createDelete($insertValues, $insertTable);

	##select

	$selectTable = $selectValues[0];
	unset($selectValues[0]);
	$dbHandler->createSelect($selectValues, $selectTable);

	##update
	$updateTable = $updateValues[0];
	unset($updateValues[0]);
	$dbHandler->createUpdate($updateValues, $updateTable);
*/
	$app = new core();
	$dbHandler = new dbHandler();
	$GLOBALS['dbH'] = $dbHandler;
	$app->get('test', false, function(){
		echo "is it working?";
		echo "yes it is";
	});

	$app->post('tables', true, function(){
		$insertValues = $_POST['load'];
		$insertTable = $insertValues[0];
		unset($insertValues[0]);
		$GLOBALS['dbH']->createInsert($insertValues, $insertTable);

		echo json_encode(array('newID' => $GLOBALS['dbH']->getInsertID()));
	});

	$app->get('tables', true, function(){
		$origin = explode("/", $_SERVER['HTTP_REFERER']);
		switch ($origin[count($origin) - 1]) {
			case 'table1.html':
				echo json_encode(array('tbID' => $GLOBALS['dbH']->getTableId("cliente_provedor")));
				break;
			default:
				header('HTTP/1.1 400 Bad request');
				break;
		}
	});

	$app->start();
?>