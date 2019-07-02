var arraySingleTheme=[];
var convertedToSecondsArray=[];
var thirdTemplate = function() {
  var video=document.querySelector('#videoCurso');
  var timeBar=document.querySelector('#controlVideo');
  function loadFiles(){
    var startContainer=`<div class="materialAdicional">`;
    var containerContent="";
    var endOfContainer=`</div>`;
    var idTema=$(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema") ? $(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema"):$("#idTema").val();
    var themeFiles = new Themes();
    themeFiles.idTema=idTema;
    var themeFilesArray=themeFiles.getThemeFiles();
    console.warn(themeFilesArray);
    if(themeFilesArray){
      for (var i = 0; i < themeFilesArray.length; i++) {
        var fileExt="";
        if(themeFilesArray[i].strArchivo){
          fileExt=themeFilesArray[i].strArchivo.split('.');
          switch(fileExt[1]){
            case 'pdf' :containerContent+=`<div class="themeFiles"><img src="../img/ico-pdf.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}" data-strArchivo= "${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`; break;
            case 'png' :containerContent+=`<div class="themeFiles"><img src="../img/ico-png.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`; break;
            case 'jpg' :containerContent+=`<div class="themeFiles"><img src="../img/ico-jpg.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`; break;
            default:   containerContent+=`<div class="themeFiles"><img src="../img/file.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`;
          }
        }
      }
      finalString=startContainer+containerContent+endOfContainer;
      $(".icon-home-teme").append(finalString);
    }
  }
  function loadAudio(){

    var idTema=$(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idtema") ? $(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idtema"):$("#idTema").val();
    var theme = new Themes();
    var directory="../uploads/audio/";
    var videoFile=null;
    theme.idTema=idTema;
    var themesArray=theme.getSingleTheme();
    if(themesArray){
      for (var i = 0; i < themesArray.length; i++) {
        if(themesArray[i].audio){
          videoFile=themesArray[i].audio;
        }
      }
      $("#urlVideo").attr('src', directory+videoFile);
      //document.getElementById("urlVideo").load();
    }
  }

  function convertToSeconds(){
    var minutes;
    var seconds;
    var arrTime;
    for (var i = 0; i < arraySingleTheme.length; i++) {
        var totalTime=0;
        if(arraySingleTheme[i].tiempo){
          arrTime=arraySingleTheme[i].tiempo.split(":");
          minutes=parseInt(arrTime[0])*60;
          seconds=parseInt(arrTime[1]);
          totalTime=minutes+seconds;
          convertedToSecondsArray.push({
            idCurso:arraySingleTheme[i].idCurso,
            idContenido: arraySingleTheme[i].idContenido,
            videoName: arraySingleTheme[i].audio,
            idContenidoPadreImg : arraySingleTheme[i].idContenidoPadreImg,
            imgName:arraySingleTheme[i].url,
            tiempo: totalTime
          });
         }
    }
  }
  function orderImages(){

      console.warn('b4sort',convertedToSecondsArray);
    convertedToSecondsArray.sort(function(a,b) {
          //compare seconds
          if ( a.tiempo < b.tiempo )
              return -1;
          if (  a.tiempo > b.tiempo )
              return 1;
          return 0;
    } );
    console.warn('after',convertedToSecondsArray);
  }

  function initComponents(){
    /*toggle play pause*/
    $(document).on('click', '#mediaPlay', function() {
      var video=document.querySelector('#videoCurso');
      video.paused ? video.play() : video.pause();
      video.paused ?  $("#mediaPlay").attr("class", "icon-play") : $("#mediaPlay").attr("class", "icon-pause") ;
    });

    /*toggle Maximize video*/
    $(document).on('click', '#maximizarVideo', function() {
      var video=document.querySelector('#videoCurso');
      if(video.requestFullScreen){
        video.requestFullScreen();
      } else if(video.webkitRequestFullScreen){
        video.webkitRequestFullScreen();
      } else if(video.mozRequestFullScreen){
        video.mozRequestFullScreen();
      }
    });

    /*get Current Time video for timeBar*/
    video.addEventListener('timeupdate',function(){
      var video=document.querySelector('#videoCurso');
      if(video.currentTime==0){
        $(".tem-images-container img").attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      }
      var currentVideoPlay=video.currentTime / video.duration;
      //console.warn(Math.round(currentVideoPlay*100));
      timeBar.value=Math.round(currentVideoPlay*100);
      var currentVideoTime=Math.round(video.currentTime);
      var totalVideoTime=Math.round(video.duration);
      $(".currentTimeMinutes").html(secondsToTimeHMS(totalVideoTime-currentVideoTime));
      if( Math.round(video.currentTime) <  Math.round(video.duration) ){
        loadImages(Math.round(video.currentTime));
      }

      if(currentVideoTime==totalVideoTime){
        $("#mediaPlay").removeClass("icon-pause").addClass("icon-play");
        video.currentTime = 0
        video.pause();
        $("tem-images-container img").attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      }


    });
    // Pause the video when the slider handle is being dragged
     timeBar.addEventListener("mousedown", function() {
         video.pause();
     });

 // Play the video when the slider handle is dropped
     timeBar.addEventListener("mouseup", function() {

         video.play();
     });

     // Event listener for the seek bar
       timeBar.addEventListener("change", function() {
         // Calculate the new time
         var time = video.duration * (timeBar.value / 100);

         // Update the video time
         video.currentTime = time;
       });
       $(document).on('click', '.closeDocument', function() {
         console.warn('entro');
         $(".deleteMe").remove();
       });
       $('.themeFiles').click(function(e) {
          e.preventDefault();  //stop the browser from following
          var idTema=$(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema") ? $(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema"):$("#idTema").val();
          if(!idTema){
            idTema=$(this).find(".fileName").data("idtema");
          }
          var strArchivo=$(this).find(".fileName").data("strarchivo");
          var strArchivoNombre=$(this).find(".fileName").text();
          var sourceFile=`https://uvimex.com.mx/dashboard/platform/uploads/${idTema}/Files/${strArchivo}`;
          $(".den-cont-plantillaprevew").append(`<div class="deleteMe" style='position: absolute;
                                                             width: 97%;
                                                             height: 100%;
                                                             top: 0;
                                                             left: 0px;
                                                             cursor:pointer;
                                                             z-index: 100002;'>
                                                    <span class="closeDocument"  style='position: absolute;
                                                                  background-color:unset;
                                                                  right: 2%;
                                                                  top: 4%;
                                                                  font-size: 4em;
                                                                 '>x</span>
                                                    <embed src='https://drive.google.com/viewerng/viewer?url=${sourceFile}?pid=explorer&efh=false&a=v&chrome=false&embedded=true' width='100%' height='100%' /></embed>
                                                </div>`).show(300);
      });

  }

  return {
    init: function() {
      loadFiles();
      loadAudio();
      convertToSeconds();
      orderImages();
      initComponents();
    }
  };
}();

