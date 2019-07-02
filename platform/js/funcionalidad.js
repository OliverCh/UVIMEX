var crear=false;
var crearTema=false;
var accion;

$(document).ready(function(){

 $.ajax({
            url: "php/funcionalidad.php",
            type: 'post',
            data: {cursoName:'',funcion: "select", tipo:"QWER123", constraint:"1"},
            success: function(result){
                   //alert(result);
                  $(".den-select").html(result);
          }});







  $('.den-select').on('change', function(){

    
    $.ajax({
            url: "php/funcionalidad.php",
            type: 'post',
            data: {cursoName:'', idCurso:'', funcion: "select", tipo:"FDFG343", constraint:$('.den-select :selected').val()},
            success: function(result){
                   //alert(result);
                   
                  $(".den-carousel-container").html(result);
          }});     
  });



	$(".nuevoCurso").click(function(){
 	
  	 
      accion = "insert";
   

          $.ajax({
            url: "php/funcionalidad.php",
            type: 'post',
            data: {cursoName:$("#nombreCurso").val(), funcion: accion, idCurso:'', tipo:"QWER123", constraint:"1"},
            success: function(result){
                    $(".den-select").html(result);
          }});
    

 

	});

	$(".nuevoModulo").click(function(){

	
  });	

    $(".nuevoMultimedia").click(function(){
		 
   



    });	

 $("#generarNuevaPantallaBtn").click(function(){
  
 

 
    }); 





});


function insertMultimedia(idTema,tipoMultimedia,urlMultimedia,ordenMultimedia){

     
      accion = "insert";
   

          $.ajax({
            url: "php/funcionalidad.php",
            type: 'post',
            data: {cursoName:'', funcion: accion, idCurso:'', tipo:"HYF43", constraint:'', tema:idTema, multimedia:tipoMultimedia, url:urlMultimedia, orden:ordenMultimedia, nombreMultimedia:urlMultimedia},
            success: function(result){
                   console.log('archivo guardado');
                   console.log(result);
          }});
    

 
}


function cargaTmp(idPlantilla, noTema){
  
  var tema = $('#titlePantalla_'+noTema).data('tema');

 cargarTemplate(idPlantilla,noTema , tema,'654654','f56f4gh');

 
}

function cargarTemplate(id,idTema, tema,subtema,multimedia) {
   id = 'template' + id;
   var elementos = $('.den-curso-title');
   elementos = elementos.size()+1;
   var idPantalla = 'Pantalla_'+elementos;
   var idPTitle = 'titlePantalla_'+elementos;
  //Eliminando y deseleccionando los otros
  $('.den-curso-title').removeClass('den-select-option');
  $('.den-pantalla-space').remove();
  //Creando Conenedores
  $("<div class='den-curso-title den-select-option'><p></p></div>").appendTo(".den-carousel-container");
  $('.den-curso-title.den-select-option').attr('id',idPTitle);
  $('<div class="den-pantalla-space den-prevnedit-plantilla"></div>').appendTo('#containerOfScreens');
  $('.den-prevnedit-plantilla').attr('id',idPantalla);
  //
  $('#containerOfScreens').addClass('green_lineGlow');
  $('.den-curso-title.den-select-option p').text(tema);
  $('.den-popup-newtitle').addClass('den-hide');
  //Cargando Contenido Existente en el contenedor generada
  var callingTxt = id+'.txt';
   jQuery.get( callingTxt, function(datos) {
    var inyectarDatos = $('.den-prevnedit-plantilla').html(datos);
    inyectarDatos.find('input.base-title').val(tema);
    inyectarDatos.find('input.base-subtitle').val(subtema);
      cargaMultimedia(idTema);

     

   });

  $('.den-plantilla-title').removeClass('den-select-option');
  //$('.den-curso-title').removeClass('den-select-option');
  $('#'+id).addClass('den-select-option');

 

}

 
function cargarVideoAudio(inputName, inputAccept, tipo, url, orden) {
$('.base-agrega-material').removeClass('addFile-input-onclick');
$('.base-agregar-video').css('border-color','#ede8e8');

var fileContainer = `<div class='base-agrega-material base-agregar-video base-thishasfile addFile-input-onclick' style='border-color:#8ad3a0;'><span class='base-plus-span'></span>
<div class='base-herramientas-video'>
 <div class='base-fileedit editvideo tooltip'>
   <i class='fas fa-edit'></i><span class='tooltiptext'>Editar</span>
 </div>
 <div class='base-filedelete tooltip delete-this-video'>
   <i class='fas fa-trash-alt'></i><span class='tooltiptext'>Eliminar</span>
 </div>
</div>
<input type='file' accept='video/*' type='file ' class='form-control-file' onchange='readVideoUrl(this)' data-url='`+url+`' style='display:none;'><div class='base-nameoffile'>`+ inputName +`</div>
<input type='number' class='contador-video' value='`+orden+`' style='display:block;'></div>`;
var icoFile;
   ///// haciendo Distinción entre Audio y Video PADRES
   switch (inputAccept) {
     case 'audio':
      icoFile = `<i class='fas fa-volume-up'></i>`;
     $(fileContainer).appendTo('.base-only-video');
     break;
     case 'video':
     icoFile = `<i class='fas fa-video'></i>`;
     $(fileContainer).appendTo('.base-only-video');
     break;
   }
var plus = $('.addFile-input-onclick');
 plus = plus.find('.base-plus-span');
 $(icoFile).appendTo(plus);



}


