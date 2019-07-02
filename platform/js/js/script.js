//
var ACCEPTED_FILES = {images:['png','jpg','jpeg','gif'],
                      video:['mp4','vlc','mov','avi'],
                      audio:['mp3','wav'] };

  //
  function alertaFileEx(){
    $('.base-alert-extenfile').removeClass('den-hide').fadeIn('fast').animate({top: 450, opacity:1}, function(){
      setTimeout(function(){
           $('.base-alert-extenfile').fadeOut('slow');
        }, 2000);
    });

    setTimeout(function(){
      $('.base-alert-extenfile').addClass('den-hide');
      $('.base-alert-extenfile').css('top',' 0');
      $('.base-alert-extenfile').css('opacity',' 0');
    }, 4500);
  }
//richText




//Text For Help

function txtHelpFind(idHelp) {
  var textHelp;
  switch (idHelp) {
  	case 'helpCurso':
  		textHelp = 'Selecciona uno de los cursos que ya hayas ingresado.';
  		break;
  	case 'helpPantalla':
  		textHelp = 'Cada pantalla funciona como un subtema dentro del curso seleccionado.';
  		break;
  	case 'helpPlantilla':
  		textHelp = 'Elige la plantilla que deceas segun los elementos que incluirás en esta pantalla.';
  		break;
  	case 'helpActividad':
  		textHelp = 'Elige el tipo de actividad que deceas agregar.';
      break;
    case 'helpPagina':
      textHelp = 'Agrega una página de activdad para poder comenzar a editarla.';
      break;
    case 'helpTempVideo':
      textHelp = 'Agrega uno o múltiples videos';
      break;
    case 'helpTempAudio':
      textHelp = 'Agrega uno o múltiples audios';
      break;
    case 'helpTempImage':
      textHelp = 'A cada audio o video que subas podrás agregarle una o multiples imagenes';
      break;
    case 'helpTempActividad':
      textHelp = 'A cada audio o video que subas podrás agregarle una actividad diferente.';
      break;
    case 'helpActivbtn':
      textHelp = 'Agrega la cantidad de elementos que necesitas.';
      break;
      case 'helpActivValor':
        textHelp = 'Selecciona la forma que evaluaras esta actividad.';
        break;
      case 'helpTempParrafo':
          textHelp = 'En esta área escribe y edita el texto.';
          break;

  };
  $('.den-popup-help-general p').text(textHelp);
}
//
function plantillaSelect(id){
  var callingTxt = [id]+'.txt';
  var texto = $('.den-curso-title.den-select-option p').text();
   jQuery.get( callingTxt, function(datos) {
    var inyectarDatos = $('.den-prevnedit-plantilla').html(datos);
    var title  = inyectarDatos.find('input.base-title');
    title.val(texto);
   });
    $('.den-select-option').removeClass('plantillaOnClick');
}
//nUEVA PANTALLA
 var saveNewTxt;
function createNewTitle(idTema){
  saveNewTxt = $('.den-popup-newtitle input').val();
  var buscarCoincidencias = $(".den-curso-title p:contains("+saveNewTxt+")");
  if (saveNewTxt === '') {
    $('.den-popup-newtitle input').val('');
    $('.base-alert-titleRepetido h1').text('No ingresaste ningun texto');
    $('.base-alert-titleRepetido').removeClass('den-hide').fadeIn('fast').animate({top: 450, opacity:1}, function(){
      setTimeout(function(){
           $('.base-alert-titleRepetido').fadeOut('fast');
        }, 1500);
    });
    setTimeout(function(){
      $('.base-alert-titleRepetido').addClass('den-hide');
      $('.base-alert-titleRepetido').css('top',' 0');
      $('.base-alert-titleRepetido').css('opacity',' 0');
    }, 2000);
  }else{
    buscarTexto(idTema);
  };
  function buscarTexto(idTema){
    if(buscarCoincidencias.length === 0){
      var elementos = $('.den-curso-title');
      var width = $('.den-curso-title').width();
      var parentwidth = $('.den-carousel-container').width();
      var size = elementos.size();
      var number = size+1;
      width = width*number;
      var idPantalla = 'Pantalla_'+number;
      var idPTitle = 'titlePantalla_'+number;
      var size = size * 150;
      $('.den-curso-title').removeClass('den-select-option');
      $('.den-pantalla-space').removeClass('den-prevnedit-plantilla');
      $('.den-pantalla-space').addClass('den-hide');
      $("<div class='den-curso-title den-select-option'><p></p></div>").appendTo(".den-carousel-container");
      $('.den-curso-title.den-select-option').attr('id',idPTitle);
      // TEST PANTALLAS
      $('<div class="den-pantalla-space den-prevnedit-plantilla"></div>').appendTo('#containerOfScreens');
      $('#containerOfScreens').addClass('green_lineGlow');
      $('.den-prevnedit-plantilla').attr('id',idPantalla);
      //
      $('.den-curso-title.den-select-option p').text(saveNewTxt);
      $('.den-popup-newtitle').addClass('den-hide');
      $(".den-carousel-container").animate({scrollLeft:size}, '500');
      // Reflejar en el Input
      var id = $('.den-plantilla-title.den-select-option').attr('id');
      plantillaSelect(id);

      $('.den-popup-newtitle input').val('');
      if (parentwidth<=width) {
        $('.den-btn-left').addClass('btn-green-scroll');
        if (elementos.scrollLeft()==0) {
          $('.den-btn-right').removeClass('btn-green-scroll');
        }
      }
    }
    else{
      $('.den-popup-newtitle input').val('');
      $('.base-alert-titleRepetido h1').text('Ya tienes un tema con este nombre');
      $('.base-alert-titleRepetido').removeClass('den-hide').fadeIn('fast').animate({top: 450, opacity:1}, function(){
        setTimeout(function(){
             $('.base-alert-titleRepetido').fadeOut('fast');
          }, 1500);
      });
      setTimeout(function(){
        $('.base-alert-titleRepetido').addClass('den-hide');
        $('.base-alert-titleRepetido').css('top',' 0');
        $('.base-alert-titleRepetido').css('opacity',' 0');
      }, 2000);
    }
  }
}
//  cAMBIAR DE PANTALLA
function goToOtherTitle(){
  $('.den-curso-title').removeClass('den-select-option');
  $('.den-go-title').addClass('den-select-option');
  $('.den-pantalla-space').removeClass('den-prevnedit-plantilla');
  $('.den-pantalla-space').addClass('den-hide');
  //
  var thisId = $('.den-go-title.den-select-option').attr('id');
  thisId = thisId.split('_');
  thisId = '#Pantalla_'+((thisId)[1]);
  thisId = $('#containerOfScreens').find(thisId);
  thisId.removeClass('den-hide');
  thisId.addClass('den-prevnedit-plantilla');
  var plantillaSelect = $('.den-prevnedit-plantilla').find('#contenedorCurso');
  plantillaSelect = plantillaSelect.attr('class');
  plantillaSelect = plantillaSelect.split('_');
  plantillaSelect = ((plantillaSelect)[0]);
  $('.den-plantilla-title').removeClass('den-select-option');
  $('#'+plantillaSelect).addClass('den-select-option');
  //
  $('.den-curso-title ').removeClass('den-go-title');
  // $('.den-popup-cambiardetitle').addClass('den-hide');
  // Reflejar en el Input
  // var texto = $('.den-curso-title.den-select-option p').text();
  // var input = $('#contenedorCurso #tituloCurso').children('input.base-title');
  // input.val(texto);
  //
}

