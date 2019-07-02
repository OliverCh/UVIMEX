<?php
class User extends dbHandler{

	public $idUser = null;
	public $birthday = null;
  public $address = null;
  public $idUserWordpress = null;
  public $urlProfileImage = null;
  public $phone = null;

	public $dbh;
	function __construct($dbh){
        $this->dbh = $dbh;
  }

  //idUsers
  function set_idUser($par_idUser)
	{$this->idUser = $par_idUser;}

	function get_idUser()
	{return $this->idUser;}
  //birthday
  function set_birthday($par_birthday)
	{$this->birthday = $par_birthday;}

	function get_birthday()
	{return $this->birthday;}

  //address
  function set_address($par_address)
	{$this->address = $par_address;}

	function get_address()
	{return $this->address;}

  //idUserWordpress
  function set_idUserWordpress($par_idUserWordpress)
	{$this->idUserWordpress = $par_idUserWordpress;}

	function get_idUserWordpress()
	{return $this->idUserWordpress;}

  //urlProfileImage
  function set_urlProfileImage($par_urlProfileImage)
  {$this->urlProfileImage = $par_urlProfileImage;}

  function get_urlProfileImage()
  {return $this->urlProfileImage;}

  //phone
  function set_phone($par_phone)
  {$this->phone = $par_phone;}

  function get_phone()
  {return $this->phone;}

	//Load Single Users (INSERT)
	function pubf_LoadUser($idUser)
	{
		$strSQLoadUser= $this->selectQuery("select * from users where idUserWordpress={$idUser}");
			if($strSQLoadUser && $strSQLoadUser->idUser){
				$this->idUsers = $strSQLoadUser->idUser;
				$this->birthday = $strSQLoadUser->birthday;
				$this->address = $strSQLoadUser->address;
				$this->idUserWordpress = $strSQLoadUser->idUserWordpress;
				$this->urlProfileImage = $strSQLoadUser->urlProfileImage;
				$this->phone = $strSQLoadUser->phone;
			}

	}

	function pubf_SaveUser()
	{
    $strSQLSaveUser= $this->prepare("INSERT INTO users (birthday, address, idUserWordpress, urlProfileImage, phone) VALUES (:birthday, :address, :idUserWordpress, :urlProfileImage, :phone)");
    $strSQLSaveUser->bindParam(':birthday' , $this->birthday);
    $strSQLSaveUser->bindParam(':address' , $this->address);
    $strSQLSaveUser->bindParam(':idUserWordpress' , $this->idUserWordpress);
    $strSQLSaveUser->bindParam(':urlProfileImage' , $this->urlProfileImage);
    $strSQLSaveUser->bindParam(':phone' , $this->phone);

    $this->executeQueryPrepare($strSQLSaveUser);
	}

	function pubf_EditUser()
	{
		$strSQLEditUser= $this->prepare("UPDATE users SET birthday=:birthday, address=:address, urlProfileImage=:urlProfileImage, phone=:phone where idUserWordpress=:idUserWordpress");
    $strSQLEditUser->bindParam(':idUserWordpress' , $this->idUserWordpress);
    $strSQLEditUser->bindParam(':birthday' , $this->birthday);
    $strSQLEditUser->bindParam(':address' , $this->address);
    $strSQLEditUser->bindParam(':urlProfileImage' , $this->urlProfileImage);
    $strSQLEditUser->bindParam(':phone' , $this->phone);

		$this->executeQueryPrepare($strSQLEditUser);
	}

	function pubf_DeleteUser(){
		$strSQLDeleteUser= $this->prepare("DELETE FROM users where idUser=:idUser");
    $strSQLDeleteUser->bindParam(':idUser' , $this->idUser);

		$this->executeQueryPrepare($strSQLDeleteUser);
	}
}
