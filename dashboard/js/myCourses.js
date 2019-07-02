var myCourses = (function(window, undefined){

  function initCourseDash(){
    //create courseobj be aware to import courseModule.js b4 this file
    var idUsuario=$('#userR').data('usrid');
    var course =new courseModule.Course();
    $("body").append(`<div class="pantalladecarga"><img src="img/uvimex_load.gif" alt=""></div>`);
    var arrCourses=course.getUserCourses(idUsuario); //replace it with userid
    var htmlToAppend=`<h2>Cursos Existentes</h2>`;
    var statusCurso=``;
    var btnIrCurso=``;
    var publishedCounter=0;
    var onEditionCounter=0;
    var onRevisionCounter=0;
    if(arrCourses){
      for (var i = 0; i < arrCourses.length; i++) {
        claseStatusCurso= ( (arrCourses[i].idStatusCurso == 1) ?  `statusCurso`  :   (arrCourses[i].idStatusCurso == 2) ?  `cursocotizado` :   (arrCourses[i].idStatusCurso == 3) ?  `scpublicado`  :  ``);
        publishedCounter+=  arrCourses[i].idStatusCurso  == 3 ? 1 :0;
        onRevisionCounter+=  arrCourses[i].idStatusCurso == 2 ? 1 :0;
        onEditionCounter+= arrCourses[i].idStatusCurso   == 1 ? 1 :0;
         btnIrCurso=arrCourses[i].idCurso ? `<button type="button" name="button" class="greenbtncontorno fullblackbtn" data-idcurso="${arrCourses[i].idCurso}" data-nombrecurso="${arrCourses[i].nombre}" id="goToCourseEdit">Editar el Curso</button>` : '';
         htmlToAppend+=`<div class="individualCurso">
                              <p class="statusCurso ${claseStatusCurso}">${arrCourses[i].statusCurso}</p>
                              <div class="ImagecontainerCurso" style="background-image: url(assets/courseAssets/${idUsuario}/${arrCourses[i].idCurso}/portraits/${arrCourses[i].urlPortada});">
                            </div>
                            <div class="indivTitleCurso">
                              <h3>${arrCourses[i].nombre}</h3>
                            </div>
                            <div class="indivCursoBtns">
                               ${btnIrCurso}
                              <button type="button" name="button" class="greenbtncontorno verdetallesCurso" data-idcurso="${arrCourses[i].idCurso}" >Ver Detalles</button>
                              <button type="button" name="button" class="linkButton editCurso"  data-idcurso="${arrCourses[i].idCurso}" >Editar Información</button>
                            </div>
                        </div>`;
      }

      $('.cursoscontainer').empty();
      $('.cursoscontainer').append(htmlToAppend);
    }else{
      $('.cursoscontainer').empty();
      $('.cursoscontainer').append(`<h2>No cuenta con ningún curso creado</h2>`);
    }


    $('#publishCounter').html(publishedCounter);
    $('#onEditionCounter').html(onEditionCounter);
    $('#onRevisionCounter').html(onRevisionCounter);
    $('.cantidaddecurso').html(arrCourses && arrCourses.length ? arrCourses.length : 0);
      
      $(".pantalladecarga").remove();
  }

  //ir al Curso edit
  $(document).on('click', '#goToCourseEdit', function(e){
    e.preventDefault();
    console.log("aa");

    // naming cosos
    console.log($(this));
    localStorage.setItem('courseName', $(this).data("nombrecurso"));
    localStorage.setItem('userName', $("#userN").html());
    localStorage.setItem('userNick', $("#nick").html());

    var selectedCourse=$(this).data('idcurso');
    var currentUserId=$('#userR').data('usrid');
    localStorage.setItem('selectedCourse', selectedCourse);
    localStorage.setItem('currentUserId', currentUserId);
    window.location.href = `../platform/php/index.html`;
  });

  function loadCoursesOnPoPUp(){
    var idUsr=$('#userR').data('usrid');
    $('#coursesCreateList').empty();
    //create courseobj be aware to import courseModule.js b4 this file
    var course =new courseModule.Course();
    var arrCourses=course.getUserCourses(idUsr);
    var htmlToAppend=`<div class="closesubpoprow">
                       <p>X</p>
                      </div>
                      <div class="indivcurso">
                        <div class="containerCheck checkNocursos">
                          <input type="checkbox" checked class="checkinput" value="" id="courseL">
                          <i class="far fa-check-square"></i>
                        </div>
                        <p>Ninguno</p>
                      </div>`;
    if(arrCourses){
      for (var i = 0; i < arrCourses.length; i++) {
          htmlToAppend+=`<div class="indivcurso">
                          <div class="containerCheck checkonlycurso">
                            <input type="checkbox" class="checkinput" value="${arrCourses[i].idCurso}" id="courseL">
                            <i class="far fa-square"></i>
                          </div>
                          <p>${arrCourses[i].nombre}</p>
                        </div>`;
      }
      $('#coursesCreateList').append(htmlToAppend);
      $('.injectSubPopInfo').hide();
    }else{
      $('#coursesCreateList').append('<h2>no tiene cursos creados para elegir un orden</h2>');
      $('.injectSubPopInfo').hide();
    }
  }

  function loadCategoriesOnPoPUp(){
    var categories = new categoryModule.Category();
    var arrCategories=categories.getCategories();
    var optionHTML=`<option value="">Seleccione una Categoría</option>`;
    if(arrCategories){
      for (var i = 0; i < arrCategories.length; i++) {
        optionHTML+=`<option value="${arrCategories[i].idC}" >${arrCategories[i].nombreCat}</option>`;
      }
      $('#courseCategory').empty();
      $('#courseCategory').append(optionHTML);
    }
  }

  function loadSingleCourseData(){
    //create courseobj be aware to import courseModule.js b4 this file
    var course =new courseModule.Course();
    course.idCurso=$('#selectedCourse').val();
    //unset it when its all working krpr
    course.idUsuario=$('#userR').data('usrid');
    var arrCourses=course.getSingleCourse();
    if(arrCourses){
      $('#courseNameInfo').html(arrCourses[0].nombre);
      $('#description').html(arrCourses[0].descripcion);
      $('#cost').html(arrCourses[0].costo);
      console.warn('se seleccionara',arrCourses[0].strCategoria);
      $("#category").html(arrCourses[0].strCategoria);
      var classColorStatus=( (arrCourses[0].idStatusCurso == 1) ?  ( (arrCourses[0].idStatusCurso == 2) ?  `cursocotizado`  :  `statusCurso`)  :  `scpublicado` );
      $('#status').html(arrCourses[0].statusCurso);
      $('#status').removeClass('cursocotizado statusCurso scpublicado');
      $('#status').addClass(classColorStatus);
      var tagsStr='';
      for (var i = 0; i < arrCourses[0].tags.length; i++) {
        if(i!=arrCourses[0].tags.length-1){
          tagsStr+=`${arrCourses[0].tags[i]}, ` ;
        }else{
          tagsStr+=`${arrCourses[0].tags[i]} ` ;
        }
      }
      $('#tag').html(tagsStr);

      //load mandatory courses
      var mandatoryCoursesArr=arrCourses[0].mandatoryCourses;
      var htmlMandatory='<h2>CURSOS OBLIGATORIOS</h2>';
      for (var i = 0; i < mandatoryCoursesArr.length; i++) {
        htmlMandatory+=`<p>${mandatoryCoursesArr[i].childC}</p>`;
      }
      $('#mandatoryCourses').html(htmlMandatory);
      $('#streaming').html(arrCourses[0].streaming ? 'Si' : 'No');
      $('#totalCourseTimeD').html(arrCourses[0].totalCourseTime ? arrCourses[0].totalCourseTime : 's/c');
      $('#duration').html(arrCourses[0].totalCourseMedia ? arrCourses[0].totalCourseMedia.replace(".", ":")+' min': 's/c');
      $('#activities').html(arrCourses[0].totalActivities);
      var directoryImg=arrCourses[0].urlPortada ? `assets/courseAssets/${course.idUsuario}/${arrCourses[0].idCurso}/portraits/${arrCourses[0].urlPortada}` : 'none';
      console.warn('el directorio es',directoryImg);
      $('#idpruebaportada').css('background-image',`url(${directoryImg})`);

      //load all modules and themes at bottom page
      var moduleThemes=arrCourses[0].modulesFromCourse;
      var htmlModuleThemes=`<button type="button" name="button" class="fullblackbtn" id="editCourseCont" data-idCurso="${arrCourses[0].idCurso}" data-nombrecurso="${arrCourses[0].nombre}">Editar Contenido</button>`;
      var htmlThemes='';
      var appendModule=0;
      var bandera=0;
      var moduloActual='';
      var newThemeLine='';
      for (var i = 0; i < moduleThemes.length; i++) {
          if(moduloActual!=moduleThemes[i].moduleName){
            if(bandera==1){
              htmlModuleThemes+=`<div class="modulocontainer">
                                  <h3><i class="far fa-eye-slash"></i></h3><p>${moduloActual}</p>
                                  <ul class="childTemas">
                                    ${htmlThemes}
                                  </ul>
                                </div>
                               `;
             htmlThemes=``;
             moduloActual=moduleThemes[i].moduleName;
             bandera=0;
            }
            bandera=1;
             moduloActual=moduleThemes[i].moduleName;
          }
          if(bandera==1 && moduloActual==moduleThemes[i].moduleName){
            moduleThemes[i].themeName ?   htmlThemes+=`<li>${moduleThemes[i].themeName}</li>` : '';
          }
          if(i==moduleThemes.length-1){
            htmlModuleThemes+=`<div class="modulocontainer">
                                <h3><i class="far fa-eye-slash"></i></h3><p>${moduloActual}</p>
                                <ul class="childTemas">
                                  ${htmlThemes}
                                </ul>
                              </div>
                             `;
          }
      }
      $('.detalleContenidoCurso').empty();
      $('.detalleContenidoCurso').append(htmlModuleThemes);
    }
  }

  // editCourseModuleCont
  $(document).on('click', '#editCourseCont', function(e){
    e.preventDefault();
    console.log("ee");
    var selectedCourse=$('#selectedCourse').val();
    var currentUserId=$('#userR').data('usrid');
    localStorage.setItem('selectedCourse', selectedCourse);
    // naming cosos
    localStorage.setItem('courseName', $(this).data("nombrecurso"));
    localStorage.setItem('userName', $("#userN").html());
    localStorage.setItem('userNick', $("#nick").html());

    localStorage.setItem('currentUserId', currentUserId);
    window.location.href = `../platform/php/index.html`;
  });

  //EVENT TO CREATE COURSE
  $(document).on('click', '#saveModuleDash', function(e){
    e.preventDefault();
    var mName=$('#mName').val();
    var idCurso=$(this).data('idcurso');
    console.warn('el curso es',idCurso);
    console.warn('el nombre delcurso es',mName);
    $.post( "php/createModule.php", {
     nombre: mName,
     userId:999,
     idCurso:idCurso
   }).done(function( data ) {
      alert('modulo guardado con éxito');
      $('.fullblockback').fadeOut(500, function(){
        $(this).remove();
      });
   });
  });
  $(document).on('change', '#portrait', function(e){
      e.preventDefault();
      // get file and pull attributes
      var input = $(this)[0];
      var file = input.files[0];
      var name=file.name;
      var type=file.type;
     // load file into preview pane

     var reader = new FileReader();
     reader.onload = function(e){
       var image = new Image();
       var validImg=true;
       var validImg;
           image.src = e.target.result;
           image.onload = function () {
              var height = this.height;
              var width = this.width;
              console.log('el tamaño de la imagen es', width, height)
              if (height != 1350 || width != 1800) {
                  alert("Las dimensiones de la imagen deben de ser de 1800 x 1350 !");
                 validImg=false;
              }
              if(!validImg){
                return false
                $("#portrait").val('');
              }else{
                  $('#previewImg').attr('src', e.target.result);
              }
            }
     }
     reader.readAsDataURL(file);


    });
  //event to create course with ajaxsubmitplugin
  $(document).on('click', '#saveCourseDash',function(e){
    e.preventDefault();
      var name,desc,cost,idusr,tag,idCat,streaming,hIdCurso;
      var mandatoryArr=[];
      $('#courseL:checked').each(function() {
          mandatoryArr.push($(this).val());
      });
      name=$('#courseName').val();
      desc=$('#courseDesc').val();
      cost=$('#courseCost').val();
      idusr=$('#userR').data('usrid');  //Reemplazar
      tag=tagsArr;
      idCat=$('#courseCategory').val();
      streaming= $('.containertoggle').hasClass('yesstream') ? 1 :null;
      hIdCurso= $('#hidCurso').val() ? $('#hidCurso').val() : null;
    $("#fCreateCourse").ajaxSubmit({
        beforeSubmit: function(arr, $form, options) {
          if($.trim($('#courseName').val())==""){
            $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseName').fadeIn(260);
            $('#courseName').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
            alertanegativa("Hay campos vacios");
            return false;
          }else{
            $('.whiteFintPop').find('.errorValidation').remove();
            $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
          }
          if($.trim($('#courseDesc').val())==""){
            $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseDesc').fadeIn(260);
            $('#courseDesc').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
            alertanegativa("Hay campos vacios");
            return false;
          }else{
            $('.whiteFintPop').find('.errorValidation').remove();
            $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
          }
          if($.trim($('#courseCost').val())==""){
            $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseCost').fadeIn(260);
            $('#courseCost').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
            alertanegativa("Hay campos vacios");
            return false;
          }else{
            $('.whiteFintPop').find('.errorValidation').remove();
            $('.whiteFintPop').find('.remove-input-margin-bottom has-den-error').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success')
            //alertanegativa("Llene todos los campos");
          }
          if($.trim($('#courseCategory').val())==""){
            $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseCategory').fadeIn(260);
            $('#courseCategory').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');
            alertanegativa("Hay campos vacios");
            return false;
          }else{
            $('.whiteFintPop').find('.errorValidation').remove();
            $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success')
          }
          if($('.bgtagcontainer p').length==0){
            $(`<span class="errorValidation den-hide has-den-error">*Este campo es obligatorio</span>`).insertAfter('.tagkeydown').fadeIn(260);
            $('.tagkeydown').addClass('remove-input-margin-bottom').removeClass('has-den-success');
            alertanegativa("Hay campos vacios");
            return false;
          }else{
            $('.whiteFintPop').find('.errorValidation').remove();
            $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success')
          }
          //ends validation
        },
        data: {  name: name,
             desc: desc,
             cost: cost,
             idusr: idusr,
             tagsArr: tag,
             idCat: idCat,
             streaming: streaming,
             mandatoryArr:mandatoryArr,
             hIdCurso:hIdCurso
        },
        uploadProgress: function(event, position, total, percentComplete) {
          var porcentajeVal = percentComplete + '%';
          console.warn(porcentajeVal);
          console.log(porcentajeVal, position, total);
        },
        error: function(jqXHR, textStatus, errorThrown) {
          console.warn(errorThrown,textStatus,jqXHR);
        },
        success: function(data, textStatus, jqXHR) {
          if(data[0].success == "true"){
            initCourseDash();
            loadSingleCourseData();
            alertapositiva("Curso creado con exito!");
            $('.fullblockback').fadeOut(500, function(){
              $(this).remove();
            });
          }
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
  //EVENT TO SAVE/EDITCOURSE
  // $(document).on('click', '#saveCourseDash', function(e){
  //   e.preventDefault();
  //   //start validation
  //   if($.trim($('#courseName').val())==""){
  //     $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseName').fadeIn(260);
  //     $('#courseName').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
  //     return false;
  //   }else{
  //     $('.whiteFintPop').find('.errorValidation').remove();
  //     $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
  //   }
  //   if($.trim($('#courseDesc').val())==""){
  //     $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseDesc').fadeIn(260);
  //     $('#courseDesc').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
  //     return false;
  //   }else{
  //     $('.whiteFintPop').find('.errorValidation').remove();
  //     $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success');
  //   }
  //   if($.trim($('#courseCost').val())==""){
  //     $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseCost').fadeIn(260);
  //     $('#courseCost').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');;
  //     return false;
  //   }else{
  //     $('.whiteFintPop').find('.errorValidation').remove();
  //     $('.whiteFintPop').find('.remove-input-margin-bottom has-den-error').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success')
  //   }
  //   if($.trim($('#courseCategory').val())==""){
  //     $(`<span class="errorValidation den-hide">*Este campo es obligatorio</span>`).insertAfter('#courseCategory').fadeIn(260);
  //     $('#courseCategory').addClass('remove-input-margin-bottom has-den-error').removeClass('has-den-success');
  //     return false;
  //   }else{
  //     $('.whiteFintPop').find('.errorValidation').remove();
  //     $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success')
  //   }
  //   if($.trim($('#courseTag').val())==""){
  //     $(`<span class="errorValidation den-hide has-den-error">*Este campo es obligatorio</span>`).insertAfter('#courseTag').fadeIn(260);
  //     $('#courseTag').addClass('remove-input-margin-bottom').removeClass('has-den-success');
  //     return false;
  //   }else{
  //     $('.whiteFintPop').find('.errorValidation').remove();
  //     $('.whiteFintPop').find('.remove-input-margin-bottom').removeClass('remove-input-margin-bottom has-den-error').addClass('has-den-success')
  //   }
  //   //ends validation
  //   var name,desc,cost,idusr,tag,idCat,streaming,hIdCurso;
  //   var mandatoryArr=[];
  //   $('#courseL:checked').each(function() {
  //       mandatoryArr.push($(this).val());
  //   });
  //   console.warn(`el arreglo tiene${mandatoryArr}`);
  //   name=$('#courseName').val();
  //   desc=$('#courseDesc').val();
  //   cost=$('#courseCost').val();
  //   idusr=999;  //Reemplazar
  //   tag=$('#courseTag').val();
  //   idCat=$('#courseCategory').val();
  //   streaming= $('.containertoggle').hasClass('yesstream') ? 1 :null;
  //   hIdCurso= $('#hidCurso').val() ? $('#hidCurso').val() : null;
  //   console.warn('se pondrá',hIdCurso);
  //     $.post( "php/storeCourse.php", {
  //      name: name,
  //      desc: desc,
  //      cost: cost,
  //      idusr: idusr,
  //      tag: tag,
  //      idCat: idCat,
  //      streaming: streaming,
  //      mandatoryArr:mandatoryArr,
  //      hIdCurso:hIdCurso
  //    }).done(function( data ) {
  //       initCourseDash();
  //       loadSingleCourseData();
  //       alert('curso guardado con éxito');
  //       $('.fullblockback').fadeOut(500, function(){
  //         $(this).remove();
  //       });
  //    });
  // });

  //Editar Curso
  $(document).on('click', '.editCurso', function(e){
      console.log("a");
      e.preventDefault();

      // Naming cosos
      localStorage.setItem('courseName', $(this).data("nombrecurso"));
      localStorage.setItem('userName', $("#userN").html());
      localStorage.setItem('userNick', $("#nick").html());
      console.log(localStorage.getItem('userNick'))

      var id = 'popups/popCrearCurso.html';
      var popups = `<div class="fullblockback injectPopInfo">
      </div>`;
      $(popups).prependTo('body');
      var idCurso=$('#selectedCourse').val() ? $('#selectedCourse').val() : $(this).data('idcurso') ;
      $('.injectPopInfo').load(id,function(){
        //inject mandatoryCourses
        $('.injectSubPopInfo').load('popups/spopCursorOblig.html',function(){
          loadCoursesOnPoPUp();
          $('.whiteFintPop h1').text('Editar Curso');
          var course =new courseModule.Course();
          course.idCurso=idCurso;
          //unset it when its all working krpr
          course.idUsuario=$('#userR').data('usrid');
          var arrCourses=course.getSingleCourse();
          if(arrCourses){
            var portraitUrl=`assets/courseAssets/${arrCourses[0].idUsuario}/${arrCourses[0].idCurso}/portraits/${arrCourses[0].urlPortada}`;
            $('#hidCurso').val(arrCourses[0].idCurso);
            $('#courseName').val(arrCourses[0].nombre);
            $('#courseDesc').val(arrCourses[0].descripcion);
            $('#courseCost').val(arrCourses[0].costo);
            $('#courseCategory').val(arrCourses[0].idCategoria);
            $('#courseTag').val(arrCourses[0].tag);
            $('#totalCourseTime').val(arrCourses[0].totalCourseTime ? arrCourses[0].totalCourseTime : '');
            $('#duration').html(arrCourses[0].totalCourseMedia ? arrCourses[0].totalCourseMedia.replace(".", ":")+' min': 's/c');
            $('#totalAct').html(arrCourses[0].totalActivities ? arrCourses[0].totalActivities : 's/c');
            $('#hportrait').val(arrCourses[0].urlPortada ? arrCourses[0].urlPortada : '' );
            $('#previewImg').attr('src',portraitUrl);
            var claseStatusCurso= ( (arrCourses[0].idStatusCurso == 1) ?  `statusCurso`  :   (arrCourses[0].idStatusCurso == 2) ?  `cursocotizado` :   (arrCourses[0].idStatusCurso == 3) ?  `scpublicado`  :  ``);
            console.warn('el estado es',arrCourses[0].statusCurso)
            $('#statusOnCreate').addClass(claseStatusCurso);
            $('#statusOnCreate').html(arrCourses[0].statusCurso);
            tagsArr= [];
            for (var i = 0; i < arrCourses[0].tags.length; i++) {
              tagsArr.push(arrCourses[0].tags[i]);
              var divcont = `<p class='tagcontainer'>${arrCourses[0].tags[i]}<i class='fas fa-times-circle'></i></p>`;
              $(divcont).appendTo('.bgtagcontainer');
            }

            //check all mandatory courses
            if(arrCourses[0].mandatoryCourses.length>0){
              var mandatoryCourses=arrCourses[0].mandatoryCourses;
              $(`#coursesCreateList input[type=checkbox][value=""]`).val([]);
              $(`#coursesCreateList input[type=checkbox][value=""]`).parent().find('i').removeClass('fa-check-square').addClass('fa-square')
              for (var i = 0; i < mandatoryCourses.length; i++) {
                $(`#coursesCreateList input[type=checkbox][value=${mandatoryCourses[i].idCursoHijo}]`).parent().find('i').removeClass('fa-square').addClass('fa-check-square');
                $(`#coursesCreateList input[type=checkbox][value=${mandatoryCourses[i].idCursoHijo}]`).prop('checked', true);
              }
            }
            //set streaming
            if(arrCourses[0].streaming){
              $('.containertoggle').addClass('yesstream');
              $('.movetoggle').css('right','0px');
            }else{
              $('.containertoggle').removeClass('yesstream');
              $('.movetoggle').css('right','-57px');
            }
          }
        });
      });
  });

  ///// Insertar Tags
  var tagsArr=[];
  $(document).on('keyup','.tagkeydown',function (e) {
    var texto = $(this).val();
    var divcont = "<p class='tagcontainer'>"+texto+"<i class='fas fa-times-circle'></i></p>";
    if ( $.inArray(texto, tagsArr) == -1 ) {
      if (e.keyCode === 13) {
        if (!(texto === '')) {
          $(divcont).appendTo('.bgtagcontainer');
          $(this).val('');
          tagsArr.push(texto);
        }
      }
    }

  });
  // delete tag
  $(document).on('click', '.tagcontainer i', function(){
    var text=$(this).parent().text();
    tagsArr.splice($.inArray(text, tagsArr),1);
    $(this).parent().remove();
  });

  return {
    initCourseDash: initCourseDash,
    loadCoursesOnPoPUp : loadCoursesOnPoPUp,
    loadCategoriesOnPoPUp: loadCategoriesOnPoPUp,
    loadSingleCourseData:loadSingleCourseData
  }
})(window);
