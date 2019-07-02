$(document).ready(function(){
   preview.init();
});
var parentArrayThemes=[];
var arraySingleTheme=[];
var convertedToSecondsArray=[];
var video=document.querySelector('#videoCurso');
var timeBar=document.querySelector('#controlVideo');
var directoryVideos="../uploads/videos/";
var directoryAudios='../uploads/audio/';
var directoryImages="../uploads/images/";
var totalDiap=0;
var start="";
var prev="";
var next="";
var preview = function() {

  function loadThemes(){
    var themes = new Themes();
    var idCurso;
    themes.idCurso=getUrlParameter('idCurso');
    var themesArray = themes.getThemes();
    parentArrayThemes= themesArray;
    console.warn('los themesA',parentArrayThemes);
    var htmlList=`<ol id="lista5">`;
    if(themesArray){
      for (var i = 0; i < themesArray.length; i++) {
        htmlList+=`<li>
                      <a>
                          <label onclick="changeVideo(${themesArray[i].idTema})">${themesArray[i].nombre}</label>
                      </a>
                    </li>  `;
                    totalDiap+=1;
      }
      htmlList+=`</ol>`;
      $("#contenedor").append(htmlList).show(500);
    }
  }

  function initComponents(){
    /*toggle play pause*/
    $("#mediaMuted").click(function(){
      	if ($("#mediaMuted").attr("class") == "icon-volume-off" ) {
      		$("#mediaMuted").removeAttr("class");
      		$("#mediaMuted").attr("class", "icon-volume-up");
      		document.getElementById("videoCurso").muted = false;
      	}else {
      		$("#mediaMuted").removeAttr("class");
      		$("#mediaMuted").attr("class", "icon-volume-off");
          document.getElementById("videoCurso").muted = true;
      	}
      });
    $(document).on('click', '#mediaPlay', function() {
      var video=document.querySelector('#videoCurso');
      video.paused ? video.play() : video.pause();
      video.paused ?  $("#mediaPlay").attr("class", "icon-play") : $("#mediaPlay").attr("class", "icon-pause") ;
    });

    $("#mediaStop").click(function(){
      	$("#mediaPlay").removeAttr("class");
      	$("#mediaPlay").attr("class", "icon-play");
      	$("#videoCurso").trigger('pause');
      	document.getElementById("videoCurso").currentTime = 0;
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
                  loadImages(Math.round(video.currentTime));
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
           $(document).on('click', '.icon-search ', function() {
             $(".icon-home-teme").empty();
             var themesTitleSubtitle=new Themes();
             themesTitleSubtitle.idCurso=getUrlParameter('idCurso');
             var arrayThemesAndTitles=themesTitleSubtitle.getThemesAndTitles();
             console.error(arrayThemesAndTitles);
             if(arrayThemesAndTitles){
               var html=`<section>Temario del curso</section>`;
               html+=`<section>
                        <div id="temasDelCurso">
                        `;
                for (var i = 0; i < arrayThemesAndTitles.length; i++) {
                  if(arrayThemesAndTitles[i].nombreTema){
                    html+=`<section style="width: 100%;">${arrayThemesAndTitles[i].nombreTema}</section>
                           <section style="padding-left: 10px; width: 100%;">${arrayThemesAndTitles[i].titulo}</section>`;
                  }
                }
                html+=`</div>
            			   </section>`;
             }
             $(".icon-home-teme").append(html).toggle(400);

           });
          $(document).on('click', '.icon-file ', function() {
            /*This function its based on #contenedorCurso visibility*/
            if($("#lista5").is(":visible")){
              loadGeneralThemes();
            }else{
              loadFiles(start);
            }
            $(".icon-home-teme").toggle(500);
          });
          $(document).on('click', '.closeDocument', function() {
            console.warn('entro');
            $(".deleteMe").remove();
          });
            $(document).on('click', '.themeFiles', function() {
             console.warn('entr�');
             var idTema=$(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema") ? $(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema"):$("#idTema").val();
             var strArchivo=$(this).find(".fileName").data("strarchivo");
             var strArchivoNombre=$(this).find(".fileName").text();
             var sourceFile=`http://104.154.247.218/crearCurso/dev/uploads/${idTema}/Files/${strArchivo}`;
             $("html").append(`<div class="deleteMe" style='position: absolute;
                                                                width: 100%;
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
         $("#diapSig").click(function(){

             	////console.log(numDiap);
             	  $("#mediaPlay").removeAttr("class");


             	$("#mediaPlay").attr("class", "icon-play");
              console.warn('current antes de buscar',start);
              console.warn('el array es',parentArrayThemes);
              for (var i = 0; i < parentArrayThemes.length; i++) {
                if(parentArrayThemes[i].idTema==start){
                  console.warn('entro en',i);
                   prev=start;
                  start=(((i+1)<parentArrayThemes.length) && parentArrayThemes[i+1].idTema) ? parentArrayThemes[i+1].idTema : '';
                   next=(((i+2)<parentArrayThemes.length) && parentArrayThemes[i+2].idTema) ? parentArrayThemes[i+2].idTema : '';
                   break;
                }
              }

              if (start == '' ) { cargaMenu(); }
              console.warn('el prev es',prev);
              console.warn('el current es',start);
              console.warn('el next es',next);

             	changeVideo(start);

             	setTimeout(function(){

               		$("#mediaPlay").removeAttr("class");
               		$("#mediaPlay").attr("class", "icon-pause");

               		// document.getElementById("videoCurso").play();
               	}, 5000);

         });

         $("#diapAnt").click(function(){

             	////console.log(numDiap);
             	  $("#mediaPlay").removeAttr("class");


             	$("#mediaPlay").attr("class", "icon-play");
              console.warn('current antes de buscar',start);
              console.warn('el array es',parentArrayThemes);
              for (var i = 0; i < parentArrayThemes.length; i++) {
                if(parentArrayThemes[i].idTema==start){
                  console.warn('entro en',i);
                   next=start;
                   start=(((i-1)>-1) && parentArrayThemes[i-1].idTema) ? parentArrayThemes[i-1].idTema : '';
                   prev=(((i-2)>-1) && parentArrayThemes[i-2].idTema) ? parentArrayThemes[i-2].idTema : '';


                   break;
                }
              }

              if (start == '' ) { cargaMenu(); }
              console.warn('el prev es',prev);
              console.warn('el current es',start);
              console.warn('el next es',next);

             	changeVideo(start);

             	setTimeout(function(){

               		$("#mediaPlay").removeAttr("class");
               		$("#mediaPlay").attr("class", "icon-pause");

               		// document.getElementById("videoCurso").play();
               	}, 5000);

         });
        }

        function loadGeneralThemes(){
          var themeFiles = new Themes();
          var startContainer=`<div class="materialAdicional">`;
          var containerContent="";
          var endOfContainer=`</div>`;
          themeFiles.idCurso=getUrlParameter('idCurso');//we have to refresh this every theme is changed
          var themeFilesArray=themeFiles.getGeneralThemeFiles();
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
            $(".icon-home-teme").empty();
            $(".icon-home-teme").append(finalString);
          }
        }

        return {
          init: function() {
            loadThemes();
            initComponents();
            //loadVideo();
          }
        };
      }();

function loadFiles(idTema){
  var themeFiles = new Themes();
  var startContainer=`<div class="materialAdicional">`;
  var containerContent="";
  var endOfContainer=`</div>`;
  themeFiles.idTema=idTema;//we have to refresh this every theme is changed
  var themeFilesArray=themeFiles.getThemeFiles();
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
    $(".icon-home-teme").empty();
    $(".icon-home-teme").append(finalString);
  }
}

function loadVideo(idTema){

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
  convertedToSecondsArray=[]
  for (var i = 0; i < arraySingleTheme.length; i++) {
      var totalTime=0;
      if(arrTime=arraySingleTheme[i].tiempo){
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
       console.warn('la comparaciรณn es TiempoActual=',currentTime,'TiempoDeImagen=',Math.round(convertedToSecondsArray[i].tiempo),'imageDisplayedAt',imageDisplayedAt);
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
          console.warn('la comparación final es TiempoActual=',currentTime,'TiempoDeImagen=',Math.round(convertedToSecondsArray[i].tiempo),'imageDisplayedAt',imageDisplayedAt);
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

function changeVideo(idTema){
  loadFiles(idTema);
  //**************************************************************************
  //OBTIENE EL CONTENIDO DEL TEMPLATE PARA CREAR EL CONTENEDOR
  //**************************************************************************
  $("#mediaPlay").removeClass('icon-play').addClass("icon-pause")
    $("#urlVideo").attr('src', '');
    var videoTheme = new Themes();
    var videoFile=null;
    var videoTitle=null;
    var videoSubtitle=null;
    var videoContent=null;
    var directoryContent=""
    videoTheme.idTema=idTema;
    var themesArray=videoTheme.getSingleTheme();

    if(themesArray){
      start=idTema;
      convertToSeconds();
      orderImages();
      $(".images.tem-images-container img").attr('src',"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7");
      console.warn('el valor del array es',themesArray);
      for (var i = 0; i < themesArray.length; i++) {
        directoryContent="";
        if(themesArray[i].video || themesArray[i].audio){
          videoTitle=themesArray[i].titulo;
          videoSubtitle=themesArray[i].subtitulo;
          videoContent=themesArray[i].contenido;
          videoFile=themesArray[i].video ? themesArray[i].video : themesArray[i].audio ;
          console.warn('el file vale',videoFile);
          directoryContent=themesArray[i].video ? '../uploads/videos/' :(themesArray[i].audio) ? '../uploads/audio/':'';
        }else{
          //only text
          if(themesArray[i].contenido){
            videoTitle=themesArray[i].titulo;
            videoSubtitle=themesArray[i].subtitulo;
            videoContent=themesArray[i].contenido;
          }
        }
      }
    }
    //$('#contenedor').html(datos);
    $("#tituloCurso").html(videoTitle);
    //$("#temaCurso").html(data.contenido[diapositiva].descripcion );
    $("#subtituloCurso").html(videoSubtitle);
    $("#temaTexto").html(videoContent);
    $("#videoCurso").removeAttr("src","");
    console.warn('el directorio es',directoryContent+videoFile);
    $("#urlVideo").attr('src', (directoryContent && videoFile) ? directoryContent+videoFile : '');
    $('#videoCurso')[0].load();
    $('#lista5').hide(300);
    if(directoryContent){
      $('#seccionVideo').show(300);
      $('#videoCurso').show(300);
      $('#contenedorCurso').show(300);
    }else{
      console.error(videoContent);
      if(videoContent){
        console.warn('entro');
          $('#seccionVideo').hide(300);
          $('#contenedorCurso').show(300);
          $('#temaTexto').show(300);
      }
    }

}

function cargaMenu(){
  window.location.reload();
}

function getUrlParameter(name) {
    name = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]');
    var regex = new RegExp('[\\?&]' + name + '=([^&#]*)');
    var results = regex.exec(location.search);
    return results === null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' '));
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

function Themes(){
  this.idTema = "";
  this.idCurso = "";
  this.nombre = "";
  this.temaPadre = "";
  var arrayThemes;
  var arrayFiles;
  var arrayThemesTitleSubtitle;

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

  this.getGeneralThemeFiles = function (){
        $.ajax({
          url: "../json/jsonCourseFiles.php",
          type: 'get',
          data: {idCurso:this.idCurso  },
          contentType: "application/json",
          dataType: 'json',
          async: false,
        success: function(arrayResponse){
          arrayFiles=arrayResponse;
        }
      });
      return arrayFiles;
  }

  this.getThemesAndTitles = function () {
      $.ajax({
        url: "../json/jsonThemesTitleSubtitle.php",
        type: 'get',
        data: {idCurso:this.idCurso  },
        contentType: "application/json",
        dataType: 'json',
        async: false,
      success: function(arrayResponse){
        arrayThemesTitleSubtitle=arrayResponse;
      }
    });

    return arrayThemesTitleSubtitle;
  }
}