//Global
        function findThisImgcontId(thiselement) {
          var findThisId = thiselement.find('input.form-control-file');
          findThisId = (findThisId).attr("data-title");
          findThisId = (findThisId).split('.');
          findThisId = '#'+((findThisId)[0]);
          if ($(findThisId).hasClass('base-imagesforvideo-container')) {
            $('.base-imagesforvideo-container').addClass('base-display-hidden');
            $('.base-imagesforvideo-container').removeClass('actual-set-of-images');
            $('.base-agregar-parrafo').removeClass('cop_active');
            $('.base-agregar-parrafo').addClass('den-hide');
            $(findThisId).removeClass('base-display-hidden');
            $(findThisId).addClass('actual-set-of-images');
            var parragraph =  findThisId+'_parrafo';
            $(parragraph).addClass('cop_active');
            $(parragraph).removeClass('den-hide');
          };
          if ($(findThisId).hasClass('base-actividad-container')) {
            $('.base-actividad-container').addClass('base-display-hidden');
            $('.base-actividad-container').removeClass('actividad-visible');
            $(findThisId).removeClass('base-display-hidden');
            $(findThisId).addClass('actividad-visible');
          };
        $('.base-agrega-material').removeClass('addFile-input-onclick');
        }
        function plantillaPrev(id){
          var titulo = $('.den-prevnedit-plantilla .base-container-title input').val();
          var subtitulo = $('.den-prevnedit-plantilla .base-container-subtitle input').val();
          var callingTxt = [id]+'.txt';
           jQuery.get( callingTxt, function(datos) {
           var inyectarDatos = $('.den-cont-plantillaprevew').html(datos);
           inyectarDatos.find('.tem-title').text(titulo);
           inyectarDatos.find('.tem-subtitle').text(subtitulo);
           });
        }
      // function actividadTipo(id){
      //     var callingTxt = [id]+'.txt';
      //     jQuery.get('actividades/'+callingTxt).success(function (datos) {
      //         $('.pagina-actividad-visible').html(datos);
      //     });
      // }
var singleActivContainer =`<button class="green-btn agregar-actividad-btn">Agregar Actividad</button>`;
var saveActivContainer = `<div class='actividad-guardada-container'>\
  <div class='save-image'></div>\
  <div class = 'savedbuttons'>\
    <button id="editPopUpAct">Editar</button>\
    <button id="surePopUpAct">Eliminar</button>\
  </div>\
</div>`;
var singleImageContainer = `<div class='base-imagesforvideo-column' data-type='image'>\
        <div class='base-agrega-material base-agregar-imagen'>\
          <span class='base-plus-span'>+</span>\
          <input type='file' accept='image/*' onchange='readImageUrl(this)' class='form-control-file'>\
          <div class='base-nameoffile'></div>\
        </div>\
        <div class='base-display-hidden base-datos-edit-container'>\
        <div class='base-fileedit editimage tooltip'>\
          <i class='fas fa-edit'></i><span class='tooltiptext'>Editar</span>\
        </div>\
        <div class='base-filedelete delete-this-image tooltip'>\
          <i class='fas fa-trash-alt'></i><span class='tooltiptext'>Eliminar</span>\
        </div>\
        <div class='base-tiempos-img' data-imgid='0'>\
          <p>Aparece en minuto:</p>\
          <div class='base-input-field'>\
            <label>Minuto:</label><input type='number' min='0' placeholder='Minutos' class='file_mins interface_input' value='0' data-field='img_mins'>\
          </div>\
          <div class='base-input-field'>\
            <label>Segundo:</label><input type='number' min='1' placeholder='Segundos' class='file_secs interface_input' value='0' data-field='img_secs'>\
          </div>\
      </div>\
      </div>\
      </div>`;
var VideoContainer = `<div class='base-agrega-material base-agregar-video'><span class='base-plus-span'>+</span>\
<div class='base-herramientas-video base-display-hidden'>\
  <div class='base-fileedit editvideo tooltip'>\
    <i class='fas fa-edit'></i><span class='tooltiptext'>Editar</span>\
  </div>\
  <div class='base-filedelete tooltip delete-this-video'>\
    <i class='fas fa-trash-alt'></i><span class='tooltiptext'>Eliminar</span>\
  </div>\
</div>\
<input type='file' accept='video/*' type='file ' class='form-control-file' id='nuevoMultimedia' onchange='readVideoUrl(this)'><div class='base-nameoffile'></div></div>`;
var audioContainer = `<div class='base-agrega-material base-agregar-video'><span class='base-plus-span'>+</span>\
<div class='base-herramientas-video base-display-hidden'>\
  <div class='base-fileedit editvideo tooltip'>\
    <i class='fas fa-edit'></i><span class='tooltiptext'>Editar</span>\
  </div>\
  <div class='base-filedelete tooltip delete-this-video'>\
    <i class='fas fa-trash-alt'></i><span class='tooltiptext'>Eliminar</span>\
  </div>\
</div>\
<input type='file' accept='audio/*' type='file ' class='form-control-file' onchange='readVideoUrl(this)'><div class='base-nameoffile'></div></div>`;

var qaValorBlack =` <div class='act-valor-hover'>
  <input type='number' min='0' value='0' class='act-input-qavalor' >
  <span class='act-span-valor'>Ingresa el valor de esta pregunta</span>
</div>`;

function funcionvalor(valorQA){
  $('.den-actividadid-visible .act-valor-hover').remove();
  if (valorQA == "valoraPregunta") {
    $(qaValorBlack).appendTo(".den-actividadid-visible .act-pregunta-row");
    $('.den-actividadid-visible .act-valor-hover').addClass('preguntahover');
  }
  if (valorQA == "valoraRespuesta") {
    $(qaValorBlack).appendTo(".den-actividadid-visible .act-respuesta-row");
      $('.den-actividadid-visible .act-valor-hover').addClass('respuestahover');
  }
}

// Close Multimple
function closeMulti (){
  $('.den-popup-help-general').addClass('den-hide');
   $('.den-dropmenuHelp').addClass('den-hide');
}
// Funcion archives
function readFileActivityUrl(input){

  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let imgData = e.target.result;
      let imgName = input.files[0].name;
      var space = ' ';
      imgName = imgName.replace(new RegExp(space, "g"), '_');
      input.setAttribute("data-title", imgName);
      $('.act-container-activity .base-nameoffile').text(imgName);
    }
    reader.readAsDataURL(input.files[0]);
  }
}
// funciones para templates

