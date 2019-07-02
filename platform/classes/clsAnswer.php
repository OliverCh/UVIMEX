<?php
class Answer extends dbHandler{

  public $idRespuesta="";
  public $strRespuesta = "";
  public $intValorRespuesta = "";
  public $intCorreecta = "";
	public $dbh;

	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //strRespuesta
  function set_idRespuesta($par_idRespuesta)
  {$this->idRespuesta = $par_idRespuesta;}

  function get_idRespuesta()
  {return $this->idRespuesta;}

  //strRespuesta
  function set_strRespuesta($par_strRespuesta)
	{$this->strRespuesta = $par_strRespuesta;}

	function get_strRespuesta()
	{return $this->strRespuesta;}

//intValorRespuesta
function set_intValorRespuesta($par_intValorRespuesta)
{$this->intValorRespuesta = $par_intValorRespuesta;}

function get_intValorRespuesta()
{return $this->intValorRespuesta;}

//intCorrecta
function set_intCorrecta($par_intCorrecta)
{$this->intCorrecta = $par_intCorrecta;}

function get_intCorrecta()
{return $this->intCorrecta;}
  //Load Single Content (Select)
	function pubf_LoadAnswer($strRespuesta)
	{
		$strSQLoadContent= $this->selectQuery("select idRespuesta,strRespuesta,intCorrecta from respuesta where idRespuesta={$this->idRespuesta}");
        if($strSQLoadContent){
         $this->idRespuesta = $strSQLoadContent->idRespuesta;
				 $this->strRespuesta = $strSQLoadContent->strRespuesta;
        }
	}
	//GUARDAR (INSERT)
	function pubf_SaveAnswer()
	{
    $this->intCorrecta= $this->intCorrecta ? $this->intCorrecta : null;
    $strSQLSaveAnswer= $this->prepare("INSERT INTO respuesta (strRespuesta, intValorRespuesta, intCorrecta)VALUES (:strRespuesta, :intValorRespuesta, :intCorrecta)");
    $strSQLSaveAnswer->bindParam(':strRespuesta' , $this->strRespuesta);
    $strSQLSaveAnswer->bindParam(':intValorRespuesta' , $this->intValorRespuesta);
    $strSQLSaveAnswer->bindParam(':intCorrecta' , $this->intCorrecta);

    $this->executeQueryPrepare($strSQLSaveAnswer);
	}
  //EDIT (UPDATE)
  function pubf_EditAnswer()
	{
   // We set null variables incase we need
     $this->strRespuesta = $this->strRespuesta ? $this->strRespuesta : null;
     $this->intValorRespuesta = $this->intValorRespuesta ? $this->intValorRespuesta : null;
     $this->intCorrecta= $this->intCorrecta ? $this->intCorrecta : null;
    $strSQLEditAnswer= $this->prepare("UPDATE respuesta
                                        SET strRespuesta = :strRespuesta,
                                            intValorRespuesta=:intValorRespuesta,
                                            intCorrecta=:intCorrecta
                                        WHERE idRespuesta = :idRespuesta");

    $strSQLEditAnswer->bindParam(':strRespuesta' , $this->strRespuesta);
    $strSQLEditAnswer->bindParam(':intValorRespuesta' , $this->intValorRespuesta);
    $strSQLEditAnswer->bindParam(':intCorrecta' , $this->intCorrecta);
    $strSQLEditAnswer->bindParam(':idRespuesta' , $this->idRespuesta);
    $this->executeQueryPrepare($strSQLEditAnswer);
	}

  //Remember there is a function that delete Answers in ClsActtivityClass
  function pubf_DeleteSingleAnswer(){
          //delete all relations from table actividadrespuesta
          $DeleteSingleAnswer=$this->prepare("DELETE  FROM actividadrespuesta WHERE idRespuesta = :idRespuesta");
          $DeleteSingleAnswer->bindParam(':idRespuesta' , $this->idRespuesta);
          $this->executeQueryPrepare($DeleteSingleAnswer);
          $DeleteRelatedAnswer=$this->prepare("DELETE  FROM respuesta WHERE idRespuesta = :idRespuesta");
          $DeleteRelatedAnswer->bindParam(':idRespuesta' , $this->idRespuesta);
          $this->executeQueryPrepare($DeleteRelatedAnswer);
  }


}
