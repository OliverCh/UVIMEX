<?php
class CourseFiles extends dbHandler{

  public $idArchivosPorCurso="";
  public $idTema = "";
	public $strArchivo = "";
  public $strNombreArchivo="";


	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //idArchivosPorCurso
  function set_idArchivosPorCurso($par_idArchivosPorCurso)
  {$this->idArchivosPorCurso = $par_idArchivosPorCurso;}

  function get_idArchivosPorCurso()
  {return $this->idArchivosPorCurso;}

  //idTema
  function set_idTema($par_idTema)
	{$this->idTema = $par_idTema;}

	function get_idTema()
	{return $this->idTema;}
  //strArchivo
  function set_strArchivo($par_strArchivo)
	{$this->strArchivo = $par_strArchivo;}

	function get_strArchivo()
	{return $this->strArchivo;}

  //strNombreArchivo
  function set_strNombreArchivo($par_strNombreArchivo)
	{$this->strNombreArchivo = $par_strNombreArchivo;}

	function get_strNombreArchivo()
	{return $this->strNombreArchivo;}
  //Load Single Content (Select)
	function pubf_LoadCourseFiles($idTema)
	{
		$strSQLoadContent= $this->selectQuery("select idArchivosPorCurso,idTema,strArchivo,strNombreArchivo from archivosporcurso where idTema={$idTema}");
        if($strSQLoadContent){
           $this->idArchivosPorCurso = $strSQLoadContent->idArchivosPorCurso;
  				 $this->idTema = $strSQLoadContent->idTema;
  				 $this->strArchivo = $strSQLoadContent->strArchivo;
           $this->strNombreArchivo = $strSQLoadContent->strNombreArchivo;
         }
	}
	//GUARDAR (INSERT)
	function pubf_SaveCourseFiles()
	{
    $strSQLSaveContent= $this->prepare("INSERT INTO archivosporcurso (idTema, strArchivo, strNombreArchivo)
                                                        VALUES
                                                                    (:idTema, :strArchivo,:strNombreArchivo)
                                       ");
    $strSQLSaveContent->bindParam(':idTema' , $this->idTema);
    $strSQLSaveContent->bindParam(':strArchivo' , $this->strArchivo);
    $strSQLSaveContent->bindParam(':strNombreArchivo' , $this->strNombreArchivo);


    $this->executeQueryPrepare($strSQLSaveContent);
	}
  //EDIT (UPDATE)
  function pubf_UpdateCourseFiles()
	{

     $strSQLEditContent= $this->prepare("UPDATE archivosporcurso
                                         SET strArchivo = :strArchivo,
                                           strNombreArchivo=:strNombreArchivo
                                         WHERE idArchivosPorCurso = :idArchivosPorCurso");

  	 $strSQLEditContent->bindParam(':strArchivo' , $this->strArchivo);
     $strSQLEditContent->bindParam(':strNombreArchivo' , $this->strNombreArchivo);
  	 $strSQLEditContent->bindParam(':idArchivosPorCurso' , $this->idArchivosPorCurso);

     $this->executeQueryPrepare($strSQLEditContent);
	}



}