function readImageUrl(input){

  if (input.files && input.files[0]) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let imgData = e.target.result;
      let imgName = input.files[0].name;
      var inputAccept = input.accept;
      inputAccept = inputAccept.split('/');
      inputAccept = inputAccept[0];
      var space = ' ';
      imgName = imgName.replace(new RegExp(space, "g"), '_');
      fileType = "null";
      var setOfImgsId =  imgName.split('.');
      var fileExt = setOfImgsId[setOfImgsId.length-1];
      var setOfImgsId = setOfImgsId[0];
      var buscarCoincidencias = $("[id='" + setOfImgsId + "']");
      console.log(fileExt);

      switch (inputAccept) {
        case 'image':
              if(!(ACCEPTED_FILES.images.includes(fileExt))){
              $(input).trigger('click');
              $('.base-alert-extenfile h1').text('Este archivo no tiene formato de imagen');
              $('.base-alert-extenfile p').text('intenta subiendo archivos .png, .jpg, .jpeg, .gif');
              alertaFileEx();
            }else{
              ejecutaimgFuncion();
            }
       break;
      }

function  ejecutaimgFuncion(){
  input.setAttribute("data-title", imgName);
  var parentId = $('.den-prevnedit-plantilla').find('.actual-set-of-images');
  parentId = parentId.attr("id");
  singleParent = parentId;
  parentId = '#'+parentId;
  $('.addImage-input-onclick .base-nameoffile').text(imgName);
  if (!(imgName == '')) {
    if (!($('.addImage-input-onclick').hasClass('base-thishasfile'))) {
      var parentThis = $('.addImage-input-onclick').parent('.base-imagesforvideo-column');
      var forParentImage = parentThis.parent('.base-imagesforvideo-container');
      forParentImage = forParentImage.parent('.base-only-images');
      parentThis.addClass('base-gray-background');
      parentThis.children('.base-datos-edit-container').removeClass('base-display-hidden');
      $('.den-prevnedit-plantilla .actual-set-of-images .addImage-input-onclick .base-plus-span').text('');
      $("<i class='fas fa-images'></i>").appendTo('.actual-set-of-images .addImage-input-onclick .base-plus-span');
      $('.actual-set-of-images .addImage-input-onclick').addClass('base-thishasfile');
      $(".base-thishasfile .form-control-file").addClass('base-display-hidden');
      $('.den-prevnedit-plantilla .actual-set-of-images .base-thishasfile .base-datos-edit-container').removeClass('base-display-hidden');
      $(singleImageContainer).appendTo(parentId);
      var elementos = $('.den-prevnedit-plantilla').find('.base-imagesforvideo-column');
      var size = elementos.size();
      var idImageParent = setOfImgsId+size;
      var idParrafo = idImageParent+'_parrafo';
      var size = size * 110;
      $('.den-prevnedit-plantilla').find('.base-imagesforvideo-container').animate({scrollTop:size}, '3000');
      if (forParentImage.hasClass('base-imageparent-txt')) {
          $('.den-prevnedit-plantilla .base-agregar-parrafo textarea').removeClass('textarea-visible');
          $('.den-prevnedit-plantilla .base-agregar-parrafo textarea').addClass('den-hide');
          $('.den-prevnedit-plantilla .base-imagesforvideo-column').removeClass('imagePSelected');
          parentThis.attr('id', idImageParent);
          $("<textarea class='textarea-visible' placeholder='Escribe Un Texto'></textarea>").appendTo('.den-prevnedit-plantilla .base-agregar-parrafo');
          $('.textarea-visible').attr('id',idParrafo);
          $('.den-prevnedit-plantilla .fake-test-area').addClass('den-hide');
          parentThis.addClass('imagePSelected');
      }
    }
  }
}
$('.base-agrega-material').removeClass('addImage-input-onclick');
  }
    reader.readAsDataURL(input.files[0]);
  }
}
//
function readVideoUrl(input) {




  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {

      let imgData = e.target.result;
      let imgName = input.files[0].name;
      let tipoArchivo = input.files[0].type;
      tipoArchivo = tipoArchivo.split('/')


      var inputAccept = input.accept;
      inputAccept = inputAccept.split('/');
      inputAccept = inputAccept[0];
      var space = ' ';
      fileType = "null";
      imgName = imgName.replace(new RegExp(space, "g"), '_');
      var setOfImgsId =  imgName.split('.');
      var fileExt = setOfImgsId[setOfImgsId.length-1];
      var setOfImgsId = setOfImgsId[0];
      var buscarCoincidencias = $("[id='" + setOfImgsId + "']");

     console.log(tipoArchivo[0]);
      console.log(imgName);
      console.log(1);
      console.log(imgName);

      switch (inputAccept) {
        case 'video':
               if(!(ACCEPTED_FILES.video.includes(fileExt))){
              $(input).trigger('click');
              $('.base-alert-extenfile h1').text('Este archivo no tiene formato de video');
              $('.base-alert-extenfile p').text('intenta subiendo archivos .mp4, .vlc, .mov, .avi');
              alertaFileEx();
            }else{
              ejecutaFuncion(tipoArchivo[0],imgName);


            }
       break;
      case 'audio':
            if(!(ACCEPTED_FILES.audio.includes(fileExt))){
              $('.base-alert-extenfile h1').text('Este archivo no tiene formato de audio');
              $('.base-alert-extenfile p').text('intenta subiendo archivos .mp3, .wav');
              alertaFileEx();
         }else{
           ejecutaFuncion(tipoArchivo[0],imgName);
         }
      break;


      }

function ejecutaFuncion(tipoArchivo,imgName){

 alert(tipoArchivo,imgName);

  insertMultimedia($('.den-select :selected').val(),tipoArchivo,imgName,5);

  if (buscarCoincidencias.length == 0) {
    $('.addFile-input-onclick .base-nameoffile').text(imgName);
    input.setAttribute("data-title", imgName);

    if (!(imgName = '')) {
            if (!($('.addFile-input-onclick').hasClass('base-thishasfile'))) {
              $('.addFile-input-onclick .base-herramientas-video').removeClass('base-display-hidden');
              $('.base-agregar-parrafo').removeClass('cop_active');
              $('.base-agregar-parrafo').addClass('den-hide');
              $('.addFile-input-onclick').addClass('base-thishasfile');
              var conteo = $('.den-prevnedit-plantilla').find('.base-agregar-video.base-thishasfile');
              var conteo = conteo.size();
              $("<input type='number' class='contador-video' value=''>").appendTo('.addFile-input-onclick')
              var inputnum = $('.addFile-input-onclick input.contador-video');
              inputnum.val(conteo);
              conteo = conteo + 'Order';
              inputnum.attr('id', conteo);
              $('.base-agregar-video').css('border-color','#ede8e8');
              $('.addFile-input-onclick.base-thishasfile').css('border-color','#8ad3a0');
              $(".base-agregar-video.base-thishasfile input.form-control-file").css('display', 'none');
              $(".base-agregar-video.base-thishasfile input.contador-video").css('display', 'block');
              $('.addFile-input-onclick .base-plus-span').text('');
              /////// haciendo Distinción entre Audio y Video PADRES
              $(audioContainer).appendTo(".den-prevnedit-plantilla .base-only-audio");
              $(VideoContainer).appendTo(".den-prevnedit-plantilla .base-only-video");
              $("<i class='fas fa-video'></i>").appendTo('.den-prevnedit-plantilla .base-only-video .addFile-input-onclick .base-plus-span');
              $("<i class='fas fa-volume-up'></i>").appendTo('.den-prevnedit-plantilla .base-only-audio .addFile-input-onclick .base-plus-span');
              $("<div class='base-agregar-parrafo cop_active'></div>" ).appendTo('.den-prevnedit-plantilla .containerOfPagragraph');
              ///// PARA SET DE IMGS
                $('.den-prevnedit-plantilla .base-imagesforvideo-container').removeClass('actual-set-of-images');
                $('.den-prevnedit-plantilla .base-imagesforvideo-container').addClass('base-display-hidden');
                $("<div class='base-imagesforvideo-container actual-set-of-images' id=''>"+singleImageContainer+"</div>").appendTo(".den-prevnedit-plantilla .base-only-images");
                $('.den-prevnedit-plantilla .actual-set-of-images').attr('id', setOfImgsId);
                // para parrafo
                var setofParagraphs = setOfImgsId+'_txt';
               $('.den-prevnedit-plantilla .cop_active').attr('id',setofParagraphs);
            ///// PARA ACTIVIDADES
                $('.den-prevnedit-plantilla .base-actividad-container').removeClass('actividad-visible');
                $('.den-prevnedit-plantilla .base-actividad-container').addClass('base-display-hidden');
                $("<div class='base-actividad-container actividad-visible' id=''>"+singleActivContainer+"</div>").appendTo(".base-agregar-actividad");
                $('.den-prevnedit-plantilla .actividad-visible').attr('id', setOfImgsId);
            }
        else{
          $('.den-prevnedit-plantilla .actual-set-of-images').attr('id', setOfImgsId);
          $('.den-prevnedit-plantilla .actividad-visible').attr('id', setOfImgsId);
        //   $('.base-actividad-container').removeClass('base-display-hidden');
        //   $('.base-imagesforvideo-container').removeClass('base-display-hidden');
         }
      $('.base-agrega-material').removeClass('addFile-input-onclick');

      }
}
  else{

        $('.base-alert-samefilename').removeClass('den-hide').fadeIn('fast').animate({top: 450, opacity:1}, function(){
          setTimeout(function(){
               $('.base-alert-samefilename').fadeOut('fast');
            }, 3500);
        });

        setTimeout(function(){
          $('.base-alert-samefilename').addClass('den-hide');
          $('.base-alert-samefilename').css('top',' 0');
          $('.base-alert-samefilename').css('opacity',' 0');
            console.log('YA vuelvelo a hacer');
        }, 4000);
       var archivo = $('.addFile-input-onclick input.form-control-file').val();
       archivo = localStorage.archivo;
       var nombre = $('.addFile-input-onclick input.form-control-file');

       nombre = nombre[0].files;
       nombre = nombre[0].name;
       nombre = localStorage.nombreArchivo;
       localStorage.clear();
        $('.base-agrega-material').removeClass('addFile-input-onclick');
  }
}



    }
    reader.readAsDataURL(input.files[0]);
  }
}
// HELP CLICK
$(document).on('click', '.den-help', function() {
  var idHelp = '';
  var thisHelp = $(this).offset();
  var top = parseInt(thisHelp.top)+10;
  var left = parseInt(thisHelp.left)-5;
  idHelp = $(this).attr('id');
  txtHelpFind(idHelp);
  alert('tert');
  $('.den-popup-help-general').removeClass('den-hide');
  $('.den-dropmenuHelp').addClass('den-hide');
  $( ".den-popup-help-general" ).css({"top": top, "left": left});
});
$(document).on('click', '.den-closeHelp', function() {
  closeMulti();
});
$(document).on('click', '.base-imagesforvideo-column', function() {
  var id = $(this).attr('id');
  id = '#'+id+'_parrafo';
  var children = $(this).children('.base-agregar-imagen');
  if (children.hasClass('base-thishasfile')) {
    $('.den-prevnedit-plantilla .base-agregar-parrafo textarea').removeClass('textarea-visible');
    $('.den-prevnedit-plantilla .base-agregar-parrafo textarea').addClass('den-hide');
    $('.den-prevnedit-plantilla .base-imagesforvideo-column').removeClass('imagePSelected');
    $('.den-prevnedit-plantilla .fake-test-area').addClass('den-hide');
    id = $('.den-prevnedit-plantilla .base-agregar-parrafo').children(id);
    $(id).addClass('textarea-visible');
    $(id).removeClass('den-hide');
    $(this).addClass('imagePSelected');
  }
});
//HELP MENU click
$(document).on('click', '.helpmenu-btn', function() {
 $('.den-dropmenuHelp').toggleClass('den-hide');
 $('.den-popup-help-general').addClass('den-hide');
});
//

