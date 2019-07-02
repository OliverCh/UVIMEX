var courseModule = (function(window, undefined){
    function course(){
      this.idCurso = "";
      this.nombre = "";
      this.descripcion = "";
      this.costo = "";
      this.idUsuario = "";
      this.idCategoria = "";
      this.tag = "";
      this.streaming = "";
      this.duracion = "";
      this.idStatus = "";
      var arrayUserCourses;
      var arraySingleCourses;
      var arraySingleCourseForStudent;
      //this is used for instructors
      this.getSingleCourse = function (){
        $.ajax({
          url: "json/getSingleCourse.php",
          type: 'get',
          data: {idCurso:this.idCurso,
            idUsuario:this.idUsuario
          },
          dataType: 'json',
          async: false,
          contentType: "application/json",
          success: function(arrayResponse){
            arraySingleCourses=arrayResponse;
          }
        });
        return arraySingleCourses;
      }

      this.getUserCourses = function (idUsr){
        $.ajax({
          url: "json/getUserCourses.php",
          type: 'get',
          data: {idUsr:idUsr},
          dataType: 'json',
          async: false,
          contentType: "application/json",
          success: function(arrayResponse){
            arrayUserCourses=arrayResponse;
          }
        });
        return arrayUserCourses;
      }
      //this is used for studentss
      this.getSingleCourseForStudent = function (idUsr){
        $.ajax({
          url: "json/getSingleCourseForStudent.php",
          type: 'get',
          data: {idCurso:this.idCurso},
          dataType: 'json',
          async: false,
          contentType: "application/json",
          success: function(arrayResponse){
            arraySingleCourseForStudent=arrayResponse;
          }
        });
        return arraySingleCourseForStudent;
      }
    }

    return {
  		Course: course
  	}

})(window);
