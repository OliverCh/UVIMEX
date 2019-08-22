function popdeConfirmacion(pregunta,detalles){
  // ejemplo de pregunta ¿Estas seguro que quieres salir del tema?
  // ejemplo de detalles: si ahces eso tus cambios no se guardarán
  var pop = `<div class="pantalladecarga"">
    <div class="pop-container">
      <div class="pop-tops-button">
        <button type="button" name="button"><i class="fas fa-times"></i></button>
      </div>
      <div class="pop-white-cont">
          <h2>`+pregunta+`</h2>
          <p>`+detalles+`</p>
      </div>
      <div class="pop-bottom-buttons">
        <button type="button" name="button">Cancelar</button>
        <button type="button" name="button" class="positive-btn-pop">Aceptar</button>
      </div>
    </div>
  </div>`;
  $(pop).prependTo('body');
}
//alertapositiva
function alertapositiva(texto){
  $('.alert-top').remove();
  var alerta = '<div class="alert-top aret-positiva display-none"><p>'+texto+'</p><button class="remove-alert"><i class="fas fa-times"></i></button></div>';
  $(alerta).prependTo('body');
  var altura = $('.alert-top').outerHeight();
  altura = altura * -1;
  $('.alert-top').css('top', altura);
  $('.alert-top').removeClass('display-none');
  $('.alert-top').animate({
    top:0
  },1500);
}
//alertaNegativa
function alertanegativa(texto){
  $('.alert-top').remove();
  var alerta = '<div class="alert-top aret-positiva display-none"><p>'+texto+'</p><button class="remove-alert"><i class="fas fa-times"></i></button></div>';
  $(alerta).prependTo('body');
  var altura = $('.alert-top').outerHeight();
  altura = altura * -1;
  $('.alert-top').css('top', altura);
  $('.alert-top').removeClass('display-none');
  $('.alert-top').animate({
    top:0
  },1500);
}
function alturaInjecInformation(){
    var altura = $(window).height()-100;
    $('.inject-information').height(altura);
}
function alturaInjec(){
    var altura = $(window).height()-50;
    var ancho = $(window).width();
    $('.inject-info').height(altura);
    if (ancho < 768) {
      if (altura < 380) {
        var menos = $('.plantilla-title-cont').outerHeight() + 30;
        menos = altura - menos;
        $('.multimedia-cont-indiv').width(menos+(menos/2));
        $('.multimedia-cont-indiv').height(menos);
        $('.botones-contianer').width(menos+(menos/2));
      }
      else{
        $('.multimedia-cont-indiv').width(300);
        $('.multimedia-cont-indiv').height(200);
        $('.botones-contianer').width(300);
      }
      if (ancho < 340) {
        $('.multimedia-cont-indiv').width('100%');
        $('.botones-contianer').width('100%');
      }
   }
    }

$(window).resize(function(){
  alturaInjec();
  alturaInjecInformation();
});

$(document).on('click', '.remove-alert', function(){
    $('.alert-top').remove();
});
