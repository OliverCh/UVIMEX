<?php
class Actividad extends dbHandler{

  public $idActividad="";
	public $intTipo = "";
	public $strPregunta = "";
  public $idCurso = "";
	public $dbh;

	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //idActividad
  function set_idActividad($par_idActividad)
  {$this->idActividad = $par_idActividad;}

  function get_idActividad()
  {return $this->idActividad;}

  //intTipo
  function set_intTipo($par_intTipo)
	{$this->intTipo = $par_intTipo;}

	function get_intTipo()
	{return $this->intTipo;}
  //strPregunta
  function set_strPregunta($par_strPregunta)
  {$this->strPregunta = $par_strPregunta;}

  function get_strPregunta()
  {return $this->strPregunta;}

  //idCurso
  function set_idCurso($par_idCurso)
  {$this->idCurso = $par_idCurso;}

  function get_idCurso()
  {return $this->idCurso;}

  //Load Single Content (Select)
	function pubf_LoadActivity($intTipo)
	{
		$strSQLoadContent= $this->selectQuery("select intTipo, strPregunta, idCurso from actividad where idCurso={$idCurso}");
      if($strSQLoadContent){
       $this->intTipo = $strSQLoadContent->idstrPregunta;
			 $this->strPregunta = $strSQLoadContent->intTipo;
			 $this->idCurso = $strSQLoadContent->strPregunta;
      }
	}
	//GUARDAR (INSERT)
	function pubf_SaveActivity()
	{
    $strSQLSaveActivity= $this->prepare("INSERT INTO strPregunta (intTipo, strPregunta,idCurso)
                                                       VALUES (:intTipo, :strPregunta, :idCurso)");
    $strSQLSaveActivity->bindParam(':intTipo' , $this->intTipo);
    $strSQLSaveActivity->bindParam(':strPregunta' , $this->strPregunta);
    $strSQLSaveActivity->bindParam(':idCurso' , $this->idCurso);

    $this->executeQueryPrepare($strSQLSaveActivity);
	}
  //EDIT (UPDATE)
  function pubf_EditActivity()
	{
     // We set null variables incase we need
    $this->intTipo = $this->intTipo ? $this->intTipo : null;
    $this->strPregunta =$this->strPregunta ? $this->strPregunta :null;
    $this->idCurso = $this->idCurso ? $this->idCurso :null;

    $strSQLEditActivity= $this->prepare("UPDATE strPregunta
                                          SET   intTipo = :intTipo,
                                          WHERE idCurso = :idCurso");

    $strSQLEditActivity->bindParam(':strPregunta' , $this->strPregunta);
    $strSQLEditActivity->bindParam(':intTipo' , $this->intTipo);
    $strSQLEditActivity->bindParam(':idCurso' , $this->idCurso);

    $this->executeQueryPrepare($strSQLEditActivity);
	}

  function pubf_DeleteActivity(){
    $DeleteActivity=$this->prepare("DELETE  FROM actividad WHERE idCurso = :idCurso");
    $DeleteActivity->bindParam(':idCurso' , $this->idCurso);
    $this->executeQueryPrepare($DeleteActivity);
    $answersRelated=$this->selectAllQuery("SELECT idRespuesta from actividad WHERE idCurso={$this->idCurso}");
    if(!empty($answersRelated)){
      //delete all relations from table actividadrespuesta
        $DeleteRelation=$this->prepare("DELETE  FROM actividadrespuesta WHERE idCurso = :idCurso");
        $DeleteRelation->bindParam(':idCurso' , $this->idCurso);
        $this->executeQueryPrepare($DeleteRelation);
      //delete all answers from respuestas
        foreach ($answersRelated as $value) {
          $DeleteRelatedAnswer=$this->prepare("DELETE  FROM respuesta WHERE idRespuesta = {$value->idRespuesta}");
          $DeleteRelatedAnswer->bindParam(':idRespuesta' , $this->idRespuesta);
          $this->executeQueryPrepare($DeleteRelatedAnswer);
        }
    }
  }

}
