<?php
class Module extends dbHandler{

	public $idModulo = "";
	public $nombre = "";
  public $descripcion = "";
	public $costo = "";
	public $idUsuario = "";
	public $url = "";
	public $idCurso = "";

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }


  //idModulo
  function set_idModulo($par_idModulo)
	{$this->idModulo = $par_idModulo;}

	function get_idModulo()
	{return $this->idModulo;}
  //nombre
  function set_nombre($par_nombre)
	{$this->nombre = $par_nombre;}

	function get_nombre()
	{return $this->nombre;}
  //descripcion
	function set_descripcion($par_descripcion)
	{$this->descripcion = $par_descripcion;}

	function get_descripcion()
	{return $this->descripcion;}
  //costo
  function set_costo($par_costo)
	{$this->costo = $par_costo;}

	function get_costo()
	{return $this->costo;}

	//idUsuario
	function set_idUsuario($par_idUsuario)
	{$this->idUsuario = $par_idUsuario;}

	function get_idUsuario()
	{return $this->idUsuario;}

	//url
  function set_url($par_url)
	{$this->url = $par_url;}

	function get_url()
	{return $this->url;}

	//idCurso
	function set_idCurso($par_idCurso)
	{$this->idCurso = $par_idCurso;}

	function get_idCurso()
	{return $this->idCurso;}


	//Load Single Module (INSERT)
	function pubf_LoadModule($idModulo)
	{
		$strSQLoadModule= $this->selectQuery("select * from modulos where idModulo={$idModulo}");
				 $this->idModulo = $strSQLoadModule->idModulo;
				 $this->nombre = $strSQLoadModule->nombre;
				 $this->descripcion = $strSQLoadModule->descripcion;
				 $this->costo = $strSQLoadModule->costo;
				 $this->idUsuario = $strSQLoadModule->idUsuario;
				 $this->idCurso = $strSQLoadModule->idCurso;
	}

	function pubf_SaveModule()
	{
		$this->descripcion = $this->descripcion ? $this->descripcion: null;
		$this->costo = $this->costo ? $this->costo : null;
    $strSQLSaveTheme= $this->prepare("INSERT INTO modulos (nombre,descripcion,costo,idUsuario,idCurso) VALUES (:nombre,:descripcion,:costo,:idUsuario,:idCurso)");
    $strSQLSaveTheme->bindParam(':nombre' , $this->nombre);
    $strSQLSaveTheme->bindParam(':descripcion' , $this->descripcion);
    $strSQLSaveTheme->bindParam(':costo' , $this->costo);
		$strSQLSaveTheme->bindParam(':idUsuario' , $this->idUsuario);
		$strSQLSaveTheme->bindParam(':idCurso' , $this->idCurso);

    $this->executeQueryPrepare($strSQLSaveTheme);
	}

	function pubf_EditModule()
	{
		$strSQLEditModule= $this->prepare("UPDATE modulos SET idModulo=:idModulo, nombre=:nombre, descripcion=:descripcion, costo:costo where idModulo=:idModulo");
		$strSQLEditModule->bindParam(':idModulo' , $this->idModulo);
		$strSQLEditModule->bindParam(':nombre' , $this->nombre);
		$strSQLEditModule->bindParam(':descripcion' , $this->descripcion);
		$strSQLEditModule->bindParam(':costo' , $this->costo);

		$this->executeQueryPrepare($strSQLEditModule);
	}

	function pubf_DeleteModule(){
		$strSQLDeleteModule= $this->prepare("DELETE FROM modulos where idModulo=:idModulo");
    $strSQLDeleteModule->bindParam(':idModulo' , $this->idModulo);

		$this->executeQueryPrepare($strSQLDeleteModule);
	}

	function pubf_SaveUrl()
	{
    $strSQLSaveUrl= $this->prepare("UPDATE modulos SET url=:url where idModulo=:idModulo");
    $strSQLSaveUrl->bindParam(':url' , $this->url);
		$strSQLSaveUrl->bindParam(':idModulo' , $this->idModulo);

    $this->executeQueryPrepare($strSQLSaveUrl);
	}


}
