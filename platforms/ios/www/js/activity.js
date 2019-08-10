///boton falso verdadero
$(document).on('click', '.falsoverdadero p', function(){
  if ($(this).hasClass('selected-fv')) {
  }else{
    $('.falsoverdadero p').removeClass('selected-fv');
    $(this).addClass('selected-fv');
  }
});
$(document).on('click', '.opcion-multiple p', function(){
  var hijo = $(this).find('i');
  if (hijo.hasClass('fa-square')) {
    hijo.removeClass('fa-square');
    hijo.addClass('fa-check-square');
  }else{
    hijo.addClass('fa-square');
    hijo.removeClass('fa-check-square');
  }
});

$(document).on('click', '.row-opcion-unica', function(){
  if ($(this).hasClass('selected-option-unica')) {
  }else{
    $(this).parent().find('.row-opcion-unica').removeClass('selected-option-unica');
    $(this).parent().find('.row-opcion-unica i').removeClass('fa-dot-circle').addClass('fa-circle');

    $(this).find('i').removeClass('fa-circle').addClass('fa-dot-circle');
    $(this).addClass('selected-option-unica');
  }
});
