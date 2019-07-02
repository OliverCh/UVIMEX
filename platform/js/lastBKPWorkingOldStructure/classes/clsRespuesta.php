<?php
class Respuesta extends dbHandler{

  public $idRespuesta="";
  public $strRespuesta = "";

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
    $strSQLSaveAnswer= $this->prepare("INSERT INTO contenido (strRespuesta)VALUES (:strRespuesta)");
    $strSQLSaveAnswer->bindParam(':strRespuesta' , $this->strRespuesta);

    $this->executeQueryPrepare($strSQLSaveAnswer);
	}
  //EDIT (UPDATE)
  function pubf_EditAnswer()
	{
   // We set null variables incase we need
     $this->strRespuesta = $this->strRespuesta ? $this->strRespuesta : null;

    $strSQLEditAnswer= $this->prepare("UPDATE respuesta
                                        SET strRespuesta = :strRespuesta,
                                        WHERE idRespuesta = :idRespuesta");

    $strSQLEditAnswer->bindParam(':strRespuesta' , $this->strRespuesta);
    $strSQLEditAnswer->bindParam(':idRespuesta' , $this->idRespuesta);
    $this->executeQueryPrepare($strSQLEditAnswer);
	}

  //this function its defined at delete activity inside clsActividad.php
  function pubf_DelASW(){
  }


}
