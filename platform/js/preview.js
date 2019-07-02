$(document).ready(function(){
  $.ajaxSetup({
      beforeSend: function(){
        $("body").append(`<div class="pantalladecarga"><img src="../img/uvimex_load.gif" alt=""></div>`);
      },
      complete: function(){
      $(".pantalladecarga").remove();
      }
    });
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
var selectedActivity=null;
var g_idCourse = null;
/*
*		Bandera para saber si el usuario se quedo en el tema para marcar su vista
*		Solo se usa cuando un tema no tiene video
*/
var keptOnTopic;

var preview = function() {

        function alertapositiva(texto){
            $('.alertapositiva').remove();
            $('.alertanegativa').remove();
            // var alerta = `<div class="alertapositiva"><h2>`+texto+`<h2></div>`;
            var alerta = `<div class="alertapositiva"><h2>`+texto+`<h2></div>`;
            $(alerta).prependTo('body');
            $('.alertapositiva').animate({
              top: '10%'
            }, 800, function(){
              setTimeout(function(){ $('.alertapositiva').animate({
                opacity:0
              },1000, function(){
                $('.alertapositiva').remove();
              }); }, 4000);
            });
          }


  function checkAuthorization(){
    $.ajax({
      url: "https://uvimex.com.mx/platformComms.php",
      type: 'GET',
      data: {actionAPI:'getUserCourses',
             user:getUrlParameter('usr')
            },
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
       if(arrayResponse[0].success=="true"){
         $.ajax({
           url: "../json/verifyAccessPreview.php",
           type: 'GET',
           data: {arrCourses: arrayResponse[0].coursesArray,
              idModulo:getUrlParameter('idmodule'),
              user:getUrlParameter('usr')
           },
           success: function(rsp){

             if( (rsp[0].idC) || (rsp[0].userCreatorDetected==="HasAccess") ){
              g_idCourse = rsp[0].idC;
               //means user has access to this site
               loadThemes();
             }else{
               console.warn('entro al else');
                window.location.href="https://uvimex.com.mx/crea-tu-curso-online/";
             }
           },error: function(rsp2){

            window.location.href="https://uvimex.com.mx/crea-tu-curso-online/";
           }
         });


       }else{

        window.location.href="https://uvimex.com.mx/crea-tu-curso-online/";
       }
     },error: function(arrayResp){

      window.location.href="https://uvimex.com.mx/crea-tu-curso-online/";
     }
    });
  }
  function loadThemes(){
    var themes = new Themes();
    var idModulo;
    themes.idModulo=getUrlParameter('idmodule');
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
  	diapMenu = false;
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
                $(".currentTimeMinutes").html(secondsToTimeHMS(currentVideoTime));
                $(".RightTimeMinutes").html(secondsToTimeHMS(totalVideoTime));
                if( Math.round(video.currentTime) <  Math.round(video.duration) ){

                    if(video.currentTime/video.duration >= 0.8){
                    		//console.log("GGGGGGGGGGGGGGGGGGGGG");

									    $.ajax({
									        url: "../php/registerSeenTopic.php",
									        type: 'post',
                          complete: function(){},
                          beforeSend: function(){},
									        data: {idTopic: g_idTema, idUser: getUrlParameter('usr'), idCourse: g_idCourse},
									        success: function(rsp){
									          console.log(rsp);
									        },
									        error: function(e){
									        		console.log(e);
									        }
									      });
                    }

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
             themesTitleSubtitle.idModulo=getUrlParameter('idmodule');
             var arrayThemesAndTitles=themesTitleSubtitle.getThemesAndTitles();
             console.error(arrayThemesAndTitles);
             if(arrayThemesAndTitles){
               var html=`<section>Módulos del curso</section>`;
               html+=`<section>
                        <div id="temasDelCurso">
                        `;
                var usrUrl=getUrlParameter('usr');
                for (var i = 0; i < arrayThemesAndTitles.length; i++) {
                  if(arrayThemesAndTitles[i].nombreModulo){
                    html+=`<section style="width: 100%;" ><a href="preview.php?${arrayThemesAndTitles[i].url.replace(/'+/g, '')}&usr=${usrUrl}" >${arrayThemesAndTitles[i].nombreModulo}</a></section>`;
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
             console.warn('entro yahu');
             var idTema=$(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema") ? $(".den-carousel-container").find(".den-curso-title.den-go-title.den-select-option").data("idTema"):$("#idTema").val();
             if(!idTema){
               idTema=$(this).find(".fileName").data("idtema");
             }
             var strArchivo=$(this).find(".fileName").data("strarchivo");
             var strArchivoNombre=$(this).find(".fileName").text();
             var sourceFile=`https://uvimex.com.mx/dashboard/platform/uploads/${idTema}/Files/${strArchivo}`;
             console.warn('el source es',sourceFile);
             $("html").append(`<div class="deleteMe" style='position: fixed;
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

         $(document).on('click', '.actfb', function() {
           var activitySelected=$(this).data('plantillaact') ? $(this).data('plantillaact') : null;
           var idActivitySelected=$(this).data('idact') ? $(this).data('idact') : null;
           switch(activitySelected){
             case "actividad2":
                $(`*[data-idact="${idActivitySelected}"]`).attr('class', 'actfb').text('');
                $(this).addClass('trueanswerd');
                $(this).text('V');
             break;
             default :
               if ($(this).hasClass('trueanswerd')) {
                   $(this).text('F');
                   $(this).removeClass('trueanswerd').addClass('falseanswerd');
               }else{
                 $(this).text('V');
                 $(this).addClass('trueanswerd').removeClass('falseanswerd');
               }
             break;
           }
         });

         $(document).on('click', '#saveAnswerActivity', function() {

           var answersArray=[];
          //Depending on which activity we follow along next saving structures
          console.warn('la actividad seleccionada fue',selectedActivity);
           switch(selectedActivity){
             case "actividad1":
             break;
             case "actividad3":
               $('input[name^="answer"]').each(function(i) {
                  console.warn($(this).val(), 'el index es',i);
                  answersArray.push({'answer':$(this).val(),
                                     'idActividad':$(this).data('idact'),
                                     'idTema':$(this).data('idtema'),
                                     'idUser':getUrlParameter('usr'),
                                     'tipoActividad':selectedActivity
                                   });
               });
             break;
             case "actividad4":
             break;
             case "actividad5":
             $('input[name^="answer"]:checked').each(function(i) {
                 console.warn($(this).val(), 'el index es',i);
                   answersArray.push({'answer':$(this).val(),
                                      'idActividad':$(this).data('idact'),
                                      'idTema':$(this).data('idtema'),
                                      'idUser':getUrlParameter('usr'),
                                      'tipoActividad':selectedActivity
                                    });
              });
             break;
             case "actividad2":
             case "actividad6":
               $('.actfb').each(function(i) {
                 if($(this).hasClass('falseanswerd') || $(this).hasClass('trueanswerd'))
                 {
                   var accuracy= $(this).hasClass('falseanswerd') ? 0 : 1;     //1==true, 0==false
                    answersArray.push({'answer':$(this).data('idansw'),
                                       'idActividad':$(this).data('idact'),
                                       'idTema':$(this).data('idtema'),
                                       'idUser':getUrlParameter('usr'),
                                       'tipoActividad':selectedActivity,
                                       'accurate':accuracy
                                     });
                 }
                });
             break;
             case "actividad7":
             break;
           }
           console.warn('el array tiene',answersArray);
            $.post("createAnswerJSON.php",{answersArray:answersArray},
            function(result){
              //alert('Actividad Completada Correctamente!');
              alertapositiva("Actividad Completada Correctamente!");
            });
         });
        }

        function loadGeneralThemes(){
          var themeFiles = new Themes();
          var startContainer=`<div class="materialAdicional">`;
          var containerContent="";
          var endOfContainer=`</div>`;
          themeFiles.idModulo=getUrlParameter('idmodule');//we have to refresh this every theme is changed
          var themeFilesArray=themeFiles.getGeneralThemeFiles();
          if(themeFilesArray){
            for (var i = 0; i < themeFilesArray.length; i++) {
              var fileExt="";
              if(themeFilesArray[i].strArchivo){
                fileExt=themeFilesArray[i].strArchivo.split('.');
                switch(fileExt[1]){
                  case 'pdf' :containerContent+=`<div class="themeFiles"><img src="../img/ico-pdf.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}" data-strArchivo= "${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`; break;
                  case 'png' :containerContent+=`<div class="themeFiles"><img src="../img/ico-png.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}" data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`; break;
                  case 'jpg' :containerContent+=`<div class="themeFiles"><img src="../img/ico-jpg.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}" data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`; break;
                  default:   containerContent+=`<div class="themeFiles"><img src="../img/file.png"><section class="fileName"  data-idtema="${themeFilesArray[i].idTema}" data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`;
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
            $.ajaxSetup({
            beforeSend: function(){
              $("body").append(`<div class="pantalladecarga"><img src="../img/uvimex_load.gif" alt=""></div>`);
            },
            complete: function(){
              $(".pantalladecarga").remove();
            }
          });
            console.log("asd");
            checkAuthorization();
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
          case 'pdf' :containerContent+=`<div class="themeFiles"><img src="../img/ico-pdf.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}" data-strArchivo= "${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`; break;
          case 'png' :containerContent+=`<div class="themeFiles"><img src="../img/ico-png.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`; break;
          case 'jpg' :containerContent+=`<div class="themeFiles"><img src="../img/ico-jpg.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}"  data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`; break;
          default:   containerContent+=`<div class="themeFiles"><img src="../img/file.png"><section class="fileName" data-idtema="${themeFilesArray[i].idTema}" data-strArchivo="${themeFilesArray[i].strArchivo}" >${themeFilesArray[i].strArchivo}</section></div>`;
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
            idModulo:arraySingleTheme[i].idModulo,
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
  console.log("AAA");
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

		var g_idTema;


// Carga de temas
function changeVideo(idTema){
	keptOnTopic = false;
  loadFiles(idTema);
  //**************************************************************************
  //OBTIENE EL CONTENIDO DEL TEMPLATE PARA CREAR EL CONTENEDOR
  //**************************************************************************

  g_idTema = idTema;

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
        keptOnTopic = true;
        setTimeout(function(){
        	console.log("printing");
        			if(keptOnTopic){
        				$.ajax({
							    url: "../php/registerSeenTopic.php",
							    type: 'post',
                  beforeSend: function(){},
                  complete: function(){},
							    data: {idTopic: g_idTema, idUser: getUrlParameter('usr'), idCourse: g_idCourse},
							    success: function(rsp){
							      console.log(rsp);
							    },
							    error: function(e){
							    	console.log(e);
							    }
							  });
        			}
        			else{
        				console.log("no lo viste xdedede");
        			}

        }, 30000);
          $('#seccionVideo').hide(300);

          $('#contenedorCurso').show(300);
          $('#temaTexto').show(300);
      }
    }
    //**************************************************************************
    //OBTIENE Las actividades en caso de
    //**************************************************************************
    var activity = new Activity();
    activity.idTema=idTema;
    var activitiesArray=activity.getSingleActivity();
    if(activitiesArray.length>0){
     var plantillaActividad=activitiesArray[0].plantillaActividad;
     selectedActivity=plantillaActividad ? plantillaActividad: null;
      $('.images.tem-images-container').hide();
      var printActivity="";
      var buttonSave=`<button type="button" name="button" id="saveAnswerActivity" class="finishActivity">Terminar Actividad</button>`;
      console.warn('debera dibujar la actividad',plantillaActividad);
      switch(plantillaActividad){
        case "actividad0":
        break;
        case "actividad1":
        break;
        case "actividad3":
          for (var i = 0; i < activitiesArray.length; i++) {
            printActivity+=`<div class="renglonAct">
                              <h2><span class="numbersAct">${i+1}</span>${activitiesArray[i].strPregunta}</h2>
                              <input class="shortanswerdact" type="text" name="answer[${i}]" value="" placeholder="Escribe tu respuesta..." data-idtema="${activitiesArray[i].idTema}" data-idact="${activitiesArray[i].idActividad}" data-plantillaAct="${activitiesArray[i].plantillaActividad}">
                            </div>`;
          }
        break;
        case "actividad4":
        break;
        case "actividad5":
        for (var i = 0; i < activitiesArray.length; i++) {
          if(activitiesArray[i].respuestasArr.length>0){
            printActivity+=`<div class="renglonAct">
                              <h2><span class="numbersAct">${i+1}</span>${activitiesArray[i].strPregunta}</h2>`;
            for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
              printActivity+=` <div class="multianswerdRow">
                                  <div class="actContainer">
                                    <input class="actInput" type="radio" value=${activitiesArray[i].respuestasArr[j].idRespuesta}  name="answer[${i}]" data-idtema="${activitiesArray[i].idTema}" data-idAct="${activitiesArray[i].idActividad}" data-plantillaAct="${activitiesArray[i].plantillaActividad}">
                                  </div>
                                  <p>${activitiesArray[i].respuestasArr[j].strRespuesta}</p>
                                </div>
                              </div>`;
            }
          }
        }
        break;
        case "actividad2":
        case "actividad6":
          for (var i = 0; i < activitiesArray.length; i++) {
            if(activitiesArray[i].respuestasArr.length>0){
              printActivity+=`<div class="renglonAct">
                                <h2><span class="numbersAct">${i+1}</span>${activitiesArray[i].strPregunta}</h2>`;
              for (var j = 0; j < activitiesArray[i].respuestasArr.length; j++) {
                printActivity+=` <div class="multianswerdRow">
                                    <div class="actfb" data-idansw="${activitiesArray[i].respuestasArr[j].idRespuesta}" data-idtema="${activitiesArray[i].idTema}" data-idact="${activitiesArray[i].idActividad}" data-plantillaAct="${activitiesArray[i].plantillaActividad}">

                                    </div>
                                    <p>${activitiesArray[i].respuestasArr[j].strRespuesta}</p>
                                  </div>
                                </div>`;
              }
            }
          }
        break;
      }
      printActivity+=buttonSave;//appendSaveButton
      $('.actContfull').html(printActivity);
    }else{
      $('.images.tem-images-container').show();
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
  this.idModulo = "";
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
        idModulo:this.idModulo
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
          url: "../json/jsonModuleFiles.php",
          type: 'get',
          data: {idModulo:this.idModulo  },
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
        data: {idModulo:this.idModulo  },
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

function Activity(){
  this.idActividad = "";
  this.strTemplate = "";
  this.strPregunta = "";
  this.idTema = "";
  this.intPage = "";
  var arraySingleActivity;

  this.getSingleActivity = function (){
    $.ajax({
      url: "../json/jsonSingleActivity.php",
      type: 'get',
      data: {idTema:this.idTema},
      dataType: 'json',
      async: false,
      contentType: "application/json",
      success: function(arrayResponse){
        arraySingleActivity=arrayResponse;
      }
    });
    return arraySingleActivity;
  }
}

//// B O T O N   D E  S T R E A M I N G
$(document).on('click', '#btnStreamingCtl', function() {
  var numero = $('.injStreaming').length;
  // Alumno vea los horarios cuando no haya streamings Ocurriendo en ese momento pero el isntructor si haya agendado clases
        var indivhora = `<div class="streamMenuTop">
          <div class="streamIndivmtBtn" id="closeStream">
             <i class="icon-remove"></i>
          </div>
        </div><div class="indivhorass"><p>Nombredelevento<span>10:30 am GMT-05</span></p><button>Asisitiré</button></div>`;
          // Aqui tienes que ir incertando los cosos individuales, este completo se incerta en vez de lo de el streaming
        var containerhorarios = `<div class="fullconHorariosStr">`+indivhora+`</div>`;
  // Fin
  // Solicitar al Instructor que Haga un Streaming si no tiene Ninguno
      var solicitar = `<div class="streamMenuTop">
        <div class="streamIndivmtBtn" id="closeStream">
           <i class="icon-remove"></i>
        </div>
      </div><div class="solicitarclass"><p>No hay Streamings Calendarizados.<br>Solicita al instructor que agende uno nuevo</p><button>Solicitar</button></div>`;
      var nostreamming = `<div class="streamMenuTop">
        <div class="streamIndivmtBtn" id="closeStream">
           <i class="icon-remove"></i>
        </div>
      </div><div class="solicitarclass"><p>Este curso no cuenta con streamming.<br>Solicita al instructor que habilite los streams</p><button>Solicitar</button></div>`;
  // Fin
  // Mensaje Para el Alumno cuando El streaming este en curso y No agendo Streaming
      var nosolicito = `<div class="streamMenuTop">
        <div class="streamIndivmtBtn" id="closeStream">
           <i class="icon-remove"></i>
        </div>
      </div><div class="notsoliciteclass"><p>Hay un Streaming en Curso.<br>No confirmaste asistencia</p></div>`;
  // Fin
  var container = `<div class="injStreaming"></div>`;
  var callingHtml = '../stream/streamLogin.html';
  if (numero == 0) {
    var info = location.search.slice(1);
    info = info.split('&');
    var user = info[1].substring(info[1].indexOf('=') + 1);
    var module = info[0].substring(info[0].indexOf('=') + 1);;
    var today = new Date(Date.now());

    $.post('../php/courseStream.php', {idUser: user, module: module, date: today.getFullYear() + "/" + (today.getMonth() + 1) + "/" + today.getDate() + " " + today.getHours() + ":" + (today.getMinutes() < 10 ? "0" + today.getMinutes() : today.getMinutes()) + ":00"}, function(streamData){
      streamData = JSON.parse(streamData);
      if(streamData.noStreamScheduled){
        $(container).appendTo('.bgContainerFull');
        $('.injStreaming').html(solicitar);
      }
      else if(streamData.noStream){
        $(container).appendTo('.bgContainerFull');
        $('.injStreaming').html(nostreamming);
      }
      else if(streamData.noAssist){
        $(container).appendTo('.bgContainerFull');
        $('.injStreaming').html(nosolicito);
        $('.injStreaming').html(nosolicito);
      }
      else if(streamData.error){
        alert(streamData.error);
      }
      else if(streamData.idES || streamData.length > 0){
        if(streamData.idES){
          $(container).appendTo('.bgContainerFull');
          $('.injStreaming').html(`<div class="fullconHorariosStr">
              <div class="indivhorass"><p>`+streamData.nombre+`<span>`+streamData.fechaInicio+`</span></p><button>Asisitiré</button></div>
            </div>`);
        }
      }
      else if(streamData.stream != -1){
        $(container).appendTo('.bgContainerFull');
        streammingHandler.setContainer($('.injStreaming'));
        sparkHandler.setContainer($('.injStreaming'));
        roomsHandler.init(null, $('.injStreaming'));

        $.post('../php/username.php', null, function(data){
          data = JSON.parse(data);
          console.log(data);
          if(data.user_login){
            var userlog = data.user_login.toLowerCase();
            proxyer.post('tokenizer', 'token', {userName: userlog}, function(data2){
              console.log(data2);
              if(data2.token){
                sparkHandler.setToken(data2.token).init(function(){
                  streammingHandler.loadRooms();
                });
              }
            });
          }
          else{
            $('.injStreaming').load(callingHtml, function(){
              var loginBtn = $('.injStreaming').find('#loginStream');
              var loginTxt = $('.injStreaming').find('#username');

              streamLogin.setElements({
                input: loginTxt,
                btn: loginBtn
              });

            });
          }
        });

        $('#contenedor').addClass('shorterCont');
        $('#seccionVideo').addClass('shortervideo');
      }
    });
  }
});
//// B O T O N   D E  cerrar S T R E A M I N G
$(document).on('click', '#closeStream', function() {
  $('.injStreaming').remove();
  $('#contenedor').removeClass('shorterCont');
  $('#seccionVideo').removeClass('shortervideo');
});
//// B O T O N   D E  cerrar S T R E A M I N G
$(document).on('click', '#MaxMinStream', function() {
   if ($(this).hasClass('shortvewStrem')) {
     $(this).find('i').removeClass('icon-resize-full').addClass('icon-resize-small');
     $('.injStreaming').addClass('fullinjcontStream');
     $(this).removeClass('shortvewStrem').addClass('fullvewStrem');
   }else{
     $(this).find('i').addClass('icon-resize-full').removeClass('icon-resize-small');
     $('.injStreaming').removeClass('fullinjcontStream');
     $(this).addClass('shortvewStrem').removeClass('fullvewStrem');
   }
});
