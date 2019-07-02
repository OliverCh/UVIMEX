<?php
class Temas extends dbHandler{
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


	//GUARDAR (INSERT)
	function pubf_GuardarTema()
	{
    $strSQLGuardarTema= $this->prepare("INSERT INTO temas (idCurso, nombre,temaPadre) VALUES (:idCurso, :nombre,:temaPadre)");
    $strSQLGuardarTema->bindParam(':idCurso' , $this->idCurso);
    $strSQLGuardarTema->bindParam(':nombre' , $this->nombre);
    $strSQLGuardarTema->bindParam(':temaPadre' , $this->temaPadre);

    $this->executeQueryPrepare($strSQLGuardarTema);
	}



}
