var videoCounter=0;
var audioCounter=0;
//we use this to reload with CLICK
var idContenidoClick=null;
var idPlantillaActividad=null;
var activityContent=null;
//var userId=null;
//*******Uncomment for testing*****/
var userId=localStorage.getItem('currentUserId');
reloadStoredModules();
//*******ends block Uncomment for testing*****/
//

var g_idModulo = "";

var ACCEPTED_FILES = {images:['png','jpg','jpeg','gif'],
video:['mp4','vlc','mov','avi'],
audio:['mp3','wav'] };

function killPopupYesNo(popIdentifier){
  $(".makepop_"+popIdentifier).remove();
}

function makePopupYesNo(popIdentifier, popTitle, popText, popYes, popNo, popYes_callback, popNo_callback){
  var pop = `
  <div class="makepop_:popIdentifier: den-popup-estilo">
    <span class="closePopUp popupF-killPopup">x</span>
    <h2 class="changeBetweenThemeTemplate">:popTitle:</h2>
    <p>:popText:</p>
    <button type="button" name="button" class="popupF-Yes f-popup-acceptable">:popYes:</button>
    <button type="button" name="button" class="popupF-killPopup">:popNo:</button>
  </div>`;

  // Identificador de boton si
  var pop_idYes = ".popupF-Yes";
  // Identificador de boton no
  var pop_idNo = ".popupF-killPopup";

  pop = pop.replace(":popText:", popText)
            .replace(":popTitle:", popTitle)
            .replace(":popYes:", popYes)
            .replace(":popNo:", popNo)
            .replace(":popIdentifier:", popIdentifier);

  $(pop).prependTo('body');

  $(pop_idYes).off('click');
  $(pop_idNo).off('click');
  $(pop_idYes).on('click', popYes_callback);
  $(".popupF-killPopup").on("click", popNo_callback);
  $(pop_idNo).on('click', popNo_callback);
}
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
//STEPS

$("#plat_create__top_goToDashboard_btn").click(function(){
  window.location.href = "../../dashboard/"
});

$(document).on('click', 'ul.den-dropmenuHelp li', function(){
  var title = $(this).text();
  var step = localStorage.getItem('pasoUvimex');
    $('<div class="fullShadowTuto"></div>').prependTo('body');
  if (step > -1) {
    $("<div class='pasoscontainer'><div class='pasosrelative'><h1>"+title+"</h1><button>Cerrar Tutorial</button></div></div>").appendTo('.fullShadowTuto');
  }
  var id = $(this).attr('id');
  id = id.slice(4);

  if (id == "helpPantallaSelect") {
    var idHelp;
    var shortid = id.slice(0,-6);
    $('#'+shortid).trigger('click');
    var thisHelp = $('#'+shortid).offset();
    var top = parseInt(thisHelp.top);
    var left = parseInt(thisHelp.left);
    idHelp = id;
    txtHelpFind(idHelp, top, left);
    id = '#ilumina'+shortid;
  }else{
    if (id == 'helpCursoSelect') {
      var idHelp;
      var shortid = id.slice(0,-6);
      $('#'+shortid).trigger('click');
      var thisHelp = $('#'+shortid).offset();
      var top = parseInt(thisHelp.top);
      var left = parseInt(thisHelp.left);
      idHelp = id;
      txtHelpFind(idHelp, top, left);
      id = '#iluminahelpCursoSelect';
    }else{
      $('#'+id).trigger('click');
      id = '#ilumina'+id;
    }
  }

  $('body').addClass('overflownot');
  $(id).addClass('selectedHelpIn');
  $('.den-dropmenuHelp').addClass('den-hide');
  if (step > -1) {
    step = parseInt(step)+1;
    localStorage.setItem('pasoUvimex',step);
  }
});

//Text For Help

