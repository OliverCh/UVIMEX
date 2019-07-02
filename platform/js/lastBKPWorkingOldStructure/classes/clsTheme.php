<?php
class Theme extends dbHandler{

	public $idTema = "";
	public $idCurso = "";
	public $nombre = "";
	public $temaPadre = "";

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }

	//idTema
	function set_idTema($par_idTema)
	{$this->idTema = $par_idTema;}

	function get_idTema()
	{return $this->idTema;}

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
  //temaPadre
  function set_temaPadre($par_temaPadre)
	{$this->temaPadre = $par_temaPadre;}

	function get_temaPadre()
	{return $this->temaPadre;}


	//Cargar (Select ALL)
	function pubf_LoadTheme($idTema)
	{
		$strSQLoadTheme= $this->selectQuery("select * from temas where idTema={$idTema}");
				 $this->idTema =  $strSQLoadTheme->idTema;
				 $this->idCurso = $strSQLoadTheme->idCurso;
				 $this->nombre =  $strSQLoadTheme->nombre;
				 $this->temaPadre = $strSQLoadTheme->temaPadre;
	}
	//GUARDAR (INSERT)
	function pubf_SaveTheme()
	{
    $strSQLSaveTheme= $this->prepare("INSERT INTO temas (idCurso, nombre,temaPadre) VALUES (:idCurso, :nombre,:temaPadre)");
    $strSQLSaveTheme->bindParam(':idCurso' , $this->idCurso);
    $strSQLSaveTheme->bindParam(':nombre' , $this->nombre);
    $strSQLSaveTheme->bindParam(':temaPadre' , $this->temaPadre);

    $this->executeQueryPrepare($strSQLSaveTheme);
	}

	//Editar (EDIT)
	function pubf_EditTheme()
	{
		$strSQLEditTheme= $this->prepare("UPDATE temas SET idCurso=:idCurso, nombre=:nombre, temapadre=:temaPadre where idTema=:idTema");
		$strSQLEditTheme->bindParam(':idCurso' , $this->idCurso);
		$strSQLEditTheme->bindParam(':nombre' , $this->nombre);
		$strSQLEditTheme->bindParam(':temaPadre' , $this->temaPadre);
		$strSQLEditTheme->bindParam(':idTema' , $this->idTema);

		$this->executeQueryPrepare($strSQLEditTheme);
	}

	//Editar (EDIT)
	function pubf_EditThemeTemplate(){
		$strSQLEditTheme= $this->prepare("UPDATE temas SET temapadre=:temaPadre where idTema=:idTema");
		$strSQLEditTheme->bindParam(':temaPadre' , $this->temaPadre);
		$strSQLEditTheme->bindParam(':idTema' , $this->idTema);

		$this->executeQueryPrepare($strSQLEditTheme);
	}

	function pubf_DeleteTheme(){
		$strSQLDeleteTheme= $this->prepare("DELETE FROM temas where idTema=:idTema");
    $strSQLDeleteTheme->bindParam(':idTema' , $this->idTema);

		$this->executeQueryPrepare($strSQLDeleteTheme);
	}



}