$(document).on('click', '.den-curso-title', function() {
  $('.den-curso-title ').removeClass('den-go-title');
  $('.den-curso-title ').removeClass('den-select-option');
  $(this).addClass('den-go-title');
  $(this).addClass('den-select-option');
  // $('.den-popup-cambiardetitle').removeClass('den-hide');
  // goToOtherTitle();
  closeMulti();
});

//

$(document).on('focus', 'input', function() {
  $('.den-dropmenuHelp').addClass('den-hide');
  $('.den-popup-help-general').addClass('den-hide');
});
$(document).on('click', 'select', function() {
  $('.den-dropmenuHelp').addClass('den-hide');
  $('.den-popup-help-general').addClass('den-hide');
});
//
$(document).on('click', '.editvideo', function() {
    closeMulti();
   localStorage.clear();
    $('.base-agrega-material').removeClass('addFile-input-onclick');
    var fileAEditar = $(this).parent('.base-herramientas-video').parent('.base-thishasfile');
    fileAEditar.addClass('addFile-input-onclick');
    var input = fileAEditar.children('input.form-control-file');
    input =  input.attr("data-title");
    localStorage.setItem('actualInput', input);
    localStorage.setItem('archivo', $('input[data-title = "'+input+'"]').val());
    input = $('input[data-title = "'+input+'"]');
    input = input[0].files;
    localStorage.setItem('nombreArchivo', input[0].name);
    fileAEditar.children('input.form-control-file').trigger('click');
    //
});
//

$(document).on('click', '.contador-video', function() {
    closeMulti();
  $('.base-agrega-material').removeClass('addFile-input-onclick');
  var thisinput = $(this);
  var inputval = thisinput.val();
  inputval = inputval + 'Order';
  var buscarCoincidencias = $("[id='" + inputval + "']");
  if (!(buscarCoincidencias.length == 0)) {
      $('.base-alert-sameOrder').removeClass('den-hide').fadeIn('fast').animate({top: 450, opacity:1}, function(){
        setTimeout(function(){
             $('.base-alert-sameOrder').fadeOut('fast');
          }, 2000);
      });
      setTimeout(function(){
        $('.base-alert-sameOrder').addClass('den-hide');
        $('.base-alert-sameOrder').css('top',' 0');
        $('.base-alert-sameOrder').css('opacity',' 0');
      }, 3500);
  }
  thisinput.attr('id', inputval);
});
$(document).on('click', '.base-agregar-video', function() {
    closeMulti();
  var thiselement =$(this);
  if (thiselement.hasClass('base-thishasfile')) {
    $('.den-prevnedit-plantilla .base-agregar-video').css('border-color','#ede8e8');
    thiselement.css('border-color','#8ad3a0');
    if (!(thiselement.hasClass('addFile-input-onclick'))) {
      findThisImgcontId(thiselement);
    }

  }else{
    $('.base-agrega-material').removeClass('addFile-input-onclick');
    thiselement.addClass('addFile-input-onclick');
  }
});
//
$(document).on('click', '.base-agregar-imagen', function() {
    $('.base-agregar-imagen').removeClass('addImage-input-onclick');
    $(this).addClass('addImage-input-onclick');
    closeMulti();
});
//
$(document).on('click', '.agregar-actividad-btn', function() {
  $('.den-paginasActiv-left').removeClass('btn-green-scroll');
  $('.den-paginasActiv-right').removeClass('btn-green-scroll');
  $('.den-popup-verarchivos .den-carouselpaginas-container').addClass('den-hide');
  $('.den-popup-verarchivos .den-carouselpaginas-container').removeClass('den-cp-visible');
  $('.den-popup-verarchivos .act-general-container').addClass('den-hide');
  $('.den-popup-verarchivos .act-general-container').removeClass('den-actividadid-visible');
  $('.activ-desability').removeClass('desability-on-style');
  $(".den-carousel-actividades *").prop('disabled',false);
  $(".cambiar-actividad-btn").addClass('den-hide');
  $(".cambiar-actividad-btn").css({height: '0', width: '0',opacity: '0'});
  var newIdPop = $(this).parent('.base-actividad-container');
  newIdPop = newIdPop.attr('id');
  var pagesRow = newIdPop+'_popPage';
  var actRow = newIdPop+'_actRow';
  $('.den-popup-verarchivos').removeClass('den-hide');
  $("<div class='den-carouselpaginas-container den-cp-visible'></div>").appendTo('.carouselpage-id');
  $('.den-carouselpaginas-container.den-cp-visible').attr('id',pagesRow);
  $("<div class='den-actividad-row act-general-container den-actividadid-visible'></div>").appendTo('.den-popup-verarchivos .den-column-center');
 $('.den-actividad-row.den-actividadid-visible').attr('id',actRow);
  $('body').addClass('den-stopscroll');
  window.scrollTo(0,0);
  closeMulti();
});
//

