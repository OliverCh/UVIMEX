var arraySingleTheme=[];
var convertedToSecondsArray=[];
var firstTemplate = function() {
  var video=document.querySelector('#videoCurso');
  var timeBar=document.querySelector('#controlVideo');

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

  function convertToSeconds(){
    var minutes;
    var seconds;
    var arrTime;
    for (var i = 0; i < arraySingleTheme.length; i++) {
        var totalTime=0;
        arrTime=arraySingleTheme[i].tiempo.split(":");
        minutes=parseInt(arrTime[0])*60;
        seconds=parseInt(arrTime[1]);
        totalTime=minutes+seconds;
      convertedToSecondsArray.push({
        idCurso:arraySingleTheme[i].idCurso,
        idContenido: arraySingleTheme[i].idContenido,
        videoName: arraySingleTheme[i].video,
        idContenidoPadreImg : arraySingleTheme[i].idContenidoPadreImg,
        imgName:arraySingleTheme[i].url,
        tiempo: totalTime
      });
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
      var currentVideoPlay=video.currentTime / video.duration;
      //console.warn(Math.round(currentVideoPlay*100));
      timeBar.value=Math.round(currentVideoPlay*100);
      console.error('los segundos son',Math.round(video.currentTime));
      console.warn('el total del video es',Math.round(video.duration));

      if( Math.round(video.currentTime) <  Math.round(video.duration) ){
        console.warn('entro al metodo');
        loadImages(Math.round(video.currentTime));
      }


    })
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

  }

  return {
    init: function() {
      loadVideo();
      convertToSeconds();
      orderImages();
      initComponents();
    }
  };
}();

$(document).ready(function(){
   firstTemplate.init();
});

function Themes(){
  this.idTema = "";
  this.idCurso = "";
  this.nombre = "";
  this.temaPadre = "";
  var arrayThemes;


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
}
var currentImage="";
function loadImages(timeVideo){
var directoryImg="../uploads/images/";
var video=document.querySelector('#videoCurso');

var imageDisplayedAt=0;
for (var i = 0; i < convertedToSecondsArray.length;i++) {
  console.warn('la comparaciรณn es timeVideo=',timeVideo,'timearray=',Math.round(convertedToSecondsArray[i].tiempo),'imageDisplayedAt',imageDisplayedAt);
   if(convertedToSecondsArray[i].tiempo && timeVideo == Math.round(convertedToSecondsArray[i].tiempo) && (currentImage!=directoryImg+convertedToSecondsArray[i].imgName)){
     imageDisplayedAt=timeVideo;
     currentImage=directoryImg+convertedToSecondsArray[i].imgName;
      $(".tem-images-container" ).hide();
      $(".tem-images-container img" ).fadeOut( 500);
      setTimeout(function(){
        console.log('se pondra',currentImage);
        $(".tem-images-container img").attr("src", currentImage);
        $(".tem-images-container" ).show();
        $( ".tem-images-container img" ).fadeIn(500);
      },500);
       break;
    }
}
}