$(document).ready(function(){
   thirdTemplate.init();
});

function Themes(){
  this.idTema = "";
  this.idCurso = "";
  this.nombre = "";
  this.temaPadre = "";
  var arrayThemes;
  var arrayFiles;

  this.getSingleTheme = function (){
    $.ajax({
      url: "../json/jsonSingleTheme.php",
      type: 'get',
      data: {idTema:this.idTema,
      },
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
        arraySingleTheme=arrayResponse;
      }
    });
    return arraySingleTheme;
  }

  this.getThemes = function () {

      $.ajax({
        url: "../json/jsonThemes.php",
        type: 'get',
        data: {user:'usuario',
        idCurso:this.idCurso
      },
      contentType: "application/json",
      dataType: 'json',
      async: false,
      success: function(arrayResponse){
        arrayThemes=arrayResponse;
      }
    });
   return arrayThemes;
  }

  this.getThemeFiles = function () {
    $.ajax({
      url: "../json/jsonThemeFiles.php",
      type: 'get',
      data: {idTema:this.idTema  },
      contentType: "application/json",
      dataType: 'json',
      async: false,
    success: function(arrayResponse){
      arrayFiles=arrayResponse;
    }
  });
  return arrayFiles;
}
}

//pending we still don't know if it's gonna be files per theme or files per course
// function Courses(){
//   this.idArchivosPorCurso = "";
//   this.idCurso = "";
//   this.strArchivo = "";
//   var arrayCourse;
//
//
//   this.getAllCourseFiles = function (){
//     $.ajax({
//       url: "../json/jsonModuleFiles.php",
//       type: 'get',
//       data: {idTema:this.idTema,
//       },
//       dataType: 'json',
//       async: false,
//       contentType: "application/json",
//       success: function(arrayResponse){
//         arrayCourse=arrayResponse;
//       }
//     });
//     return arrayCourse;
//   }
// }

