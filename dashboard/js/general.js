var general = (function(window, undefined){
  var datesArrReports=[
      [`${moment(new Date()).format("YYYY-MM-01 ")} 00:00:00`, `${moment(new Date()).format("YYYY-MM-DD ")}23:59:59` , `DEL 01 DE ${moment().format('MMMM')} DEL ${moment().format('YYYY')}  AL ${moment().format('DD')} DE ${moment().format('MMMM')} DEL ${moment().format('YYYY')}`],
      [`${moment(new Date()).subtract(3, 'months').format("YYYY-MM-")}01 00:00:00`, `${moment(new Date()).format("YYYY-MM-DD ")}23:59:59`, `DEL 01 DE ${moment().subtract(3, 'months').format('MMMM')} DEL ${moment().subtract(3, 'months').format('YYYY')}  AL ${moment().format('DD')} DE ${moment().format('MMMM')} DEL ${moment().format('YYYY')}`],
      [`${moment(new Date()).subtract(6, 'months').format("YYYY-MM-")}01 00:00:00`, `${moment(new Date()).format("YYYY-MM-DD ")}23:59:59`, `DEL 01 DE ${moment().subtract(6, 'months').format('MMMM')} DEL ${moment().subtract(6, 'months').format('YYYY')}  AL ${moment().format('DD')} DE ${moment().format('MMMM')} DEL ${moment().format('YYYY')}`]
    ];

   function initComponets(){
     $('#selectPeriod').append(`<option value="${0}">${datesArrReports[0][2]}</option><option value="${1}">${datesArrReports[1][2]}</option><option value="${2}">${datesArrReports[2][2]}</option>`);
   }
  function initGeneralDash(){
    //$('#userR').data('usrid') this always will be available  krpr by now we have default user for reports MorisDieck=3
    var usrId=$('#userR').data('usrid'); // moris=3 uncomment when production
    var currentDateArrIndex=$('#selectPeriod').val();
    var date1=datesArrReports[currentDateArrIndex][0];
    var date2=datesArrReports[currentDateArrIndex][1];
    var stringDisplayDates=datesArrReports[currentDateArrIndex][2];
    $("body").append(`<div class="pantalladecarga"><img src="img/uvimex_load.gif" alt=""></div>`);
         $.ajax({
           url: "https://uvimex.com.mx/platformComms.php",
           type: 'GET',
           data: {actionAPI:'getGeneralDashInfo',
                  idUser:usrId, // ID from Wordpress //correct this to normal process variable right now we are doing Moris
                  date1:date1,
                  date2:date2
           },
           dataType: 'json',
           async: false,
           contentType: "application/json",
           success: function(arrayResponse){
            if(arrayResponse[0].success=="true"){
               $('#activeCourse').html(arrayResponse[0].activeCourses.length ? arrayResponse[0].activeCourses.length : 0);
               $('#registeredStudents').html(arrayResponse[0].totalStudents ? arrayResponse[0].totalStudents : 0);
               $('#visits').html(0);
               $('#totalMoney').html(0);
               var d = new Date();
               var strDate = stringDisplayDates;
               $('#sellingPeriod').html(strDate);
               $('#totalSoldCourses').html(arrayResponse[0].totalSoldCourses ? `${arrayResponse[0].totalSoldCourses} Unidades` : '0 Unidades');
               $('#newUsers').html(arrayResponse[0].totalNewUsers ? `${arrayResponse[0].totalNewUsers} Usuarios` : '0 Usuarios');
               $('#totalIncome').html(arrayResponse[0].incomeWithdraw ? `$${arrayResponse[0].incomeWithdraw}` : '0.00 MXN');
               $('#totalMoney').html(arrayResponse[0].totalBalance ? `$ ${arrayResponse[0].totalBalance} MX` : '0.00 MXN');
            }
            $(".pantalladecarga").remove();
           }
         });
  }
      // reloadInfo atCertain Time
    $(document).on('click', '#selectPeriod', function(e){
      e.preventDefault();
        initGeneralDash();
    });

  return {
    initComponets:initComponets,
    initGeneralDash: initGeneralDash

  }
})(window);
