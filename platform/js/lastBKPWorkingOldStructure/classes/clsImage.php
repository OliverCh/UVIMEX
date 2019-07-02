<?php
class Image extends dbHandler{

  public $idImg = "";
	public $idContenido = "";
	public $url = "";
  public $tiempo = "";

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //idImg
  function set_idImg($par_idImg)
	{$this->idImg = $par_idImg;}

	function get_idImg()
	{return $this->idImg;}
  //idContenido
  function set_idContenido($par_idContenido)
	{$this->idContenido = $par_idContenido;}

	function get_idContenido()
	{return $this->idContenido;}
  //url
	function set_url($par_url)
	{$this->url = $par_url;}

	function get_url()
	{return $this->url;}
  //tiempo
  function set_tiempo($par_tiempo)
	{$this->tiempo = $par_tiempo;}

	function get_tiempo()
	{return $this->tiempo;}

  //Load Images (INSERT)
	function pubf_LoadImage($idImg)
	{
		$strSQLLoadImages= $this->selectQuery("select * from imagenes where idImg={$idImg}");
			 $this->idImg = $strSQLoadCourse->idImg;
			 $this->idContenido = $strSQLoadCourse->idContenido;
			 $this->url = $strSQLoadCourse->url;
			 $this->tiempo = $strSQLoadCourse->tiempo;
	}
	//GUARDAR (INSERT)
	function pubf_SaveImage()
	{
    $this->idContenido = $this->idContenido ? $this->idContenido : null;
    $this->tiempo =$this->tiempo ? $this->tiempo :null;
    $this->url = $this->url ? $this->url :null;

    $strSQLSaveImage= $this->prepare("INSERT INTO imagenes (idContenido,tiempo,url) VALUES (:idContenido, :tiempo, :url)");
    $strSQLSaveImage->bindParam(':idContenido' , $this->idContenido);
    $strSQLSaveImage->bindParam(':tiempo' , $this->tiempo);
    $strSQLSaveImage->bindParam(':url' , $this->url);

    $this->executeQueryPrepare($strSQLSaveImage);
	}

  function pubf_EditImage()
	{
    $this->tiempo =$this->tiempo ? $this->tiempo :null;
    $this->url = $this->url ? $this->url :null;
		$strSQLEditImage= $this->prepare("UPDATE imagenes SET tiempo=:tiempo, url=:url where idImg=:idImg");
		$strSQLEditImage->bindParam(':tiempo' , $this->tiempo);
		$strSQLEditImage->bindParam(':url' , $this->url);
    $strSQLEditImage->bindParam(':idImg' , $this->idImg);

		$this->executeQueryPrepare($strSQLEditImage);
	}

  function pubf_DeleteImage()
	{
		$strSQLDeleteImage= $this->prepare("DELETE FROM imagenes where idImg=:idImg");
    $strSQLDeleteImage->bindParam(':idImg' , $this->idImg);

		$this->executeQueryPrepare($strSQLDeleteImage);
	}

  function pubf_EditImageTime()
  {
    $this->tiempo =$this->tiempo ? $this->tiempo :null;
    $strSQLEditImageTime= $this->prepare("UPDATE imagenes SET tiempo=:tiempo where idImg=:idImg");
    $strSQLEditImageTime->bindParam(':tiempo' , $this->tiempo);
    $strSQLEditImageTime->bindParam(':idImg' , $this->idImg);

    $this->executeQueryPrepare($strSQLEditImageTime);
  }


}