var currentImage="";
var flagChange=0;
var currentCounterImageArray=0;
function loadImages(currentTime){
var directoryImg="../uploads/images/";
var video=document.querySelector('#videoCurso');
var counter
var imageDisplayedAt=0;
console.warn('dibujado',convertedToSecondsArray);
for (var i = 0; i < convertedToSecondsArray.length;i++) {
   if(convertedToSecondsArray[i].tiempo && currentTime >= Math.round(convertedToSecondsArray[i].tiempo) &&( (i+1) <convertedToSecondsArray.length) && (currentTime < convertedToSecondsArray[i+1].tiempo || convertedToSecondsArray[i+1].tiempo == null) && (currentImage!=directoryImg+convertedToSecondsArray[i].imgName)){
     console.warn('la comparacià¸£à¸“n es TiempoActual=',currentTime,'TiempoDeImagen=',Math.round(convertedToSecondsArray[i].tiempo),'imageDisplayedAt',imageDisplayedAt);
     imageDisplayedAt=currentTime;
     currentImage=directoryImg+convertedToSecondsArray[i].imgName;
      $(".tem-images-container" ).hide();
      $(".tem-images-container img" ).fadeOut( 500);
      flagChange=1;
      setTimeout(function(){
        if(flagChange==1){
          flagChange=0;
          console.log('se pondra',currentImage);
          $(".tem-images-container img").attr("src", currentImage);
          $(".tem-images-container" ).show();
          $( ".tem-images-container img" ).fadeIn(500);
        }
      },500);
       break;
    }else{
      if( (i==convertedToSecondsArray.length-1) && (convertedToSecondsArray[i].tiempo) && (currentTime >= Math.round(convertedToSecondsArray[i].tiempo)) && (currentImage!=directoryImg+convertedToSecondsArray[i].imgName) ) {
        console.warn('la comparaciÃ³n final es TiempoActual=',currentTime,'TiempoDeImagen=',Math.round(convertedToSecondsArray[i].tiempo),'imageDisplayedAt',imageDisplayedAt);
        imageDisplayedAt=currentTime;
        currentImage=directoryImg+convertedToSecondsArray[i].imgName;
         $(".tem-images-container" ).hide();
         $(".tem-images-container img" ).fadeOut( 500);
         flagChange=1;
         setTimeout(function(){
           if(flagChange==1){
             flagChange=0;
             console.log('se pondra',currentImage);
             $(".tem-images-container img").attr("src", currentImage);
             $(".tem-images-container" ).show();
             $( ".tem-images-container img" ).fadeIn(500);
           }
         },500);
          break;

      }

    }
}
}

function secondsToTimeHMS(s) {
//uncomment incase you want HH:MM::SS
  // var h = Math.floor(s/3600); We get hours
  // s -= h*3600;
  var m = Math.floor(s/60); //We get remaining minutes
  s -= m*60;
  // return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
  return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}
