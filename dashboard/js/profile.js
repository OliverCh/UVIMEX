var profile = (function(window, undefined){
  var ACCEPTED_FILES = {images:['png','jpg','jpeg','gif']};
  function loadUserProfile(){
    //$('#userR').data('usrid') this always will be available  krpr by now we have default user for reports MorisDieck=3
    var usrId=$('#userR').data('usrid'); // moris=3 uncomment when production
         $.ajax({
           url: "https://uvimex.com.mx/platformComms.php",
           type: 'GET',
           data: {actionAPI:'getCurrentUserInfo',
                  idUser:usrId, // ID from Wordpress //correct this to normal process variable right now we are doing Moris
           },
           dataType: 'json',
           async: false,
           contentType: "application/json",
           success: function(arrayResponse){
            if(arrayResponse[0].success=="true"){
              var userInfo=arrayResponse[0].userInfo;
              console.warn(userInfo.user_nick);
              $.get( "json/getCurrentUserData.php",{user:usrId}, function( data ) {

                  $('#nickNameProfile').html(userInfo.user_nick ? userInfo.user_nick : '');
                  $('#name').val(userInfo.username  ? userInfo.username : '');
                  $('#phone').val(data[0].phone ? data[0].phone : '');
                  $('#address').val(data[0].address ? data[0].address  : '');
                  $('#bday').val(data[0].birthday ? data[0].birthday : '');
                  $('#email').val(userInfo.user_email ? userInfo.user_email: '');
                  $('#hprofileImg').val(data[0].urlProfileImage ? data[0].urlProfileImage : '');
                  $('#idPruebaAlumno').css('background-image', `url(assets/courseAssets/${userInfo.user_id}/userProfile/${data[0].urlProfileImage ? data[0].urlProfileImage : ''})`);
                  $('#userIdWP').val(userInfo.user_id ? userInfo.user_id : '');

              });

            }
           }
         });
  }
      //here validate first form
    $(document).on('click', '#saveProfile', function(e){
      e.preventDefault();
      $("#saveProfileForm").ajaxSubmit({
          beforeSubmit: function(arr, $form, options) {
            // status.empty();
              //here it goes validation
              if($.trim($('#name').val())==""){
                $("#name").siblings('.errorValidation').remove();
                $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#name').fadeIn(260);
                $('#name').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
                alertanegativa("Hay campos vacios");
                return false;
              }else{
                $('.indivdatauser').find('.errorValidation').remove();
                $('.indivdatauser').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
              }
              if($.trim($('#phone').val())==""){
                $("#phone").siblings('.errorValidation').remove();
                $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#phone').fadeIn(260);
                $('#phone').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
                alertanegativa("Hay campos vacios");
                return false;
              }else{
                $('.indivdatauser').find('.errorValidation').remove();
                $('.indivdatauser').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
              }
              if($.trim($('#address').val())==""){
                $("#address").siblings('.errorValidation').remove();
                $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#address').fadeIn(260);
                $('#address').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
                alertanegativa("Hay campos vacios");
                return false;
              }else{
                $('.indivdatauser').find('.errorValidation').remove();
                $('.indivdatauser').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
              }
              if($.trim($('#email').val())==""){
                $("#email").siblings('.errorValidation').remove();
                $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#email').fadeIn(260);
                $('#email').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
                alertanegativa("Hay campos vacios");
                return false;
              }else{
                $('.indivdatauser').find('.errorValidation').remove();
                $('.indivdatauser').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
              }
              $.ajax({
                url: "https://uvimex.com.mx/platformComms.php",
                type: 'GET',
                data: {actionAPI:'changeUserInfo',
                       idUser:$("#userR").data('usrid'), // ID from Wordpress //correct this to normal process variable right now we are doing Moris
                       name:$("#name").val(),
                       email:$("#email").val()
                },
                dataType: 'json',
                async: false,
                contentType: "application/json",
                success: function(arrayResponse){
                 if(arrayResponse[0].success=="true"){



                 }
                }
              });
          },
          uploadProgress: function(event, position, total, percentComplete) {

            //console.log(porcentajeVal, position, total);
          },
          error: function(jqXHR, textStatus, errorThrown) {
            console.warn(errorThrown,textStatus,jqXHR);
          },
          success: function(data, textStatus, jqXHR) {
            console.warn(data,textStatus,jqXHR);
            if(data[0].success == "true"){
              alertapositiva("Datos de Perfil Guardados Correctamente");
            }
          },
          complete: function(xhr) {

          }
      });
    });

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
              //ALERTA POSITIVA
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

      $(document).on('change', '#profileImg', function(e){
          e.preventDefault();
          // get file and pull attributes
          var input = $(this)[0];
          var file = input.files[0];
          var name=file.name;
          var type=file.type;
          var fileExt = $(this).val() ? $(this).val().split('.').pop(): '';
          if(!(ACCEPTED_FILES.images.includes(fileExt))){
            alertanegativa('Este archivo no tiene formato de imagen <br> intenta subiendo archivos .png, .jpg, .jpeg, .gif');
          }else{
            if(file.name!=""){
              // load file into preview pane
                var reader = new FileReader();
                reader.onload = function(e){
                  var image = new Image();
                  var validImg=true;
                  var validImg;
                      image.src = e.target.result;
                      image.onload = function () {
                        // var height = this.height;
                        // var width = this.width;
                        // console.log('el tamaño de la imagen es', width, height)
                        $('#idPruebaAlumno').css('background-image', `url(${e.target.result})`);
                       }
                }
                reader.readAsDataURL(file);
            }
          }
        });

  return {
    loadUserProfile: loadUserProfile
  }
})(window);
