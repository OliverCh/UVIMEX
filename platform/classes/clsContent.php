<?php
class Content extends dbHandler{

  public $idContenido="";
  public $idTema = "";
	public $contenido = "";
	public $audio = "";
  public $video = "";
  public $titulo = "";
  public $subtitulo = "";
  public $orden = null ;
  public $duracion = null;

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //idTema
  function set_idContenido($par_idContenido)
  {$this->idContenido = $par_idContenido;}

  function get_idContenido()
  {return $this->idContenido;}

  //idTema
  function set_idTema($par_idTema)
	{$this->idTema = $par_idTema;}

	function get_idTema()
	{return $this->idTema;}
  //contenido
  function set_contenido($par_contenido)
	{$this->contenido = $par_contenido;}

	function get_contenido()
	{return $this->contenido;}
  //audio
	function set_audio($par_audio)
	{$this->audio = $par_audio;}

	function get_audio()
	{return $this->audio;}
  //video
  function set_video($par_video)
	{$this->video = $par_video;}

	function get_video()
	{return $this->video;}

  function set_titulo($par_titulo)
  {$this->titulo = $par_titulo;}

  function get_titulo()
  {return $this->titulo;}

  function set_subtitulo($par_subtitulo)
  {$this->subtitulo = $par_subtitulo;}

  function get_subtitulo()
  {return $this->subtitulo;}

  function set_orden($par_orden)
  {$this->orden = $par_orden;}

  function get_orden()
  {return $this->orden;}

  function set_duracion($par_duracion)
  {$this->duracion = $par_duracion;}

  function get_duracion()
  {return $this->duracion;}

  //Load Single Content (Select)
	function pubf_LoadContent($idTema)
	{
		$strSQLoadContent= $this->selectQuery("select idContenido,idTema,contenido,video,audio,titulo,subtitulo,orden,duracion from contenido where idTema={$idTema}");
        if($strSQLoadContent){
         $this->idContenido = $strSQLoadContent->idContenido;
				 $this->idTema = $strSQLoadContent->idTema;
				 $this->contenido = $strSQLoadContent->contenido;
				 $this->video = $strSQLoadContent->video;
				 $this->audio = $strSQLoadContent->audio;
         $this->titulo = $strSQLoadContent->titulo;
         $this->subtitulo = $strSQLoadContent->subtitulo;
         $this->orden = $strSQLoadContent->orden;
         $this->orden = $strSQLoadContent->duracion;
         }
	}
	//GUARDAR (INSERT)
	function pubf_SaveContent()
	{

    $strSQLSaveContent= $this->prepare("INSERT INTO contenido (idTema, contenido,video,audio,titulo,subtitulo,orden,duracion)
                                                       VALUES (:idTema, :contenido, :video, :audio, :titulo, :subtitulo, :orden, :duracion)");
    $strSQLSaveContent->bindParam(':idTema' , $this->idTema);
    $strSQLSaveContent->bindParam(':contenido' , $this->contenido);
    $strSQLSaveContent->bindParam(':video' , $this->video);
    $strSQLSaveContent->bindParam(':audio' , $this->audio);
    $strSQLSaveContent->bindParam(':titulo' , $this->titulo);
    $strSQLSaveContent->bindParam(':subtitulo' , $this->subtitulo);
    $strSQLSaveContent->bindParam(':orden' , $this->orden);
    $strSQLSaveContent->bindParam(':duracion' , $this->duracion);

    $this->executeQueryPrepare($strSQLSaveContent);
	}
  //EDIT (UPDATE)
  function pubf_EditContent()
	{
     // We set null variables incase we need
     $this->idTema = $this->idTema ? $this->idTema : null;
    $this->contenido =$this->contenido ? $this->contenido :null;
    $this->video = $this->video ? $this->video :null;
    $this->audio= $this->audio ? $this->audio :null;
    $this->orden = $this->orden ? $this->orden :null;
    $this->idContenido = $this->idContenido ? intval($this->idContenido) :null;
    $this->duracion = $this->duracion ? $this->duracion :null;

    $strSQLEditContent= $this->prepare("UPDATE contenido
                                        SET idTema = :idTema,
                                            titulo = :titulo,
                                            subtitulo = :subtitulo,
                                            contenido = :contenido,
                                            video = :video,
                                            audio = :audio,
                                            orden = :orden,
                                            duracion = :duracion
                                            where idContenido = :idContenido");

    $strSQLEditContent->bindParam(':idTema' , $this->idTema);
    $strSQLEditContent->bindParam(':titulo' , $this->titulo);
    $strSQLEditContent->bindParam(':subtitulo' , $this->subtitulo);
    $strSQLEditContent->bindParam(':idTema' , $this->idTema);
    $strSQLEditContent->bindParam(':contenido' , $this->contenido);
    $strSQLEditContent->bindParam(':video' , $this->video);
    $strSQLEditContent->bindParam(':audio' , $this->audio);
    $strSQLEditContent->bindParam(':orden' , $this->orden);
    $strSQLEditContent->bindParam(':idContenido' , $this->idContenido);
    $strSQLEditContent->bindParam(':duracion' , $this->duracion);
    $this->executeQueryPrepare($strSQLEditContent);
	}

  function pubf_DeleteContent(){
    $DeleteVideo=$this->prepare("DELETE  FROM contenido WHERE idContenido = :idContenido");
    $DeleteVideo->bindParam(':idContenido' , $this->idContenido);
    $this->executeQueryPrepare($DeleteVideo);
  }


}
