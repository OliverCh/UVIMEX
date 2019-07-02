<?php
class Course extends dbHandler{

	public $idCurso = "";
	public $nombre = "";
  public $descripcion = "";
	public $costo = "";
	public $idUsuario = "";
  public $idCategoria = "";
  public $tag = "";
  public $streaming = "";
  public $duracion = "";
	public $urlPortada = "";
	public $totalCourseTime = "";
	public $idStatus = "";

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }

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
  //descripcion
	function set_descripcion($par_descripcion)
	{$this->descripcion = $par_descripcion;}

	function get_descripcion()
	{return $this->descripcion;}
  //costo
  function set_costo($par_costo)
	{$this->costo = $par_costo;}

	function get_costo()
	{return $this->costo;}

	//idUsuario
	function set_idUsuario($par_idUsuario)
	{$this->idUsuario = $par_idUsuario;}

	function get_idUsuario()
	{return $this->idUsuario;}

  //idCategoria
  function set_idCategoria($par_idCategoria)
  {$this->idCategoria = $par_idCategoria;}

  function get_idCategoria()
  {return $this->idCategoria;}

  //tag
  function set_tag($par_tag)
  {$this->tag = $par_tag;}

  function get_tag()
  {return $this->tag;}

  //streaming
  function set_streaming($par_streaming)
  {$this->streaming = $par_streaming;}

  function get_streaming()
  {return $this->streaming;}

  //duracion
  function set_duracion($par_duracion)
  {$this->duracion = $par_duracion;}

  function get_duracion()
  {return $this->duracion;}

	//urlPortada
	function set_urlPortada($par_urlPortada)
	{$this->urlPortada = $par_urlPortada;}

	function get_urlPortada()
	{return $this->urlPortada;}

	//totalCourseTime
	function set_totalCourseTime($par_totalCourseTime)
	{$this->totalCourseTime = $par_totalCourseTime;}

	function get_totalCourseTime()
	{return $this->totalCourseTime;}

	//idStatus
	function set_idStatus($par_idStatus)
	{$this->idStatus = $par_idStatus;}

	function get_idStatus()
	{return $this->idStatus;}

	//Load Single Course (INSERT)
	function pubf_LoadCourse($idCurso)
	{
		$strSQLoadCourse= $this->selectQuery("select * from cursos where idCurso={$idCurso}");
				 $this->idCurso = $strSQLoadCourse->idCurso;
				 $this->nombre = $strSQLoadCourse->nombre;
				 $this->descripcion = $strSQLoadCourse->descripcion;
				 $this->costo = $strSQLoadCourse->costo;
				 $this->idUsuario = $strSQLoadCourse->idUsuario;
         $this->idCategoria = $strSQLoadCourse->idCategoria;
         $this->tag = $strSQLoadCourse->tag;
         $this->streaming = $strSQLoadCourse->streaming;
         $this->duracion = $strSQLoadCourse->duracion;
				 $this->urlPortada = $strSQLoadCourse->urlPortada;
				 $this->totalCourseTime = $strSQLoadCourse->totalCourseTime;
				 $this->idStatus = $strSQLoadCourse->idStatus;

	}

	function pubf_SaveCourse()
	{
		$this->tag= $this->tag ? $this->tag : null;
		$this->duracion= $this->duracion ? $this->duracion : null;
		$this->streaming= $this->streaming ? $this->streaming : null;
    $strSQLSaveTheme= $this->prepare("INSERT INTO cursos (nombre,descripcion,costo,idUsuario,idCategoria,tag,streaming,duracion,urlPortada,totalCourseTime,idStatus) VALUES (:nombre, :descripcion, :costo, :idUsuario, :idCategoria, :tag, :streaming, :duracion, :urlPortada, :totalCourseTime, :idStatus)");
    $strSQLSaveTheme->bindParam(':nombre' , $this->nombre);
    $strSQLSaveTheme->bindParam(':descripcion' , $this->descripcion);
    $strSQLSaveTheme->bindParam(':costo' , $this->costo);
		$strSQLSaveTheme->bindParam(':idUsuario' , $this->idUsuario);
    $strSQLSaveTheme->bindParam(':idCategoria' , $this->idCategoria);
    $strSQLSaveTheme->bindParam(':tag' , $this->tag);
    $strSQLSaveTheme->bindParam(':streaming' , $this->streaming);
    $strSQLSaveTheme->bindParam(':duracion' , $this->duracion);
		$strSQLSaveTheme->bindParam(':urlPortada' , $this->urlPortada);
		$strSQLSaveTheme->bindParam(':totalCourseTime' , $this->totalCourseTime);
		$strSQLSaveTheme->bindParam(':idStatus' , $this->idStatus);
    $this->executeQueryPrepare($strSQLSaveTheme);
	}

	function pubf_EditCourse()
	{
		$this->tag= $this->tag ? $this->tag : null;
		$this->duracion= $this->duracion ? $this->duracion : null;
		$this->streaming= $this->streaming ? $this->streaming : null;
		$strSQLEditCourse= $this->prepare("UPDATE cursos SET idCurso=:idCurso, nombre=:nombre, descripcion=:descripcion, costo=:costo,
                                      idUsuario=:idUsuario, idCategoria=:idCategoria, tag=:tag, streaming=:streaming, duracion=:duracion,
																			urlPortada=:urlPortada, totalCourseTime=:totalCourseTime, idStatus=:idStatus where idCurso=:idCurso");
		$strSQLEditCourse->bindParam(':idCurso' , $this->idCurso);
		$strSQLEditCourse->bindParam(':nombre' , $this->nombre);
		$strSQLEditCourse->bindParam(':descripcion' , $this->descripcion);
		$strSQLEditCourse->bindParam(':costo' , $this->costo);
    $strSQLEditCourse->bindParam(':idUsuario' , $this->idUsuario);
    $strSQLEditCourse->bindParam(':idCategoria' , $this->idCategoria);
    $strSQLEditCourse->bindParam(':tag' , $this->tag);
    $strSQLEditCourse->bindParam(':streaming' , $this->streaming);
    $strSQLEditCourse->bindParam(':duracion' , $this->duracion);
		$strSQLEditCourse->bindParam(':urlPortada' , $this->urlPortada);
		$strSQLEditCourse->bindParam(':totalCourseTime' , $this->totalCourseTime);
		$strSQLEditCourse->bindParam(':idStatus' , $this->idStatus);
		$this->executeQueryPrepare($strSQLEditCourse);
	}

	function pubf_EditCourseStatus()
	{		
		$strSQLEditCourseStatus= $this->prepare("UPDATE cursos SET idStatus=:idStatus where idCurso=:idCurso");
		$strSQLEditCourseStatus->bindParam(':idCurso' , $this->idCurso);
		$strSQLEditCourseStatus->bindParam(':idStatus' , $this->idStatus);
		$this->executeQueryPrepare($strSQLEditCourseStatus);
	}

	function pubf_DeleteCourse(){
		$strSQLDeleteCourse= $this->prepare("DELETE FROM cursos where idCurso=:idCurso");
    $strSQLDeleteCourse->bindParam(':idCurso' , $this->idCurso);

		$this->executeQueryPrepare($strSQLDeleteCourse);
	}

	//this function was made to save on cursosobligatorios table
		function pubf_SaveMandatoryCourse($idCurso,$idCursoHijo){
			$strSQLSaveMandatoryCourse= $this->prepare("INSERT INTO cursosobligatorios (idCurso,idCursoHijo) VALUES (:idCurso, :idCursoHijo)");
	    $strSQLSaveMandatoryCourse->bindParam(':idCurso' , $idCurso);
	    $strSQLSaveMandatoryCourse->bindParam(':idCursoHijo' ,$idCursoHijo);
			$this->executeQueryPrepare($strSQLSaveMandatoryCourse);
		}
	//this function was made to edit on cursosobligatorios table
		function pubf_EditMandatoryCourse($idCurso,$idCursoHijo,$idcursosobligatorios){
			$strSQLEditMandatoryCourse= $this->prepare("UPDATE cursosobligatorios SET idCurso=:idCurso,idCursoHijo=:idCursoHijo where idcursosobligatorios=:idcursosobligatorios");
			$strSQLEditMandatoryCourse->bindParam(':idCurso' , $idCurso);
			$strSQLEditMandatoryCourse->bindParam(':idCursoHijo' , $idCursoHijo);
			$strSQLEditMandatoryCourse->bindParam(':idcursosobligatorios' , $idcursosobligatorios);
			$this->executeQueryPrepare($strSQLEditMandatoryCourse);
		}

		function pubf_DeleteMandatoryCourse($idCurso,$idCursoHijo){
			$strSQLDeleteMandatoryCourse= $this->prepare("DELETE FROM cursosobligatorios WHERE idCurso=:idCurso and idCursoHijo=:idCursoHijo");
			$strSQLDeleteMandatoryCourse->bindParam(':idCurso' , $idCurso);
			$strSQLDeleteMandatoryCourse->bindParam(':idCursoHijo' , $idCursoHijo);
			$this->executeQueryPrepare($strSQLDeleteMandatoryCourse);
		}

}
