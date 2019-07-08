// funcion que quita la calse del slected bottom;
function hideSelectedBottom(){
  $('.bottom_btn').removeClass('bottom_btn_slct');
  $('.barrita-select').animate({
    left:'-200%'
  },1000);
}
// tamaño de Inject
function alturaInjec(){
    var altura = $(window).height()-100;
    $('.inject-information').height(altura);
}
//Document ready
$(document).ready(function(){
    var id = 'secciones/miscursos.html';
    $('.inject-information').load(id);
    alturaInjec();
});

// funcionalidad de los bottones del nav bottom
/// DONE
$(document).on('click', '.bottom_btn', function(){
    if($(this).hasClass('bottom_btn_slct')){

    }else{
      $('.bottom_btn').removeClass('bottom_btn_slct');
      $(this).addClass('bottom_btn_slct');
      var position = $(this).parent().offset();
      position = (position.left);
      var id = $(this).attr('id');
      id = id.split('_');
      id = id[1];
      id = 'secciones/'+id+'.html';
      $('.inject-information').load(id);
      $('.barrita-select').animate({
        left:position
      },800);
    }

});

// Funcionalidad para hacer toogle entre maneras de buscar infromacion ya sea filtro o busqueda
/// DONE
$(document).on('click', '.btncont-bgfull button', function(){
    if($(this).hasClass('search-button')){
      var inject = `<input type="text" class="search-input" placeholder="B U S C A R">`;
    }else{
      var inject = `<select name="courseCategory" class="select-style"><option value="">C A T E G O R Í A S</option><option value="1">Otro</option><option value="2">Salud</option><option value="3">Desarrollo Humano</option><option value="4">Dirección de Proyectos</option><option value="5">Emprendimiento</option><option value="6">Educacion</option><option value="7">Ingenieria</option><option value="8">Programación</option><option value="9">Diseño</option><option value="10">Finanzas</option></select>`
    }
    $('.btncont-bgfull button i').removeClass('typeofsearch-select');
    $(this).find('i').addClass('typeofsearch-select');
    $('.displaysearching').html(inject);
});

// Boton para ver detalle del curso que aun no he comprado
$(document).on('click', '.showme-info-btn', function(){
    var cargarhtml = 'secciones/indivcurso.html';
    $('.inject-information').addClass('bye-info').removeClass('inject-information');
     $('.bye-info').animate({
       left:'-100%',
       opacity:0
     },2000, function(){
       $('.bye-info').remove();
     });
     $('<div class="inject-information hello-info"><div>').prependTo('body');
     $('.hello-info').load(cargarhtml);
     $('.hello-info').animate({
       right:0,
     },2000, function(){
       $('.inject-information').removeClass('hello-info');
     });
    hideSelectedBottom();
    alturaInjec();
});

///boton de volver
$(document).on('click', '.linkback', function(){
  var vovler = $(this).find('p').attr('id');
  vovler = vovler.split('_');
  vovler = vovler[0];
  vovler = 'secciones/'+vovler+'.html';
  var boton = 'nav_'+vovler;
  $('.inject-information').load(vovler);
  $(boton).trigger('click');
});
///boton de ir a ver los modulos del curso
$(document).on('click', '.go-to-curso', function(){
  var cargarhtml = 'secciones/moduloscursos.html';
  $('.inject-information').addClass('bye-info').removeClass('inject-information');
   $('.bye-info').animate({
     left:'-100%',
     opacity:0
   },2000, function(){
     $('.bye-info').remove();
   });
   $('<div class="inject-information hello-info"><div>').prependTo('body');
   $('.hello-info').load(cargarhtml);
   $('.hello-info').animate({
     right:0,
   },2000, function(){
     $('.inject-information').removeClass('hello-info');
   });
  hideSelectedBottom();
  alturaInjec();
});
