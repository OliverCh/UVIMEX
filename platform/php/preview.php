<!DOCTYPE html>
<html>
	<head>
		<meta charset="utf-8" />
		<title>Curso</title>
		<!-- Our CSS stylesheet file  chabged styles.css to preview.css-->
		<link rel="stylesheet" href="../css/preview.css" />
		<link rel="stylesheet" href="../css/stylesForPreview.css" />
		<!-- Font Awesome Stylesheet -->
		<link rel="stylesheet" href="../font-awesome/css/font-awesome.css" />
		<!-- Including Open Sans Condensed from Google Fonts -->
		<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans+Condensed:300,700,300italic" />
		<!--[if lt IE 9]>
		  <script src="http://html5shiv.googlecode.com/svn/trunk/html5.js"></script>
		<![endif]-->
		<meta name="viewport" content="width=device-width, minimum-scale=1.0, maximum-scale=1.0" />
	</head>

	<body>
<!-- C O N T E N E D O R   G E N E R A L -->
		<div class="bgContainerFull">
			<!-- ESPACIO PARA CARGAR TODOS LOS TEMPLATE DESDE EL JSON-->
				<div id="contenedor">
					<section id="contenedorCurso">
					 <section id="tituloCurso"></section>
					 <section id="subtituloCurso"></section>
					 <section id="temaTexto"></section>
					 <section id="seccionVideo">
							 <div class="videoContainer">
								 <video id="videoCurso" preload="" autoplay>
									 <source id="urlVideo" type="video/mp4" >
									 <img src="" alt="Video no soportado">
									 Su navegador no soporta contenido multimedia.
								 </video>
							 </div>
							 <div class="images tem-images-container">
									 <img  src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7" />
							 </div>
							 <div class="actContfull">
							 </div>
							 <div class="input-range-span-video">
								 <input type="range" min="0" value="0" id="controlVideo" step="0.01">
								 <span class="currentTimeMinutes"></span>
								 	<label class="RightTimeMinutes">11:00</label>
							 </div>
						
					 </section>
				</div>
		</div>

 <!-- M E N U S -->
		<nav id="colorNavVertical" >
				<ul>
					<li class="green">
						<a href="#" class="icon-search "></a>
						<ul></ul>
					</li>
					<li class="blue">
						<a href="#" class="icon-file "></a>
						<ul></ul>
					</li>
					<li class="yellow">
						<a href="#" class="icon-facetime-video" id="btnStreamingCtl"></a>
						<ul></ul>
					</li>
		 		</ul>
				<div class="icon-home-teme" >
				</div>
		</nav>
		<footer>
			<nav id="colorNav">
				<div class="icon-home-cont"></div>
				<ul>
				<li class="green">
					<a href="#" id="diapMenu" class="icon-home " onclick="cargaMenu();" title="Inicio"></a>
					<ul></ul>
				</li>
				<li class="blue">
					<a href="#" id="diapAnt" class="icon-chevron-left " title="Tema Anterior"></a>
					<ul></ul>
				</li>
				<li class="yellow">
					<a href="#" id="diapSig" class="icon-chevron-right " title="Tema Siguiente"></a>
					<ul></ul>
				</li>
				<li class="purple">
					<a href="#" id="maximizarVideo" class="icon-fullscreen"></a>
					<ul></ul>
				</li>
				<li class="pink">
					<a href="#" id="mediaPlay" class="icon-play" title="Reproducir Video"></a>
					<ul></ul>
				</li>
				<li class="strongBlue">
					<a href="#" id="mediaStop" class="icon-stop " title="Detener Video"></a>
					<ul></ul>
				</li>
				<li class="yellow">
					<a href="#" id="mediaMuted" class="icon-volume-up " title="Muted"></a>
					<ul></ul>
				</li>
			</ul>
			</nav>
		</footer>
   	 <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
   	 <script type="text/javascript">
   	 	$.ajaxSetup({
      beforeSend: function(){
        $("body").append(`<div class="pantalladecarga"><img src="../img/uvimex_load.gif" alt=""></div>`);
      },
      complete: function(){
      $(".pantalladecarga").remove();
      }
    });
   	 </script>
	 <script type="text/javascript" src="../js/lib/bundle.js"></script>
	 <script type="text/javascript" src="../js/lib/proxyer.js"></script>
	 <script type="text/javascript" src="../js/sparkHandler.js"></script>
	 <script type="text/javascript" src="../js/callHandler.js"></script>
	 <script type="text/javascript" src="../js/roomsHandler.js"></script>
	 <script type="text/javascript" src="../js/streamLogin.js"></script>
	 <script type="text/javascript" src="../js/streammingHandler.js"></script>
	 <script type="text/javascript">

	 	$.ajaxSetup({
      beforeSend: function(){
      	console.log("asd");
        $("body").append(`<div class="pantalladecarga"><img src="../img/uvimex_load.gif" alt=""></div>`);
      },
      complete: function(){
      	console.log("asd");
      $(".pantalladecarga").remove();
      }
    });
	 </script>
	 <script type="text/javascript" src="../js/preview.js"></script>
	</body>
</html>
