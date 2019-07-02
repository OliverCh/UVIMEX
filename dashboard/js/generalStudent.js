var generalStudent = (function(window, undefined){

  var notStartedCourse=`<div class="individualCurso">
                          <p class="statusCurso scnoiniciado">No Inciado</p>
                          <div class="ImagecontainerCurso" style="background-image: url(:directoryImg:);">

                          </div>
                          <div class="indivTitleCurso">
                            <h3>:courseTitle:</h3>
                            <p class="nomInstgeneral">:instructorName:</p>
                          </div>
                          <div class="indivCursoBtns">
                            <button type="button" name="button" class="greenbtncontorno fullblackbtn" data-idmodulo1=":idmodulo1:" id="goToCourse">Ir al Curso</button>
                            <button type="button" name="button" class="linkButton  verdetallesCursoAlum" data-idCurso=":idCurso:" data-author=":author:">Ver Detalles</button>
                          </div>
                        </div>`;
  var  completedCourse = `<div class="individualCurso">
                            <p class="statusCurso scTerminado">Completado</p>
                            <div class="ImagecontainerCurso"  style="background-image: url(:directoryImg:);">
                            </div>
                            <div class="indivTitleCurso">
                              <h3>:courseTitle:</h3>
                              <p class="nomInstgeneral">:instructorName:</p>
                            </div>
                            <div class="indivCursoBtns">
                              <button type="button" name="button" class="greenbtncontorno fullblackbtn" data-idmodulo1=":idmodulo1:" id="goToCourse">Ir al Curso</button>
                              <button type="button" name="button" class="linkButton  verdetallesCursoAlum" data-idCurso=":idCurso:" data-author=":author:">Ver Detalles</button>
                            </div>
                          </div>`;
   var onCourse=`<div class="individualCurso">
                   <p class="statusCurso scEnProceso">En Proceso</p>
                   <div class="ImagecontainerCurso" style="background-image: url(:directoryImg:);">
                   </div>
                   <div class="indivTitleCurso">
                     <h3>:courseTitle:</h3>
                     <p class="nomInstgeneral">:instructorName:</p>
                   </div>
                   <div class="indivCursoBtns">
                     <button type="button" name="button" class="greenbtncontorno fullblackbtn" data-idmodulo1=":idmodulo1:" id="goToCourse">Ir al Curso</button>
                     <button type="button" name="button" class="linkButton  verdetallesCursoAlum" data-idCurso=":idCurso:" data-author=":author:">Ver Detalles</button>
                   </div>
                 </div>`;
   //ir al Curso edit

   $(document).on('click', '#goToCourse', function(e){
     if(false && $(this).data('idmodulo1')){
       var idModulo=$(this).data('idmodulo1');
       var userId=$('#userR').data('usrid');
       window.open(`../platform/php/preview.php?${idModulo}&usr=${userId}`);
     }
   });

  function initGeneralStudentDash(){
    //$('#userR').data('usrid') this always will be available  krpr by now we have default user for reports MorisDieck=3
    var usrId=$('#userR').data('usrid'); // moris=3 uncomment when production
    $.ajax({
      url: "https://uvimex.com.mx/platformComms.php",
      type: 'GET',
      data: {actionAPI:'getGeneralStudentDashInfo',
             user:usrId // ID from Wordpress //correct this to normal process variable right now we are doing Moris
      },
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
        if(arrayResponse[0].success=="true"){
          var instructorCounter;
          if(arrayResponse[0].coursesArray && arrayResponse[0].coursesArray.length > 0){
            instructorCounter = arrayResponse[0].coursesArray[0].instructorsCounter
          }
          else{
            instructorCounter = 0;
          }
          // no funciona
          //var instructorCounter= arrayResponse[0].coursesArray ? arrayResponse[0].coursesArray[0].instructorsCounter : 0;
          var adquiredCoursesCounter= arrayResponse[0].coursesArray ? arrayResponse[0].coursesArray.length : 0;
          $('#adqCourseCounter').html(adquiredCoursesCounter).hide().fadeIn();
          $('#instructorCounter').html(instructorCounter).hide().fadeIn();
          if(arrayResponse[0].coursesArray){
            $.ajax({
              url: "json/getAdquiredCourses.php",
              type: 'GET',
              data: {coursesArray:arrayResponse[0].coursesArray,
                     user:usrId // ID from Wordpress //correct this to normal process variable right now we are doing Moris
              },
              dataType: 'json',
              async: false,
              contentType: "application/json",
              success: function(response){
                var courses=response;
                var htmlCoursesSection=`<h2>Últimos Cursos Adquiridos</h2>`;
                if(courses.length == 0){
                  htmlCoursesSection=`<h2>No haz comprado ningun curso</h2>`;
                }

                var directoryImgUrl=``;
                for (var i = 0; i < courses.length; i++) {
                  if(i<3){
                    directoryImgUrl=courses[i].urlPortada ? `assets/courseAssets/${courses[i].idAuth}/${courses[i].idC}/portraits/${courses[i].urlPortada}` : 'none';
                    switch(courses[i].courseStatus){
                      case 0:htmlCoursesSection+=notStartedCourse;
                      break;
                      case 1:htmlCoursesSection+=onCourse;
                      break;
                      case 2:htmlCoursesSection+=completedCourse;
                      break;
                    }
                    htmlCoursesSection=htmlCoursesSection.replace(":directoryImg:", directoryImgUrl);
                    htmlCoursesSection=htmlCoursesSection.replace(":courseTitle:", courses[i].courseName);
                    htmlCoursesSection=htmlCoursesSection.replace(":instructorName:", courses[i].authorName);
                    htmlCoursesSection=htmlCoursesSection.replace(":idCurso:", courses[i].idC);
                    htmlCoursesSection=htmlCoursesSection.replace(":author:", courses[i].authorName);
                    htmlCoursesSection=htmlCoursesSection.replace(":idmodulo1:", courses[i].urlModule1.replace(/'+/g, ''));
                  }else{
                    break;
                  }
                }
                $('#coursesSection').empty().append(htmlCoursesSection).hide().fadeIn(1000);
              }
            });
          }else{
            var htmlCoursesSection=`<h2>Últimos Cursos Adquiridos</h2> <br> <p>No tiene cursos adquiridos<p>`;
            $('#coursesSection').empty().append(htmlCoursesSection).hide().fadeIn(1000);
          }
        }
      }
    });
  }
  // editCourseModuleCont
    // $(document).on('click', '#editCourseCont', function(e){
    //   e.preventDefault();
    //   var selectedCourse=$('#selectedCourse').val();
    //   localStorage.setItem('selectedCourse', selectedCourse);
    //   window.location.href = `../platform/php/index.html`;
    // });

  return {
    initGeneralStudentDash: initGeneralStudentDash

  }
})(window);