$(document).on('click', '.editimage', function() {
    $('.base-agregar-imagen').removeClass('addImage-input-onclick');
    var fileAEditar = $(this).parent('.base-datos-edit-container').parent('.base-imagesforvideo-column');
    fileAEditar = fileAEditar.find('.base-agregar-imagen');
    fileAEditar.addClass('addImage-input-onclick');
    fileAEditar.children('input').trigger('click');

});
//
$(document).on('click', '.delete-this-video', function() {
  $('.base-thishasfile').removeClass('eliminarThisFile');
  var fileAEliminar = $(this).parent('.base-herramientas-video').parent('.base-thishasfile');
  var forAudio = fileAEliminar.parent('.base-agregar-imagevideoaudio');
  fileAEliminar.addClass('eliminarThisFile');
  $('.den-popup-eliminarfile').removeClass('den-hide');
  closeMulti();
  if (forAudio.hasClass('base-only-audio')) {
      $('.den-popup-eliminarfile h2').text('¿Seguro que quieres eliminar este audio?');
  }else{
      $('.den-popup-eliminarfile h2').text('¿Seguro que quieres eliminar este video?');
  }
});
$(document).on('click', '.delete-this-image', function() {
  $('.base-imagesforvideo-column').removeClass('eliminarThisFile');
  var fileAEliminar = $(this).parent('.base-datos-edit-container').parent('.base-imagesforvideo-column');
  fileAEliminar.addClass('eliminarThisFile');
  $('.den-popup-eliminarfile').removeClass('den-hide');
    closeMulti();
  $('.den-popup-eliminarfile h2').text('¿Seguro que quieres eliminar esta imagen?');


});
$(document).on('click', '.eliminarEstaSeccion', function() {
  var h2Txt = $('.den-popup-eliminarfile h2').text();
  if( h2Txt == '¿Seguro que quieres eliminar este video?'){
    var findThisSetImg = $('.eliminarThisFile').find('input.form-control-file').attr("data-title").split('.');
    var findThisSetImg = '#'+((findThisSetImg)[0]);
    var parrafo = findThisSetImg+'_txt';
    //ACTIVIDAD
    var paginas = findThisSetImg+'_popPage';
    var actRow = findThisSetImg+'_actRow';
    paginas = $('.carouselpage-id').find(paginas);
    actRow = $('.den-popup-verarchivos .den-column-center').find(actRow);
    $(paginas).remove();
    $(actRow).remove();
    //
    $('.base-only-images').find(findThisSetImg).remove();
    $('.base-agregar-actividad').find(findThisSetImg).remove();
    $(".activ-desability").removeClass('desability-on-style');
      //

    $('.eliminarThisFile').remove();
    $('.den-popup-estilo').addClass('den-hide');
    $('.den-prevnedit-plantilla .fake-test-area').removeClass('den-hide');
  }
  if( h2Txt == '¿Seguro que quieres eliminar esta imagen?'){
   var imgid = $('.eliminarThisFile').attr('id');
   imgid = '#'+imgid+'_parrafo';
   imgid = $('.base-agregar-parrafo.cop_active').find(imgid);
   $(imgid).remove();
   $('.eliminarThisFile').remove();
   $('.den-prevnedit-plantilla .fake-test-area').removeClass('den-hide');
  }
  if ( h2Txt =='¿Seguro que quieres eliminar este audio?') {
    //
    var findThisSetImg = $('.eliminarThisFile').find('input.form-control-file').attr("data-title").split('.');
    var findThisSetImg = '#'+((findThisSetImg)[0]);
    var parrafo = findThisSetImg+'_txt';
    //ACTIVIDAD
    var paginas = findThisSetImg+'_popPage';
    var actRow = findThisSetImg+'_actRow';
    paginas = $('.carouselpage-id').find(paginas);
    actRow = $('.den-popup-verarchivos .den-column-center').find(actRow);
    $(paginas).remove();
    $(actRow).remove();
    //imagen
    $('.base-only-images').find(findThisSetImg).remove();
    $('.base-agregar-actividad').find(findThisSetImg).remove();
    //Parrafo
    parrafo =$('.containerOfPagragraph').find(parrafo);
    $(parrafo).remove();
    $('.eliminarThisFile').remove();
    $(".activ-desability").removeClass('desability-on-style');
    $('.den-prevnedit-plantilla .fake-test-area').removeClass('den-hide');
  }
  closeMulti();

  $('.den-popup-estilo').addClass('den-hide');
});

//Funciones generales de portal
//Cerrar popUps
$(document).on('click', '.closePopUp', function() {
     $('.input-popup-newtitle').val('');
     $('.den-popup-estilo').addClass('den-hide');
     $('.habilitar-cambio-pop').addClass('den-hide');
     $('.den-plantilla-title.den-select-option').removeClass('plantillaOnClick');
     $('body').removeClass('den-stopscroll');
        $('.den-plantilla-title').removeClass('plantillaOnClick');
     closeMulti();
   });
   $(document).on('click', '.closePopUpActividad', function() {
      $('.habilitar-cambio-pop').addClass('den-hide');
        closeMulti();
    });
//P R E V I S U A L I Z A R
$(document).on('click', '.den_previewplantilla_btn', function() {
  closeMulti();
   var id = $('.den-plantilla-title.den-select-option').attr('id');
   var id = id + 'Visual';
   $('.den-popup-previsualizar').removeClass('den-hide');
     closeMulti();
   $('body').addClass('den-stopscroll');
   window.scrollTo(0,0);
   plantillaPrev(id);

  });
  //Seleccionar ACTIVIDAD
  $(document).on('click', '.den-actividad-title', function() {
    $('.den-actividad-title').removeClass('den-select-option');
    $(this).addClass('den-select-option');
    $('.den-actividad-title.den-select-option').animate({scrollTop:0}, '500');
      closeMulti();
    });
      // Habilitar cambio
    $(document).on('click', '.cambiar-actividad-btn', function() {
      $('.habilitar-cambio-pop').removeClass('den-hide');
        closeMulti();
      });
//Seleccionar Valor

$(document).on('click', '.checkmarkValor', function() {
  $('.den-actividadid-visible .containerValor').removeClass('qa-selected-value');
  var n = $('.den-actividadid-visible .act-valorSection').find("input[name='valorLugar']");
  var padre = $(this).parent('.containerValor');
  n.prop( "checked", false );
  padre.addClass('qa-selected-value');
  var valorQA = padre.find('input').prop( "checked", true );
  valorQA = valorQA.val();
  funcionvalor(valorQA);
    closeMulti();
  });

