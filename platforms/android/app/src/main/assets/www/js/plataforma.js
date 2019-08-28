// funcion que quita la calse del slected bottom;
function hideSelectedBottom(){
  $('.bottom_btn').removeClass('bottom_btn_slct');
  $('.barrita-select-gen').animate({
    left:'-200%'
  },1000);
}
// tamaño de Inject
function alturaInjec(){
    var altura = $(window).height()-50;
    $('.inject-info').height(altura);
}
///
$(window).resize(function(){
  alturaInjec();
});
//
$(document).ready(function(){
alturaInjec();
var id = 'plantillas/indicetemas.html';
$('.inject-info').load(id);
});
//Click en botones de nav bottom
$(document).on('click', '.bottom_btn', function(){
  var id = $(this).attr('id');
  switch (id) {
    case 'nav_volver':
    window.location.replace('/mobilCursos/index.html');
       break;
    case 'nav_micursos':
    window.location.replace('/mobilCursos/index.html');
localStorage.setItem("cargarCurso", "cargarCursoHtml");
    break;
     case 'nav_modulo':
      var id = 'plantillas/indicetemas.html';
    $('.inject-info').load(id);
  $('#nav_modulo').addClass('bottom_btn_slct');
    var position = $('#nav_modulo').parent().offset();
    position = (position.left);
    $('.barrita-select-gen').animate({
      left:0
    },800);
    break;
  }
});
///Click en cada tema
$(document).on('click','.con-indiv-tema', function(){
  var plantilla = $(this).attr('id');
  plantilla = 'plantillas/'+plantilla+'.html';
  $('.inject-info').load(plantilla);
  hideSelectedBottom();
  $('.bottom_btn').removeClass('bottom_btn_slct');
});
///Click en abrir pop up de archivos
$(document).on('click','.archivosbutton button', function(){
  var bloqueo = '<div class="injectpop"></div>';
  $(bloqueo).prependTo('body');
  $('.injectpop').load('popups/files.html');
});
///Cerrar cualquier popup
$(document).on('click','.close-pop', function(){
  $('.injectpop').remove();
});
