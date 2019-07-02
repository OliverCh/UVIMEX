<?php
class Activity extends dbHandler{

  public $idActividad="";
	public $strPregunta = "";
  public $idTema = "";
  public $strTemplate = "";
  public $intPage = "";
  public $intValor = "";
	public $dbh;

	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //idActividad
  function set_idActividad($par_idActividad)
  {$this->idActividad = $par_idActividad;}

  function get_idActividad()
  {return $this->idActividad;}

  //strTemplate
  function set_strTemplate($par_strTemplate)
	{$this->strTemplate = $par_strTemplate;}

	function get_strTemplate()
	{return $this->strTemplate;}
  //strPregunta
  function set_strPregunta($par_strPregunta)
  {$this->strPregunta = $par_strPregunta;}

  function get_strPregunta()
  {return $this->strPregunta;}

  //idTema
  function set_idTema($par_idTema)
  {$this->idTema = $par_idTema;}

  function get_idTema()
  {return $this->idTema;}

  //intPage
  function set_intPage($par_intPage)
  {$this->intPage = $par_intPage;}

  function get_intPage()
  {return $this->intPage;}

  //intValor
  function set_intValor($par_intValor)
  {$this->intValor = $par_intValor;}

  function get_intValor()
  {return $this->intValor;}

  //Load Single Content (Select)
	function pubf_LoadActivity($idTema)
	{
		$strSQLoadContent= $this->selectQuery("select strTemplate, strPregunta, idTema, intPage, intValor from actividad where idTema={$idTema}");
      if($strSQLoadContent){
       $this->strTemplate = $strSQLoadContent->strTemplate;
			 $this->strPregunta = $strSQLoadContent->strPregunta;
			 $this->idTema = $strSQLoadContent->idTema;
       $this->intPage = $strSQLoadContent->intPage;
      }
	}
	//GUARDAR (INSERT)
	function pubf_SaveActivity()
	{
    $strSQLSaveActivity= $this->prepare("INSERT INTO actividad (strTemplate, strPregunta, idTema, intPage, intValor)
                                                       VALUES (:strTemplate, :strPregunta, :idTema, :intPage, :intValor)");
    $strSQLSaveActivity->bindParam(':strTemplate' , $this->strTemplate);
    $strSQLSaveActivity->bindParam(':strPregunta' , $this->strPregunta);
    $strSQLSaveActivity->bindParam(':idTema' , $this->idTema);
    $strSQLSaveActivity->bindParam(':intPage' , $this->intPage);
    $strSQLSaveActivity->bindParam(':intValor' , $this->intValor);

    $this->executeQueryPrepare($strSQLSaveActivity);
	}
  //EDIT (UPDATE)
  function pubf_EditActivity($idActividad)
	{
     // We set null variables incase we need
    $this->strTemplate = $this->strTemplate ? $this->strTemplate : null;
    $this->strPregunta =$this->strPregunta ? $this->strPregunta :null;

    $strSQLEditActivity= $this->prepare("UPDATE actividad
                                          SET   strTemplate = :strTemplate,
                                                strPregunta= :strPregunta,
                                                intPage= :intPage,
                                                intValor= :intValor
                                          WHERE idActividad= :idActividad");

    $strSQLEditActivity->bindParam(':strTemplate' , $this->strTemplate);
    $strSQLEditActivity->bindParam(':strPregunta' , $this->strPregunta);
    $strSQLEditActivity->bindParam(':intPage' , $this->intPage);
    $strSQLEditActivity->bindParam(':idActividad' , $idActividad);
    $strSQLEditActivity->bindParam(':intValor' , $this->intValor);

    $this->executeQueryPrepare($strSQLEditActivity);
	}

  function pubf_DeleteActivity(){

    $answersRelated=$this->selectAllQuery(" SELECT t1.idActividad,
                                                   t2.idRespuesta
                                            FROM actividad t1
                                            LEFT JOIN actividadrespuesta t2 ON t1.idActividad=t2.idActividad
                                            WHERE idTema={$this->idTema}"
                                         );
    $DeleteActivity=$this->prepare("DELETE  FROM actividad WHERE idTema = :idTema");
    $DeleteActivity->bindParam(':idTema' , $this->idTema);
    $this->executeQueryPrepare($DeleteActivity);
    if(!empty($answersRelated)){
      //delete all answers from respuestas
        foreach ($answersRelated as $value) {
          //delete all relations from table actividadrespuesta
          $DeleteRelation=$this->prepare("DELETE  FROM actividadrespuesta WHERE idActividad = :idActividad");
          $DeleteRelation->bindParam(':idActividad' , $value->idActividad);
          $this->executeQueryPrepare($DeleteRelation);
          $DeleteRelatedAnswer=$this->prepare("DELETE  FROM respuesta WHERE idRespuesta = :idRespuesta");
          $DeleteRelatedAnswer->bindParam(':idRespuesta' , $value->idRespuesta);
          $this->executeQueryPrepare($DeleteRelatedAnswer);
        }
    }
  }

  function pubf_DeleteSinglePageActivity(){
    $DeleteSingleActivity=$this->prepare("DELETE  FROM actividad WHERE idActividad = :idActividad");
    $DeleteSingleActivity->bindParam(':idActividad' , $this->idActividad);
    $this->executeQueryPrepare($DeleteSingleActivity);
  }

  function pubf_DeleteSinglePage(){
    $answersRelated=$this->selectAllQuery(" SELECT t1.idActividad,
                                                   t2.idRespuesta
                                            FROM actividad t1
                                            LEFT JOIN actividadrespuesta t2 ON t1.idActividad=t2.idActividad
                                            WHERE t1.idActividad={$this->idActividad}"
                                         );
    $DeleteActivity=$this->prepare("DELETE  FROM actividad WHERE idActividad = :idActividad");
    $DeleteActivity->bindParam(':idActividad' , $this->idActividad);
    $this->executeQueryPrepare($DeleteActivity);
    if(!empty($answersRelated)){
      //delete all answers from respuestas
        foreach ($answersRelated as $value) {
          //delete all relations from table actividadrespuesta
          $DeleteRelation=$this->prepare("DELETE  FROM actividadrespuesta WHERE idActividad = :idActividad");
          $DeleteRelation->bindParam(':idActividad' , $value->idActividad);
          $this->executeQueryPrepare($DeleteRelation);
          $DeleteRelatedAnswer=$this->prepare("DELETE  FROM respuesta WHERE idRespuesta = :idRespuesta");
          $DeleteRelatedAnswer->bindParam(':idRespuesta' , $value->idRespuesta);
          $this->executeQueryPrepare($DeleteRelatedAnswer);
        }
    }

  }

}