function cargaMultimedia(idTema){
   $.ajax({
            url: "php/funcionalidad.php",
            type: 'post',
            data: {cursoName:'', idCurso:'', funcion: "select", tipo:"HYF43", constraint:idTema},
            success: function(result){
                 result = JSON.parse(result);

                 console.log(result);
                 

                 for (var i in result){
                 cargarVideoAudio(result[i]['nombre'], result[i]['tipo'], result[i]['tipo'],result[i]['url'],result[i]['orden'])
                 }
                  
          }});  

   var divs = $(".base-agrega-material .base-agregar-video .base-thishasfile").toArray().length;
      console.log(divs);

}






$(document).ready(function(){
 
    $(".messages").hide();
    //queremos que esta variable sea global
    var fileExtension = "";
    //función que observa los cambios del campo file y obtiene información
    $(':file').change(function()
    {
        //obtenemos un array con los datos del archivo
        var file = $("#imagen")[0].files[0];
        //obtenemos el nombre del archivo
        var fileName = file.name;
        //obtenemos la extensión del archivo
        fileExtension = fileName.substring(fileName.lastIndexOf('.') + 1);
        //obtenemos el tamaño del archivo
        var fileSize = file.size;
        //obtenemos el tipo de archivo image/png ejemplo
        var fileType = file.type;
        //mensaje con la información del archivo
        showMessage("<span class='info'>Archivo para subir: "+fileName+", peso total: "+fileSize+" bytes.</span>");
    });
 
    //al enviar el formulario
    $(':button').click(function(){
        //información del formulario
        var formData = new FormData($(".formulario")[0]);
        var message = ""; 
        //hacemos la petición ajax  
        $.ajax({
            url: 'upload.php',  
            type: 'POST',
            // Form data
            //datos del formulario
            data: formData,
            //necesario para subir archivos via ajax
            cache: false,
            contentType: false,
            processData: false,
            //mientras enviamos el archivo
            beforeSend: function(){
                message = $("<span class='before'>Subiendo la imagen, por favor espere...</span>");
                showMessage(message)        
            },
            //una vez finalizado correctamente
            success: function(data){
                message = $("<span class='success'>La imagen ha subido correctamente.</span>");
                showMessage(message);
              /*  if(isImage(fileExtension))
                {
                    $(".showImage").html("<img src='files/"+data+"' />");
                }*/
            },
            //si ha ocurrido un error
            error: function(){
                message = $("<span class='error'>Ha ocurrido un error.</span>");
                showMessage(message);
            }
        });
    });
})
 
//como la utilizamos demasiadas veces, creamos una función para 
//evitar repetición de código
function showMessage(message){
    $(".messages").html("").show();
    $(".messages").html(message);
}
 
//comprobamos si el archivo a subir es una imagen
//para visualizarla una vez haya subido
function isImage(extension)
{
    switch(extension.toLowerCase()) 
    {
        case 'jpg': case 'gif': case 'png': case 'jpeg':
            return true;
        break;
        default:
            return false;
        break;
    }
}