function txtHelpFind(idHelp, top, left) {
  var textHelp;
  switch (idHelp) {
    case 'helpCurso':
    textHelp = 'Para Crear Un Nuevo Curso Da Click En El Botón de "Agregar Curso" y Llena los Campos del PopUp que te aparecerá';
    top = top - 65;
    $('.den-popup-help-general').css('max-width','250px');
    break;
    case 'helpCursoSelect':
    textHelp = 'Selecciona uno de los módulos que ya hayas ingresado.';
    top = top - 65;
    break;
    case 'helpPantalla':
    textHelp = 'Para agregar un nuevo tema dentro de un Curso da Click En El Botón de "Agregar Tema" y Llena los Campos del PopUp que te aparecerá.';
    top = top - 45;
    break;
    case 'helpPantallaSelect':
    textHelp = 'Selecciona un tema ya creado dando click sobre este';
    top = top - 45;
    break;
    case 'helpPrevew':
    textHelp = 'Previsualiza las diferentes maneras en que se vera tu curso en distintos dispositivos.';
    top = top - 85;
    left = left - 45;
    break;
    case 'helpPlantilla':
    textHelp = 'Elige la plantilla que deseas segun los elementos que incluirás en esta pantalla.';
    break;
    case 'helpActividad':
    textHelp = 'Elige el tipo de actividad que deseas agregar.';
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
    case 'helpSave':
    textHelp = 'Los cambios que guardes no podrán recuperarse, no se visualizarán por tus alumnos hasta que no sean publicados.';
    top = top - 95;
    left = left - 45;
    break;
    case 'helpPublicar':
    textHelp = 'Los cambios se guardarán automaticamente, y se visualizarán por tus alumnos hasta que no sean publicados.';
    top = top - 95;
    left = left - 45;
    break;
    case 'helpTempParrafo':
    textHelp = 'En esta área escribe y edita el texto.';
    break;

  };
  $('.den-popup-help-general p').text(textHelp);
  $( ".den-popup-help-general" ).css({"top": top, "left": left});
}
//
function plantillaSelect(id){
  id= (id!="unknown") ? id : $(".den-plantilla-title.den-select-option").attr('id');
  var callingTxt = '../templates/'+[id]+'.txt';
  //titulo
  var texto = $('.den-curso-title.den-select-option p').text();
  //$idTema
  var idTema=$('.den-curso-title.den-select-option').data("idtema");
  console.warn('debera cargar',callingTxt);
  jQuery.get( callingTxt, function(datos) {
     $('.den-prevnedit-plantilla').empty();
    var inyectarDatos = $('.den-prevnedit-plantilla').html(datos);
    var title  = inyectarDatos.find('input.base-title');
    title.val(texto);
    var idTema=null;
    idTema=$(".den-carousel-container").find('.den-select-option').data('idtema');
    //  load single Theme
    if(idTema){
       var theme = new Themes();
       theme.idTema=idTema;
       var themesArray=theme.getSingleTheme();
       var activity = new Activity();
       activity.idTema=idTema;
       var activitiesArray=activity.getSingleActivity();
       activityContent=activitiesArray;
       if(themesArray[0].titulo){
         loadSavedData(themesArray);
       }
       var themeFiles=theme.getThemeFiles();
       if(themeFiles!=""){
         loadSavedFiles(themeFiles);
       }
       if( activitiesArray && activitiesArray[0].plantillaActividad){
         loadSavedActivities(activitiesArray)
       }else{
         //get video
         var videoName=$(".base-agrega-material.base-agregar-video.selected-video.base-thishasfile").find(".base-nameoffile").text();
         $(`<div class='base-actividad-container actividad-visible' id='${videoName}'>${singleActivContainer}</div>`).prependTo(".base-agregar-actividad");
         console.warn('terminó de ejecutar else');
       }
    }else{
      console.warn("es nuevo");
    }
  });
  $('.den-select-option').removeClass('plantillaOnClick');
}
//nUEVA PANTALLA
var saveNewTxt;
function createNewTitle(idTema){
  console.log("create theme");
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
    closeSteps();
  };
  function buscarTexto(idTema){
    if(buscarCoincidencias.length === 0){
      console.warn('coincidencias fue 0');
      var elementos = $('.den-curso-title');
      var width = $('.den-curso-title').width();
      var parentwidth = $('.den-carousel-container').width();
      var size = elementos.length;
      var number = size + 1;
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
      // $('<div class="den-pantalla-space den-prevnedit-plantilla"></div>').appendTo('#containerOfScreens');
      $('#containerOfScreens').addClass('green_lineGlow');
      $('.den-prevnedit-plantilla').attr('id',idPantalla);
      //
      $('.den-curso-title.den-select-option p').text(saveNewTxt);
      $('.den-popup-newtitle').addClass('den-hide');
      $(".den-carousel-container").animate({scrollLeft:size}, '500');
      // Reflejar en el Input
      var id = $('.den-plantilla-title.den-select-option').attr('id');
      plantillaSelect(id);
      $("#temaPadre").val(id);

      $('.den-popup-newtitle input').val('');
      if (parentwidth<=width) {
        $('.den-btn-left').addClass('btn-green-scroll');
        if (elementos.scrollLeft()==0) {
          $('.den-btn-left').removeClass('btn-green-scroll');
        }else{
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
  var thisId = $('.den-curso-title.den-go-title.den-select-option').attr('id');
  thisId = thisId.split('_');
  thisId = '#Pantalla_'+((thisId)[1]);
  thisId = $('#containerOfScreens').find(thisId);
  thisId.removeClass('den-hide');
  thisId.addClass('den-prevnedit-plantilla');
  if($("#contenedorCurso").attr('class')){
    var plantillaSelect = $('.den-prevnedit-plantilla').find('#contenedorCurso');
    plantillaSelect = plantillaSelect.attr('class');
    plantillaSelect = plantillaSelect.split('_');
    plantillaSelect = (plantillaSelect[0]);
    // $('.den-plantilla-title').removeClass('den-select-option');
    // $('#'+plantillaSelect).addClass('den-select-option');

    //
    $('.den-curso-title').removeClass('den-go-title');

    // $('.den-popup-cambiardetitle').addClass('den-hide');
    // Reflejar en el Input
    // var texto = $('.den-curso-title.den-select-option p').text();
    // var input = $('#contenedorCurso #tituloCurso').children('input.base-title');
    // input.val(texto);
    //
  }
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
  console.warn(`se pusop en el id pre_${idPlantillaActividad}.html`);
  var titulo = $('.den-prevnedit-plantilla .base-container-title input').val();
  var actividad = `../actividades/previews/pre_${idPlantillaActividad}.html`; /*Esto esta harcord debe de saber que actividad es*/
  var subtitulo = $('.den-prevnedit-plantilla .base-container-subtitle input').val();
  var callingTxt = '../templates/'+[id]+'.txt';
  jQuery.get( callingTxt, function(datos) {
    var inyectarDatos = $('.den-cont-plantillaprevew').html(datos);
    inyectarDatos.find('.tem-title').text(titulo);
    inyectarDatos.find('.tem-subtitle').text(subtitulo);
    inyectarDatos.find('.tem-actividades-container').load(actividad, function() {
      console.error('las actividades tienen',activityContent);
      if(idPlantillaActividad){
        var printActivity="";
        switch(idPlantillaActividad){
          case "actividad0":
          break;
          case "actividad1":
          break;
          case "actividad3":
            for (var i = 0; i < activityContent.length; i++) {
              printActivity+=`<div class="renglonAct">
                                <h2><span class="numbersAct">${i+1}</span>${activityContent[i].strPregunta}</h2>
                                <input class="shortanswerdact" type="text" name="answer[${i}]" value="" placeholder="Escribe tu respuesta...">
                              </div>`;
            }
          break;
          case "actividad4":
          break;
          case "actividad5":
            for (var i = 0; i < activityContent.length; i++) {
              if(activityContent[i].respuestasArr.length>0){
                printActivity+=`<div class="renglonAct">
                                  <h2><span class="numbersAct">${i+1}</span>${activityContent[i].strPregunta}</h2>`;
                for (var j = 0; j < activityContent[i].respuestasArr.length; j++) {
                  printActivity+=` <div class="multianswerdRow">
                                      <div class="actContainer">
                                        <input class="actInput actInputEv" type="radio" checked="checked" name="radio${i}" data-plantillaAct="${activityContent[i].plantillaActividad}" data-correct="${activityContent[i].respuestasArr[j].correcta}">
                                      </div>
                                      <p>${activityContent[i].respuestasArr[j].strRespuesta}</p>
                                    </div>
                                  `;
                }
                 printActivity+=`</div>`;
              }
            }
          break;
          case "actividad2":
          case "actividad6":
            for (var i = 0; i < activityContent.length; i++) {
              if(activityContent[i].respuestasArr.length>0){
                printActivity+=`<div class="renglonAct">
                                  <h2><span class="numbersAct">${i+1}</span>${activityContent[i].strPregunta}</h2>`;
                for (var j = 0; j < activityContent[i].respuestasArr.length; j++) {
                  printActivity+=` <div class="multianswerdRow">
                                      <div class="actfb" data-idansw="${activityContent[i].respuestasArr[j].idRespuesta}" data-idtema="${activityContent[i].idTema}" data-idact="${activityContent[i].idActividad}" data-plantillaAct="${activityContent[i].plantillaActividad}" data-correct="${activityContent[i].respuestasArr[j].correcta}">
                                      </div>
                                      <p>${activityContent[i].respuestasArr[j].strRespuesta}</p>
                                    </div>
                                      `;
                }
                printActivity+=`</div>`;
              }
            }
          break;
        }
         $('.actContfull').html(printActivity);
      }




    });

  });
}
// function actividadTipo(id){
//     var callingTxt = [id]+'.txt';
//     jQuery.get('actividades/'+callingTxt).success(function (datos) {
//         $('.pagina-actividad-visible').html(datos);
//     });
// }
var singleActivContainer =`<button class="green-btn agregar-actividad-btn" type="button">Agregar Actividad</button>`;
var saveActivContainer = `<div class='actividad-guardada-container'>\
<div class='save-image'></div>\
<div class = 'savedbuttons'>\
<button id="editPopUpAct" type="button">Editar</button>\
<button id="surePopUpAct" type="button">Eliminar</button>\
</div>\
</div>`;
var singleImageContainer = `<div class='base-imagesforvideo-column' data-type='image'>\
<div class='base-agrega-material base-agregar-imagen'>\
<span class='base-plus-span'>+</span>\
<input type="hidden" name="belongsToVideo[]" value="">
<input type='file' accept='image/*' onchange='readImageUrl(this)' name=img[] class='form-control-file'>\
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
<label>Minuto:</label><input type='number' min='0' placeholder='Minutos' name='minutes[]' class='file_mins interface_input' value='' data-field='img_mins' onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;';>\
</div>\
<div class='base-input-field'>\
<label>Segundo:</label><input type='number' min='1' placeholder='Segundos' name='seconds[]' class='file_secs interface_input' onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;'; value='' data-field='img_secs'>\
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
<input type="hidden" name="belonger[]" value="">\
<input type='file' accept='video/*' type='file ' class='form-control-file' consecutivo='' id='nuevoMultimedia' name="video[]" onchange='readVideoUrl(this)'>\
<div class='base-nameoffile'></div></div>`;
var audioContainer = `<div class='base-agrega-material base-agregar-video'><span class='base-plus-span'>+</span>\
<div class='base-herramientas-video base-display-hidden'>\
<div class='base-fileedit editvideo tooltip'>\
<i class='fas fa-edit'></i><span class='tooltiptext'>Editar</span>\
</div>\
<div class='base-filedelete tooltip delete-this-video'>\
<i class='fas fa-trash-alt'></i><span class='tooltiptext'>Eliminar</span>\
</div>\
</div>\
<form><input type='file' accept='audio/*' type='file ' class='form-control-file' onchange='readVideoUrl(this)'></form><div class='base-nameoffile'></div></div>`;

var qaValorBlack =` <div class='act-valor-hover'>
<input type='number' min='0' value='0' class='act-input-qavalor' >
<span class='act-span-valor'>Ingresa el valor de esta pregunta</span>
</div>`;

var archivoContainer=`<div class="addedContainer">
                        <label for="file"><i class="fas fa-file-upload"></i> Subir Archivo</label>
                        <input data-consecutivo=""  type="file" class="file" id="archivo" name="archivo[]" >
                        <input data-consecutivo=""  type="text" class="strNameFile"  id="strNombreArchivo" name="strNombreArchivo[]">
                      </div>`;

function funcionvalor(valorQA){
    //KRPR WORKING ALTERNATIVE by mey
      //$('.den-actividadid-visible .act-valor-hover').remove();
      console.warn('se trigerio el click de funcionvalor',valorQA);
  if (valorQA == "valoraPregunta") {
    $('.den-actividadid-visible .act-valor-hover.answ-val').hide();

    if($('[name="templateActivity"]').val()!="actividad2")
      $('.container').hide();
    else
     $('.quest-va-input').show();

    $('.answ-val-input').hide();
    $('.den-actividadid-visible .act-valor-hover.quest-val').show();
    $('.act-valor-hover.respuestahover').hide();
    $('.respuestahover :input').val('');


    //KRPR WORKING ALTERNATIVE by mey
      //$(qaValorBlack).appendTo(".den-actividadid-visible .act-pregunta-row");
      $('.den-actividadid-visible .act-valor-hover.quest-val').addClass('preguntahover');
    //Assign input name value according to selected
      //var belongsTo=$(".tipo-de-actividad :input[name^='belongerActivity']")
      // $( ".den-actividadid-visible .tipo-de-actividad" ).each(function( index ) {
      //   //index es la pagina
      //   var questionVal=$(this).find('.act-pregunta-row"');
      //   $(questionVal).each(function( index2 ) {
      //     if(!$(this).hasClass('act-pregunta-oculta')){
      //        var questionNumber=$(this).find(':input[name^=question]').data("noquest");
      //         $(this).find('.act-input-qavalor').attr('name',`qValue${index}[${questionNumber}]`);
      //         console.warn('hola contador=',questionNumber);
      //     }
      //   });
      // });

  }
  if (valorQA == "valoraRespuesta") {
    $('.den-actividadid-visible .act-valor-hover.quest-val').hide();
    $('.den-actividadid-visible .act-valor-hover.answ-val').show();
    $('.container').removeClass('dissapear').show();
    $('.answ-val-input').removeClass('dissapear').show();
    $('.act-valor-hover.respuestahover').show();
    $('.quest-va-input').val('');
    if($('[name="templateActivity"]').val()=="actividad2")
       $('.quest-va-input').hide()
    //$(qaValorBlack).appendTo(".den-actividadid-visible .act-respuesta-row");
    $('.den-actividadid-visible .act-valor-hover.answ-val').addClass('respuestahover');
  }

  // var temporal="";
  // var belongsTo=$('.tipo-de-actividad.pagina-actividad-visible').first().children('input').val();
  // var questionNumber=$('.act-pregunta-row.act-pregunta-select input[name^=question]').data("noquest");
  // $('.tipo-de-actividad.pagina-actividad-visible').find('.act-pregunta-row.act-pregunta-select .act-input-qavalor').attr('name',`qValue${belongsTo}[${questionNumber}]`);
}
function closeSteps(){
  $('.iluminatethis').removeClass('selectedHelpIn');
  $('.fullShadowTuto').remove();
  $('body').removeClass('overflownot');
  var step = localStorage.getItem('pasoUvimex');
  if (step > 0) {
      $( "ul.den-dropmenuHelp li:eq("+step+")" ).trigger('click');
  }
}
// Close Multimple
function closeMulti (){
  $('.den-popup-help-general').addClass('den-hide');
  $('.den-dropmenuHelp').addClass('den-hide');
  // $('.iluminatethis').removeClass('selectedHelpIn');
  // $('.fullShadowTuto').remove();
  // $('body').removeClass('overflownot');
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
      console.warn(imgName);
      var inputAccept = input.accept;
      inputAccept = inputAccept.split('/');
      inputAccept = inputAccept[0];
      var space = ' ';
      imgName = imgName.replace(new RegExp(space, "g"), '_');
      //cleaning name of imgs replace white space
      imgName=imgName.split(/[^a-zA-Z0-9\-\_\.]/gi).join('_');
      console.warn('el nombre limpio es',imgName);
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
            //set input img name to its own video READTHIS
            var belongsToVideo=$('#wrapVideos .selected-video').find("input[name^='belonger']").val() ? $('#wrapVideos .selected-video').find("input[name^='belonger']").val():$('#wrapAudios .selected-video').find("input[name^='belongerAudio']").val();
            //added when edit Img and has nothing
            var imageCounter=$("#wrapImages").find("input:file").length-2 >= 0 ? $("#wrapImages").find("input:file").length-2: 0;
            console.warn('el imageCounterVale',imageCounter);
            var inputBelongsToVideo = $('#wrapImages').find('input[name="belongsToVideo[]"]').filter(':first');
            inputBelongsToVideo.attr('name', 'belongsToVideo[]');
            inputBelongsToVideo.val(belongsToVideo);
            var inputImg = $('#wrapImages').find('input[name="img[]"]').filter(':first');
            inputImg.attr('name', 'img'+belongsToVideo+'['+imageCounter+']');
            var inputMinutes= $('#wrapImages').find('input[name="minutes[]"]').filter(':first');
            inputMinutes.attr('name', 'minutes'+belongsToVideo+'['+imageCounter+']');
            var inputSeconds= $('#wrapImages').find('input[name="seconds[]"]').filter(':first');
            inputSeconds.attr('name', 'seconds'+belongsToVideo+'['+imageCounter+']');

            var elementos = $('.den-prevnedit-plantilla').find('.base-imagesforvideo-column');
            var size = elementos.length;
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
function loadSavedData(themesArray){
  //we get title, subtitle and content

  var videoName,contentDataVideo,contentDataImages="",time,minutes,seconds,divParentImg,idContenido,parentIdContenido=null,contadorInterno=0,contadorImagenes=0,pushimage=0;
  var audioName;
  var templateChosen="";
  templateChosen=themesArray && themesArray.length>0 && themesArray[0].temaPadre ? themesArray[0].temaPadre : '';
  //LOAD STORED DATA

  //load videos
    for (var i = 0; i < themesArray.length; i++) {
      contentDataVideo="";
      time="";
      minutes="";
      seconds="";

      if(i==0){
        $("#title").val(themesArray[0].nombre);
        $("#subtitle").val(themesArray[0].subtitulo);
        $("#descripcionCursoPlantilla").trumbowyg('html', themesArray[0].contenido);


        //Remove tthis is a temporal Lock to make only 1 video appear KRPR
        $(".base-agrega-material.base-agregar-video").remove();
        //en
      }

      /*This code adds only video*/
      if(themesArray[i].video && idContenido!==themesArray[i].idContenido && videoName!=themesArray[i].video ){
         contadorInterno+=videoCounter+1;
         videoName=themesArray[i].video;
         idContenido=themesArray[i].idContenido;
         contentDataVideo='<div class="base-agrega-material base-agregar-video base-thishasfile" style="border-color: rgb(237, 232, 232);">'+
                              '<div class="base-herramientas-video">'+
                                  '<div class="base-fileedit tooltip editvideo">'+
                                      '<i class="fas fa-edit"></i><span class="tooltiptext">Editar</span>'+
                                  '</div>'+
                                  '<div class="base-filedelete delete-this-video tooltip">'+
                                      '<i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>'+
                                  '</div>'+
                              '</div>'+
                              '<span class="base-plus-span"><i class="fas fa-video"></i></span>'+
                              '<input type="hidden" name="belonger[]" value="'+contadorInterno+'">'+
                              '<input type="hidden" name="hidContenido['+contadorInterno+']" id="hidContenido'+contadorInterno+'" value="'+themesArray[i].idContenido+'">'+
                              '<input type="hidden" name="hvideo['+contadorInterno+']" id="hvideo_'+contadorInterno+'" value="'+themesArray[i].video+'">'+
                              '<input type="file" data-consecutivo='+contadorInterno+' accept="video/*" class="form-control-file base-display-hidden" name="video['+contadorInterno+']" onchange="readVideoUrl(this)" data-title="'+themesArray[i].video+'" id="id_'+contadorInterno+'" consecutivo="'+contadorInterno+'" style="display: none;">'+
                              '<div class="base-nameoffile">'+themesArray[i].video+'</div>'+
                              '<input type="hidden" name="videoDuration['+contadorInterno+']" id="videoDuration_'+contadorInterno+'" value="'+themesArray[i].duracion+'">'+
                          '<input type="number" name="orden['+contadorInterno+']" class="contador-video" value="'+themesArray[i].orden+'" id="'+contadorInterno+'Order" style="display: block;"></div>';
          $(contentDataVideo).appendTo("#wrapVideos");
      }
      /*ends loading video*/
      /*This code adds only audio*/
      if(themesArray[i].audio && idContenido!==themesArray[i].idContenido && videoName!=themesArray[i].audio ){
         contadorInterno+=audioCounter+1;
         audioName=themesArray[i].audio;
         idContenido=themesArray[i].idContenido;
         contentDataVideo='<div class="base-agrega-material base-agregar-video base-thishasfile" style="border-color: rgb(237, 232, 232);">'+
                              '<div class="base-herramientas-video">'+
                                  '<div class="base-fileedit tooltip editvideo">'+
                                      '<i class="fas fa-edit"></i><span class="tooltiptext">Editar</span>'+
                                  '</div>'+
                                  '<div class="base-filedelete delete-this-video tooltip">'+
                                      '<i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>'+
                                  '</div>'+
                              '</div>'+
                              '<span class="base-plus-span"><i class="fas fa-volume-up"></i></span>'+
                              '<input type="hidden" name="belongerAudio[]" value="'+contadorInterno+'">'+
                              '<input type="hidden" name="hidContenido['+contadorInterno+']" id="hidContenido'+contadorInterno+'" value="'+themesArray[i].idContenido+'">'+
                              '<input type="hidden" name="haudio['+contadorInterno+']" id="hvideo_'+contadorInterno+'" value="'+themesArray[i].audio+'">'+
                              '<input type="file" data-consecutivo='+contadorInterno+' accept="audio/*" class="form-control-file base-display-hidden" name="audio['+contadorInterno+']" onchange="readVideoUrl(this)" data-title="'+themesArray[i].audio+'" id="id_'+contadorInterno+'" consecutivo="'+contadorInterno+'" style="display: none;">'+
                              '<div class="base-nameoffile">'+themesArray[i].audio+'</div>'+
                              '<input type="hidden" name="audioDuration['+contadorInterno+']" id="audioDuration_'+contadorInterno+'" value="'+themesArray[i].duracion+'">'+
                          '<input type="number" name="orden['+contadorInterno+']" class="contador-video" value="'+themesArray[i].orden+'" id="'+contadorInterno+'Order" style="display: block;"></div>';
        $(contentDataVideo).appendTo("#wrapAudios");
      }
    }
  //load images
  // contadorInterno=0;
  idContenido=null;
  for (var i = 0; i < themesArray.length; i++) {
     time="";
     minutes="";
     seconds="";
    //when is set video and it has imagen and its different idContenido
    if( (themesArray[i].video ||themesArray[i].audio ) && idContenido!==themesArray[i].idContenido && themesArray[i].url){
          //starts KRPR
          if(pushimage==1){
            console.error('pegamos imagenes');
            //here we add code to give option to add 1 more video after all
            contentDataImages+=`
                <div class="base-imagesforvideo-column" data-type="image">
                    <div class="base-agrega-material base-agregar-imagen">
                          <span class="base-plus-span">+</span>
                          <input type="file" accept="image/*" onchange="readImageUrl(this)" name="img[]" class="form-control-file">
                          <div class="base-nameoffile">
                          </div>
                    </div>
                    <div class="base-display-hidden base-datos-edit-container">
                        <div class="base-fileedit editimage tooltip">
                            <i class="fas fa-edit"></i>
                            <span class="tooltiptext">Editar</span>
                        </div>
                        <div class="base-filedelete delete-this-image tooltip">
                            <i class="fas fa-trash-alt"></i>
                            <span class="tooltiptext">Eliminar</span>
                        </div>
                        <div class="base-tiempos-img" data-imgid="0">
                            <p>Aparece en minuto:</p>
                            <div class="base-input-field">
                                <label>Minuto:</label><input type="number" min="0" placeholder="Minutos" name="minutes[]" class="file_mins interface_input" value="" data-field="img_mins"></div><div class="base-input-field" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;';>
                                <label>Segundo:</label><input type="number" min="1" placeholder="Segundos" name="seconds[]" class="file_secs interface_input" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;'; value="" data-field="img_secs">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            $(contentDataImages).appendTo("#wrapImages");
            pushimage=0;
          }
          console.warn('entramos a las imagenes primera ves');
          idContenido=themesArray[i].idContenido;
          // contadorInterno+=videoCounter+1;
          if(themesArray[i].video){
            divParentImg=themesArray[i].video.split(".");
          }else if(themesArray[i].audio){
            divParentImg=themesArray[i].audio.split(".");
          }

          parentIdContenido=themesArray[i].idContenido;
          console.warn("que show",divParentImg[0]);
          contentDataImages=`<div class="base-imagesforvideo-container base-display-hidden" id="${divParentImg[0]}">`;
          //endkrpr
    }
          //starts KRPR
          if(themesArray[i].url && (parentIdContenido==themesArray[i].idContenido)){
                pushimage=1;
                if(themesArray[i].tiempo){
                    var time = themesArray[i].tiempo.split(":");
                    minutes=time[0];
                    seconds=time[1];
                }
                 contentDataImages+=`<div class="base-imagesforvideo-column base-gray-background" data-type="image">
                                           <div class="base-agrega-material base-agregar-imagen base-thishasfile">
                                                <span class="base-plus-span">
                                                  <i class="fas fa-images"></i>
                                                </span>
                                                <input type="hidden" name="belongsToVideo[]"  value="${contadorInterno}" >
                                                <input type="hidden" value="${themesArray[i].idContenido}" name="hidContenido${contadorInterno}[${i}]" >
                                                <input type="hidden" value="${themesArray[i].idImg}" class="idImg" name="hidImg${contadorInterno}[${i}]" >
                                                <input type="hidden"value="${themesArray[i].url}" name="hurl${contadorInterno}[${i}]" >
                                                <input type="file" accept="image/*" onchange="readImageUrl(this)" name="img${contadorInterno}[${i}]" class="form-control-file base-display-hidden" data-title="${themesArray[i].url}">
                                                <div class="base-nameoffile">
                                                  ${themesArray[i].url}
                                                </div>
                                            </div>
                                          <div class="base-datos-edit-container">
                                                <div class="base-fileedit editimage tooltip">
                                                  <i class="fas fa-edit"></i>
                                                  <span class="tooltiptext">Editar</span>
                                                </div>
                                              <div class="base-filedelete delete-this-image tooltip">
                                                  <i class="fas fa-trash-alt"></i>
                                                  <span class="tooltiptext">Eliminar</span>
                                              </div>
                                                  <div class="base-tiempos-img" data-imgid="0">
                                                        <p>Aparece en minuto:</p>
                                                        <div class="base-input-field">
                                                            <label>Minuto:</label>
                                                            <input type="number" min="0" placeholder="Minutos" name="minutes${contadorInterno}[${i}]" class="file_mins interface_input" value="${minutes}" data-field="img_mins" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;';>
                                                        </div>
                                                        <div class="base-input-field">
                                                            <label>Segundo:</label>
                                                            <input type="number" min="1" placeholder="Segundos" name="seconds${contadorInterno}[${i}]" class="file_secs interface_input" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;';  value="${seconds}" data-field="img_secs">
                                                        </div>
                                                  </div>
                                          </div>
                                    </div>`;
          }else{
                //when we have a video but 0 images
                if(themesArray[i].video){
                  divParentImg=themesArray[i].video.split(".");
                }else if(themesArray[i].audio){
                  divParentImg=themesArray[i].audio.split(".");
                }
                if(divParentImg[0]){
                  contentDataImages=`<div class="base-imagesforvideo-container base-display-hidden" id="${divParentImg[0]}">`
                  console.warn('0images');
                    contentDataImages+=`
                                        <div class="base-imagesforvideo-column" data-type="image">
                                            <div class="base-agrega-material base-agregar-imagen">
                                                  <span class="base-plus-span">+</span>
                                                  <input type="file" accept="image/*" onchange="readImageUrl(this)" name="img[]" class="form-control-file">
                                                  <div class="base-nameoffile">
                                                  </div>
                                            </div>
                                            <div class="base-display-hidden base-datos-edit-container">
                                                <div class="base-fileedit editimage tooltip">
                                                    <i class="fas fa-edit"></i>
                                                    <span class="tooltiptext">Editar</span>
                                                </div>
                                                <div class="base-filedelete delete-this-image tooltip">
                                                    <i class="fas fa-trash-alt"></i>
                                                    <span class="tooltiptext">Eliminar</span>
                                                </div>
                                                <div class="base-tiempos-img" data-imgid="0">
                                                    <p>Aparece en minuto:</p>
                                                    <div class="base-input-field">
                                                        <label>Minuto:</label><input type="number" min="0" placeholder="Minutos" name="minutes[]" class="file_mins interface_input" value="" data-field="img_mins"></div><div class="base-input-field" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;';>
                                                        <label>Segundo:</label><input type="number" min="1" placeholder="Segundos" name="seconds[]" class="file_secs interface_input" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;'; value="" data-field="img_secs">
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                      $(contentDataImages).appendTo("#wrapImages");
                      contentDataImages="";
                }
              }
          //here we add option to add 1 more to the last video only
          if(i === themesArray.length-1 &&pushimage==1){
            contentDataImages+=`
                <div class="base-imagesforvideo-column" data-type="image">
                    <div class="base-agrega-material base-agregar-imagen">
                          <span class="base-plus-span">+</span>
                          <input type="file" accept="image/*" onchange="readImageUrl(this)" name="img[]" class="form-control-file">
                          <div class="base-nameoffile">
                          </div>
                    </div>
                    <div class="base-display-hidden base-datos-edit-container">
                        <div class="base-fileedit editimage tooltip">
                            <i class="fas fa-edit"></i>
                            <span class="tooltiptext">Editar</span>
                        </div>
                        <div class="base-filedelete delete-this-image tooltip">
                            <i class="fas fa-trash-alt"></i>
                            <span class="tooltiptext">Eliminar</span>
                        </div>
                        <div class="base-tiempos-img" data-imgid="0">
                            <p>Aparece en minuto:</p>
                            <div class="base-input-field">
                                <label>Minuto:</label><input type="number" min="0" placeholder="Minutos" name="minutes[]" class="file_mins interface_input" value="" data-field="img_mins"></div><div class="base-input-field" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;';>
                                <label>Segundo:</label><input type="number" min="1" placeholder="Segundos" name="seconds[]" class="file_secs interface_input" onkeyup='this.value = this.value.replace(/[^0-9\.]/g,"");'; onpaste='return false;'; value="" data-field="img_secs">
                            </div>
                        </div>
                    </div>
                </div>
            </div>`;
            $(contentDataImages).appendTo("#wrapImages");
          }
          //ends KRPR

  videoCounter+=contadorInterno;
}
  if(idContenidoClick){
    console.log('dara click');
    $("#wrapVideos").find("input[value='"+idContenidoClick+"']").parents().find(".base-agrega-material.base-agregar-video").trigger("click");
    $("#wrapAudios").find("input[value='"+idContenidoClick+"']").parents().find(".base-agrega-material.base-agregar-video").trigger("click");
    idContenidoClick=null;
  }

  //this triggers click on video or audios
  if(templateChosen=="template1" ){
    $('#wrapVideos .base-agrega-material.base-agregar-video.base-thishasfile').first().trigger('click');
  }else if(templateChosen=="template3"){
    $('#wrapAudios .base-agrega-material.base-agregar-video.base-thishasfile').first().trigger('click');
  }//video

 //  if($('.label-images').length==0){
 //  var labelinfo=
 //                `<div class="label-info label-images">
 //                  <h4>Sube tus imágenes</h4>
 //                </div>`;
 //  $(labelinfo).prependTo("#wrapImages");
 // }
}


//
function loadSavedFiles(themeFiles){
  var htmlData="";
  $("#wrapDocuments").empty();
  for (var i = 0; i < themeFiles.length; i++) {
    htmlData+=`<div class="addedContainer">
                <input type="hidden" name="hIdArchivosPorCurso[${i}]" id="hIdArchivosPorCurso{i}" value="${themeFiles[i].idArchivosPorCurso}" >
                <input type="hidden" name="hstrArchivo[${i}]" id="hstrArchivo{i}" value="${themeFiles[i].strArchivo}" >
                <input data-consecutivo="${i}" type="file" class="file" id="archivo${i}" name="archivo[]">
                <label for="file"><i class="fas fa-file-upload"></i> Subir Archivo</label>
                <div class="base-filedelete tooltip"><i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span></div>
                <input data-consecutivo="${i}" type="text" class="strNameFile" id="strNombreArchivo${i}" name="strNombreArchivo[${i}]" value="${themeFiles[i].strNombreArchivo}">
              </div>`;
              //below code is to push in case user wants to add 1 more document
    if(i==themeFiles.length-1){
      htmlData+=` <div class="addedContainer">
                    <input data-consecutivo="${i+1}" type="file" class="file" id="archivo${i+1}" name="archivo[${i+1}]" value="">
                    <label for="file"><i class="fas fa-file-upload"></i> Subir Archivo</label>
                    <input data-consecutivo="${i+1}" type="text" class="strNameFile" id="strNombreArchivo${i+1}" name="strNombreArchivo[${i+1}]" value="">
                  </div>
                `;
    }
  }

  $("#wrapDocuments").append(htmlData);

}
function readVideoUrl(input) {
  var duration='';
  /*
  debo de tener en un objeto:
  accept->audio or video;
  imgName->full name of file with extensión
  tipoArchivo-> audio or video
  setOfImgsId->Name without extension
  fileExt->file Extension

  */
  if (input.files) {
    let reader = new FileReader();
    reader.onload = (e) => {
      let imgData = e.target.result;
      let imgName = input.files[0].name;
      console.warn('en ombre del video es',imgName);
      imgName=imgName.split(/[^a-zA-Z0-9\-\_\.]/gi).join('_');
      console.log('el url clean video es',imgName);
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

      // console.error(tipoArchivo[0]);
      // console.log(imgName);
      //this must be used in order to set videoCounter once a theme is loaded so it can continue it's normal flow KRPR
      //$('#wrapVideos').find("input:file", this).length;
      // console.log(1);
      switch (inputAccept) {
        case 'video':
          if(!(ACCEPTED_FILES.video.includes(fileExt))){
            $(input).trigger('click');
            $('.base-alert-extenfile h1').text('Este archivo no tiene formato de video');
            $('.base-alert-extenfile p').text('intenta subiendo archivos .mp4, .vlc, .mov, .avi');
            alertaFileEx();
          }else{
            ejecutaFuncion(tipoArchivo[0],imgName);
            videoCounter++;
            //get video name without extension
            var vidNameFile=imgName.substr(0,imgName.lastIndexOf('.'));
            //set input name to make child elements management

            var loadedBelonger = $('.base-only-video').find('input[name="belonger[]"]').filter(':first');
            var inputcurrentTime=$('.base-only-video').find('input[name^="videoDuration"]').filter(':first');
            if(loadedBelonger.val()==""){
            loadedBelonger.val(videoCounter);
            var belongsToVideo=$('#wrapVideos .selected-video').find("input[name^='belonger']").val();
            var loadedInputVideo = $('.base-only-video').find('input[name="video[]"]').filter(':first');
            loadedInputVideo.attr('name', 'video['+belongsToVideo+']');
            loadedInputVideo.attr('id', 'id_'+belongsToVideo);
            loadedInputVideo.attr('consecutivo',belongsToVideo);
            var inputOrder = $('.base-only-video').find('input[name="orden[]"]').filter(':first');
            inputOrder.attr('name', 'orden['+belongsToVideo+']');
            inputcurrentTime.attr('name', 'videoDuration['+belongsToVideo+']');
            inputcurrentTime.attr('id', 'videoDuration_'+belongsToVideo);
            //set input img name like parent video input
            // var inputImg = $('#wrapImages').find('input[name="img[]"]').filter(':first');
            // inputImg.attr('name', 'img'+belongsToVideo+'[]');
            // var inputMinutes= $('#wrapImages').find('input[name="minutes[]"]').filter(':first');
            // inputMinutes.attr('name', 'minutes'+belongsToVideo+'[]');
            // var inputSeconds= $('#wrapImages').find('input[name="seconds[]"]').filter(':first');
            // inputSeconds.attr('name', 'seconds'+belongsToVideo+'[]');
            }

            //get current time video
            var media = new Audio(reader.result);

             media.onloadedmetadata = function(){
                 duration = media.duration;
                 inputcurrentTime.val(duration);
                 console.warn('el nuevo video vale',duration)
             };
          }
        break;
        case 'audio':
          if(!(ACCEPTED_FILES.audio.includes(fileExt))){
            $('.base-alert-extenfile h1').text('Este archivo no tiene formato de audio');
            $('.base-alert-extenfile p').text('intenta subiendo archivos .mp3, .wav');
            alertaFileEx();
          }else{
            ejecutaFuncion(tipoArchivo[0],imgName);
            audioCounter++;
            console.warn('entró y pondrá',audioCounter)
            var loadedBelonger = $('.base-agregar-video').find('input[name="belongerAudio[]"]').filter(':first');
            if(loadedBelonger.val()==""){
            loadedBelonger.val(audioCounter);
            var loadedInputAudio = $('.base-agregar-video').find('input[name="audio[]"]').filter(':first');
            loadedInputAudio.attr('name', 'audio['+audioCounter+']');
            loadedInputAudio.attr('id', 'id_'+audioCounter);
            loadedInputAudio.attr('consecutivo',audioCounter);
            var inputOrder = $('.base-agregar-video').find('input[name="orden[]"]').filter(':first');
            inputOrder.attr('name', 'orden['+audioCounter+']');
            var inputcurrentTime=$('.base-agregar-video').find('input[name^="audioDuration"]').filter(':first');
            inputcurrentTime.attr('name', 'audioDuration['+audioCounter+']');
            inputcurrentTime.attr('id', 'audioDuration'+audioCounter);
            //get current time video
            var media = new Audio(reader.result);

             media.onloadedmetadata = function(){
                 duration = media.duration;
                 inputcurrentTime.val(duration);
             };
            }
          }
        break;

      }

      function ejecutaFuncion(tipoArchivo,imgName){

        // console.error('tendra',tipoArchivo,imgName);
        // console.warn($('.den-select :selected').val(),tipoArchivo,imgName,5);
        // insertMultimedia($('.den-select :selected').val(),tipoArchivo,imgName,5);

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
              var conteo = conteo.length;
              $("<input type='number' name='orden[]' class='contador-video' value=''>").appendTo('.addFile-input-onclick')
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
              //uncomment to add 1 video after upload first
              //$(audioContainer).appendTo(".den-prevnedit-plantilla .base-only-audio");
              //Uncomment line $(VideoContainer).appendTo(".den-prevnedit-plantilla .base-only-video"); so we add another input file Temporal KRPR
              //$(VideoContainer).appendTo(".den-prevnedit-plantilla .base-only-video");
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
              /*$('.den-prevnedit-plantilla .base-actividad-container').removeClass('actividad-visible');
              $('.den-prevnedit-plantilla .base-actividad-container').addClass('base-display-hidden');
              $("<div class='base-actividad-container actividad-visible' id=''>"+singleActivContainer+"</div>").prependTo(".base-agregar-actividad");
              $('.den-prevnedit-plantilla .actividad-visible').attr('id', setOfImgsId);*/
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
         //Trem
        //  localStorage.clear();
          $('.base-agrega-material').removeClass('addFile-input-onclick');
        }
      }



    }
    reader.readAsDataURL(input.files[0]);
  }
}
// HELP CLICK
$(document).on('click', '.den-help', function() {
  var idHelp;
  var thisHelp = $(this).offset();
  var top = parseInt(thisHelp.top);
  var left = parseInt(thisHelp.left);
  // var top = parseInt(thisHelp.top)-60;
  // var left = parseInt(thisHelp.left)+15;
  idHelp = $(this).attr('id');
  txtHelpFind(idHelp, top, left);
  $('.den-popup-help-general').removeClass('den-hide');
  $('.den-dropmenuHelp').addClass('den-hide');

});
$(document).on('click', '.den-closeHelp', function() {
  closeMulti();
});

//delete page
$(document).on('click', '#deletePage', function(e) {
  e.preventDefault();
  $('.den-popup-eliminarfile').removeClass('den-hide');
  $('.den-popup-eliminarfile h2').text('¿Seguro que quieres eliminar esta página?');
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
//HELP MENU click krpr
$(document).on('click', '.den-curso-title', function() {

  $('.den-curso-title').removeClass('den-go-title');
  $(this).addClass('den-go-title');
  $('.den-popup-cambiardetitle').removeClass('den-hide');
  $("#idTema").val($(this).data('idtema'));
  // if($('.den-curso-title.den-go-title.den-select-option').attr('id'))
  goToOtherTitle();
  closeMulti();
  // var temas = $('.den-carousel-alltitles').find('.den-select-option').length;
  // if( temas > 0 ){
  //   if (este.hasClass('den-select-option')) {
  //   }else{
  //     $('.den-curso-title').removeClass('den-go-title');
  //     $(this).addClass('den-go-title');
  //     $('.den-popup-cambiardetitle').removeClass('den-hide');
  //     $("#idTema").val($(this).data('idtema'));
  //     goToOtherTitle();
  //     closeMulti();
  //   }
  // }
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
  localStorage.removeItem('pasoUvimex');
  $('.base-agrega-material').removeClass('addFile-input-onclick');
  var fileAEditar = $(this).parent('.base-herramientas-video').parent('.base-thishasfile');
  fileAEditar.addClass('addFile-input-onclick');
  var input = fileAEditar.children('input.form-control-file');
  input =  input.attr("data-title");
  //commented by krpr
  // localStorage.setItem('actualInput', input);
  // localStorage.setItem('archivo', $('input[data-title = "'+input+'"]').val());
  // input = $('input[data-title = "'+input+'"]');
  // input = input[0].files;
  // localStorage.setItem('nombreArchivo', input[0].name);
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
  $("#wrapVideos.selected-video").removeClass("selected-video");
  thiselement.addClass("selected-video");
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
//here we add Activities KRPR so we set up form name
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
  $('.den-actividad-row.den-actividadid-visible').attr('id',actRow);
  $("<div class='den-actividad-row act-general-container den-actividadid-visible'></div>").appendTo('#formActivities');

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

$(document).on('click', '.base-filedelete.delete-this-image.tooltip', function() {
  closeMulti();
  $('.den-popup-eliminarfile h2').text('¿Seguro que quieres eliminar esta imagen?');
  $('.den-popup-eliminarfile').removeClass('den-hide');
  $('.base-filedelete.delete-this-image.tooltip').parent().parent().addClass('eliminarThisFile');
  closeMulti();
});

//delete Course
$(document).on('click', '#deleteCourse', function() {
    if(!$('#titulos_option').val()){
      errorValidation("Seleccione el Módulo que desea eliminar");
      $("#titulos_option").addClass('focus-missing-selection');
      return false;
    }else{
      $("#titulos_option").removeClass('focus-missing-selection');
    }
    $('.den-popup-deleteCourseTheme').removeClass('den-hide');
    $('.den-popup-deleteCourseTheme h2').text('¿Seguro que quieres eliminar este Curso?');
});

//delete Theme
$(document).on('click', '#deleteTheme', function() {
    if(!$('#titulos_option').val()){
      errorValidation("Seleccione el Tema que desea eliminar");
      $(".den-carousel-alltitles").addClass('focus-missing-selection');
      return false;
    }else{
      $(".den-carousel-alltitles").removeClass('focus-missing-selection');
    }
    $('.den-popup-deleteCourseTheme').removeClass('den-hide');
    $('.den-popup-deleteCourseTheme h2').text('¿Seguro que quieres eliminar este Tema?');

});
$(document).on('click', '.eliminarEstaSeccion', function() {
  var closeMult=true;
  var h2Txt = $('.den-popup-eliminarfile h2').text()=="" ? $('.den-popup-deleteCourseTheme h2').text() :$('.den-popup-eliminarfile h2').text() ;

  if( h2Txt == '¿Seguro que quieres eliminar este video?'){
    //ajax call to remove image
    $.post( "deleteVideo.php", { hIdContenido: $(".selected-video").find("input[name^='hidContenido']").val(),
                                 hIdVideo: $(".selected-video").find("input[name^='hvideo']").val()
                               },
    function(data) {
      var findThisSetImg = $('.eliminarThisFile').find('input.form-control-file').attr("data-title").split('.');
      var findThisSetImg = '#'+((findThisSetImg)[0]);
      var parrafo = findThisSetImg+'_txt';
      //ACTIVIDAD
      var paginas = findThisSetImg+'_popPage';
      var actRow = findThisSetImg+'_actRow';
      paginas = $('.carouselpage-id').find(paginas);
      actRow = $('#formActivities').find(actRow);
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
      $(VideoContainer).appendTo(".den-prevnedit-plantilla .base-only-video")
      $('.den-popup-eliminarfile h2').text('');
    });
  }
  if( h2Txt == '¿Seguro que quieres eliminar esta imagen?'){
    console.warn('entro here');
    var imgid = $('.eliminarThisFile').attr('id');
    imgid = '#'+imgid+'_parrafo';
    imgid = $('.base-agregar-parrafo.cop_active').find(imgid);
    //ajax call to remove image
    $.post( "deleteImage.php", { hidImg:$(".imagePSelected").find(".idImg").val() ,
                                 hurl:$(".imagePSelected").find("input:file").data("title")
                               },
    function(data) {
      $(imgid).remove();
      $('.eliminarThisFile.imagePSelected').remove();
      $('.den-prevnedit-plantilla .fake-test-area').removeClass('den-hide');
      $('.den-popup-eliminarfile h2').text('');
    });
  }
  if ( h2Txt =='¿Seguro que quieres eliminar este audio?') {
      $.post( "deleteAudio.php", { hIdContenido: $(".selected-video").find("input[name^='hidContenido']").val(),
                                 hIdAudio: $(".selected-video").find("input[name^='haudio']").val()
                               },
        function(data) {
          var findThisSetImg = $('.eliminarThisFile').find('input.form-control-file').attr("data-title").split('.');
          var findThisSetImg = '#'+((findThisSetImg)[0]);
          var parrafo = findThisSetImg+'_txt';
          //ACTIVIDAD
          var paginas = findThisSetImg+'_popPage';
          var actRow = findThisSetImg+'_actRow';
          paginas = $('.carouselpage-id').find(paginas);
          actRow = $('#formActivities').find(actRow);
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
          $('.den-popup-eliminarfile h2').text('');
          reloadStoredModules();
          $('.den-popup-deleteCourseTheme h2').text('');
        }
     );
 }
  if( h2Txt == '¿Seguro que quieres eliminar este Curso?'){
    $.post( "deleteCourse.php", { hidModulo: $("#titulos_option").val()},
    function(data) {
      $('.den-prevnedit-plantilla').empty();
      reloadStoredModules();
      reloadStoredThemes();
      $('.den-popup-deleteCourseTheme h2').text('');
    });
  }
  if( h2Txt == '¿Seguro que quieres eliminar este Tema?'){
    $.post( "deleteTheme.php", { hIdTema: $(".den-carousel-container").find('.den-select-option').data('idtema')},
    function(data) {
      $('.den-prevnedit-plantilla').empty();
      reloadStoredThemes();
      $('.den-popup-deleteCourseTheme h2').text('');
    });
  }
  if( h2Txt == '¿Seguro que quieres eliminar esta pregunta?'){
    closeMult=false;
    $.post( "deleteSingleQuestionActivity.php", {
      hIdActivity: $('.act-pregunta-row.act-pregunta-select input[name^=hIdActivity]').val()
    },
    function(data) {
      $('.den-popup-deleteCourseTheme h2').text('');
      $('.den-popup-eliminarfile.den-popup-estilo').addClass('den-hide');
      $('.act-pregunta-row.act-pregunta-select').remove();
    });
  }
  if( h2Txt == '¿Seguro que quieres eliminar esta respuesta?'){
    closeMult=false;
    console.log("eliminando respuesta");
    var idAnswer = $('.act-pregunta-row.act-pregunta-select .selectedDelete input[name^=hidRespuesta]').val();
    if(idAnswer)
      $.post( "deleteSingleAnswerActivity.php", {
        hIdRespuesta: $('.act-pregunta-row.act-pregunta-select .selectedDelete input[name^=hidRespuesta]').val()
        },
        function(data) {console.log(data)});

    $('.den-popup-deleteCourseTheme h2').text('');
    $('.den-popup-eliminarfile.den-popup-estilo').addClass('den-hide');
    $('.act-pregunta-row.act-pregunta-select .selectedDelete').remove();
  }
  if( h2Txt == '¿Seguro que quieres eliminar esta página?'){
    closeMult=false;
    console.log("eliminando pagina");
    var inputSelector=$('.den-actividad-row.act-general-container.den-actividadid-visible .tipo-de-actividad.pagina-actividad-visible input[name^="hIdActivity"]')
    var arrIdActivities=$(inputSelector).map(function() {
      return $(this).val();
    }).get();
    if(arrIdActivities.length>0){
      $.post("deleteSinglePage.php", { arrIdActivities: arrIdActivities},
      function(data) {
        if(data[0].success==="true"){
          $('.den-popup-deleteCourseTheme h2').text('');
          $('.den-popup-eliminarfile.den-popup-estilo').addClass('den-hide');
          $('.den-carouselpaginas-container.den-cp-visible .den-pagina-title.den-select-option').remove();
          $('.den-actividad-row.act-general-container.den-actividadid-visible .tipo-de-actividad.pagina-actividad-visible').remove();
        }
      });
    }else{
      $('.den-popup-deleteCourseTheme h2').text('');
      $('.den-popup-eliminarfile.den-popup-estilo').addClass('den-hide');
      $('.den-carouselpaginas-container.den-cp-visible .den-pagina-title.den-select-option').remove();
      $('.den-actividad-row.act-general-container.den-actividadid-visible .tipo-de-actividad.pagina-actividad-visible').remove();
    }
  }

  if(closeMult){
    closeMulti();
    $('.den-popup-estilo').addClass('den-hide');
  }

});

//Funciones generales de portal
$(document).keyup(function(e) {
     if (e.key === "Escape") { // escape key maps to keycode `27`
        $('.closePopUp').trigger('click');
        console.warn('presionaste escape');
    }
    else if(e.key === "Enter"){
      e.preventDefault();
      console.log("enter wuuu");
      $(document.activeElement).blur();
      $(".f-popup-acceptable").each(function(each_key, each_value){
        if($(each_value).is(":visible")){
          $(each_value).trigger("click");
        }
      });
    }
});
//Cerrar popUps
$(document).on('click', '.closePopUp', function() {
  if($(".den-popup-cambiardetitle").is(":visible") && $('.den-popup-cambiardetitle h2').text()=="¿Seguro quieres cambiar de Tema?"){
    $("[class='den-plantilla-title den-select-option triggered']").removeClass('den-select-option');
    $(".den-plantilla-title.triggered").removeClass('triggered');
    var prevSelectedTheme=localStorage.getItem('prevSelectedTheme');
    $('.den-carousel-container div').removeClass('den-select-option');
    $('.den-carousel-container').find(`[data-idtema='${prevSelectedTheme}']`).addClass('den-select-option');
  }

  var step = localStorage.getItem('pasoUvimex');
  if (step > 2) {
    closeSteps();
  }
  $('#descripcionCurso').val('');
  $('.input-popup-newtitle').val('');
  $('.den-popup-estilo').addClass('den-hide');
  $('.den-popup-newcourse').hide(300);
  $('.den-popup-estilo').addClass('den-hide');
  $('.habilitar-cambio-pop').addClass('den-hide');
  $('.den-plantilla-title.den-select-option').removeClass('plantillaOnClick');
  $('body').removeClass('den-stopscroll');
  $('.den-plantilla-title').removeClass('plantillaOnClick');
  $('.act-pregunta-row.act-pregunta-select .qAndA-row.act-respuesta-row.selectedDelete').removeClass('selectedDelete');
  closeMulti();
  if($("#videoCurso").length>0){
    $("#videoCurso").get(0).pause();
    $("#videoCurso").get(0).remove();
  }
});
$(document).on('click', '.closePopUpActividad', function() {
  $('.habilitar-cambio-pop').addClass('den-hide');
  closeMulti();
});
$(document).on('click', '#titulos_option', function() {
var valor = $(this).val();
if (!valor=="") {
  closeSteps();
}
});
$(document).on('click', '.pasosrelative button', function() {
  $('.iluminatethis').removeClass('selectedHelpIn');
  $('.fullShadowTuto').remove();
  $('body').removeClass('overflownot');
     localStorage.setItem('pasoUvimex','-1');
       closeMulti();
});
//P R E V I S U A L I Z A R
$(document).on('click', '.den_previewplantilla_btn', function() {
  // closeSteps();
  closeMulti();
  if($("#titulos_option").val()==""){
     errorValidation("Es necesario seleccionar un módulo para poder previsualizar");
    $("#titulos_option").addClass('focus-missing-selection');
    $bandera=1;
    return false;
  }else{
    $("#titulos_option").removeClass('focus-missing-selection');
  }

  if($('.den-carousel-container .den-curso-title.den-select-option').length==0){
     errorValidation("Es necesario seleccionar un  Tema para poder previsualizar");
    $bandera=1;
    $(".den-carousel-alltitles").addClass('focus-missing-selection');
    return false;
  }else{
    $(".den-carousel-alltitles").removeClass('focus-missing-selection')
  }
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
//checkmark inputs
$(document).on('click', '.checkmark2', function(e) {
  e.preventDefault();
  console.warn('entro');
  var selected=$(this).closest('.act-pregunta-row')
  selected.find(`input[name^='rSelected']`).prop('checked',false);
  $(this).siblings('input[type=radio]').prop('checked',true);
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
  if($('[name="valorLugar"]').length>0) {
    $('.checkmarkValor').trigger('click');
    console.warn('hizo click');
  }
  $('.den-actividadid-visible .act-pregunta-row').removeClass('act-pregunta-select');
  $('.den-actividadid-visible .act-pregunta-row .base-filedelete').addClass('den-hide');
  //Variable
  var pregunta = $('.den-actividadid-visible .pagina-actividad-visible div.act-pregunta-oculta').clone();
  var elementos = $('.tipo-de-actividad.pagina-actividad-visible .act-pregunta-row');
  var size = elementos.length;
  console.warn('existen',size,'inputs');
  var animar = size * 180;
  var p = $('.den-actividadid-visible .pagina-actividad-visible').attr('id');
  p = p.split('_');
  p = (p)[1];
  //var nameInput = $('.den-actividadid-visible .pagina-actividad-visible input.asignatename-group').attr('name');
  //Increase counter question
  //we get template activity so that will measure how to handle form

  //we just use this vars for actividad2
  var belongsToQuestion=size-1
  var counterInput=$('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select .qAndA-row.act-respuesta-row:not(.act-respuesta-oculta) input[type=text]').length;
  var noQuest=  $('.tipo-de-actividad.pagina-actividad-visible').first().children('input').val();
  var selectedCheckBox=null;
  //ends declaration
  var templateActivity=$(".den-carousel-actividades .den-select-option").attr('id');
  var temporal="";
  var assignedName = "";
  var questVal="";
  switch(templateActivity){
    case "actividad0":
    break;
    case "actividad1":
      temporal=$('.tipo-de-actividad.pagina-actividad-visible').first().children('input').val();
      assignedName = `question${temporal}`;
    break;
    case "actividad2":
      temporal=$('.tipo-de-actividad.pagina-actividad-visible').first().children('input').val();
      assignedName = `question${temporal}`;
      questVal=`qValue${temporal}`;
    break;
    case "actividad3":
      temporal=$('.tipo-de-actividad.pagina-actividad-visible').first().children('input').val();
      assignedName = `question${temporal}`;
      questVal=`qValue${temporal}`;
    break;
    case "actividad4":
    break;
    //activity5 and 6 works exactly the same
    case "actividad5":
    case "actividad6":
      temporal=$('.tipo-de-actividad.pagina-actividad-visible').first().children('input').val();
      assignedName = `question${temporal}`;
      assignedNameForCheckBox=`respuestacheckbox${temporal}`;
      questVal=`qValue${temporal}`;
    break;
  }
  //we extract belonger value

  //Clonar
  pregunta.addClass('act-pregunta-select');
  pregunta.removeClass('act-pregunta-oculta');
  pregunta.appendTo('.den-actividadid-visible .pagina-actividad-visible .act-column-right');
  $('.den-actividadid-visible .act-pregunta-select .base-filedelete').removeClass('den-hide');
  closeMulti();
  //Asignar un Name a estos Inpust
  var inputActual = $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select input.an-input-name');
  inputActual.removeClass('asignatename-group');
  if(templateActivity=="actividad6"){
    inputActual.attr('name', assignedNameForCheckBox);
  }else{
    if(templateActivity!="actividad2"){
      inputActual.attr('name', assignedName);
      if(templateActivity=="actividad1"){
        $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select .qAndA-row .act-input-respuesta').attr("name",`respuesta${noQuest}[${belongsToQuestion}][${counterInput}]`);
        $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select .qAndA-row .act-valor-hover .act-input-qavalor').attr("name",`rValue${noQuest}[${belongsToQuestion}][${counterInput}]`);
      }
    }else{  //means its activity 2 or something else
      $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select  .qAndA-row.act-respuesta-row:not(.act-respuesta-oculta) input[type=radio]').attr("name",`rSelected${noQuest}[${belongsToQuestion}][${counterInput}]`);
      $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select .qAndA-row.act-respuesta-row input[type=text]').attr("name",`respuesta${noQuest}[${belongsToQuestion}][${counterInput}]`);
      $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select .qAndA-row.act-respuesta-row input[type=number]').attr("name",`rValue${noQuest}[${belongsToQuestion}][${counterInput}]`);
    }
  }

  //Animación  window.scrollTo(0,0);
  $(".act-general-container").animate({scrollTop:animar}, '500');
  $(".act-pregunta-row.act-pregunta-select input").first().attr("name",`${assignedName}[${size-1}]`);
  //data that stores number of input
  $(".act-pregunta-row.act-pregunta-select input").first().data("noquest",size-1);
  //we setup name
  $(".act-pregunta-row.act-pregunta-select .act-valor-hover.preguntahover input").attr("name",`${questVal}[${size-1}]`);

});
//Agregar Respuesta
$(document).on('click', '.act-btn-plus-respuesta', function() {
  if($('[name="valorLugar"]').length>0) {
    //$('.checkmarkValor').trigger('click');
    console.warn('hizo click');
  }

  var counterAnswersPerQuest;
  var cancelProcess=false;
  var belongsToQuestion=$('.act-pregunta-row.act-pregunta-select input[name^=question]').data("noquest");
  console.warn('le pertenece a la pregunta',belongsToQuestion);
  var templateAc=$('[name="templateActivity"]').val();
  console.warn('el templateact vale',templateAc);
  var respuesta = $('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select div.act-respuesta-oculta').clone();
  respuesta.removeClass('act-respuesta-oculta');
  respuesta.appendTo('.den-actividadid-visible .pagina-actividad-visible .act-pregunta-select');

  var counterInput=$(".act-pregunta-row.act-pregunta-select").find(".qAndA-row.act-respuesta-row").length-1;
  var noQuest=  $('.tipo-de-actividad.pagina-actividad-visible').first().children('input').val();
  respuesta.find('.act-input-respuesta').attr("name",`respuesta${noQuest}[${belongsToQuestion}][${counterInput-1}]`);
  respuesta.find('.act-input-qavalor').attr("name",`rValue${noQuest}[${belongsToQuestion}][${counterInput-1}]`);
  respuesta.find('.multichoiceansw').attr("name",`rSelected${noQuest}[${belongsToQuestion}][${counterInput-1}]`);
  respuesta.find('.answerFunctionality').attr("name",`rSelected${noQuest}[${belongsToQuestion}][${counterInput-1}]`);
  if($('[name="templateActivity"]').val()=="actividad2"){
    respuesta.find('.container input').attr("name",`rSelected${noQuest}[${belongsToQuestion}][${counterInput-1}]`);
  }
  $('.den-actividadid-visible .act-pregunta-select .base-filedelete').removeClass('den-hide');
  closeMulti();
});
//Eliminar respuesta
$(document).on('click', '.act-delete-answer', function() {
  $(this).parent().addClass('selectedDelete');
  $('.den-popup-eliminarfile').removeClass('den-hide');
  $('.den-popup-eliminarfile h2').text('¿Seguro que quieres eliminar esta respuesta?');
});
$(document).on('click', '.act-delete-question', function() {
  $('.den-popup-eliminarfile').removeClass('den-hide');
  $('.den-popup-eliminarfile h2').text('¿Seguro que quieres eliminar esta pregunta?');
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
  console.warn('encontrara',findThisId);
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
  //funcionvalor(valorQA);
});
// Agregar Pagina
var pageActivities=0;
$(document).on('click', '#agregarPagina', function() {
  var m = $('.den-actividadid-visible .pagina-actividad-visible').length;
  if($(".den-actividad-row.act-general-container.den-actividadid-visible").length==0)
  $('<div class="den-actividad-row act-general-container den-actividadid-visible"></div>').appendTo("#formActivities");
  var valorCheck = $('.den-actividadid-visible .pagina-actividad-visible').find('.qa-selected-value input').val();
  $('.den-carouselpaginas-container.den-cp-visible .den-pagina-title').removeClass('den-select-option');
  $('.den-actividadid-visible .tipo-de-actividad').removeClass('pagina-actividad-visible');
  $('.den-actividadid-visible .tipo-de-actividad').addClass('den-hide');
  var numbPage= $('input[name^="belongerActivity"]:last').length>0 ? parseInt($('input[name^="belongerActivity"]:last').val())+1: $('.den-cp-visible .den-pagina-title').length;
  //search if its set
  console.warn('el inicial es',numbPage)
  console.warn('se asignó', numbPage);
  //apend Pagina al Carrusel
  $("<div class='den-pagina-title den-select-option'><p></p></div>").appendTo(".den-carouselpaginas-container.den-cp-visible");
  //apend Pagina al Container
  $("<div class='tipo-de-actividad pagina-actividad-visible'></div>").appendTo(".act-general-container.den-actividadid-visible");

  //Generando id y txts
  var parentwidth = $('.den-cp-visible.den-carouselpaginas-container').width();
  var width = $('.den-cp-visible .den-pagina-title').width();
  var elementos = $('.den-cp-visible .den-pagina-title');
  var size = elementos.length;
  //controlActivitiesinput
  pageActivities=size;
  number = size + 1;
  width = width*number;
  var saveNewTxt = 'Pagina '+size;
  var saveNewId = 'actividadPagina_'+size;
  size = size * 170;
  $('.den-actividadid-visible .pagina-actividad-visible').attr('id', `actividadPagina_${numbPage}` );
  $('.den-cp-visible .den-pagina-title.den-select-option p').text(`Pagina ${numbPage+1}`);
  var id = $('.den-actividad-title.den-select-option').attr('id');
  var callingTxt = [id]+'.txt';
  // id = $('.den-selectActivity-container').find('#'+id);
  console.error('se mandó',id)
  jQuery.get('../actividades/'+callingTxt).success(function (datos) {
    var changethis = $('.den-actividadid-visible .pagina-actividad-visible').html(datos);
    // id.html(datos);
    if(!( m == 0)){
      changethis.find('.containerValor').removeClass('qa-selected-value');
      var n = changethis.find("input[name='valorLugar']");
      n.prop( "checked", false );
      changethis.find("input[value='"+valorCheck+"']").prop( "checked", true );
      changethis.find("input[value='"+valorCheck+"']").parent('.containerValor').addClass('qa-selected-value');
      var valorQA = valorCheck;
      //funcionvalor(valorQA);
    }

    if (parentwidth<=width) {
      $('.den-paginasActiv-left').addClass('btn-green-scroll');
      if (elementos.scrollLeft()==0) {
        $('.den-paginasActiv-right').removeClass('btn-green-scroll');
      }
    }

    switch(id){
      case "actividad1":break;
      case "actividad2":break;
      case "actividad3":
                        $(".act-green-btnstyle.act-btn-plus-respuesta").hide();
                        break;
      case "actividad4":break;
      case "actividad5":break;
      case "actividad6":break;
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
    //we add form name of activity
    $('.pagina-actividad-visible').find("input[name^='templateActivity']").attr('id',`nameActividad_${numbPage}`);
    $('.pagina-actividad-visible').find("input[name^='templateActivity']").val(id);
    $('.pagina-actividad-visible').find("input[name^='belongerActivity']").val(numbPage);
    $('.pagina-actividad-visible').find("input[name^='belongerActivity']").attr('id',`belongerActivity${numbPage}`);
    $('.pagina-actividad-visible').find("input[name^='belongerActivity']").attr('name',`belongerActivity[${numbPage}]`);
    var idTema=$(".den-curso-title.den-select-option").data('idtema');
    $('.pagina-actividad-visible').find("input[name^='idTemaActivity']").val(idTema);
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
  $.post('deleteActivity.php',{
      hIdTema : $('#idTema').val()
    },function(data,status){
      if(data[0].success=="true"){

      }else{
        console.warn('something went wrong');
      }
    });
});
// Guardar Actividad
$(document).on('click', '#saveChangesActivity', function() {
  var popImg = $('.den-popup-verarchivos').find('.den-actividad-title.den-select-option img').clone(); //here we clone the image of name of activity
  var back = $('.base-actividad-container.actividad-visible');  //to select container where image will be displayed
  var actividadId = $(".tipo-de-actividad.pagina-actividad-visible").attr('id');  //here we add name of activity txt
  console.warn('la id actividad=',actividadId);
  actividadId = '#'+actividadId;
  actividadId = $('.den-popup-verarchivos').find(actividadId);
  if (actividadId.hasClass('editando-actividad')) {
    var imagedelete = back.find('.actividad-guardada-container .save-image img');
    imagedelete.remove();
    var imagechange = back.find('.actividad-guardada-container .save-image');
    $(popImg).appendTo(imagechange);
  }else{
    $(saveActivContainer).prependTo(back);
    back.find('.agregar-actividad-btn').remove();
    var image = back.find('.actividad-guardada-container .save-image');
    $(popImg).appendTo(image);
    actividadId.addClass('editando-actividad');
  }
  $('#formActivities').trigger('submit');
  //Uncomment b4 release krpr
  //$('.den-popup-verarchivos').addClass('den-hide');
  //closeMulti();
});

function showActivity(){
  var popImg = $('.den-popup-verarchivos').find('.den-actividad-title.den-select-option img').clone(); //here we clone the image of name of activity
  var back = $('.base-actividad-container.actividad-visible');  //to select container where image will be displayed
  var actividadId = $(".tipo-de-actividad.pagina-actividad-visible").attr('id');  //here we add name of activity txt
  console.warn('el id en show es',actividadId);
  actividadId = '#'+actividadId;
  actividadId = $('.den-popup-verarchivos').find(actividadId);
  if (actividadId.hasClass('editando-actividad')) {
    var imagedelete = back.find('.actividad-guardada-container .save-image img');
    imagedelete.remove();
    var imagechange = back.find('.actividad-guardada-container .save-image');
    $(popImg).appendTo(imagechange);
  }else{
    $(saveActivContainer).prependTo(back);
    back.find('.agregar-actividad-btn').remove();
    var image = back.find('.actividad-guardada-container .save-image');
    $(popImg).appendTo(image);
    actividadId.addClass('editando-actividad');
  }
}
// Editar Actividad
$(document).on('click', '#editPopUpAct ', function() {
  $('.den-popup-verarchivos .den-actividad-title').removeClass('den-select-option');
  //$('.act-general-container').removeClass('den-actividadid-visible');
  //$('.act-general-container').addClass('den-hide');
  //$('.den-carouselpaginas-container').removeClass('den-cp-visible');
  //$('.den-carouselpaginas-container').addClass('den-hide');

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
  var numberPages = idPages.find('.den-pagina-title').length;
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
  activityId = $('#formActivities').find(activityId);
  $(pagesId).remove();
  $(activityId).remove();
  $('.actividad-visible .actividad-guardada-container').remove();
  $(singleActivContainer).prependTo(".base-actividad-container.actividad-visible");
  $('.den-popup-eliminar-actSave').addClass('den-hide');
  closeMulti();
  $.post('deleteActivity.php',{
      hIdTema : $('#idTema').val()
    },function(data,status){
      if(data[0].success=="true"){

      }else{
        console.warn('something went wrong');
      }
    }
  );
});
//Guia full
$(document).on('click', '.den-steps_top', function() {
   localStorage.setItem('pasoUvimex','0');
   $('ul.den-dropmenuHelp li').first().trigger('click');
});
//Templete 4 subir
$(document).on('click', '.click-fake-input', function() {
  $('input.tem4-control').trigger('click');
  closeMulti();
});
/*$(document).on('keypress', '.input-popup-newtitle', function(e) {
  if (e.keyCode == 13) {
    console.log(e);
    e.preventDefault();

    var saveNewTxt = $("#nombreTema").val();

    $.ajax({
      url: "createTheme.php",
      type: 'post',
      data: {cursoName: saveNewTxt, idModulo: $('.den-select :selected').val()},
      success: function(result){
        $("#idTema").val(result);
        reloadStoredThemes(result);
        createNewTitle(result);

      }});
    }
  });*/


  function checkAuth() {
    $.post('/wp-admin/admin-ajax.php',{
				action : 'ajax_check_user_logged_in'
			}).done(function(data,status){
              if(data.ID){
                  userId=data.ID;
                  reloadStoredCourses();
              }
            }).fail(function(xhr, status, error) {
                window.location.href="https://uvimex.com.mx/crea-tu-curso-online/";
                return false;
            });

 }

  $(document).ready(function(){
    //checkAuth();



    $(document).on('click', '.den_publicar', function(e) {
          closeSteps();
          if($("#titulos_option").val()){

$.ajax({
              url: "mailSender/sendToCalo.php",
              type: 'post',
              data: {
                userName: localStorage.getItem("userName"),
                userNick: localStorage.getItem("userNick"),
                courseName: localStorage.getItem("courseName")
              },
              success: function(e){
                if(e == "done"){
                  console.log("contactado");
                }
                else{
                  console.log(e);
                }

              }
      });

            var idModulo=$("#titulos_option").val();
            $.ajax({
              url: "storeModuleUrl.php",
              type: 'post',
              data: {
                idModulo: idModulo
              },
              success: function(data){
                if(data[0].success==="true"){
                  window.location.href = `preview.php?idmodule=${idModulo}&usr=${userId}`;
                }
              }
            });
          }else{
            errorValidation("Debe de seleccionar un Módulo para poder publicarlo");
           $("#titulos_option").addClass('focus-missing-selection');
          }
    });
    $(document).on('change', '.file', function(e) {
      var consecutivo=$(this).data("consecutivo");
      var consecutivoSiguiente=$(".file").length;
      console.warn('el consecutivo vale',consecutivo);

      var fileName = e.target.files[0] ? e.target.files[0].name : "";
      $("#strNombreArchivo"+consecutivo).val(fileName);

      if( $(this).val() ){
        $("#wrapDocuments").append(archivoContainer);

        $("#wrapDocuments").find(".file").last().attr("id",'file'+consecutivoSiguiente);
        $("#wrapDocuments").find(".file").last().data("consecutivo",consecutivoSiguiente);
        $("#wrapDocuments").find(".strNameFile").last().attr("id",'strNombreArchivo'+consecutivoSiguiente);
        $("#wrapDocuments").find(".strNameFile").last().data("consecutivo",consecutivoSiguiente);
      }
    });
    $(document).on('click', '.blue', function() {
      $('.icon-home-teme').toggleClass( "den-hide" );
    });


    $(document).on('click', '#btnSave', function(e) {
        closeSteps();
      e.preventDefault();

      var $bandera=0;

      if($("#titulos_option").val()==""){
         errorValidation("Es necesario seleccionar un módulo para poder guardar");
        $("#titulos_option").addClass('focus-missing-selection');
        $bandera=1;
        return false;
      }else{
        $("#titulos_option").removeClass('focus-missing-selection');
      }

      if($('.den-carousel-container .den-curso-title.den-select-option').length==0){
         errorValidation("Es necesario seleccionar un Tema para poder guardar");
        $bandera=1;
        $(".den-carousel-alltitles").addClass('focus-missing-selection');
        return false;
      }else{
        $('.den-carousel-alltitles').removeClass('focus-missing-selection')
      }

      if(!$("#title").val() && $("#descripcionCursoPlantilla").val()!=""){
         errorValidation("El campo título es obligatorio");
        $("#title").focus();
        $bandera=1;
        return false;
      }else if($("#title").val().length>257){
        console.warn('entro al title lengtth');
        errorValidation("El campo título debe tener una longitud menor o igual a 256 caracteres");
        $("#title").focus();
        $bandera=1;
        return false;
      }
      if(!$("#subtitle").val()  && $("#descripcionCursoPlantilla").val()!=""){
        errorValidation("El campo subtitulo es obligatorio");
        $("#subtitle").focus();
        // alert('entro2');
        $bandera=1;
        return false;
      }else if($("#subtitle").val().length>257){
        console.warn('entro al subtitle lengtth');
        errorValidation("El campo subtítulo debe tener una longitud menor o igual a 256 caracteres");
        $("#subtitle").focus();
        $bandera=1;
        return false;
      }
      if($("#idTema").val()===""){
         errorValidation("Es necesario que seleccione un tema");

        $bandera=1;
        return false;
      }
      console.warn($bandera);
      if($('.file_secs.interface_input').length>1){
          //validate seconds input
          $('.file_secs.interface_input').each(function(i, obj) {
            if(i < $('.file_secs.interface_input').length-1 && obj.value==""){
                errorValidation("No puedes dejar campos sin segundos");
                $bandera=1;
                obj.focus();
                return false;
            }
          });
          //validate minutes input
          $('.file_mins.interface_input').each(function(i, obj) {
            if(i < $('.file_mins.interface_input').length-1 && obj.value==""){
                errorValidation("No puedes dejar campos sin minutos");
                $bandera=1;
                obj.focus();
                return false;
            }
          });
      }


      if($bandera==0){
        $('#templateForm').trigger('submit');
      }else{
        return false;
      }

    });
    // // //Save Form
    // $("#templateForm").ajaxForm({
    //
    //     beforeSubmit: function(arr, $form, options) {
    //
    //     },
    //     uploadProgress: function(event, position, total, percentComplete) {
    //
    //     },
    //     error: function(jqXHR, textStatus, errorThrown) {
    //       console.warn(errorThrown,textStatus,jqXHR);
    //     },
    //     success: function(data, textStatus, jqXHR) {
    //       console.warn('entro al success');
    //       if(data===""){
    //             ajaxSuccess();
    //       }
    //     }
    // });

    $("#templateForm").submit(function(e) {
       e.preventDefault();
       var percent = document.getElementById("bar");
       var status = 0;
         ajaxWaiting();
         setTimeout(function(){
           $("#templateForm").ajaxSubmit({
               beforeSubmit: function(arr, $form, options) {
                 // status.empty();
                 var porcentajeVal = '0%';
                 percent.style.width=porcentajeVal;
                 percent.innerHTML=porcentajeVal;
               },
               uploadProgress: function(event, position, total, percentComplete) {
                 var porcentajeVal = percentComplete + '%';
                 console.warn(porcentajeVal);
                 percent.style.width=porcentajeVal;
                 percent.innerHTML=porcentajeVal;
                 //console.log(porcentajeVal, position, total);
               },
               error: function(jqXHR, textStatus, errorThrown) {
                 console.warn(errorThrown,textStatus,jqXHR);
               },
               success: function(data, textStatus, jqXHR) {
                 var porcentajeVal = '100%';
                 percent.style.width=porcentajeVal;
                 percent.innerHTML=porcentajeVal;
                 if(data[0].success == "true"){
                       ajaxCompleted();
                       var templateName=$('.den-curso-title.den-select-option').data('idtemapadre');
                       idContenidoClick=data[0].idContenido;
                       console.warn('el template que se mandará al terminar es ',templateName);
                       plantillaSelect(templateName);
                 }
               },
               complete: function(xhr) {
                 var templateName=$('.den-plantilla-title.den-select-option').attr('id');
                 console.log('entro',templateName);
                $('.den-curso-title.den-select-option').data('idtemapadre',templateName);
                console.warn('se asignó',templateName);
              //   console.warn(xhr.responseText)
               // status.html(xhr.responseText);
               }
           });
        }, 2200);

    });


    $("#formActivities").submit(function(e) {
       e.preventDefault();
       var percent = document.getElementById("bar");
       var status = 0;
         ajaxWaiting();
         setTimeout(function(){
           $("#formActivities").ajaxSubmit({
               beforeSubmit: function(arr, $form, options) {
                 // status.empty();
                 console.log($form);
                 var porcentajeVal = '0%';
                 percent.style.width=porcentajeVal;
                 percent.innerHTML=porcentajeVal;
               },
               uploadProgress: function(event, position, total, percentComplete) {
                 var porcentajeVal = percentComplete + '%';
                 console.warn(porcentajeVal);
                 percent.style.width=porcentajeVal;
                 percent.innerHTML=porcentajeVal;
                 //console.log(porcentajeVal, position, total);
               },
               error: function(jqXHR, textStatus, errorThrown) {
                 console.warn(errorThrown,textStatus,jqXHR);
               },
               success: function(data, textStatus, jqXHR) {
                 var porcentajeVal = '100%';
                 percent.style.width=porcentajeVal;
                 percent.innerHTML=porcentajeVal;
                 if(data[0].success == "true"){
                       ajaxCompleted();
                        $("#formActivities").empty().promise().done(function() {
                          $(".den-carouselpaginas-container").empty();
                          plantillaSelect($("#temaPadre").val());
                        });

                 }
               },
               complete: function(xhr) {
              //   console.warn(xhr.responseText)
               // status.html(xhr.responseText);
               }
           });
        }, 2200);

    });



    // $("#templateForm").submit(function(e) {
    //    e.preventDefault();
    //   // var counterImg=1;
    //   // var data=new FormData(this);
    //   // console.warn('entrará aquí');
    //    //Just in case we need to make this manually uncomment this, its al working
    //   // data.append('idTema', $("#idTema").val());
    //   // data.append('temaPadre', $("#temaPadre").val());
    //   // data.append('title', $("#title").val());
    //   // data.append('subtitle', $("#subtitle").val());
    //   // // data.append('video[1]',document.getElementById("uno").files[0]);
    //   // var form=$("#templateForm");
    //   // var filevideos=form.find("input[type='file'][name^='video']");
    //   // $.each(filevideos,function(){
    //   //   console.warn($(this)[0].files[0]);
    //   //    if($(this)[0].files[0]!=undefined){
    //   //      data.append("video["+counterImg+"]",$(this)[0].files[0]);
    //   //      data.append("orden["+counterImg+"]",$('input[name="orden['+counterImg+']"]').val());
    //   //      $("input[type='file'][name^='img"+counterImg+"']").each(function (i,img){
    //   //         if(img.value!=""){
    //   //           data.append('img'+counterImg+'[]', img.files[0]);
    //   //           data.append('minutes'+counterImg+'[]', img.files[0]);
    //   //           data.append('seconds'+counterImg+'[]', img.files[0]);
    //   //         }
    //   //      });
    //   //    }
    //   //     counterImg++;
    //   // });
    // $("#loading-screen").show(100);
    // $("#loading-icon").show();
    // $("#saving-text").show();
    //   setTimeout(function(){
    //     $.ajax({
    //            type: "POST",
    //            url:  "storeFilledTemplate.php",
    //            data: data, // serializes the form's elements.
    //            contentType: false,       // The content type used when sending data to the server.
    //            processData:false,
    //            success: function(data)
    //            {
    //              if(data===""){
    //                 $("#loading-icon").hide(100);
    //                 $("#saving-text").hide();
    //                 $("#success-icon").show(100);
    //                 $("#sucess-text").show(100);
    //                 setTimeout(function(){
    //                   $("#loading-screen").hide(100);
    //                   $("#success-icon").hide(100);
    //                   $("#sucess-text").hide(100);
    //                }, 2200);
    //              }
    //                // show response from the php script.
    //            }
    //          });
    //   }, 2200);
    //
    //
    // });

    //Controles Pantallas Crear y Seleccionar
    $( "#descripcionCurso" ).keyup(function() {
      var description=$(this).val().length;
      $('#wordsWritten').text(`${description}/999`);
    });

    $('#addNewCourse').click(function() {
      $('.den-popup-newcourse').show(300);
      $("#wordsWritten").html('0/999');
      closeMulti();
    });

    var selectedModule='';
    $("#generarNuevoCurso").click(function(){
      var saveNewTxtCourse = $("#nombreCurso").val();
      var saveNewTxtCourseDesc = $("#descripcionCurso").val();
      var costoTxtCourse=$("#costoCurso").val();
      if(saveNewTxtCourse==""){
        $("#nombreCurso").siblings('.span-error-text').first().text('* Es necesario agregar un nombre del Módulo').hide().show(150);
        $("#nombreCurso").addClass('has-den-error');
        $("#nombreCurso").removeClass('has-den-success');
        $("#nombreCurso").focus();
        return false;
      }else if(saveNewTxtCourseDesc==""){
        $("#nombreCurso").siblings('.span-error-text').first().hide();
        $("#nombreCurso").removeClass('has-den-error');
        $("#nombreCurso").addClass("has-den-success");
        $("#descripcionCurso").siblings('.span-error-text').first().text('* Es necesario agregar una  descripción del Módulo').hide().show(150);
        $("#descripcionCurso").removeClass('has-den-success');
        $("#descripcionCurso").addClass('has-den-error');
        $("#descripcionCurso").focus();
        return false;
      }
      $.ajax({
        url: "createModule.php",
        type: 'post',
        data: {
          nombre: saveNewTxtCourse,
          descripcion: saveNewTxtCourseDesc,
          costo:costoTxtCourse,
          userId:userId,
          idCurso:localStorage.getItem('selectedCourse')
        },
        success: function(result){
          //cleanning stuff incase it was something b4
            $('.den-carousel-container').empty();//cleans theme carrousel
            $('.den-carousel-plantillas .den-carousel-column .den-select-option').removeClass('den-select-option');//cleans template selected
            $('.den-prevnedit-plantilla').empty(); //cleans content
          //ends cleanning
          $("#nombreCurso").removeClass("has-den-error has-den-success");
          $("#descripcionCurso").removeClass("has-den-error has-den-success");
          $("#costoCurso").removeClass("has-den-error has-den-success");
          $('.span-error-text').hide();
          //quita seleccionado KRPR
          $("#titulos_option").val('');
          $('#createModuleForm').trigger("reset");

          $('.den-popup-newcourse').hide(300);
          $(".den-carousel-container").empty();
          //selectedModule=result;
          reloadStoredModules(result);
          reloadStoredThemes();


          closeSteps();
          // }

        }
      });
    });




    $("#generarNuevaPantallaBtn").click(function(e){
      console.log("easd");
      e.preventDefault();
      var saveNewTxt = $("#nombreTema").val();
      if(saveNewTxt==""){
        $("#nombreTema").siblings('.span-error-text').first().text('* Es necesario agregar el nombre del tema').hide().show(150);
        $("#nombreTema").addClass('has-den-error');
        $("#nombreTema").focus();
        console.warn('entro');
        return false;
      }
      $.ajax({
        url: "createTheme.php",
        type: 'post',
        data: {cursoName: saveNewTxt, idModulo: $('.den-select :selected').val()},
        success: function(result){
          $("#nombreTema").siblings('.span-error-text').first().text('* Es necesario agregar el nombre del tema').hide();
          console.warn('al crear retorno tema:',result);
          $("#idTema").val(result);
          reloadStoredThemes(result);
          createNewTitle(result);

        }});
      });

      //Cambiar entre modulos
      $(document).on('click', '#titulos_option', function() {
        $("#titulos_option").removeClass('focus-missing-selection');
        //console.log($("#titulos_option").val());

        if(g_idModulo == ""){
          // Change modules
          var idModulo = $("#titulos_option").val();
          var theme = new Themes();
          theme.idModulo=idModulo;
          var themesArray=theme.getThemes();
          $(".den-carousel-container").empty();
          if(themesArray){
            console.log("Not");
            console.log(themesArray);
            for (var i = 0; i < themesArray.length; i++) {
              $("<div class='den-curso-title' id='titlePantalla_"+i+"' onclick='chooseTheme(this);'  data-idTemaPadre='"+themesArray[i].temaPadre+"'  data-idModulo='"+themesArray[i].idModulo+"' data-idTema='"+ themesArray[i].idTema+"'><p>"+themesArray[i].nombre+"</p></div>").appendTo(".den-carousel-container");
            }
          }else{
            console.log("Not");
            $(".den-carousel-container").empty();
            $('.den-prevnedit-plantilla').empty();
            $('#templateForm').trigger("reset");
          }
          g_idModulo = idModulo;
          chooseTheme();
          return;
        }
        if(g_idModulo != $("#titulos_option").val()){
          $(document.activeElement).blur();
          //CONTINUA
          makePopupYesNo("changeModule","¿Seguro quieres cambiar de modulo?", "Se perderán los cambios", "Sí", "No",
            //
            // Click yes
            //
            function(){
              killPopupYesNo("changeModule");
              // Change modules
              var idModulo = $("#titulos_option").val();
              var theme = new Themes();
              theme.idModulo=idModulo;
              var themesArray=theme.getThemes();
              $(".den-carousel-container").empty();
              if(themesArray){
                console.log(themesArray);
                for (var i = 0; i < themesArray.length; i++) {
                  $("<div class='den-curso-title' id='titlePantalla_"+i+"' onclick='chooseTheme(this);'  data-idTemaPadre='"+themesArray[i].temaPadre+"'  data-idModulo='"+themesArray[i].idModulo+"' data-idTema='"+ themesArray[i].idTema+"'><p>"+themesArray[i].nombre+"</p></div>").appendTo(".den-carousel-container");
                }
              }else{
                $(".den-carousel-container").empty();
                $('.den-prevnedit-plantilla').empty();
                $('#templateForm').trigger("reset");
              }
              g_idModulo = idModulo;
              chooseTheme();
            },
            //
            // Click no
            //
            function(){
              killPopupYesNo("changeModule");
              $("#titulos_option").val(g_idModulo);
            }
            );
        }
        else{
          console.warn('entro al else');
        }
      });


      $('#agregarNuevoTitulo').click(function() {
        if($("#titulos_option").val()==""){
          showMessageAlert('Debe seleccionar un Módulo antes de agregar un tema nuevo');
          return false;
        }
        $('.den-popup-newtitle').removeClass('den-hide');
        closeMulti();
      });
          //KRPR CARGAR TITULO
      $('#cambiarDeTitulo').click(function() {
        closeSteps();
        var id = $('.den-plantilla-title.plantillaOnClick').attr('id') ? $('.den-plantilla-title.plantillaOnClick').attr('id') : $('.den-curso-title.den-select-option').data('idtemapadre');
        console.warn('la plantilla es',id);
        $('.den-plantilla-title.den-select-option').removeClass('den-select-option');
        $('.den-plantilla-title.triggered').addClass('den-select-option').removeClass('triggered');
        console.warn('el id nos dio aqui',id);
        var templateName=$('.den-curso-title.den-select-option').data('idtemapadre');
        if($('.den-plantilla-title.den-select-option').attr('id') != templateName){
          $('.den-plantilla-title').removeClass('den-select-option');
          $('.den-plantilla-title.plantillaOnClick').addClass('den-select-option', 'den-go-title');
          $('.den-plantilla-title').removeClass('plantillaOnClick');
          $('.den-plantilla-title.den-select-option').animate({scrollTop:0}, '500');
        }
        $('.den-prevnedit-plantilla').empty();
        $('#temaPadre').val(id);

        if(templateName){
          //se manda el titulo completo
            console.warn('se mandara el id',templateName);
        plantillaSelect(templateName);
        $('.act-column-right').empty();
      }else{
        if(id){
          console.warn('se mandara el id',id);
          plantillaSelect(id);
        }else{
          $(".den-prevnedit-plantilla").empty();
        }
        $('.act-column-right').empty();
      }
        $('.den-popup-cambiardetitle').addClass('den-hide');
      });

      //show message alerts functions
       function showMessageAlert (text){
         $('.base-alert-titleRepetido h1').text(text);
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

      //Seleccionar PLANTILLA
      $('.den-plantilla-title').click(function(e,avoidValidation=false) {
        e.preventDefault();
        closeMulti();
        console.error('tiene atributo',$(this).hasClass('triggered'));
        avoidValidation=$(this).hasClass('triggered') ? true:false;
        if(avoidValidation==false && $("#idTema").val()===""){
          console.warn('el avoid vale',avoidValidation);
          showMessageAlert('Es necesario agregar/seleccionar un tema previo a elegir una plantilla');
          return false;
        }
        //when already exists a saved template
        if($('.den-carousel-container .den-select-option').data('idtemapadre')!=$(this).attr('id') && $('.den-carousel-container .den-select-option').data('idtemapadre')!="unknown"){
          showMessageAlert('No se puede cambiar de plantilla una ves guardado el Tema');
          return false;
        }
        if($(this).hasClass('triggered')){
          $('.changeBetweenThemeTemplate').html('¿Seguro quieres cambiar de Tema?');
        }else{
          $('.changeBetweenThemeTemplate').html('¿Seguro quieres cambiar de Plantilla?');
        }
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
        var size = plantilla.length;
        size = size-4;
        plantilla = plantilla.outerHeight();
        size = size * plantilla;
        $(".den-btn-bottom").addClass('btn-green-scroll');
        if ($(".den-carousel-column").scrollTop()>=size) {
          $(".den-btn-bottom").removeClass('btn-green-scroll');
          $(".den-btn-top").removeClass('btn-green-scroll');
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
        var size = elementos.length;
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
        var size = elementos.length;
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
        var size = elementos.length;
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
        var size = elementos.length;
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
        // var size = elementos.length;
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
        $(".den-btn-top").addClass('btn-green-scroll');
        if ($(".den-carousel-column").scrollTop()<=plantilla) {
          $(".den-btn-top").removeClass('btn-green-scroll');
          $(".den-btn-bottom").removeClass('btn-green-scroll');
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
        var size = actividad.length;
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

    function reloadStoredModules(idModulo){
      console.warn('se seleccionara el modulo',idModulo);
      idCurso=localStorage.getItem('selectedCourse') ? localStorage.getItem('selectedCourse') : '';
      idModulo=idModulo ? idModulo : '';
      $.ajax({
        url: "../json/jsonModules.php",
        type: 'get',
        data: {userId:userId,
        idCurso:idCurso
        },
        contentType: "application/json",
        success: function(arrayResponse){
          $('#titulos_option').empty();
          if(arrayResponse){
            (arrayResponse.length<1) ? $('<option value="">No tiene modulos guardados</option>').appendTo('#titulos_option'):'';
            for (var i = 0; i < arrayResponse.length; i++) {
              strSelected= (idModulo===arrayResponse[i].idModulo) ? 'selected':'';
              if(i==0){
                $('<option value="">Seleccione un Módulo</option>').appendTo('#titulos_option')
              }
              $('<option '+strSelected+' value="'+arrayResponse[i].idModulo+'">'+arrayResponse[i].nombre+'</option>').appendTo('#titulos_option');
            }
          }
        }
      });
    }

    function reloadStoredThemes(idTema){
      $('.den-carousel-container').empty();
     console.log('el tema recargado sera',idTema);
     //console.warn('el modulo recargado sera',selectedModule);
      $.ajax({
        url: "../json/jsonThemes.php",
        type: 'get',
        data: {idTema:idTema,
        idModulo:$("#titulos_option").val()
      },
      contentType: "application/json",
      success: function(arrayResponse){
          $('.den-carousel-container').empty();
        for (var i = 0; i < arrayResponse.length; i++) {
          $("<div class='den-curso-title' onclick='chooseTheme(this);' data-idTemaPadre='"+arrayResponse[i].temaPadre+"' data-idModulo='"+arrayResponse[i].idModulo+"' data-idTema='"+	arrayResponse[i].idTema+"'><p>"+arrayResponse[i].nombre+"</p></div>").appendTo(".den-carousel-container");
        }
        if(idTema){
          console.warn('cuando se recarga vale',idTema);
          $(".den-carousel-container").find("*[data-idtema='"+idTema+"']").addClass("den-curso-title den-select-option den-go-title");

        }
      }
    });

  }

  function chooseTheme(x){
    console.log("changing theme");
    console.log(x);
    if(x == undefined){
      $(".den-plantilla-title").removeClass("den-select-option");
      $('.den-prevnedit-plantilla').empty();
      $("#idTema").val("");
      $("#temaPadre").val("");
      return;
    }
    $(".den-carousel-alltitles").removeClass('focus-missing-selection');
    localStorage.setItem('prevSelectedTheme', $('.den-carousel-container .den-curso-title.den-select-option').data('idtema'));
    console.warn('se tiene en memoria',$('.den-carousel-container .den-curso-title.den-select-option').data('idtema'));
    console.warn('el choose theme vale',x);
    $(x).siblings(".den-curso-title.den-select-option").removeClass('den-select-option');
    $(x).addClass('den-select-option');
    //  load single Theme
    var idTema=$(x).data('idtema');
    var theme = new Themes();
    theme.idTema=idTema;
    console.warn('el tema a traer es:',idTema);
    var themesArray=theme.getSingleTheme();
    console.log('el contenido de las themesArray es:',themesArray);
    //trigger click to choose theme
    if(themesArray){
      $('.den-carousel-column .den-select-option.triggered').removeClass('den-select-option triggered')
      $("#"+themesArray[0].temaPadre).addClass('den-select-option triggered');
      $("#"+themesArray[0].temaPadre).trigger('click');
    }else{
      alert("esta vacio");
    }

  }


  function loadSavedActivities(activitiesArray){
    //first we select the template of activity savedbuttons
    $("#formActivities").empty();
    $(".den-carouselpaginas-container").empty();
    var selectedActivity=activitiesArray[0].plantillaActividad;
    idPlantillaActividad=selectedActivity ?  selectedActivity : null;
      console.warn('el contenido de las actividades es:',activitiesArray);
      var htmlTemplateActivity="";
      jQuery.get(`../actividades/${selectedActivity}.txt`, function(data) {
        htmlTemplateActivity=data;
        console.warn('se seleccionará la actividad',selectedActivity);
        $(`.den-carousel-act-column .den-select-option`).removeClass('den-select-option');
        $(`.den-carousel-act-column #${selectedActivity}`).addClass("den-actividad-title den-select-option");
        //then we patch the showActivities
        var videoName=$(".base-agrega-material.base-agregar-video.selected-video.base-thishasfile").find(".base-nameoffile").text();
        $(`<div class='base-actividad-container actividad-visible' id='${videoName}'></div>`).prependTo(".base-agregar-actividad");
        //we call showActivity
        showActivity();
        var paginaActual="";
        var pasteContent=false;
        var contentData="";
        var contentDataAnswer="";
        var printNow="";
        var triggerActivity6Questclick=true;

        var contador=0;
        for (var i = 0; i < activitiesArray.length; i++) {

          //it enter for 2....N of same question
          if(paginaActual==activitiesArray[i].numPag){
            // console.warn('entro al if i=',i);
            switch(selectedActivity){
              case "actividad0": break;
              case "actividad1":
                    var nameInputValue=null;
                    var valoraRespuesta=null;
                    if(activitiesArray[i].respuestasArr.length>0)
                    {
                      contentDataAnswer="";
                      for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                        nameInputValue=`rValue${activitiesArray[i].numPag}[${contador}][${j}]`;
                        var valoraRespuesta=activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : '';
                        contentDataAnswer+=`<input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="Ingresa una respuesta">`;
                      }
                        contentData+=`<div class="act-pregunta-row">
                                        <div class="base-filedelete act-delete-question tooltip">
                                          <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                        </div>
                                        <div class="qAndA-row">
                                        <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                        <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Ingresa Una Pregunta" data-noQuest="${contador}">
                                          ${contentDataAnswer}
                                          <div class="act-valor-hover">
                                            <input type="number" min="0" class="act-input-qavalor" value="${valoraRespuesta}" name="${nameInputValue}">
                                            <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                          </div>
                                        </div>
                                      </div>`;

                        $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                        contentData="";
                        contador=0;
                  }
              break;
              case "actividad2":
                if(activitiesArray[i].respuestasArr.length>0)
                {
                  contentDataAnswer="";
                  for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                    var checkedcheckbox= activitiesArray[i].respuestasArr[j].correcta ? 'checked' : '';
                    contentDataAnswer+=`<div class="qAndA-row act-respuesta-row">
                                            <div class="base-filedelete act-delete-answer tooltip">
                                              <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                            </div>
                                            <label class="container">
                                            <input type="radio" ${checkedcheckbox} name="rSelected${activitiesArray[i].numPag}[${contador}][${j}]" class="an-input-name radioB" value="1">
                                            <span class="checkmark2"></span>
                                            </label>
                                            <input type="hidden" value="${activitiesArray[i].respuestasArr[j].idRespuesta}" name="hidRespuesta${activitiesArray[i].numPag}[${contador}][${j}]">
                                            <input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="Respuesta">
                                            <div class="act-valor-hover respuestahover answ-val" style="display: block;">
                                              <input type="number" min="0" value="${activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : ''}" class="act-input-qavalor answ-val-input" style="" name="rValue${activitiesArray[i].numPag}[${contador}][${j}]">
                                              <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                            </div>
                                          </div>
                                        `;
                        if(activitiesArray[i].respuestasArr[j] && activitiesArray[i].respuestasArr[j].valorRes){
                          triggerActivity6Questclick=false;
                        }
                    }
                    contentData+=`<div class="act-pregunta-row">
                                    <div class="base-filedelete act-delete-question tooltip">
                                      <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                    </div>
                                    <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                    <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Ingresa Una Pregunta" data-noQuest="${contador}">
                                    <div class="act-valor-hover preguntahover">
                                      <input type="number" min="0" class="act-input-qavalor quest-va-input" value="0" style="display: none;" name="qValue${activitiesArray[i].numPag}[${contador}]">
                                      <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                    </div>${contentDataAnswer}
                                    <div class="qAndA-row act-respuesta-row act-respuesta-oculta">
                                        <div class="base-filedelete act-delete-answer tooltip">
                                          <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                        </div>
                                        <label class="container">
                                        <input type="radio" name="falseTrue" class="an-input-name radioB" value="1">
                                        <span class="checkmark2"></span>
                                        </label>
                                        <input type="text" name="res" value="" class="act-input-respuesta" placeholder="Respuesta">
                                        <div class="act-valor-hover respuestahover answ-val" style="display: block;">
                                          <input type="number" min="0" value="0" class="act-input-qavalor answ-val-input" style="" name="rValue0[0][0]">
                                          <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                        </div>
                                    </div>
                                 </div>`;

                    $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                    contentData="";
                    contador=0;
              }
              break;
              case "actividad3":
                    contentData+=` <div class="act-pregunta-row">
                                        <div class="base-filedelete act-delete-question tooltip">
                                          <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                        </div>
                                        <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                        <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Pregunta">
                                        <div class="act-valor-hover preguntahover">
                                            <input type="number" min="0" class="act-input-qavalor" value="${activitiesArray[i].valorPreg}" name="qValue${activitiesArray[i].numPag}[${contador}]">
                                            <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                        </div>
                                    </div>`;
              break;
              case "actividad4": break;
              case "actividad5":
                  //first render de answers
                  //append answers rendered
                  if(activitiesArray[i].respuestasArr.length>0)
                  {
                      contentDataAnswer="";
                      for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                        var checkedcheckbox= activitiesArray[i].respuestasArr[j].correcta ? 'checked' : '';
                        contentDataAnswer+=`<div class="qAndA-row act-respuesta-row">
                                              <div class="base-filedelete act-delete-answer tooltip">
                                                <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                              </div>
                                              <label class="container showLabel" style="display: inline-block;">
                                                <input type="radio" ${checkedcheckbox} name="rSelected${activitiesArray[i].numPag}[${contador}][${j}]" class="an-input-name radioB answerFunctionality" value="1">
                                                <span class="checkmark2"></span>
                                               </label>
                                              <input type="hidden" value="${activitiesArray[i].respuestasArr[j].idRespuesta}" name="hidRespuesta${activitiesArray[i].numPag}[${contador}][${j}]">
                                              <input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="Respuesta">
                                              <div class="act-valor-hover respuestahover">
                                                <input type="number" min="0" class="act-input-qavalor" value="${activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : 0}" name="rValue${activitiesArray[i].numPag}[${contador}][${j}]">
                                                <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                              </div>
                                            </div>`;
                      }
                  }
                    console.error(`estamos en el if, entro en else en i=${i}, activitiesArray[${i}].strPregunta=${activitiesArray[i].strPregunta} pasteContent=${pasteContent}`);
                    contentData+=`<div class="act-pregunta-row">
                                        <div class="base-filedelete act-delete-question tooltip">
                                          <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                        </div>
                                        <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                        <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Pregunta" data-noQuest="${contador}">
                                   ${contentDataAnswer}
                                   <div class="qAndA-row act-respuesta-row act-respuesta-oculta">
                                     <div class="base-filedelete act-delete-answer tooltip den-hide">
                                       <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                     </div>
                                     <input type="text" name="" value="" class="act-input-respuesta" placeholder="Respuesta">
                                     <div class="act-valor-hover respuestahover">
                                       <input type="number" min="0" class="act-input-qavalor" value="0">
                                       <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                     </div>
                                   </div>
                                  </div>
                                  `;
                                  //div after variable contentDataAnswer must be added incase user clicks on add answer
                      $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                      contentData="";
                      contador=0;
              break;
              case "actividad6":
                  if(activitiesArray[i].respuestasArr.length>0)
                  {
                      contentDataAnswer="";
                      for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                        console.log('el valor que pondra en input es',activitiesArray[i].respuestasArr[j].valorRes);
                        var checkedcheckbox= activitiesArray[i].respuestasArr[j].correcta ? 'checked' : '';
                        console.warn('en el checkbox debe ir', activitiesArray[i].respuestasArr[j].correcta, checkedcheckbox);
                        contentDataAnswer+=`<div class="qAndA-row act-respuesta-row">
                                              <div class="base-filedelete act-delete-answer tooltip">
                                                <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                              </div>
                                              <label class="container showLabel">
                                                <input type="checkbox" ${checkedcheckbox} name="rSelected${activitiesArray[i].numPag}[${contador}][${j}]" class="an-input-name" value="1">
                                                <span class="checkmark"></span>
                                              </label>
                                              <input type="hidden" value="${activitiesArray[i].respuestasArr[j].idRespuesta}" name="hidRespuesta${activitiesArray[i].numPag}[${contador}][${j}]">
                                              <input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="Respuesta">
                                              <div class="act-valor-hover respuestahover">
                                                <input type="number" min="0" class="act-input-qavalor" value="${activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : ''}" name="rValue${activitiesArray[i].numPag}[${contador}][${j}]">
                                                <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                              </div>
                                            </div>`;
                      }
                      if(activitiesArray[i].respuestasArr[j] && activitiesArray[i].respuestasArr[j].valorRes){
                        triggerActivity6Questclick=false;
                      }
                  }
                    console.error(`estamos en el if, entro en else en i=${i}, activitiesArray[${i}].strPregunta=${activitiesArray[i].strPregunta} pasteContent=${pasteContent}`);
                    contentData+=`<div class="act-pregunta-row">
                                        <div class="base-filedelete act-delete-question tooltip">
                                          <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                        </div>
                                        <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                        <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Pregunta" data-noQuest="${contador}">
                                        <div class="act-valor-hover preguntahover quest-val">
                                          <input type="number" min="0" class="act-input-qavalor quest-va-input" value="${activitiesArray[i].valorPreg}" name="qValue${activitiesArray[i].numPag}[${contador}]"">
                                          <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                        </div>
                                   ${contentDataAnswer}
                                   <div class="qAndA-row act-respuesta-row act-respuesta-oculta">
                                     <div class="base-filedelete act-delete-answer tooltip den-hide">
                                       <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                     </div>
                                     <label class="container showLabel">
                                       <input type="checkbox" checked="checked" name="multichoice" class="an-input-name multichoiceansw" value="1">
                                       <span class="checkmark"></span>
                                     </label>
                                     <input type="text" name="" value="" class="act-input-respuesta" placeholder="Respuesta">
                                     <div class="act-valor-hover respuestahover">
                                       <input type="number" min="0" class="act-input-qavalor" value="0">
                                       <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                     </div>
                                   </div>
                                  </div>
                                  `;
                                  //div after variable contentDataAnswer must be added incase user clicks on add answer
                      $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                      contentData="";
                      contador=0;
              break;
            }
            contador++;

            //pushing last page
            if(pasteContent && i ==activitiesArray.length-1 && selectedActivity=="actividad3"){
              $(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`).append(contentData);
              console.error('entro al paste en i=',i);
              console.warn('entro aqui imprimiendo arriba',contentData);
              contentData="";
              pasteContent=false;
              contador=0;
            }

          }else{ //debemos de guardar el valor 0(primer valor) en el else y los demás valores en el if
              //pushing every new page
              // console.warn('entro al else en i=',i);
              if(pasteContent && selectedActivity=="actividad3"){
                console.warn('entro al paste por que es nueva pagina en i=',i);
                $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                  console.warn('entro aqui imprimiendo en el else',contentData);
                contentData="";
                contador=0;
                pasteContent=false;
              }
              paginaActual=activitiesArray[i].numPag;
              if(selectedActivity=="actividad3"){
                  pasteContent=true;
              }
              //we fill pages carrousel
              $(`<div class='den-pagina-title'><p>Pagina ${parseInt(paginaActual)+1}</p></div>`).appendTo(".den-carouselpaginas-container.den-cp-visible");
              //loading txt
              //if theres not a square drawn we  push it
                if(i==0){
                  $('<div class="den-actividad-row act-general-container den-actividadid-visible"></div>').appendTo("#formActivities").promise().done(function() {});
                }

                  //remember to remove pagina-actividad-visible at the end of everything to add a new page and find this
                  $(`<div class='tipo-de-actividad pagina-actividad-visible' id="actividadPagina_${parseInt(paginaActual)+1}"></div>`).appendTo(".act-general-container.den-actividadid-visible").promise().done(function() {
                    $(htmlTemplateActivity).appendTo(`#actividadPagina_${parseInt(paginaActual)+1}`).promise().done(function() {
                        //cargar actividad template
                        $(`#actividadPagina_${parseInt(paginaActual)+1}`).find('input[name^="belongerActivity"]').attr('name',`belongerActivity[${activitiesArray[i].numPag}]`).val(activitiesArray[i].numPag);
                        $(`#actividadPagina_${parseInt(paginaActual)+1}`).find('input[name^="templateActivity"]').val(activitiesArray[i].plantillaActividad);
                        $(`#actividadPagina_${parseInt(paginaActual)+1}`).find('input[name^="idTemaActivity"]').val(activitiesArray[i].idTema);
                          switch(selectedActivity){
                            case "actividad0": break;
                            case "actividad1":
                                var  nameInputValue=null;
                                var valoraRespuesta=null;
                                if(activitiesArray[i].respuestasArr.length>0)
                                {
                                  contentDataAnswer="";
                                  for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                                    nameInputValue=`rValue${activitiesArray[i].numPag}[${contador}][${j}]`;
                                    valoraRespuesta=activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : '';
                                    contentDataAnswer+=`<input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="B">`;
                                  }
                                    contentData+=`<div class="act-pregunta-row">
                                                    <div class="base-filedelete act-delete-question tooltip">
                                                      <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                    </div>
                                                    <div class="qAndA-row">
                                                    <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                                    <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Ingresa Una Pregunta" data-noQuest="${contador}">
                                                      ${contentDataAnswer}
                                                      <div class="act-valor-hover">
                                                        <input type="number" min="0" class="act-input-qavalor" value="${valoraRespuesta}" name="${nameInputValue}">
                                                        <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                                      </div>
                                                    </div>
                                                  </div>`;

                                    $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                                    contentData="";
                                    contador=0;
                              }
                            break;
                            case "actividad2":
                                if(activitiesArray[i].respuestasArr.length>0)
                                {
                                  contentDataAnswer="";
                                  for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                                    var checkedcheckbox= activitiesArray[i].respuestasArr[j].correcta ? 'checked' : '';
                                    contentDataAnswer+=`<div class="qAndA-row act-respuesta-row">
                                                            <div class="base-filedelete act-delete-answer tooltip">
                                                              <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                            </div>

                                                            <label class="container">
                                                            <input type="radio" ${checkedcheckbox} name="rSelected${activitiesArray[i].numPag}[${contador}][${j}]" class="an-input-name radioB" value="1">
                                                            <span class="checkmark2"></span>
                                                            </label>
                                                            <input type="hidden" value="${activitiesArray[i].respuestasArr[j].idRespuesta}" name="hidRespuesta${activitiesArray[i].numPag}[${contador}][${j}]">
                                                            <input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="Respuesta">
                                                            <div class="act-valor-hover respuestahover answ-val" style="display: block;">
                                                              <input type="number" min="0" value="${activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : ''}" class="act-input-qavalor answ-val-input" style="" name="rValue${activitiesArray[i].numPag}[${contador}][${j}]">
                                                              <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                                            </div>
                                                         </div>
                                                        `;
                                        if(activitiesArray[i].respuestasArr[j] && activitiesArray[i].respuestasArr[j].valorRes){
                                          triggerActivity6Questclick=false;
                                          console.warn('se puso en false ya');
                                        }
                                    }
                                    contentData+=`<div class="act-pregunta-row">
                                                    <div class="base-filedelete act-delete-question tooltip">
                                                      <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                    </div>
                                                    <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                                    <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Ingresa Una Pregunta" data-noQuest="${contador}">
                                                    <div class="act-valor-hover preguntahover">
                                                      <input type="number" min="0" class="act-input-qavalor quest-va-input" value="0" style="display: none;" name="qValue${activitiesArray[i].numPag}[${contador}]">
                                                      <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                                    </div>${contentDataAnswer}
                                                    <div class="qAndA-row act-respuesta-row act-respuesta-oculta">
                                                        <div class="base-filedelete act-delete-answer tooltip">
                                                          <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                        </div>
                                                        <label class="container">
                                                        <input type="radio" name="falseTrue" class="an-input-name radioB" value="1">
                                                        <span class="checkmark2"></span>
                                                        </label>
                                                        <input type="text" name="res" value="" class="act-input-respuesta" placeholder="Respuesta">
                                                        <div class="act-valor-hover respuestahover answ-val" style="display: block;">
                                                          <input type="number" min="0" value="0" class="act-input-qavalor answ-val-input" style="" name="some">
                                                          <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                                        </div>
                                                    </div>
                                                 </div>`;

                                    $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                                    contentData="";
                                    contador=0;
                              }


                            break;
                            case "actividad3":
                                  contentData+=` <div class="act-pregunta-row">
                                                      <div class="base-filedelete act-delete-question tooltip">
                                                        <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                      </div>
                                                      <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                                      <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Pregunta">
                                                      <div class="act-valor-hover preguntahover">
                                                          <input type="number" min="0" class="act-input-qavalor" value="${activitiesArray[i].valorPreg}" name="qValue${activitiesArray[i].numPag}[${contador}]">
                                                          <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                                      </div>
                                                  </div>`;
                            break;
                            case "actividad4": break;
                            case "actividad5":
                                //first render de answers
                                //append answers rendered
                                contador=0;
                                if(activitiesArray[i].respuestasArr.length>0)
                                {
                                    contentDataAnswer="";
                                    for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                                      var checkedcheckbox= activitiesArray[i].respuestasArr[j].correcta ? 'checked' : '';
                                      contentDataAnswer+=`<div class="qAndA-row act-respuesta-row">
                                                            <div class="base-filedelete act-delete-answer tooltip">
                                                              <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                            </div>
                                                            <label class="container showLabel" style="display: inline-block;">
                                                              <input type="radio" ${checkedcheckbox} name="rSelected${activitiesArray[i].numPag}[${contador}][${j}]" class="an-input-name radioB answerFunctionality" value="1">
                                                              <span class="checkmark2"></span>
                                                             </label>
                                                            <input type="hidden" value="${activitiesArray[i].respuestasArr[j].idRespuesta}" name="hidRespuesta${activitiesArray[i].numPag}[${contador}][${j}]">
                                                            <input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="Respuesta">
                                                            <div class="act-valor-hover respuestahover">
                                                              <input type="number" min="0" class="act-input-qavalor" value="${activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : 0}" name="rValue${activitiesArray[i].numPag}[${contador}][${j}]">
                                                              <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                                            </div>
                                                          </div>`;
                                    }
                                }
                                  console.error(`estamos en el if, entro en else en i=${i}, activitiesArray[${i}].strPregunta=${activitiesArray[i].strPregunta} pasteContent=${pasteContent}`);
                                  contentData+=`<div class="act-pregunta-row">
                                                      <div class="base-filedelete act-delete-question tooltip">
                                                        <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                      </div>
                                                      <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                                      <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Pregunta" data-noQuest="${contador}">
                                                 ${contentDataAnswer}
                                                 <div class="qAndA-row act-respuesta-row act-respuesta-oculta">
                                                   <div class="base-filedelete act-delete-answer tooltip den-hide">
                                                     <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                   </div>
                                                   <input type="text" name="" value="" class="act-input-respuesta" placeholder="Respuesta">
                                                   <div class="act-valor-hover respuestahover">
                                                     <input type="number" min="0" class="act-input-qavalor" value="0">
                                                     <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                                   </div>
                                                 </div>
                                                </div>`;
                                    $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                                    contentData="";
                                    contador=0;
                            break;
                            case "actividad6":
                                if(activitiesArray[i].respuestasArr.length>0)
                                {
                                    contentDataAnswer="";
                                    for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                                      console.warn('en el checkbox debe ir', activitiesArray[i].respuestasArr[j].correcta);
                                      var checkedcheckbox= activitiesArray[i].respuestasArr[j].correcta ? 'checked' : '';
                                      contentDataAnswer+=`<div class="qAndA-row act-respuesta-row">
                                                            <div class="base-filedelete act-delete-answer tooltip">
                                                              <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                            </div>
                                                            <label class="container showLabel">
                                                              <input type="checkbox" ${checkedcheckbox} name="rSelected${activitiesArray[i].numPag}[${contador}][${j}]" class="an-input-name" value="1">
                                                              <span class="checkmark"></span>
                                                            </label>
                                                            <input type="hidden" value="${activitiesArray[i].respuestasArr[j].idRespuesta}" name="hidRespuesta${activitiesArray[i].numPag}[${contador}][${j}]">
                                                            <input type="text" name="respuesta${activitiesArray[i].numPag}[${contador}][${j}]" value="${activitiesArray[i].respuestasArr[j].strRespuesta}" class="act-input-respuesta" placeholder="Respuesta">
                                                            <div class="act-valor-hover respuestahover">
                                                              <input type="number" min="0" class="act-input-qavalor" value="${activitiesArray[i].respuestasArr[j].valorRes ? activitiesArray[i].respuestasArr[j].valorRes : ''}" name="rValue${activitiesArray[i].numPag}[${contador}][${j}]">
                                                              <span class="act-span-valor">Ingresa el valor de esta respuesta</span>
                                                            </div>
                                                          </div>`;
                                                          if(activitiesArray[i].respuestasArr[j].valorRes){
                                                            triggerActivity6Questclick=false;
                                                          }
                                    }
                                }
                                  console.error(`estamos en el if, entro en else en i=${i}, activitiesArray[${i}].strPregunta=${activitiesArray[i].strPregunta} pasteContent=${pasteContent}`);
                                  contentData+=`<div class="act-pregunta-row">
                                                      <div class="base-filedelete act-delete-question tooltip">
                                                        <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                      </div>
                                                      <input type="hidden" name="hIdActivity${activitiesArray[i].numPag}[${contador}]"  value="${activitiesArray[i].idActividad}" >
                                                      <input type="text" name="question${activitiesArray[i].numPag}[${contador}]" value="${activitiesArray[i].strPregunta}" class="act-input-question" placeholder="Pregunta" data-noQuest="${contador}">
                                                      <div class="act-valor-hover preguntahover quest-val">
                                                        <input type="number" min="0" class="act-input-qavalor quest-va-input" value="${activitiesArray[i].valorPreg}" name="qValue${activitiesArray[i].numPag}[${contador}]"">
                                                        <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                                      </div>
                                                 ${contentDataAnswer}
                                                 <div class="qAndA-row act-respuesta-row act-respuesta-oculta">
                                                   <div class="base-filedelete act-delete-answer tooltip den-hide">
                                                     <i class="fas fa-trash-alt"></i><span class="tooltiptext">Eliminar</span>
                                                   </div>
                                                   <label class="container showLabel">
                                                     <input type="checkbox" checked="checked" name="multichoice" class="an-input-name multichoiceansw" value="1">
                                                     <span class="checkmark"></span>
                                                   </label>
                                                   <input type="text" name="" value="" class="act-input-respuesta" placeholder="Respuesta">
                                                   <div class="act-valor-hover respuestahover">
                                                     <input type="number" min="0" class="act-input-qavalor" value="0">
                                                     <span class="act-span-valor">Ingresa el valor de esta pregunta</span>
                                                   </div>
                                                 </div>
                                                </div>
                                                `;
                                                //div after variable contentDataAnswer must be added incase user clicks on add answer
                                    $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
                                    contentData="";
                                    contador=0;
                            break;
                          }
                          contador++;
                      });
                  });

          }
          //console.log('el contenido es',contentData);
          //in case 1 data only we push it
          if(pasteContent && i ==activitiesArray.length-1 && selectedActivity=="actividad3"){
            console.warn('entro al paste en caso solo 1 abajo en i=',i);
            $(contentData).appendTo(`#actividadPagina_${parseInt(paginaActual)+1} .act-column-right`);
            console.warn('entro aqui al final imprimiendo',contentData);
            contentData="";
            pasteContent=false;
            contador=0;

          }
        }
        setTimeout(function() {
          $('.den-carouselpaginas-container .den-pagina-title').first().click();
          console.warn('se va a triggerear',triggerActivity6Questclick);
          if(triggerActivity6Questclick &&   $("input[name=valorLugar][value=valoraPregunta]").length>0){
            $("input[name=valorLugar][value=valoraPregunta]").siblings('.checkmarkValor').first().trigger('click');
          }else{
            if($("input[name=valorLugar][value=valoraRespuesta]").length>0){
              $("input[name=valorLugar][value=valoraRespuesta]").siblings('.checkmarkValor').first().trigger('click');
            }
          }

          $('.activ-desability').addClass('desability-on-style');
        },0) ;
      });
      //we automatic choose first page
  }

  function Themes(){
    this.idTema = "";
    this.idModulo = "";
    this.nombre = "";
    this.temaPadre = "";
    var arrayThemes;
    var arraySingleTheme;
    var arrayFiles;

    this.getSingleTheme = function (){
      $.ajax({
        url: "../json/jsonSingleTheme.php",
        type: 'get',
        data: {idTema:this.idTema,
        },
        dataType: 'json',
        async: false,
        contentType: "application/json",
        success: function(arrayResponse){
          arraySingleTheme=arrayResponse;
        }
      });
      return arraySingleTheme;
    }

    this.getThemes = function () {

      $.ajax({
        url: "../json/jsonThemes.php",
        type: 'get',
        data: {user:'usuario',
        idModulo:this.idModulo
      },
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function(arrayResponse){
        arrayThemes=arrayResponse;
      }
    });
    return arrayThemes;
  }

    this.getThemeFiles = function () {
      $.ajax({
        url: "../json/jsonThemeFiles.php",
        type: 'get',
        data: {idTema:this.idTema  },
        contentType: "application/json",
        dataType: 'json',
        async: false,
      success: function(arrayResponse){
        arrayFiles=arrayResponse;
      }
    });
    return arrayFiles;
  }
}

function Activity(){
  this.idActividad = "";
  this.strTemplate = "";
  this.strPregunta = "";
  this.idTema = "";
  this.intPage = "";
  var arraySingleActivity;

  this.getSingleActivity = function (){
    $.ajax({
      url: "../json/jsonSingleActivity.php",
      type: 'get',
      data: {idTema:this.idTema},
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
        arraySingleActivity=arrayResponse;
      }
    });
    return arraySingleActivity;
  }
}

function ajaxWaiting(){
  $("body").addClass("bodyChange");
  $("#loading-screen").show(100);
  $("#loadBar").show();
  $("#loading-icon").show();
  $("#saving-text").show();
  //a setTimeoutFunction must be after calling this method
}
function ajaxCompleted(){
  //after calling setTimeoutFunction
  $("#loading-icon").hide(100);
   $("#saving-text").hide();
   $("#success-icon").show(100);
   $("#sucess-text").show(100);
   setTimeout(function(){
       $("#loading-screen").hide(100);
       $("#loadBar").hide();
       $("#success-icon").hide(100);
       $("#sucess-text").hide(100);
       $("body").removeClass("bodyChange");
   }, 2200);
}

function ajaxSuccess(){
  $('.color-green-alert h1').text('Operación realizada con éxito');
  $('.color-green-alert').removeClass('den-hide').fadeIn('fast').animate({top: 450, opacity:1}, function(){
    setTimeout(function(){
      $('.color-green-alert').fadeOut('slow');
    }, 1200);
  });
}

function errorValidation(text){
  $('.color-red-alert h1').text('Error:');
  $('.color-red-alert p').text(text);
  $('.color-red-alert').removeClass('den-hide').fadeIn('fast').animate({top: 450, opacity:1}, function(){
    setTimeout(function(){
      $('.color-red-alert').fadeOut('slow');
    }, 1200);
  });
}

///// Funcion para radio buttons
$(document).on('click', '.actInputEv', function(e) {
  //code below was made to evaluate answer
    $(this).closest('.renglonAct').find('.incorrectAns').remove();
    $(this).closest('.renglonAct').find('.correctAns').remove();
    isItCorrect= $(this).data('correct') ? '<b class="correctAns">respuesta correcta</b>': '<b class="incorrectAns">respuesta incorrecta</b>';
    $(this).closest('.multianswerdRow').append(isItCorrect);
});
///// Funcion falso verdadero en ACTIVIDADES
$(document).on('click', '.actfb', function(e) {
  e.preventDefault();
  var activitySelected=$(this).data('plantillaact') ? $(this).data('plantillaact') : null;
  var idActivitySelected=$(this).data('idact') ? $(this).data('idact') : null;

  var isItCorrect=``;
  switch(activitySelected){
    case "actividad2":
       $(`*[data-idact="${idActivitySelected}"]`).attr('class', 'actfb').text('');
       $(this).addClass('trueanswerd');
       $(this).text('V');
       //code below was made to evaluate answer
         $(this).closest('.renglonAct').find('.incorrectAns').remove();
         $(this).closest('.renglonAct').find('.correctAns').remove();
         isItCorrect= $(this).data('correct') ? '<b class="correctAns">respuesta correcta</b>': '<b class="incorrectAns">respuesta incorrecta</b>';
         $(this).parent().append(isItCorrect);
      //ends code to evaluate answer
    break;
    case "actividad6":
        if ($(this).hasClass('trueanswerd')) {
            $(this).text('F');
            $(this).removeClass('trueanswerd').addClass('falseanswerd');
            $(this).closest('.multianswerdRow').find('.incorrectAns').remove();
            $(this).closest('.multianswerdRow').find('.correctAns').remove();
            isItCorrect= $(this).data('correct') ? '<b class="incorrectAns">respuesta incorrecta</b>': '<b class="correctAns">respuesta correcta</b>';
            $(this).parent().append(isItCorrect);
        }else{
          $(this).text('V');
          $(this).addClass('trueanswerd').removeClass('falseanswerd');
          $(this).closest('.multianswerdRow').find('.incorrectAns').remove();
          $(this).closest('.multianswerdRow').find('.correctAns').remove();
          isItCorrect= $(this).data('correct') ? '<b class="correctAns">respuesta correcta</b>': '<b class="incorrectAns">respuesta incorrecta</b>';
          $(this).parent().append(isItCorrect);
        }

    break;
    default :
      if ($(this).hasClass('trueanswerd')) {
          $(this).text('F');
          $(this).removeClass('trueanswerd').addClass('falseanswerd');
      }else{
        $(this).text('V');
        $(this).addClass('trueanswerd').removeClass('falseanswerd');
      }
    break;
  }
  });
  ///// Label forzando input de subir archivos
  $(document).on('click', '.addedContainer label', function() {
    var padre = $(this).parent().find("input[type='file']");
    $(padre).trigger( "click" );
});
///// settings button
$(document).on('click', '.settingsplat', function() {
  $('.fullPlatContainer').load('../secciones/settings.html');
});
$(document).on('click', '.backtopaltaforma', function() {
  $('.fullPlatContainer').load('../secciones/index.html');
});
//eVENTO DE LOS BOTONES DEL MENU IZQUIERDO en el settings
$(document).on('click', '.indivnavleft', function(e){
  e.preventDefault();
  var id = $(this).attr('id');
  $('.indivnavleft').removeClass('selectedinl');
  $(this).addClass('selectedinl')
  id = '../secciones/'+id+'.html';
  $('.injectfullinfo').load(id);

});
/// subir archivos
$(document).on('click', '.uploadBtnLabel', function() {
  var padre = $(this).parent().find("input[type='file']");
  $(padre).trigger( "click" );
});
$(document).on('blur', '#tituloCurso input', function() {
  var texto = $(this).val();
  $('.den-curso-title.den-select-option p').text(texto);
});
