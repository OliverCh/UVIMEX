var students = (function(window, undefined){

  function initStudentListCourses(){
    getStudentsListCourses();
  }

  function getStudentsListCourses(){
    //get info from Wordpress DB
    var idUser=$('#userR').data('usrid');
    $.ajax({
      url: "https://uvimex.com.mx/platformComms.php",
      type: 'GET',
      data: {actionAPI:'getStudentsListCourses',
             authorCourse:idUser // ID from Wordpress //correct this to normal process variable right now we are doing Moris
            },
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
        var studentsArray= arrayResponse[0].studentsArray;
        var htmlTbodyTr=``;
            if(arrayResponse[0].success=="true" && studentsArray.length>0){
              for (var i = 0; i < studentsArray.length; i++) {
                htmlTbodyTr+=`<tr>
                              <td class="linktouserinfo" id="__nick">${studentsArray[i].stundentNick}</td>
                              <td id="__name">${studentsArray[i].studentName}</td>
                              <td>${studentsArray[i].studentEmail}</td>
                              <td>${studentsArray[i].phone ? studentsArray[i].phone : 'no capturado'}</td>
                              <td>${studentsArray[i].lastAccess ? studentsArray[i].lasAccess : 'Sin información'} </td>
                              <td class="linkto" id="detalleavance_linkto" data-id="${studentsArray[i].user_id}">ver</td>
                            </tr>`;
              }
              $('#studentsTblBody').html(htmlTbodyTr);
              $(".linkto").click(function(){
                var userID = $(this).data("id");
                localStorage.setItem("iesgj", userID);
              })
           }
        $(".pantalladecarga").remove();
        }
    });
    //get all user courses
    // var course =new courseModule.Course();
    // var arrCourses=course.getUserCourses(999); //replace it with userid
    // var htmlToAppend=`<h2>Cursos Existentes</h2>`;
    // $('.cantidaddecurso').html(arrCourses.length);
    // for (var i = 0; i < arrCourses.length; i++) {
    //    htmlToAppend+=`<h3>${arrCourses[i].nombre}</h3>`;
    // }
    // $('.cursoscontainer').empty();
    // $('.cursoscontainer').append(htmlToAppend);
  }

  //Editar Curso
  $(document).on('click', '.editCurso', function(e){
    e.preventDefault();

  });

  return {
    initStudentListCourses: initStudentListCourses,
  }
})(window);
