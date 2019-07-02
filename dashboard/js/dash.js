var dash = (function(window, undefined){


    // Boton de vistas de roles de canela
    var g_userRole = null;
    $("#main__changeView").click(function(eee){
      eee.preventDefault();
      console.log($("#main__changeView").data("def"));
      if($("#main__changeView").data("def") == "customer" || $("#main__changeView").data("def") == "student"){
        window.location.assign("formInstructor.html");

      }
      else{
        console.log(g_userRole);
        if(g_userRole == "customer" || g_userRole == "student"){
          // Change to instructor
          $("#main__changeView").html("Ver como alumno");
          $('#generaldash').trigger('click');
          $("#userR").empty().html('INSTRUCTOR');
          $('#generaldash').show();
          $('#usuariosdash').show();
          $('#cursosdash').show();
          $('#calendarStreaming').show();
          $('#streamingDash').show();
          $('#alumGeneralDash').hide();
          $('#instructoresdash').hide();
          $('#cursoscompradosdash').hide();
          $('#detalleavancealumno').hide();
          g_userRole = "instructor";
        }
        else if(g_userRole == "instructor" || g_userRole == "author"){
          // Change to student
          $("#main__changeView").html("Ver como instructor");
          $('#alumGeneralDash').trigger('click');
          $("#userR").empty().html('ALUMNO');
          $('#alumGeneralDash').show();
          $('#instructoresdash').show();
          $('#cursoscompradosdash').show();
          $('#detalleavancealumno').show();
          $('#streamingDash').hide();
          $('#calendarStreaming').show();
          $('#generaldash').hide();
          $('#usuariosdash').hide();
          $('#cursosdash').hide();
          g_userRole = "student";
        }
      }
    })




    function initMenu(){
      //function that check logIn
      $("body").append(`<div class="pantalladecarga"><img src="img/uvimex_load.gif" alt=""></div>`);
      $.ajax({
        url: "https://uvimex.com.mx/platformComms.php",
        type: 'GET',
        data: {actionAPI:'getUserRole'},
        dataType: 'json',
        async: false,
        contentType: "application/json",
        beforeSend: function(){
      $(".pantalladecarga").remove();
        },
        success: function(arrayResponse){
         if(arrayResponse[0].success=="true"){
            var userRole=arrayResponse[0].userRole;
            var userId=arrayResponse[0].usrId;
            var currentUser=arrayResponse[0].currentUser;
            $("#userN").empty().html(arrayResponse[0].currentUser);
            $("#nick").empty().html(arrayResponse[0].usernick);
            $("#userR").data('usrid',userId ? userId : 0);
            console.warn('el menu trajo',arrayResponse);
            sessionStorage.setItem('cuser_id', userId);
            sessionStorage.setItem('cuser_role', userRole);
            console.log(userRole);


            // Ocultados por falta de funcionalidad
            $('#catalogousuarios').hide();
            $('#catalogocursos').hide();

            switch(userRole){
              case "student":
              case "customer":
                $("#main__changeView").html("Quiero ser instructor");
                $("#main__changeView").data("def", userRole);
                $('#alumGeneralDash').trigger('click');
                $("#userR").empty().html('ALUMNO');
                $('#alumGeneralDash').fadeIn(550);
                $('#instructoresdash').fadeIn(600);
                $('#cursoscompradosdash').fadeIn(650);
                $('#detalleavancealumno').fadeIn(700);
                $('#streamingDash').hide();
                $('#calendarStreaming').fadeIn(800);
                $('#generaldash').hide();
                $('#usuariosdash').hide();
                $('#cursosdash').hide();
              break;
              case "instructor":
              case "author":
                g_userRole = userRole;
                $("#main__changeView").html("Ver como alumno");
                $("#main__changeView").data("def", userRole);
                $('#generaldash').trigger('click');
                $("#userR").empty().html('INSTRUCTOR');
                $('#generaldash').fadeIn(550);
                $('#usuariosdash').fadeIn(600);
                $('#cursosdash').fadeIn(650);
                $('#streamingDash').fadeIn(700);
                $('#calendarStreaming').fadeIn(700);
                $('#alumGeneralDash').hide();
                $('#instructoresdash').hide();
                $('#cursoscompradosdash').hide();
                $('#detalleavancealumno').hide();

              break;
              case "administrator":
                $("#userR").empty().html('ADMINISTRADOR');
                $('#generaldash').fadeIn(550);
                $('#usuariosdash').fadeIn(600);
                $('#cursosdash').fadeIn(650);
                $('#cursoscompradosdash').fadeIn(700);
                $('#streamingDash').fadeIn(750);
                $('#alumGeneralDash').fadeIn(800);
                $('#instructoresdash').fadeIn(850);
                $('#cursoscompradosdash').fadeIn(900);
                $('#detalleavancealumno').fadeIn(1000);
                break;
                default :window.location.href="https://uvimex.com.mx/crea-tu-curso-online/";
            }

            $.get( "json/getCurrentUserData.php",{user:userId}, function( data ) {
              $('#idPruebaCreador').css('background-image', `url(assets/courseAssets/${userId}/userProfile/${data[0].urlProfileImage ? data[0].urlProfileImage : 'url(../img/instructor.jpeg)'})`);
            });

         }else{
           window.location.href="https://uvimex.com.mx/crea-tu-curso-online/";
         }
         $(".pantalladecarga").remove();
        }
      });


    }
    function initDashBoardPage(){
        //initLeftMenu
        initMenu();
        //here we inject first page on start
        //$('.injectfullinfo').load('secciones/generaldash.html');
        localStorage.removeItem('selectedCourse');

    }
    //PopUp de Yes or No
    var popupDecision_template = `
      <div class="fullblockback injectPopInfo">
        <div class="popFitContainer">
          <div class="closeRowBtnPop">
            <button type="button" name="button">Cerrar <i class="fas fa-times-circle"></i></button>
          </div>
          <div class="whiteFintPop">
            <h2 class"wpHone">:question:</h2>
            <div class="bottompopcont">
             <button type="button" name="button" class="greenbtncontorno" onclick=":accept_functionName:(this)">Aceptar</button>
             <button type="button" name="button" class="fullblackbtn" onclick=":cancel_functionName:"(this)>Cancelar</button>
            </div>
          </div>
        </div>
      </div>`;

    function popupYesNo(pregunta, acceptCallback, cancelCallback){
      var popups = `
        <div class="fullblockback injectPopInfo popop">
          <div class="popFitContainer">
            <div class="closeRowBtnPop">
              <button type="button" name="button">Cerrar <i class="fas fa-times-circle"></i></button>
            </div>
            <div class="whiteFintPop">
              <h2 class"wpHone">:question:</h2>
              <div class="bottompopcont">
               <button type="button" name="button" class="greenbtncontorno" id=":accept_functionName:">Aceptar</button>
               <button type="button" name="button" class="fullblackbtn" id=":cancel_functionName:">Cancelar</button>
              </div>
            </div>
          </div>
                  </div>`;

      acceptID = "popupYesNo_accept";
      cancelID = "popupYesNo_cancel";
      popups = popups.replace(":question:", pregunta)
                     .replace(":accept_functionName:", acceptID)
                     .replace(":cancel_functionName:", cancelID);
      $(popups).prependTo('body');
      console.log(popups);

      $("#"+acceptID).off('click');
      $("#"+cancelID).off('click');
      $("#"+acceptID).on('click', acceptCallback);
      $("#"+cancelID).on('click', cancelCallback);
    }

  //ALERTA POSITIVA
        function alertapositiva(texto){
            $('.alertapositiva').remove();
            $('.alertanegativa').remove();
            // var alerta = `<div class="alertapositiva"><h2>`+texto+`<h2></div>`;
            var alerta = `<div class="alertapositiva"><h2>`+texto+`<h2></div>`;
            $(alerta).prependTo('body');
            $('.alertapositiva').animate({
              top: '10%'
            }, 800, function(){
              setTimeout(function(){ $('.alertapositiva').animate({
                opacity:0
              },1000, function(){
                $('.alertapositiva').remove();
              }); }, 4000);
            });
          }
          //ALERTA Negativa
                function alertanegativa(texto){
                    $('.alertapositiva').remove();
                    $('.alertanegativa').remove();
                    // var alerta = `<div class="alertapositiva"><h2>`+texto+`<h2></div>`;
                    var alerta = `<div class="alertanegativa"><h2>`+texto+`<h2></div>`;
                    $(alerta).prependTo('body');
                    $('.alertanegativa').animate({
                      top: '10%'
                    }, 800, function(){
                      setTimeout(function(){ $('.alertanegativa').animate({
                        opacity:0
                      },1000, function(){
                        $('.alertanegativa').remove();
                      }); }, 4000);
                    });
                  }
    //eVENTO DE LOS BOTONES DEL MENU IZQUIERDO
    $(document).on('click', '.indivnavleft', function(e){
      $("body").append(`<div class="pantalladecarga"><img src="img/uvimex_load.gif" alt=""></div>`);
      e.preventDefault();
      var id = $(this).attr('id');
      var cid = $(this).attr('id');
      $('.indivnavleft').removeClass('selectedinl');
      $('.linktoprofileedit').removeClass('greencontorno');
      $(this).addClass('selectedinl')
      id = 'secciones/'+id+'.html';
      $('.injectfullinfo').load(id, function(){
        if(cid == "calendarStreaming"){
          streamCalendar.setCalendar($('.injectfullinfo'));
          streamCalendar.reload();
        }
      });

      //var dashCase= $(this).attr('id'); temp
      // $('.injectfullinfo').load(id,function(){ temp
      //   console.warn('el dashCase es',dashCase);
      //   switch(dashCase){
      //     case 'cursobase':
      //     break;
      //     case 'cursoscompradosdash':
      //     break;
      //     case 'cursosdash': loadCursosDashData();
      //     break;
      //     case 'detallecurso':
      //     break;
      //     case 'generaldash':
      //     break;
      //     case 'userbase':
      //     break;
      //     case 'usuariosdash':
      //     break;
      //   }
      // });
    });
    //iNJECTAR HTML DE INFORMACION INDIVIDUAL DE USUARIOS
    // $(document).on('click', '.linktouserinfo', function(){
    //   $('.injectfullinfo').load('secciones/userbase.html');
    // });
    //bOTTON DE VOLVER
    $(document).on('click', '.linkback p', function(){
      var id =$(this).attr('id');
      id = id.split('_');
      id = id[0];
      $('.injectfullinfo').load("secciones/" + id + ".html");
    });
    //btn de salir de dashboard y cerrar session
    $(document).on('click', '.fas.fa-power-off', function(){
        window.location.href ='../../mi-cuenta/customer-logout/';
    });
    //ABRIR POP
    $(document).on('click', '.popupBtn', function(e){
      e.preventDefault();
        var id = $(this).attr('id');
        var cid = $(this).attr('id');
        id = 'popups/'+id+'.html';
        var popups = `<div class="fullblockback injectPopInfo">
        </div>`;
        $(popups).prependTo('body');
        $('.injectPopInfo').load(id, function(){
          if(cid == "popFechaStream"){
            streamCalendar.createNewStream($('.injectPopInfo')); //en caso de ser popo de crear stream le pasamos el control a nuestro amiwito
          }
        });
    });
    //Cerrar Pop BG
    $(document).on('click', '.closeRowBtnPop button', function(){
        $('.fullblockback').remove();
    });
    //Movimiento del botton de sí y no toogle
    $(document).on('click', '.containertoggle', function(){
      var papa = $(this).parent();
        if ($(this).hasClass('yesstream')) {
          $(this).removeClass('yesstream');
          $('.movetoggle').animate({
                    right: -57
          });
          $('.textoadvertencia').remove();
        }else{
          $('.movetoggle').animate({
                right: 0
          });
          $(this).addClass('yesstream');
          $('<p class="textoadvertencia"> Una vez creado tu curso podrás crear eventos de Streaming</p>').appendTo(papa);
        }
    });
    //SUBPOP TO MANDATORY COURSES
    $(document).on('click', '#spopCursorOblig', function(e){
      e.preventDefault();
      $('.injectSubPopInfo').toggle(700);
    });
    //SUBPOP SIN BACKBLOCK ABRIR
    $(document).on('click', '.submenupopbtn', function(){
      if($(this).attr('id')!='spopCursorOblig'){
        if ($(this).hasClass('activesbmBtn')) {
          $('.injectSubPopInfo').remove();
          $(this).removeClass('activesbmBtn');
        }else{
          var id = $(this).attr('id');
          var pos = $(this).offset();
          id = 'popups/'+id+'.html';
          var popups = `<div class="injectSubPopInfo">
          </div>`;
          $(popups).appendTo('.submenupopbgcont');
          $('.injectSubPopInfo').load(id, function(){
            $('.subpop').css({'opacity':0,'left':pos,'top': 0});
            $('.subpop').animate({
              opacity:1,
            });
          });
          $(this).addClass('activesbmBtn');
        }
      }
    });
    //close sub pop
    $(document).on('click', '.closesubpoprow p', function(){
        $('.injectSubPopInfo').hide();
        //commented cuz we need above fucntionality instead   $('.injectSubPopInfo').remove();
        $('.submenupopbtn').removeClass('activesbmBtn');
    });
    //funcion de marcar checks
    $(document).on('click', '.containerCheck', function(){
        var check = $(this).find('.checkinput');
        var icon = $(this).find('i');
        if (check.is(':checked')){
        check.prop('checked', false);
        $(icon).removeClass('fa-check-square').addClass('fa-square');
        }else{
          if ($(this).hasClass('checkNocursos')) {
             $('.checkonlycurso').find('.checkinput').prop('checked', false);
             $('.checkonlycurso').find('i').removeClass('fa-check-square').addClass('fa-square');
          }
          if ($(this).hasClass('checkonlycurso')) {
             $('.checkNocursos').find('.checkinput').prop('checked', false);
             $('.checkNocursos').find('i').removeClass('fa-check-square').addClass('fa-square');
          }
          check.prop('checked', true);
          $(icon).removeClass('fa-square').addClass('fa-check-square');
        }
    });
    // ver detalles del cursor
    $(document).on('click', '.verdetallesCurso', function(e){
        e.preventDefault();
        var id = 'secciones/detallecurso.html';
        $('.injectfullinfo').load(id);
        $('#selectedCourse').val($(this).data('idcurso'))
    });
    // ver u ocultar el conteido de los addModuloCurso
    $(document).on('click', '.modulocontainer h3', function(){
       var padre = $(this).parent();
       padre.toggleClass('hideContMod');
       padre.find('i').toggleClass('fa-caret-down');
       padre.find('i').toggleClass('fa-caret-right');
    });
    //ABRIR POP de agregar modulo
    $(document).on('click', '.addModuloCurso', function(e){
        e.preventDefault();
        var id = 'popups/addModulo.html';
        var popups = `<div class="fullblockback injectPopInfo">
        </div>`;
        var data = $(this).data('idcurso');
        $(popups).prependTo('body');
        $('.injectPopInfo').load(id,function(){
          $('#saveModuleDash').data('idcurso',data);
        });
    });

    // Mostrar de talle del seguimiento de cursos de un usuario
    $(document).on('click', '.tddetallesc', function(){
      var id = 'secciones/detallerendimiento.html';
      localStorage.setItem("sdfsdf", $(this).data("id"));
      $('.injectfullinfo').load(id);
    });
    // Mostrar detalle de la actividad
    $(document).on('click', '.nameofactivity', function(){
      var tipo = $(this).parent();
      console.log(tipo);

      //extraer datos de la pregunta
      var d_question = tipo.data("preg");
      var d_answers = (tipo.data("resp") == "undefined")?[]:tipo.data("resp");
      var d_typeActivity = tipo.data("actividad");

      console.log(d_question);
      console.log(d_answers);
      console.log(d_typeActivity);
      var infoFrom = d_question && d_answers && d_typeActivity;

      var triangle = tipo.find('.triangleshowact');
      var actividad = 'falsetrue';
      var tipoact;
      var tipoacNot;

      var preguntaText = "Esta es una pregunta";
      var preguntasArr = [{r:"Esta es una respuesta",s:1}];

      if(infoFrom){
        actividad = d_typeActivity;
        preguntasArr = d_answers;
        preguntaText = d_question;
      }

      switch (actividad) {
        case 'falsetrue':
            // esto es para verdadero
            tipoact = "<div class='falsetruecont verdaderoresp'>V</div>";
            // esto de abajo es para cuando el usuario puso falso
            tipoactNot = "<div class='falsetruecont Falsoresp'>F</div>"
        break;
        case 'radiobtn':
            // esto es para el unico radio button que esta checado
            tipoact = "<i class='fas fa-dot-circle figurecheked'></i>";
            // esto de abajo es para radio buttons que NO estan Check
            tipoactNot = "<i class='fas fa-circle fnotchequed'></i>"
            break;
        case 'checkbtn':
            // esto es para el unico radio button que esta checado
            tipoact = "<i class='fas fa-check-square figurecheked'></i>";
            // esto de abajo es para radio buttons que NO estan Check
            tipoactNot = "<i class='fas fa-square fnotchequed'></i>"
        break;

      }
      if (tipo.hasClass('streamingtype')) {
          var pregunta = "<div class='preguntaStreamndiv'><h4 class='questionstreamact'>Esta es la Pregunta</h4><div class='fistcolumnstream'><p>Esta es una Respuesta</p></div><div class='Secondcolumnstream'>"+tipoact+"</div><div class='Secondcolumnstream'>"+tipoactNot+"</div></div>"
      }else{
          var pregunta = `<div class='preguntacontindiv'>
                    <h2 class='toppreguntai'>:pregunta:</h2>
                    <div class='answerindiv'>
                      :respuestas:
                    </div>`;

          var respuesta = `<div class='fistcolumnact'>:answerIcon:<p>:respuesta:</p></div>
                      <div class='Secondcolumnact'><p class='calificacionA :answerIconClass:'>:answerValidText:</p></div>`

          var respuestaHTML = "";
          for (var i = 0; i < preguntasArr.length; i++) {
            var answerIcon = (preguntasArr[i].s == 1)?tipoact:tipoactNot;
            var answerValidText = "";
            var answerIconClass = "";

            console.log(preguntasArr[i].s);
            switch(preguntasArr[i].s){
              case 0:
                answerValidText = "Incorrecta";
                answerIconClass = "actividad00";
                break;
              case 1:
                answerValidText = "Correcta";
                answerIconClass = "actividad100";
                break;
              case "idk":
                answerValidText = "-";
                answerIconClass = "";
                break;
            }

            respuestaHTML += respuesta.replace(":answerIcon:", answerIcon)
                                      .replace(":respuesta:", preguntasArr[i].r)
                                      .replace(":answerValidText:", answerValidText)
                                      .replace(":answerIconClass:", answerIconClass);
          }

          pregunta = pregunta.replace(":pregunta:", preguntaText)
                              .replace(":respuestas:", respuestaHTML);



        // Cuando la respuesta no es correcta cambiar la clase 'actividad100' por 'actividad00' --- en p.calificacionA
      }
      var container = "<div class='containerActivShow'>"+pregunta+"</div>";
      if(triangle.hasClass('fa-caret-right')){
        $('.triangleshowact').addClass('fa-caret-right').removeClass('fa-caret-down');
        $('.containerActivShow').remove();
        triangle.removeClass('fa-caret-right').addClass('fa-caret-down');
        $(container).appendTo(tipo);
      }else{
        triangle.addClass('fa-caret-right').removeClass('fa-caret-down');
        $('.containerActivShow').remove();
      }
    });
    //boton de link to
    $(document).on('click', '.linkto', function(){
        var id = $(this).attr('id');
        var row = $(this).parent();
        id = id.split('_');
        id = id[0];
        id = 'secciones/'+id+'.html';
        console.log(row.find("#__nick").html());
        console.log(row.find("#__name").html());
        localStorage.setItem("nick", row.find("#__nick").html());
        localStorage.setItem("name", row.find("#__name").html());
        $('.injectfullinfo').load(id);
    });
    //En el seguimiento de streaming funcion click en el usuario
    $(document).on('click', '.salIndiv', function(){
        $('.salIndiv').removeClass('selectIndiv');
        $(this).addClass('selectIndiv');
    });
    ///Forzar el inputfile de portada img
    $(document).on('click', '.uploaddedContainer button', function() {
      var padre = $(this).parent().find("input[type='file']");
      $(padre).trigger( "click" );
    });
    ///Filtro general de tablas
    $(document).on('keyup', '.filtrogeneral input', function() {
      var value = $(this).val().toLowerCase();
      var padre = $(this).parents().eq(1).find(".searchonthistable tr");
      $(padre).filter(function() {
        $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
      });
    });
    ///incertar location de alumno en streaming y eliminar
    $(document).on('click', '.locationalumnostream', function() {
      var valor = $(this).find('.locCont').length;
      if (valor == 0) {
        $('.locCont').remove();
        var modulo = 'Postres Dulces';
        var contenido = 'Postres Frios';
        var location = '<span class="locCont"><i class="fas fa-book"></i> '+modulo+'<span class="contenidoCont">'+contenido+'</span></span>';
        $(location).prependTo(this);
      }else{
        $('.locCont').remove();
      }

    });
    // ver detalles del cursor por Alumno
    $(document).on('click', '.verdetallesCursoAlum', function(e){
        e.preventDefault();
        $('#selectedCourse').val($(this).data('idcurso'))
        var author=$(this).data('author');
        localStorage.setItem('nameAuthor', author);
        var id = 'secciones/detallecursoalumno.html';
        $('.injectfullinfo').load(id);

    });
    // Mostrar de talle del seguimiento de cursos para el alumno
    $(document).on('click', '.tddetallescAlum', function(){
      var id = 'secciones/detallerendimientoAlum.html';
      var courseID = $(this).data("id");
      var courseName = $(this).data("name");
      idCourse = localStorage.setItem("sdfsdf", courseID);
      courseName = localStorage.setItem("tyuikl", courseName);
      $('.injectfullinfo').load(id);
    });
    // incertar seccion donde se editan mis datos de usuario
    $(document).on('click', '.linktoprofileedit', function(){
      $(this).addClass('greencontorno');
      $('.indivnavleft').removeClass('selectedinl');
      var id = 'secciones/linktoprofile.html';
      $('.injectfullinfo').load(id);
    });


    /// change pm to am toogle
    $(document).on('click', '.styleampnspan', function(){
      if ($(this).hasClass('disbledampm')) {

      }else{
        var texto = $(this).text();
        if (texto == 'PM') {
          $(this).text('AM');
        }else{
          $(this).text('PM');
        }
      }

    });
    //Editar eVENTO
    $(document).on('click', '.editthispop', function(){
      var pop = $(this).parents().eq(2);
      var input = pop.find('input');
      var select = pop.find('select');
      var textarea = pop.find('textarea');
      pop.find('.bottompopcont').removeClass('displayhide');
      input.removeClass('disabledinput');
      select.removeClass('disabledSelect');
      textarea.removeClass('disabledtextarea');
      $(input).prop("disabled", false);
      $(select).prop("disabled", false);
      $(textarea).prop("disabled", false);
      $('.styleampnspan').removeClass('disbledampm');
    });
    //Muestrame el dia que debo mostrar
    $(document).on('click', '.shomediaselect', function(){
        $(this).parent().find('input').removeClass('displayhide');
        $(this).parent().find('.verfechabtn').removeClass('displayhide');;
        $(this).prop("disabled", true);
        $(this).addClass('displayhide');
    });
  //////
  $(document).on('click', '.creareventonuevo', function(){
    var pop = $(this).parents().eq(2);
    var evento = pop.find('.inputnameevento').val();
    var hstart = pop.find('.horainicial .selectohorariocont').val();
    var pastart = pop.find('.horainicial .styleampnspan').text();
    var hfin = pop.find('.horafinal .selectohorariocont').val();
    var pafin= pop.find('.horafinal .styleampnspan').text();
      if (pastart == "PM") {
        var nhstart = parseInt(hstart) + 12;
      }else{
        var nhstart = parseInt(hstart);
      };
    var bloque= $('.caltabletd:eq('+(nhstart-1)+')');
      if (pafin == "PM") {
        var nhfin = parseInt(hfin) + 12;
      }else{
        var nhfin = parseInt(hfin);
      };
     var altura = nhfin - nhstart;
     if (altura > 1) {
       altura = (altura+1) * 60 ;
     }else{
      altura = altura * 60 ;
     }

     var eventocontainer = "<div class='contregEvento popupBtnEvento conaltura'><p class='nameEvento'>"+evento+"</p><p class='horadeevento'>"+hstart+pastart+"-"+hfin+pafin+"</p></div>";

    $(eventocontainer).prependTo(bloque);
      $('.conaltura').css('height', altura);
      $('.contregEvento').removeClass('conaltura');
    $('.fullblockback').remove();
  });
  ///// trigger click Calendario Streaming
  $(document).on('click', '.gotoAgendarEvento', function(e){
    e.preventDefault();
    $('#calendarStreaming').trigger('click');
    });
  //Funcion para Ver portadas predeterminadas
    $(document).on('click', '.check-portada', function(){
      var portada = $('#courseCategory').val();
      var imagen = 'img/preportada'+portada+'.png';
        if ($(this).hasClass('yes-cheked-portada')) {
          $(this).removeClass('yes-cheked-portada');
          $('.contPopPrevew').html('<img src="img/plantillau.png" id="previewImg" alt="">');
          $(this).find('i').removeClass('fa-check-square').addClass('fa-square');
        }else{
          if (portada == '') {
            var texto = 'No seleccionaste ninguna categoría';
            alertanegativa(texto);
            $('.contPopPrevew').html('<img src="img/plantillau.png" id="previewImg" alt="">');
          }else{
            $(this).addClass('yes-cheked-portada');
            $('.contPopPrevew').html('<img src="'+imagen+'" id="previewImg" alt="">');
            $(this).find('i').addClass('fa-check-square').removeClass('fa-square');
          }
        }
    });
  //Borrar a si mismo location
    return {
  		initDashBoardPage: initDashBoardPage,
      popupYesNo: popupYesNo,
      alertapositiva: alertapositiva,
      alertanegativa: alertanegativa
  	}
})(window);