//Agregar Pregunta
  $(document).on('click', '.act-btn-plus-pregunta', function() {
    $('.den-actividadid-visible .act-pregunta-row').removeClass('act-pregunta-select');
    $('.den-actividadid-visible .act-pregunta-row .base-filedelete').addClass('den-hide');
    //Variable
     var pregunta = $('.den-actividadid-visible .pagina-actividad-visible div.act-pregunta-oculta').clone();
     var elementos = $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-row');
     var size = elementos.size();
     var animar = size * 180;
     var p = $('.den-actividadid-visible .pagina-actividad-visible').attr('id');
     p = p.split('_');
     p = (p)[1];
     p = 'p'+p;
     var nameInput = $('.den-actividadid-visible .pagina-actividad-visible input.asignatename-group').attr('name');
     nameInput = p+nameInput+size;
     console.log(nameInput);
    //Clonar
     pregunta.addClass('act-pregunta-select');
     pregunta.removeClass('act-pregunta-oculta');
     pregunta.appendTo('.den-actividadid-visible .pagina-actividad-visible .act-column-right');
     $('.den-actividadid-visible .act-pregunta-select .base-filedelete').removeClass('den-hide');
       closeMulti();
    //Asignar un Name a estos Inpust
    var inputActual = $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select input.an-input-name');
    inputActual.removeClass('asignatename-group');
    inputActual.attr('name', nameInput);
    //Animación  window.scrollTo(0,0);
    $(".act-general-container").animate({scrollTop:animar}, '500');
  });
  //Agregar Respuesta
    $(document).on('click', '.act-btn-plus-respuesta', function() {
      var respuesta = $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select div.act-respuesta-oculta').clone();
      respuesta.removeClass('act-respuesta-oculta');
      respuesta.appendTo('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select');
      $('.den-actividadid-visible .act-pregunta-select .base-filedelete').removeClass('den-hide');
        closeMulti();
    });
    //Eliminar respuesta
    $(document).on('click', '.act-delete-answer', function() {
        $(this).parent('.act-respuesta-row').remove();
          closeMulti();
    });
    $(document).on('click', '.act-delete-question', function() {
        $(this).parent('.act-pregunta-row').remove();
          closeMulti();
    });
  //Seleccionar pregunta
  $(document).on('click', '.act-pregunta-row', function() {
      $('.den-actividadid-visible .act-pregunta-row .base-filedelete').addClass('den-hide');
      $('.den-actividadid-visible .act-pregunta-row').removeClass('act-pregunta-select');
      $(this).addClass('act-pregunta-select');
      $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select .base-filedelete').removeClass('den-hide');
        closeMulti();

  });

//Seleccionar Pagina
$(document).on('click', '.den-pagina-title', function() {
  //Guardar Valor
  var valorCheck = $('.den-actividadid-visible .pagina-actividad-visible').find('.qa-selected-value input').val();
  //
  $('.den-cp-visible .den-pagina-title').removeClass('den-select-option');
  $('.den-actividadid-visible .tipo-de-actividad').removeClass('pagina-actividad-visible');
  $('.den-actividadid-visible .tipo-de-actividad').addClass('den-hide');
  $(this).addClass('den-select-option');
  var findThisId = $('.den-cp-visible .den-pagina-title.den-select-option p').text();
  var space = ' ';
  findThisId = findThisId.replace(new RegExp(space, "g"), '_');
  findThisId = '#actividad'+findThisId;
  $(findThisId).addClass('pagina-actividad-visible');
  $(findThisId).removeClass('den-hide');
    closeMulti();
  //
  $('.den-actividadid-visible .pagina-actividad-visible .containerValor').removeClass('qa-selected-value');
  var n = $(".den-actividadid-visible .pagina-actividad-visible").find("input[name='valorLugar']");
  n.prop( "checked", false );
  $(".den-actividadid-visible .pagina-actividad-visible").find("input[value='"+valorCheck+"']").prop( "checked", true );
  $(".den-actividadid-visible .pagina-actividad-visible").find("input[value='"+valorCheck+"']").parent('.containerValor').addClass('qa-selected-value');
  var valorQA = valorCheck;
  funcionvalor(valorQA);
  });
// Agregar Pagina
  $(document).on('click', '#agregarPagina', function() {

    var m = $('.den-actividadid-visible .pagina-actividad-visible').length;
    var valorCheck = $('.den-actividadid-visible .pagina-actividad-visible').find('.qa-selected-value input').val();
    $('.den-carouselpaginas-container.den-cp-visible .den-pagina-title').removeClass('den-select-option');
    $('.den-actividadid-visible .tipo-de-actividad').removeClass('pagina-actividad-visible');
    $('.den-actividadid-visible .tipo-de-actividad').addClass('den-hide');
    //apend Pagina al Carrusel
    $("<div class='den-pagina-title den-select-option'><p></p></div>").appendTo(".den-carouselpaginas-container.den-cp-visible");
    //apend Pagina al Container
    $("<div class='tipo-de-actividad pagina-actividad-visible'></div>").appendTo(".act-general-container.den-actividadid-visible");

    //Generando id y txts
    var parentwidth = $('.den-cp-visible.den-carouselpaginas-container').width();
    var width = $('.den-cp-visible .den-pagina-title').width();
    var elementos = $('.den-cp-visible .den-pagina-title');
    var size = elementos.size();
    number = size + 1;
    width = width*number;
    var saveNewTxt = 'Pagina '+size;
    var saveNewId = 'actividadPagina_'+size;
    size = size * 170;
    $('.den-actividadid-visible .pagina-actividad-visible').attr('id', saveNewId );
    $('.den-cp-visible .den-pagina-title.den-select-option p').text(saveNewTxt);
    var id = $('.den-actividad-title.den-select-option').attr('id');
    var callingTxt = [id]+'.txt';
    // id = $('.den-selectActivity-container').find('#'+id);
    jQuery.get('actividades/'+callingTxt).success(function (datos) {
    var changethis = $('.den-actividadid-visible .pagina-actividad-visible').html(datos);
        // id.html(datos);
        if(!( m == 0)){
            changethis.find('.containerValor').removeClass('qa-selected-value');
            var n = changethis.find("input[name='valorLugar']");
            n.prop( "checked", false );
            changethis.find("input[value='"+valorCheck+"']").prop( "checked", true );
            changethis.find("input[value='"+valorCheck+"']").parent('.containerValor').addClass('qa-selected-value');
            var valorQA = valorCheck;
            funcionvalor(valorQA);
        }

        if (parentwidth<=width) {
          $('.den-paginasActiv-left').addClass('btn-green-scroll');
          if (elementos.scrollLeft()==0) {
            $('.den-paginasActiv-right').removeClass('btn-green-scroll');
          }
        }
    });
    //Desabilitar las Actividades
    $(".den-carousel-actividades *").prop('disabled',true);
    $(".activ-desability").addClass('desability-on-style');
    $(".cambiar-actividad-btn").removeClass('den-hide');
      closeMulti();
    setTimeout(function(){
      $(".cambiar-actividad-btn").animate({height: '50px', opacity: '0.8'}, "200");
      $(".cambiar-actividad-btn").animate({width: '120px', opacity: '1'}, "slow");
    }, 500);
    //VALOR

    //Animar carrusel de paginas
    $(".den-carouselpaginas-container.den-cp-visible").animate({scrollLeft:size}, '500');
  });
