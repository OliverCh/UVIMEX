<?php
  include_once("dbHandler.php");
  $con = new dbHandler();
  $con->connect();
  $strQuery1=$con->selectAllQuery("SELECT * FROM cursos;");
  $strQuery2=$con->selectAllQuery("SELECT * FROM contenido order by 1 desc limit 5;");
  $strQuery3=$con->selectAllQuery("SELECT * FROM temas order by 1 desc limit 10;");
  $strQuery4=$con->selectAllQuery("SELECT * FROM imagenes order by 1 desc limit 10;");
  $strQuery5=$con->selectAllQuery("SHOW TABLES");
  $strQuery6=$con->selectAllQuery("DESCRIBE imagenes");
  $strQuery7=$con->selectAllQuery("select  t1.idCurso,
                                        	 t1.nombre,
                                           t1.descripcion,
                                           t1.costo,
                                           t2.idTema,
                                           t2.nombre,
                                           t3.idContenido,
                                           t3.contenido,
                                           t3.audio,
                                           t3.video,
                                           t4.idImg,
                                           t4.url,
                                           t4.tiempo
                                        from cursos t1
                                        left join temas t2 on t1.idCurso=t2.idCurso
                                        left join contenido t3 on t2.idTema=t3.idTema
                                        left join imagenes t4 on t4.idContenido=t3.idContenido
                                        where t2.idTema=322;
                                  ");
  print_object($strQuery7);

?>
