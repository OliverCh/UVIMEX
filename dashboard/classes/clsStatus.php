<?php
class Status extends dbHandler{

	public $idStatus = "";
	public $strStatus = "";

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }


  //idStatus
  function set_idStatus($par_idStatus)
	{$this->idStatus = $par_idStatus;}

	function get_idStatus()
	{return $this->idStatus;}
  //strStatus
  function set_strStatus($par_strStatus)
	{$this->strStatus = $par_strStatus;}

	function get_strStatus()
	{return $this->strStatus;}

	//Load Single Status (INSERT)
	function pubf_LoadStatus($idStatus)
	{
		$strSQLoadStatus= $this->selectQuery("select * from statuscurso where idStatus={$idStatus}");
				 $this->idStatus = $strSQLoadStatus->idStatus;
				 $this->strStatus = $strSQLoadStatus->strStatus;
	}

	function pubf_SaveStatus()
	{
		$this->descripcion = $this->descripcion ? $this->descripcion: null;
		$this->costo = $this->costo ? $this->costo : null;
    $strSQLSaveTheme= $this->prepare("INSERT INTO statuscurso (strStatus) VALUES (:strStatus)");
    $strSQLSaveTheme->bindParam(':strStatus' , $this->strStatus);

    $this->executeQueryPrepare($strSQLSaveTheme);
	}

	function pubf_EditStatus()
	{
		$strSQLEditStatus= $this->prepare("UPDATE statuscurso SET strStatus=:strStatus where idStatus=:idStatus");
		$strSQLEditStatus->bindParam(':idStatus' , $this->idStatus);
		$strSQLEditStatus->bindParam(':strStatus' , $this->strStatus);

		$this->executeQueryPrepare($strSQLEditStatus);
	}

	function pubf_DeleteStatus(){
		$strSQLDeleteStatus= $this->prepare("DELETE FROM statuscurso where idStatus=:idStatus");
    $strSQLDeleteStatus->bindParam(':idStatus' , $this->idStatus);

		$this->executeQueryPrepare($strSQLDeleteStatus);
	}
}
