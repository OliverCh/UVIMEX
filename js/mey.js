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
