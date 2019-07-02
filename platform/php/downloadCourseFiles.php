<?php
$idTema= $_GET['idTema'];
$strArchivo=$_GET['strArchivo'];
$strArchivoNombre=$_GET['strArchivoNombre'];
echo "
<div style='position:relative'>
  <span style='position:absolute;right:0px'>x</span>
  <embed src='https://drive.google.com/viewerng/viewer?url=http://104.154.247.218/crearCurso/dev/uploads/{$idTema}/Files/{$strArchivo}?pid=explorer&efh=false&a=v&chrome=false&embedded=true' width='100%' height='100%' /></embed>
</div>

";
// $array = explode(".", $strArchivo);
// $ext=$array[1];
//
//
//
// $finfo = finfo_open(FILEINFO_MIME_TYPE);
// $mime_type = finfo_file($finfo, "../uploads/{$idTema}/Files/{$strArchivo}");
// finfo_close($finfo);
//
//
//     header('Content-Description: File Transfer');
//     header("Content-Type:{$mime_type}");
//     header("Content-Disposition: attachment;  filename=\"" . basename($strArchivoNombre) . "\";");
//     ob_clean();
//     flush();
//
//     readfile("../uploads/{$idTema}/Files/{$strArchivo}"); //showing the path to the server where the file is to be download
    exit;
?>
