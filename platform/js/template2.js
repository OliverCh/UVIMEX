var arraySingleTheme=[];
var convertedToSecondsArray=[];
var secondTemplate = function() {
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
            case 'pdf' :containerContent+=`<div class="themeFiles"><img src="../img/ico-pdf.png"><section class="fileName" data-strArchivo= "${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`; break;
            case 'png' :containerContent+=`<div class="themeFiles"><img src="../img/ico-png.png"><section class="fileName"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`; break;
            case 'jpg' :containerContent+=`<div class="themeFiles"><img src="../img/ico-jpg.png"><section class="fileName"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`; break;
            default:   containerContent+=`<div class="themeFiles"><img src="../img/file.png"><section class="fileName"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strNombreArchivo}</section></div>`;
          }
        }
      }
      finalString=startContainer+containerContent+endOfContainer;
      $(".icon-home-teme").append(finalString);
    }
  }
  function loadVideo(){

    var idTema=$(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idtema") ? $(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idtema"):$("#idTema").val();
    var theme = new Themes();
    var directory="../uploads/videos/";
    var videoFile=null;
    theme.idTema=idTema;
    var themesArray=theme.getSingleTheme();
    if(themesArray){
      for (var i = 0; i < themesArray.length; i++) {
        if(themesArray[i].video){
          videoFile=themesArray[i].video;
        }
      }
      $("#urlVideo").attr('src', directory+videoFile);
      //document.getElementById("urlVideo").load();
    }
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
        $(".images.tem-images-container img").attr("src","data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      }
      var currentVideoPlay=video.currentTime / video.duration;
      //console.warn(Math.round(currentVideoPlay*100));
      timeBar.value=Math.round(currentVideoPlay*100);
      var currentVideoTime=Math.round(video.currentTime);
      var totalVideoTime=Math.round(video.duration);
      $(".currentTimeMinutes").html(secondsToTimeHMS(totalVideoTime-currentVideoTime));
      if( Math.round(video.currentTime) <  Math.round(video.duration) ){

      }

      if(currentVideoTime==totalVideoTime){
        $("#mediaPlay").removeClass("icon-pause").addClass("icon-play");
        video.currentTime = 0;
        video.pause();
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
          //uncomment when upload to server
          //var sourceFile=`http://104.154.247.218/crearCurso/develop/uploads/${idTema}/Files/${strArchivo}`;
          var sourceFile=`https://uvimex.com.mx/dashboard/platform/uploads/${idTema}/Files/${strArchivo}`;
          console.warn('el source es',sourceFile);
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
                                                    <embed src='https://drive.google.com/viewerng/viewer?url=${sourceFile}?pid=explorer&efh=false&a=v&chrome=true&embedded=true' width='100%' height='100%' /></embed>
                                                </div>`).show(300);
      });

  }

  return {
    init: function() {
      loadFiles();
      loadVideo();
      initComponents();
    }
  };
}();


$( document ).ready(function() {
    console.warn('inicializó')
    secondTemplate.init();
});

function secondsToTimeHMS(s) {
  //uncomment incase you want HH:MM::SS
    // var h = Math.floor(s/3600); We get hours
    // s -= h*3600;
    var m = Math.floor(s/60); //We get remaining minutes
    s -= m*60;
    // return h+":"+(m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
    return (m < 10 ? '0'+m : m)+":"+(s < 10 ? '0'+s : s); //zero padding on minutes and seconds
}