// Eliminar Actividad
  $(document).on('click', '#acivityDeleteBtn', function() {
    $('.den-cp-visible .den-pagina-title').remove();
    $(".den-actividadid-visible .tipo-de-actividad").remove();
    $(".cambiar-actividad-btn").addClass('den-hide');
    setTimeout(function(){
      $(".cambiar-actividad-btn").animate({height: '0', width: '0',opacity: '0'}, "fast");
    }, 50);
    $(".den-carousel-actividades *").prop('disabled',false);
    $(".activ-desability").removeClass('desability-on-style');
    $('.habilitar-cambio-pop').addClass('den-hide');
  });
  // Guardar Actividad
    $(document).on('click', '#saveChangesActivity', function() {
      var popImg = $('.den-popup-verarchivos').find('.den-actividad-title.den-select-option img').clone();
      var back = $('.base-actividad-container.actividad-visible');
      var actividadId = $(".act-general-container.den-actividadid-visible").attr('id');
      actividadId = '#'+actividadId;
      actividadId = $('.den-popup-verarchivos').find(actividadId);
      if (actividadId.hasClass('editando-actividad')) {
          var imagedelete = back.find('.actividad-guardada-container .save-image img');
          imagedelete.remove();
          var imagechange = back.find('.actividad-guardada-container .save-image');
          $(popImg).appendTo(imagechange);
      }else{
        $(saveActivContainer).appendTo(back);
        back.find('.agregar-actividad-btn').remove();
        var image = back.find('.actividad-guardada-container .save-image');
        $(popImg).appendTo(image);
        actividadId.addClass('editando-actividad');
      }
      $('.den-popup-verarchivos').addClass('den-hide');
        closeMulti();
    });
  // Editar Actividad
  $(document).on('click', '#editPopUpAct ', function() {
    $('.den-popup-verarchivos .den-actividad-title').removeClass('den-select-option');
    $('.act-general-container').removeClass('den-actividadid-visible');
    $('.act-general-container').addClass('den-hide');
    $('.den-carouselpaginas-container').removeClass('den-cp-visible');
    $('.den-carouselpaginas-container').addClass('den-hide');
    //

    //
    var selectimage = $('.actividad-visible .save-image img').attr('src');
    selectimage = $('.den-popup-verarchivos .den-carousel-actividades').find("img[src$='" + selectimage + "']");
    selectimage = selectimage.parent('.den-actividad-title').addClass('den-select-option');
    var idBase = $('.actividad-visible').attr('id');
    var idPages = '#'+idBase+'_popPage';
    var idActividad = '#'+idBase+'_actRow';
    $('.den-popup-verarchivos').removeClass('den-hide');
///

    idActividad = $('.den-column-center').find(idActividad);
    idActividad.removeClass('den-hide');
    idActividad.addClass('den-actividadid-visible');
    idPages =$('.carouselpage-id').find(idPages);
    var numberPages = idPages.find('.den-pagina-title').size();
    idPages.removeClass('den-hide');
    idPages.addClass('den-cp-visible');

    if (numberPages){
      $('.den-paginasActiv-right').addClass('btn-green-scroll');
       $('.den-paginasActiv-left').addClass('btn-green-scroll');
    }
    //
    closeMulti();
    $(".den-carousel-actividades *").prop('disabled',false);
    $(".cambiar-actividad-btn").removeClass('den-hide');
    $(".cambiar-actividad-btn").css({height: '50px', width: '120px', opacity: '1'});
    $('body').addClass('den-stopscroll');
    window.scrollTo(0,0);
  });
  $(document).on('click', '#surePopUpAct', function() {
    $('.den-popup-eliminar-actSave').removeClass('den-hide');
      closeMulti();
    $('body').addClass('den-stopscroll');
    window.scrollTo(0,0);
  });
  $(document).on('click', '#deleteSavePopUpAct', function() {
    var basicId = $('.actividad-visible').attr('id');
    var pagesId = '#'+basicId+'_popPage';
    pagesId = $('.carouselpage-id').find(pagesId);
    var activityId = '#'+basicId+'_actRow';
    activityId = $('.den-popup-verarchivos .den-column-center').find(activityId);
    $(pagesId).remove();
    $(activityId).remove();
    $('.actividad-visible .actividad-guardada-container').remove();
    $(singleActivContainer).appendTo(".base-actividad-container.actividad-visible");
    $('.den-popup-eliminar-actSave').addClass('den-hide');
    closeMulti();
  });
  //Templete 4 subir
  $(document).on('click', '.click-fake-input', function() {
    $('input.tem4-control').trigger('click');
      closeMulti();
  });
  $(document).on('keypress', '.input-popup-newtitle', function(e) {
    if (e.keyCode == 13) {
      e.preventDefault();

      accion = "insert";

      var saveNewTxt = $(".input-popup-newtitle").val();
      alert(saveNewTxt);

          $.ajax({
            url: "php/funcionalidad.php",
            type: 'post',
            data: {cursoName: saveNewTxt, idCurso: $('.den-select :selected').val(),  funcion: accion, tipo:"FDFG343", "constraint":"1"},
            success: function(result){
                   alert(result);
                   createNewTitle(result);
          }});

    }
  });

