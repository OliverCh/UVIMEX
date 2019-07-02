<?php
class ActivityAnswer extends dbHandler{

  public $idActividadRespuesta="";
	public $idActividad = "";
  public $idRespuesta = "";
	public $dbh;

	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //idActividadRespuesta
  function set_idActividadRespuesta($par_idActividadRespuesta)
	{$this->idActividadRespuesta = $par_idActividadRespuesta;}

	function get_idActividadRespuesta()
	{return $this->idActividadRespuesta;}

  //idActividad
  function set_idActividad($par_idActividad)
  {$this->idActividad = $par_idActividad;}

  function get_idActividad()
  {return $this->idActividad;}

  //idRespuesta
  function set_idRespuesta($par_idRespuesta)
  {$this->idRespuesta = $par_idRespuesta;}

  function get_idRespuesta()
  {return $this->idRespuesta;}

  //Load Single Content (Select)
	function pubf_LoadActivityAnswer($idActivity,$idAnswer)
	{
		$strSQLoadContent= $this->selectQuery("select idActividadRespuesta, idActividad,idRespuesta from actividadrespuesta where idActividad={$idActivity} and idRespuesta={$idAnswer}");
       $this->idActividadRespuesta = isset($strSQLoadContent->idActividadRespuesta) && $strSQLoadContent->idActividadRespuesta!="" ? $strSQLoadContent->idActividadRespuesta : null;
       $this->idActividad = isset($strSQLoadContent->idActividad) && $strSQLoadContent->idActividad ? $strSQLoadContent->idActividad : null;
			 $this->idRespuesta = isset($strSQLoadContent->idRespuesta) && $strSQLoadContent->idRespuesta ? $strSQLoadContent->idRespuesta : null;
	}
	//GUARDAR (INSERT)
	function pubf_SaveActivityAnswer()
	{
    $strSQLSaveActivity= $this->prepare("INSERT INTO actividadrespuesta (idActividad, idRespuesta)
                                                       VALUES (:idActividad, :idRespuesta)");
    $strSQLSaveActivity->bindParam(':idActividad' , $this->idActividad);
    $strSQLSaveActivity->bindParam(':idRespuesta' , $this->idRespuesta);

    $this->executeQueryPrepare($strSQLSaveActivity);
	}

}
