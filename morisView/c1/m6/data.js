 

    	$(".icon-home").click(function(){

    		if($(".icon-home-cont").is(":hidden")){
    			$(".icon-home-cont").fadeIn();
    			$(".green").addClass("rotate");
    		}else{
    			$(".icon-home-cont").fadeOut();
    			$(".green").removeClass("rotate");
    		}


    		
    	});


    	$(".icon-search, .icon-pencil, .icon-file, .icon-edit").click(function(){

    		/*console.log($(this).attr("class") + ":" +  $(".icon-home-teme").attr("data-idMenu") )*/

    		if ($(this).attr("class") == $(".icon-home-teme").attr("data-idMenu") || $(".icon-home-teme").attr("data-idMenu") == null ) {

    			if($(".icon-home-teme").is(":hidden")){
	    			$(".icon-home-teme").fadeIn();
	    			$(".icon-home-teme").attr("data-idMenu", $(this).attr("class"));
    			}else{
	    			$(".icon-home-teme").fadeOut();
	    			$(".icon-home-teme").removeAttr("data-idMenu");
    			}

    		} else{
    			$(".icon-home-teme").attr("data-idMenu", $(this).attr("class"));
    		}

 
    		
    	});

    	

    	$("#catalogoDiap").click(function(){

    		if($(".detalleDiap").is(":hidden")){
    			$(".detalleDiap").fadeIn();
    		}else{
    			$(".detalleDiap").fadeOut();
    		}
    		
    	});

    	$("#instrucciones").click(function(){

    		if($(".detalleInstruccion").is(":hidden")){
    			$(".detalleInstruccion").fadeIn();
    		}else{
    			$(".detalleInstruccion").fadeOut();
    		}
    		
    	});


    	 
/*--------------------------------------------------*/



var temas = ` <section>Temario del curso</section>
				<section>
					<div id="temasDelCurso">
					<section style="width: 100%;">Tema 1</section>
					<section style="padding-left: 10px; width: 100%;">Sub Tema 1.1</section>
					<section style="padding-left: 10px; width: 100%;">Sub Tema 1.2</section>
					<section style="padding-left: 10px; width: 100%;">Sub Tema 1.3</section>
					<section style="padding-left: 10px; width: 100%;">Sub Tema 1.4</section>
					<section style="width: 100%;">Tema 2</section>
					<section style="padding-left: 10px; width: 100%;">Sub Tema 2.1</section>
					<section style="padding-left: 10px; width: 100%;">Sub Tema 2.2</section>
					<section style="padding-left: 10px; width: 100%;">Sub Tema 2.3</section>
					 
				</div>
				</section>`;

var notas = `<section>Notas de diapositiva</section>
				<section>
					<textarea class="notasDiap" >
						
					</textarea>
					 
				 
				</section>
				`;

var materialAdicional =`<div class="materialAdicional">
					<div><img src="assets/images/ico-pdf.png" ><section>Libro 1</section></div>
					<div><img src="assets/images/ico-png.png" ><section>Actividad</section></div>
					<div><img src="assets/images/ico-jpg.png" ><section>Cuestionario</section></div>
					 </div> 
					 <div class="materialAdicional">
					<div><img src="assets/images/ico-pdf.png" ><section>Libro 1</section></div>
					<div><img src="assets/images/ico-png.png" ><section>Actividad</section></div>
					<div><img src="assets/images/ico-jpg.png" ><section>Cuestionario</section></div>
					</div>`;


