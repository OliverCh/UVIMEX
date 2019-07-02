<?php
class Answer extends dbHandler{

  public $idRespuesta="";
  public $strRespuesta = "";
  public $intValorRespuesta = "";
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
  //Load Single Content (Select)
	function pubf_LoadAnswer($strRespuesta)
	{
		$strSQLoadContent= $this->selectQuery("select idRespuesta,strRespuesta from respuesta where idRespuesta={$this->idRespuesta}");
        if($strSQLoadContent){
         $this->idRespuesta = $strSQLoadContent->idRespuesta;
				 $this->strRespuesta = $strSQLoadContent->strRespuesta;
        }
	}
	//GUARDAR (INSERT)
	function pubf_SaveAnswer()
	{
    $strSQLSaveAnswer= $this->prepare("INSERT INTO contenido (strRespuesta, intValorRespuesta)VALUES (:strRespuesta, :intValorRespuesta)");
    $strSQLSaveAnswer->bindParam(':strRespuesta' , $this->strRespuesta);
    $strSQLSaveAnswer->bindParam(':intValorRespuesta' , $this->intValorRespuesta);

    $this->executeQueryPrepare($strSQLSaveAnswer);
	}
  //EDIT (UPDATE)
  function pubf_EditAnswer()
	{
   // We set null variables incase we need
     $this->strRespuesta = $this->strRespuesta ? $this->strRespuesta : null;
     $this->intValorRespuesta = $this->intValorRespuesta ? $this->intValorRespuesta : null;

    $strSQLEditAnswer= $this->prepare("UPDATE respuesta
                                        SET strRespuesta = :strRespuesta,
                                            intValorRespuesta=:intValorRespuesta
                                        WHERE idRespuesta = :idRespuesta");

    $strSQLEditAnswer->bindParam(':strRespuesta' , $this->strRespuesta);
    $strSQLEditAnswer->bindParam(':intValorRespuesta' , $this->intValorRespuesta);
    $strSQLEditAnswer->bindParam(':idRespuesta' , $this->idRespuesta);
    $this->executeQueryPrepare($strSQLEditAnswer);
	}

  //Remember there is a function that delete Answers in ClsActtivityClass
  function pubf_DelASW(){
  }


}
