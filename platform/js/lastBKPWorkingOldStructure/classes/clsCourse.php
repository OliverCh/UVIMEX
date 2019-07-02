<?php
class Course extends dbHandler{

	public $idCurso = "";
	public $nombre = "";
  public $descripcion = "";
	public $costo = "";
	public $idUsuario = "";

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }


  //idCurso
  function set_idCurso($par_idCurso)
	{$this->idCurso = $par_idCurso;}

	function get_idCurso()
	{return $this->idCurso;}
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


	//Load Single Course (INSERT)
	function pubf_LoadCourse($idCurso)
	{
		$strSQLoadCourse= $this->selectQuery("select * from cursos where idCurso={$idCurso}");
				 $this->idCurso = $strSQLoadCourse->idCurso;
				 $this->nombre = $strSQLoadCourse->nombre;
				 $this->descripcion = $strSQLoadCourse->descripcion;
				 $this->costo = $strSQLoadCourse->costo;
				 $this->idUsuario = $strSQLoadCourse->idUsuario;
	}

	function pubf_SaveCourse()
	{
    $strSQLSaveTheme= $this->prepare("INSERT INTO cursos (nombre,descripcion,costo,idUsuario) VALUES (:nombre,:descripcion,:costo,:idUsuario)");
    $strSQLSaveTheme->bindParam(':nombre' , $this->nombre);
    $strSQLSaveTheme->bindParam(':descripcion' , $this->descripcion);
    $strSQLSaveTheme->bindParam(':costo' , $this->costo);
		$strSQLSaveTheme->bindParam(':idUsuario' , $this->idUsuario);

    $this->executeQueryPrepare($strSQLSaveTheme);
	}

	function pubf_EditCourse()
	{
		$strSQLEditCourse= $this->prepare("UPDATE cursos SET idCurso=:idCurso, nombre=:nombre, descripcion=:descripcion, costo:costo where idCurso=:idCurso");
		$strSQLEditCourse->bindParam(':idCurso' , $this->idCurso);
		$strSQLEditCourse->bindParam(':nombre' , $this->nombre);
		$strSQLEditCourse->bindParam(':descripcion' , $this->descripcion);
		$strSQLEditCourse->bindParam(':costo' , $this->costo);

		$this->executeQueryPrepare($strSQLEditCourse);
	}

	function pubf_DeleteCourse(){
		$strSQLDeleteCourse= $this->prepare("DELETE FROM cursos where idCurso=:idCurso");
    $strSQLDeleteCourse->bindParam(':idCurso' , $this->idCurso);

		$this->executeQueryPrepare($strSQLDeleteCourse);
	}



}