var guion = `<section>Contenido del Video</section>
				<section>
					<section>
					Guion del cursos para poderrealizar lectura del contenido
					</section>
					 
				 
				</section>
				`;
				
	
    	 
    				$(".icon-search").click(function(){
				 
				$(".icon-home-teme").html(temas);

				});

		$(".icon-pencil").click(function(){
				 
				$(".icon-home-teme").html(notas);

				});
    	

		$(".icon-file").click(function(){
						 
						$(".icon-home-teme").html(materialAdicional);

						});

		$(".icon-edit").click(function(){
						 
						$(".icon-home-teme").html(guion);

						});




    	 $(document).ready(function(){
	   
	   
	   
	    vid = document.getElementById("videoCurso");
    
      $(".icon-fullscreen").click(function(){
       
	 
	  $('#videoCurso')[0].webkitEnterFullScreen();
	 
      
      });
      
      

    	 	var autoplayDiap = 1;
    	 		
 

    	 	/*console.log(autoplayDiap);*/
    	 	$("#autoAvance").click(function(){

    	 		if (autoplayDiap == 0){
    	 			$("#autoAvance").removeAttr("class");
    	 			$("#autoAvance").attr("class", "icon-arrow-right");
    	 			autoplayDiap = 1;

    	 		}else{

    	 			$("#autoAvance").removeAttr("class");
    	 			$("#autoAvance").attr("class", "icon-repeat");
    	 			autoplayDiap = 0;

    	 		}


    	 	 
    	 	});


    		 
    	 	/*$("body").append($( window ).width() + ":" + $( window ).height());*/

var duracionVideo ;


    	 	setTimeout(function(){
    	 	 
 	

  document.getElementById("videoCurso").play();

  $("#mediaPlay").removeAttr("class");
 	$("#mediaPlay").attr("class", "icon-pause");



 	/*document.getElementById("videoCurso").currentTime = 50;*/
 	duracionVideo = document.getElementById("videoCurso").duration;
 	$("#controlVideo").attr("max", duracionVideo);
									 
	 setInterval(actualizaBarraVideo, 100);

}, 5000);



    function actualizaBarraVideo (){
    	var tiempoVideo = document.getElementById("videoCurso").currentTime;
    	/*console.log(tiempoVideo);*/
    	$("#controlVideo").val(tiempoVideo);


    	duracionVideo = document.getElementById("videoCurso").duration;
 	$("#controlVideo").attr("max", duracionVideo);
									 
    } 


    	 	

var numDiap = 0;


cambiarDiap("diap"+numDiap);

    	 	$("#diapSig").click(function(){

console.log(numDiap);
    	 					if (numDiap == totalDiap ) { numDiap = 0;}else{numDiap ++;}
				    
				    	 		 $("#mediaPlay").removeAttr("class");
    	 					

			 		$("#mediaPlay").attr("class", "icon-play");

				    	 		cambiarDiap("diap"+numDiap);

				    	 			setTimeout(function(){


				    	 		 $("#mediaPlay").removeAttr("class");
			 		$("#mediaPlay").attr("class", "icon-pause");

				  document.getElementById("videoCurso").play();
				}, 5000);

    	 	});


    	 	$("#diapAnt").click(function(){

				    	 		if (numDiap > 0){ numDiap --;}
				    	 		 $("#mediaPlay").removeAttr("class");
			 		$("#mediaPlay").attr("class", "icon-play");

				    	 		cambiarDiap("diap"+numDiap);

				    	 			setTimeout(function(){
				  
				    	 		 $("#mediaPlay").removeAttr("class");
			 		$("#mediaPlay").attr("class", "icon-pause");

				  document.getElementById("videoCurso").play();
				}, 5000);


    	 	});




    	 	function cambiarDiap(diapositiva){

 	   
						    	 	$.getJSON("curso.json",function(data){ 
						  
						    	 	 

						    	 				jQuery.get(data.contenido[diapositiva].template  +'.txt', function(data) {
						   
						   				//process text file line by line
						   				$('#contenedor').html(data);
												});


						    	 				setTimeout(function(){
						  $("#tituloCurso").html(data.contenido[diapositiva].titulo );
										$("#temaCurso").html(data.contenido[diapositiva].descripcion );
										$("#urlVideo").removeAttr("src","");
										$("#urlVideo").attr("src",data.contenido[diapositiva].video );
										$("#videoCurso").load();
										$("#img0 img").attr("src","img/" + data.contenido[diapositiva].imagenes[0] );
										$("#img1 img").attr("src", "img/" + data.contenido[diapositiva].imagenes[1] );

										console.log(data.contenido[diapositiva].descripcion );

										$("#videoCurso").on('ended', function(){
											/*alert('El video ha finalizado!!!');*/

											 $("#mediaPlay").removeAttr("class");
			 		$("#mediaPlay").attr("class", "icon-play");




											if (autoplayDiap != 0){numDiap++; cambiarDiap("diap"+numDiap); }
									    		 
									    	});

									

									/*alert($("#controlVideo").attr("max", durac));*/



	 var rng = document.getElementById("controlVideo");

var listener = function() {
  window.requestAnimationFrame(function() {
  /*  document.querySelector("div").innerHTML = rng.value;*/
document.getElementById("videoCurso").currentTime = rng.value;
  /*console.log(rng.value);*/
  });
};

rng.addEventListener("mousedown", function() {
  listener();
  rng.addEventListener("mousemove", listener);
});



rng.addEventListener("mouseup", function() {
  rng.removeEventListener("mousemove", listener);
});



						}, 100);


						    	

	setTimeout(function(){


				    	 		 $("#mediaPlay").removeAttr("class");
			 		$("#mediaPlay").attr("class", "icon-pause");

				  document.getElementById("videoCurso").play();
				}, 5000);

										
			 
 
								});

    	 	}



    	 	$("#mediaPlay").click(function(){
    	 		
			 


			 if ($("#mediaPlay").attr("class") == "icon-play" ) {

			 	$("#mediaPlay").removeAttr("class");
			 	$("#mediaPlay").attr("class", "icon-pause");
			 	$("#videoCurso").trigger('play');

			 	}else {

			 			$("#mediaPlay").removeAttr("class");
			 		$("#mediaPlay").attr("class", "icon-play");
			 		$("#videoCurso").trigger('pause');
			    	 	/*	$('video').trigger('play');
							$('video').trigger('pause');*/

			}
    	 	});


    	 	$("#mediaStop").click(function(){
    	 		
			 


			 			$("#mediaPlay").removeAttr("class");
			 		$("#mediaPlay").attr("class", "icon-play");
			 		$("#videoCurso").trigger('pause');
			    	 	

			    	document.getElementById("videoCurso").currentTime = 0;
					 

			
    	 	});




    	 	

});



var diap2 = `<section id="tituloCurso">AJUSTE DE LAS PRENDAS</section>
		 		<section id="temaCurso">Como impacta el ajuste de mi ropa</section>

		 		<section id="seccionVideo">
		 			<video id="videoCurso" controls preload></video>
		 		</section>

		 		<section id="seccionGaleria">
		 			
		 		</section>`;
   
    	var totalDiap;
    		function cargaMenu(diapositiva){

    								
						    	 	$.getJSON("curso.json",function(data){ 
						  


						  				 
						    	 		
  var count = Object.keys(data.contenido).length;
  /*console.log(count);*/

  totalDiap = count;
  /*
										$("#tituloCurso").html(data.contenido[diapositiva].titulo);
										$("#temaCurso").html(data.contenido[diapositiva].descripcion );
										$("#urlVideo").removeAttr("src","");
										$("#urlVideo").attr("src",data.contenido[diapositiva].video );
										$("#videoCurso").load();
										$("#img0 img").attr("src","img/" + data.contenido[diapositiva].imagenes[0] );
										$("#img1 img").attr("src", "img/" + data.contenido[diapositiva].imagenes[1] );*/
 
								});
						    	 }

						    	 cargaMenu();

  
    
     
       
      
      
    
