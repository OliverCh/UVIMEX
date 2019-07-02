var categoryModule = (function(window, undefined){
    function category(){
      this.idCategoria = "";
      this.strCategoria = "";
      this.status = "";
      var arrayCoursesCategories;



      this.getCategories = function (idUsr){
        $.ajax({
          url: "json/getCategories.php",
          type: 'get',
          // data: {idUsr:idUsr},
          dataType: 'json',
          async: false,
          contentType: "application/json",
          success: function(arrayResponse){
            arrayCoursesCategories=arrayResponse;
          }
        });
        return arrayCoursesCategories;
      }
    }

    return {
  		Category: category
  	}

})(window);
