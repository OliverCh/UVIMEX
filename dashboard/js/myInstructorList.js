var myInstructorList = (function(window, undefined){

  function getInstructorList(){
    $.ajax({
      url: "https://uvimex.com.mx/platformComms.php",
      type: 'GET',
      data: {actionAPI:'getInstructorsList',
             usrId:$('#userR').data('usrid')
            },
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
       if(arrayResponse[0].success=="true"){
         var instructorsArr=arrayResponse[0].instructorsArray;
         var htmlTableInstructors=``;
          if(instructorsArr.length>0){
            for (var i = 0; i < instructorsArr.length; i++) {
              htmlTableInstructors+=`<tr>
                                          <td class="linktouserinfo" tittle="Ver Informaciòn del Usuario">${instructorsArr[i].usernice}</td>
                                          <td>${instructorsArr[i].userName}</td>
                                          <td>${instructorsArr[i].email}</td>
                                          <td>${instructorsArr[i].phoneNumber ? instructorsArr[i].phoneNumber : 'no registrado'}</td>
                                      </tr>`;
            }
          }else{
            htmlTableInstructors=`  <tr>
                <td colspan="4">No te has sucrito a ningun curso para tener un instructor</td>
              </tr>`;
          }
          $('#instructorsTblBody').html(htmlTableInstructors);
       }
      }
    });
  }


  return {
    getInstructorList: getInstructorList
  }
})(window);