//
$(document).ready(function(){
//Controles Pantallas Crear y Seleccionar

$("#generarNuevaPantallaBtn").click(function(){
       accion = "insert";
      var saveNewTxt = $(".input-popup-newtitle").val();
      alert(saveNewTxt);
          $.ajax({
            url: "php/funcionalidad.php",
            type: 'post',
            data: {cursoName: saveNewTxt, idCurso: $('.den-select :selected').val(), funcion: accion, tipo:"FDFG343", constraint:"1"},
            success: function(result){

            createNewTitle(result);
          }});





   });


 $('#agregarNuevoTitulo').click(function() {
    $('.den-popup-newtitle').removeClass('den-hide');
      closeMulti();
 });

 $('#cambiarDeTitulo').click(function() {
   var id = $('.den-plantilla-title.plantillaOnClick').attr('id');
   $('.den-plantilla-title').removeClass('den-select-option');
   $('.den-plantilla-title.plantillaOnClick').addClass('den-select-option');
   $('.den-plantilla-title').removeClass('plantillaOnClick');
   $('.den-plantilla-title.den-select-option').animate({scrollTop:0}, '500');
   plantillaSelect(id);
   $('.den-popup-cambiardetitle').addClass('den-hide');

 });

 //Seleccionar PLANTILLA
 $('.den-plantilla-title').click(function() {
   closeMulti();
   if (!($(this).hasClass('den-select-option'))) {
     var buscarCoincidencias = $('.den-plantilla-title.plantillaOnClick');
     if (buscarCoincidencias.length == 0) {
        $(this).addClass('plantillaOnClick');
        $('.den-popup-cambiardetitle').removeClass('den-hide');
     }
   }
 });
//Caruseles Controles
 $(".den-btn-bottom").click(function(){

     /////CLASS
       var plantilla = $('.den-plantilla-title');
       var size = plantilla.size();
       size = size-4;
       plantilla = plantilla.outerHeight();
       size = size * plantilla;
       $(".den-btn-top").addClass('btn-green-scroll');
        if ($(".den-carousel-column").scrollTop()>=size) {
        $(".den-btn-bottom").removeClass('btn-green-scroll');
        }
     $(".den-carousel-column").animate({scrollTop:'+=162'}, '500');

      closeMulti();
  });
  $(".den-btn-left").click(function(){
      closeMulti();
    $(".den-carousel-container").animate({scrollLeft:'-=200'}, '500');
    //
    var elementos = $('.den-curso-title');
    var width = elementos.width();
    var parentwidth = $('.den-carousel-container').width();
    var size = elementos.size();
    width = width*size;
    if (parentwidth<=width) {
    var offset = $('#titlePantalla_1').offset();
    offset = parseInt(offset.left);
      $('.den-btn-right').addClass('btn-green-scroll');
      if (offset > 0) {
        $('.den-btn-left').removeClass('btn-green-scroll');
      }
    }
   });
   $(".den-btn-right").click(function(){
       closeMulti();
        $(".den-carousel-container").animate({scrollLeft:'+=200'}, '500');
        //

        var elementos = $('.den-curso-title');
        var width = elementos.outerWidth();
        var parentwidth = $('.den-carousel-container').outerWidth();
        var size = elementos.size();
        width = width*size;
        if (parentwidth<=width) {
           $('.den-btn-left').addClass('btn-green-scroll');
           size = size-3;
           size =  size * $('.den-curso-title').outerWidth();
           var scroll = $('.den-carousel-container').scrollLeft() + $('.den-curso-title').outerWidth();
          if (scroll==size) {
            $('.den-btn-right').removeClass('btn-green-scroll');
          }
        }

    });
    $(".den-paginasActiv-right").click(function(){
        closeMulti();
         $(".den-carouselpaginas-container.den-cp-visible").animate({scrollLeft:'+=170'}, '500');
         //
         var elementos = $('.den-cp-visible').find('.den-pagina-title');
         var width = elementos.outerWidth();
         var parentwidth = $('.den-carouselpaginas-container').outerWidth();
         var size = elementos.size();
         width = width*size;
         if (parentwidth<=width) {
            $('.den-paginasActiv-left').addClass('btn-green-scroll');
            size = size-3;
            size =  size * $('.den-pagina-title').outerWidth();
            var scroll = $('.den-carouselpaginas-container.den-cp-visible').scrollLeft() + $('.den-pagina-title').outerWidth();
           if (scroll==size) {
             $('.den-paginasActiv-right').removeClass('btn-green-scroll');
           }
         }

     });
     $(".den-paginasActiv-left").click(function(){
         closeMulti();
         $(".den-carouselpaginas-container.den-cp-visible").animate({scrollLeft:'-=170'}, '500');
         //

         var elementos = $('.den-cp-visible').find('.den-pagina-title');
         var width = elementos.outerWidth();
         var parentwidth = $('.den-carouselpaginas-container').outerWidth();
         var size = elementos.size();
         width = width*size;
         console.log($('.den-carouselpaginas-container.den-cp-visible').scrollLeft());
         if (parentwidth<=width) {
            $('.den-paginasActiv-right').addClass('btn-green-scroll');
            one =  $('.den-pagina-title').outerWidth();
            var scroll = $('.den-carouselpaginas-container.den-cp-visible').scrollLeft();
           if (scroll==one) {
             $('.den-paginasActiv-left ').removeClass('btn-green-scroll');
           }
         }
         // var elementos = $('.den-cp-visible').find('.den-pagina-title');
         // var width = elementos.outerWidth();
         // var parentwidth = $('.den-carouselpaginas-container').outerWidth();
         // var size = elementos.size();
         // width = width*size;
         // if (parentwidth<=width) {
         // var offset = $('.den-cp-visible .den-pagina-title').first();
         // offset = offset.offset();
         // offset = parseInt(offset.left);
         // console.log(offset);
         //   $('.den-paginasActiv-right').addClass('btn-green-scroll');
         //   if (offset > 0) {
         //     $('.den-paginasActiv-left').removeClass('btn-green-scroll');
         //   }
         // }
      });

  $(".den-btn-top").click(function(){
      closeMulti();
     $(".den-carousel-column").animate({scrollTop:'-=162'}, '500');
       /////CLASS
       var plantilla = $('.den-plantilla-title').outerHeight();
       $(".den-btn-bottom").addClass('btn-green-scroll');
          if ($(".den-carousel-column").scrollTop()<=plantilla) {
          $(".den-btn-top").removeClass('btn-green-scroll');
          }

   });
   $(".actividadlist-btn-top").click(function(){
       closeMulti();
        $(".den-carousel-act-column").animate({scrollTop:'-=162'}, '500');
        /////CLASS
        var actividad = $('.den-actividad-title').outerHeight();
        $(".actividadlist-btn-bottom").addClass('btn-green-scroll');
           if ($(".den-carousel-act-column").scrollTop()<=actividad) {
           $(".actividadlist-btn-top").removeClass('btn-green-scroll');
           }
    });
    $(".actividadlist-btn-bottom").click(function(){
      /////CLASS
        var actividad = $('.den-actividad-title');
        var size = actividad.size();
        size = size-4;
        actividad = actividad.outerHeight();
        size = size * actividad;
        $(".actividadlist-btn-top").addClass('btn-green-scroll');
         if ($(".den-carousel-act-column").scrollTop()>=size) {
         $(".actividadlist-btn-bottom").removeClass('btn-green-scroll');
         }
         //
        closeMulti();
         $(".den-carousel-act-column").animate({scrollTop:'+=162'}, '500');
     });
});
//////
function testMeida (files){
  for(var i = 0; i<files.length; i++){
    var file = files[i];
    var fileName = file.name;
    var fileExt = file.type.split('/');
    fileExt = fileExt[fileExt.length - 1];
    var fileType = "null";
    console.log(fileExt);
    if(ACCEPTED_FILES.images.includes(fileExt))
      fileType = "image";
    if(ACCEPTED_FILES.video.includes(fileExt))
      fileType = "video";
    if(ACCEPTED_FILES.audio.includes(fileExt))
      fileType = "audio";
    if(fileType != "null"){
     if (true) {

     }
     if (true) {

     }
    }
    else{
      alert(fileName + " no es un archivo valido. Es " + fileExt);
    }
  }
}
var addMedia = function(files){
  // Iterar archivos
  for(var i = 0; i<files.length; i++){
    var file = files[i];
    var fileName = file.name;
    var fileExt = file.type.split('/');
    fileExt = fileExt[fileExt.length - 1];
    var fileType = "null";
    console.log(fileExt);
    if(ACCEPTED_FILES.images.includes(fileExt))
      fileType = "image";
    if(ACCEPTED_FILES.video.includes(fileExt))
      fileType = "video";
    if(ACCEPTED_FILES.audio.includes(fileExt))
      fileType = "audio";
    if(fileType != "null"){
      switch(fileType){
           case "image":
             console.log('image');
             break;
           case "audio":
          console.log('audio');
             break;
           case "video":
          console.log('video');
             break;
         }
     // var formData = new FormData(file);
     // formData.append('file', file);
     //  // formData.append('data', new Array(getUser(), getCourseName()));
     //  //
     //  Modelo.uploadFile(formData, function(data){
     //    data = JSON.parse(data);
     //    fileLocation = location.origin + "/captura/php/" + data['location'];
     //    var mediaId = parseInt(i)+parseInt(maxMediaId);
     //    switch(fileType){
     //      case "image":
     //        HtmlElements.container_media.innerHTML += MediaManagement.getImageHtml(
     //                                    fileLocation,
     //                                    parseInt(mediaId), 0);
     //        break;
     //      case "audio":
     //        $(HtmlElements.container_media).find('[data-type="audio"]').remove();
     //        HtmlElements.container_media.innerHTML += MediaManagement.getAudioHtml(
     //                                    fileLocation,
     //                                    parseInt(mediaId));
     //        break;
     //      case "video":
     //        $(HtmlElements.container_media).find('[data-type="video"]').remove();
     //        HtmlElements.container_media.innerHTML += MediaManagement.getVideoHtml(
     //                                    fileLocation,
     //                                    parseInt(mediaId));
     //        break;
     //    }
     //  });

    }
    else{
      alert(fileName + " no es un archivo valido. Es " + fileExt);
    }
  }
}
