$(document).ready(function(){
  $('.message a').click(function(){
    $('form').animate({height: "toggle", opacity: "toggle"}, "slow");
  });

  $("#loginButton").click(function(e) {
    e.preventDefault();
        $('#errors').fadeOut(1000).removeClass('customDisplay').html('');
        // $('#loading').hide();
        var input_data = $('#login').serialize();
        console.warn('la data es',input_data);
        var logUser = $('#user').val();
        var logPass = $('#pwd').val();

        if(logUser == '' && logPass != ''){ $('#errors').fadeIn(1600).addClass('customDisplay').html('Tu usuario está vacio!'); return false; }
        if(logPass == '' && logUser != ''){ $('#errors').fadeIn(1600).addClass('customDisplay').html('Tu contraseña está vacía!'); return false; }
        if(logUser == '' && logPass == ''){ $('#errors').fadeIn(1600).addClass('customDisplay').html('Tu usuario y contraseña están vacíos!'); return false; }

        //$('#loading').show();
        $.ajax({
            type: "POST",
            url: "https://uvimex.com.mx/loginApi.php",
            data: input_data,
            success: function(msg) {
              // login success. redirect users to some page.
              var response=msg[0];
              if(response.success==="true"){
                $(".form").hide(700);

                for (var i = 0; i < response.coursesArray.length; i++) {
                  $("#courseList").append(`<li><h3><a href="https://uvimex.com.mx/DenlinCursos/c1/m1/">${response.coursesArray[i].post_name}</a></h3></li>`);
                  $("#userField").html(response.coursesArray[i].user_name);
                }
                $("#userContent").show(850);
              }else{
                $('#errors').fadeIn(1200).addClass('customDisplay');
                $('#errors').html('Tus credenciales no son correctas. Por favor intenta de nuevo.');
              }
            },
            error: function(msg) {
              // login error.
              console.error(msg);
              $('#errors').fadeIn(1200).addClass('customDisplay');
              $('#errors').html('Tus credenciales no son correctas. Por favor intenta de nuevo.');
              //  $('#loading').hide();
            }

        });
        return false;
    });

    document.addEventListener("deviceready", onDeviceReady, false);
    function onDeviceReady()
    {
        screen.lockOrientation('landscape');
    }
});
