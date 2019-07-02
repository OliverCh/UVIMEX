var studentAdquiredCourses = (function(window, undefined){

  var notStartedCourse=`<div class="individualCurso">
                          <p class="statusCurso scnoiniciado">No Empezado</p>
                          <div class="ImagecontainerCurso"  style="background-image: url(:directoryImgUrl:);">
                          </div>
                          <div class="indivTitleCurso">
                            <h3>:courseTitle:</h3>
                            <p class="nomInstgeneral">:authorName:</p>
                          </div>
                          <div class="indivCursoBtns">
                            <button type="button" name="button" class="greenbtncontorno" data-idmodulo1=":urlModule1:" id="goToCourse">Ir al Curso</button>
                            <button type="button" name="button" class="linkButton  verdetallesCursoAlum" data-idcurso=":idCurso:" data-author=":authorName:">Ver Detalles</button>
                          </div>
                        </div>`;
  var startedCourse=`<div class="individualCurso">
                      <p class="statusCurso scEnProceso">En Proceso</p>
                      <div class="ImagecontainerCurso" style="background-image: url(:directoryImgUrl:);">

                      </div>
                      <div class="indivTitleCurso">
                        <h3>:courseTitle:</h3>
                        <p class="nomInstgeneral">:authorName:</p>
                      </div>
                      <div class="indivCursoBtns">
                      <button type="button" name="button" class="greenbtncontorno" data-idmodulo1=":urlModule1:" id="goToCourse">Ir al Curso</button>
                      <button type="button" name="button" class="linkButton  verdetallesCursoAlum" data-idcurso=":idCurso:" data-author=":authorName:">Ver Detalles</button>
                      </div>
                    </div>`;
  var finishedCourse=`<div class="individualCurso">
                        <p class="statusCurso scTerminado">Completado</p>
                        <div class="ImagecontainerCurso" style="background-image: url(:directoryImgUrl:);">
                        </div>
                        <div class="indivTitleCurso">
                          <h3>:courseTitle:</h3>
                          <p class="nomInstgeneral">:authorName:</p>
                        </div>
                        <div class="indivCursoBtns">
                        <button type="button" name="button" class="greenbtncontorno" data-idmodulo1=":urlModule1:" id="goToCourse">Ir al Curso</button>
                        <button type="button" name="button" class="linkButton  verdetallesCursoAlum" data-idcurso=":idCurso:" data-author=":authorName:">Ver Detalles</button>
                        </div>
                      </div>`;


  function initAdquiredCourseDash(){
    //create courseobj be aware to import courseModule.js b4 this file
    var idUsuario=$('#userR').data('usrid');
    $.ajax({
      url: "https://uvimex.com.mx/platformComms.php",
      type: 'GET',
      data: {actionAPI:'getUserCourses',
             user:idUsuario // ID from Wordpress //correct this to normal process variable right now we are doing Moris
      },
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
        console.warn(arrayResponse);
        if(arrayResponse[0].success=="true"){
          $.ajax({
            url: "json/getAdquiredCourses.php",
            type: 'GET',
            data: {coursesArray:arrayResponse[0].coursesArray,
                   user:idUsuario // ID from Wordpress //correct this to normal process variable right now we are doing Moris
            },
            dataType: 'json',
            async: false,
            contentType: "application/json",
            success: function(response){
              var htmlToAppendCourse=``;
              var courses=response;
              var directoryImgUrl;
              for (var i = 0; i < courses.length; i++) {
                switch(courses[i].courseStatus){
                  case 0:htmlToAppendCourse+=notStartedCourse;
                  break;
                  case 1:htmlToAppendCourse+=startedCourse;
                  break;
                  case 2:htmlToAppendCourse+=finishedCourse;
                  break;
                }
                directoryImgUrl=courses[i].urlPortada ? `assets/courseAssets/${courses[i].idAuth}/${courses[i].idC}/portraits/${courses[i].urlPortada}` : 'none';
                htmlToAppendCourse=htmlToAppendCourse.replace(":directoryImgUrl:", directoryImgUrl);
                htmlToAppendCourse=htmlToAppendCourse.replace(":courseTitle:", courses[i].courseName);
                htmlToAppendCourse=htmlToAppendCourse.replace(":authorName:", courses[i].authorName);
                htmlToAppendCourse=htmlToAppendCourse.replace(":idCurso:", courses[i].idC);
                htmlToAppendCourse=htmlToAppendCourse.replace(":authorName:", courses[i].authorName);
                htmlToAppendCourse=htmlToAppendCourse.replace(":urlModule1:", courses[i].urlModule1.replace(/'+/g, ''));
              }
              $('.cantidaddecurso').html(courses.length ? courses.length : 0);
              $('.bgfullcont.cursoscontainer').html(htmlToAppendCourse).hide().show(1000);
            }
          });
        }
      }
    });
  }


    function loadSingleCourseData(){
      //create courseobj be aware to import courseModule.js b4 this file
      var course =new courseModule.Course();
      course.idCurso=$('#selectedCourse').val();
      //unset it when its all working krpr
      course.idUsuario=$('#userR').data('usrid');
      var arrCourses=course.getSingleCourseForStudent();
      console.log('la info del curso es',arrCourses);
      if(arrCourses){
        var authorName=localStorage.getItem('nameAuthor');
        $('#authorN').html(authorName);
        $('#courseNameInfo').html(arrCourses[0].nombre);
        $('#description p').html(arrCourses[0].descripcion);
        $('#cost').html(arrCourses[0].costo);
        console.warn('se seleccionara',arrCourses[0].strCategoria);
        $("#category").html(arrCourses[0].strCategoria);
        $('#status').html(arrCourses[0].costo);
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
        var htmlModuleThemes=`<button type="button" name="button" class="fullblackbtn" data-idCurso="${arrCourses[0].idCurso}" data-idModulo1="${moduleThemes[0].url}" id="sendtoModule">Ir al Curso</button>`;
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

    //ir al Curso
    $(document).on('click', '.fullblackbtn', function(e){
      e.preventDefault();
      console.warn('entro');
      if($(this).data('idmodulo1')){
        var idModulo=$(this).data('idmodulo1');
        var userId=$('#userR').data('usrid');
        window.open(`../platform/php/preview.php?${idModulo}&usr=${userId}`);
      }
    });

    $(document).on('click', '#buyCourse', function(e){
      e.preventDefault();
      var redirectWindow = window.open('https://uvimex.com.mx/cursos-online/', '_blank');
      redirectWindow.location;

    });


  return {
    initAdquiredCourseDash: initAdquiredCourseDash,
    loadSingleCourseData:loadSingleCourseData
  }
})(window);