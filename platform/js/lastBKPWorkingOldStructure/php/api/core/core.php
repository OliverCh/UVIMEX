<?php
	class core{

		private $endpointsGet = array();
		private $endpointsPost = array();

		public function __construct(){
			header("Access-Control-Allow-Origin: *");
			header("Access-Control-Max-Age: 3600");
			header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
			header("Content-Type: application/json; charset=UTF-8");
			header("Access-Control-Allow-Methods: POST, PUT, DELETE, GET");
		}

		private function validateAuth(){
			$headers = apache_request_headers();
			if(isset($headers['Authorization'])){
					///validate AUTH
			}
			else{
				header('HTTP/1.1 401 Need Authorization');	
			}
		}

		private function executeGet($endp, $body){
			if(array_key_exists($endp[0], $this->endpointsGet)){
				if($this->endpointsGet[$endp[0]][1]){
					$this->validateAuth();
				}
				$func = $this->endpointsGet[$endp[0]][0];
				call_user_func_array($func, (($body) ? $body : array()));
			}
			else{
				header('HTTP/1.1 404 Endpoint not found');	
			}
		}

		private function executePost($endp, $body){
			if(array_key_exists($endp[0], $this->endpointsPost)){
				if($this->endpointsPost[$endp[0]][1]){
					$this->validateAuth();
				}
				$func = $this->endpointsPost[$endp[0]][0];
				call_user_func_array($func, (($body) ? $body : array()));
			}
			else{
				header('HTTP/1.1 404 Endpoint not found');	
			}
		}

		public function get($path, $auth, $fn){
			$this->endpointsGet[$path] = array($fn, $auth);
		}

		public function post($path, $auth, $fn){
			$this->endpointsPost[$path] = array($fn, $auth);
		}

		public function start(){
			$method = $_SERVER['REQUEST_METHOD'];
			$request = explode('/', trim($_SERVER['PATH_INFO'],'/'));
			$input = json_decode(file_get_contents('php://input'),true);
			switch($method){
				case 'POST':
					$this->executePost($request, $_POST);
				break;
				case 'DELETE':
					//$this->delete_contact($name);
				break;
				case 'GET':
					$this->executeGet($request, $input);
				break;
				default:
					header('HTTP/1.1 405 Method not allowed');
				break;
			}
		}
	}
?>