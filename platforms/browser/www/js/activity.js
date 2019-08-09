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
    $('.row-opcion-unica').removeClass('selected-option-unica');
    $('.row-opcion-unica i').removeClass('').addClass('');
    $(this).find('i').removeClass('').addClass('');
    $(this).removeClass('');
  }
});
