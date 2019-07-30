//**************************************************************************
//VARIABLES GLOBALES 
//**************************************************************************

var metos;
var tipoActividad;
var diapAct = null;
var duracionVideo;
var numDiap = 0;
var totalDiap;
var autoplayDiap = 1;
var minutos = 0;
var segundos = 0;
var rutas = []; //VARIABLE QUE SE UTILIZAPARA CAMBIAR IMAGENES
var tiempos = [] ; //VARIABLE QUE SE UTILIZAPARA CAMBIAR IMAGENES
var respuestas = null;
var plantillaPregunta = `
<div class="seccionPreguntasContestadas">
<h2>:pregunta:</h2>
<br>
<div class="respuestasSeleccionadas"><ul>:resps:</ul></div>
</div>`;
var plantillaRespuesta = `<li class=":respTipo:"><label>:respTxt:</label></li>`;
//**************************************************************************
//FUNCION PARA OBTENER LOS TEMAS DEL CURSO Y CREAR UN MENU
//**************************************************************************

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};

function cargaMenu(){
$("#contenedor").html("");
	respuestas = null;
	var menuTemas = '<ol id="lista5">';
	$.getJSON("curso.json",function(data){ 
		var count = Object.keys(data.contenido).length;
		totalDiap = count;
		for (var i = 0; i < count; i++){
			if(!(data.contenido["diap"+i].diapAnt)){
				menuTemas += "  <li><a><label onClick='cambiarDiap(`diap"+i+"`)'> "+data.contenido["diap"+i].titulo+"</label></a></li>";
			}
		}
		menuTemas += "</ol>";
		$("#contenedor").append(menuTemas);
		/*$("#tituloCurso").html(data.contenido[diapositiva].titulo);$("#temaCurso").html(data.contenido[diapositiva].descripcion );$("#urlVideo").removeAttr("src","");$("#urlVideo").attr("src",data.contenido[diapositiva].video );$("#videoCurso").load();$("#img0 img").attr("src","img/" + data.contenido[diapositiva].imagenes[0] );$("#img1 img").attr("src", "img/" + data.contenido[diapositiva].imagenes[1] );*/
	});
}
//**************************************************************************
//FUNCION PARA CARGAR TEMA
//**************************************************************************
function cambiarDiap(diapositiva){
	console.log(diapositiva);
	var diapNum = diapositiva.replace("diap", "");
	numDiap = (parseInt(diapNum));
	$("#img0").hide();
	segundos = 0;
	minutos = 0;
	pregAct = -1;
	aa = 0;
	nextBtn = true;
	respuestas = null;
	metos = null;
	rutas = [];
	tiempos = [];
	diapAct = null;

	$.getJSON("curso.json",function(data){ 
		//**************************************************************************
		//OBTIENE EL CONTENIDO DEL TEMPLATE PARA CREAR EL CONTENEDOR
		//**************************************************************************
		jQuery.get(data.contenido[diapositiva].template  +'.txt', function(datos) {
			$('#contenedor').html(datos);
			$("#tituloCurso").html(data.contenido[diapositiva].titulo );
			$("#temaCurso").html(data.contenido[diapositiva].descripcion );
			$("#subtituloCurso").html(data.contenido[diapositiva].subtema);
			$("#videoCurso").removeAttr("src","");

			if(data.contenido[diapositiva].act)
				diapAct = data.contenido[diapositiva].act;
			if(data.contenido[diapositiva].template == "act2"){
				cargarActividad2();
			}

			if(data.contenido[diapositiva].video){

				videoP.init(data.contenido[diapositiva].video);
				//**************************************************************************
				//AGREGA FUNCION A LA BARRA DE AVANCE DEL VIDEO PARA PODER CAMBIAR POSICION
				//**************************************************************************
				var rng = document.getElementById("controlVideo");

				var listener = function() {
						window.requestAnimationFrame(function() {
						/*  document.querySelector("div").innerHTML = rng.value;*/
						document.getElementById("videoCurso").currentTime = rng.value;
						//console.log(document.getElementById("videoCurso").currentTime);
					});
				};

				rng.addEventListener("mousedown", function() {
					listener();
					rng.addEventListener("mousemove", listener);
				});

				rng.addEventListener("mouseup", function() {
					rng.removeEventListener("mousemove", listener);
					//**************************************************************************
					//ACTUALIZAR IMAGEN SEGUN LAPOSICION DELA BARRA
					//**************************************************************************
					buscarImagen(rng.value);
				 });

				//**************************************************************************
				//FUNCION PARA EJECUTAR FUNCION AL FINALIZAR EL VIDEO
				//**************************************************************************
				$("#videoCurso").on('ended', function(){
					if(diapAct != null){
						cambiarDiap("diap" + diapAct);
					}
					else if(respuestas == null){
						$("#diapSig").click();
					}
				});
			}

			if(data.contenido[diapositiva].hasOwnProperty("actividades"))
				cargarActividad(data.contenido[diapositiva].actividades, data.contenido[diapositiva].template);

			//**************************************************************************
			//DETERMINAR NUMERO DE IMAGENES EN EL TEMA PARA ASIGNAR EN LA GALERIA
			//**************************************************************************
			if(data.contenido[diapositiva].imagenes){
			var countImg = Object.keys(data.contenido[diapositiva].imagenes).length;
				for (var i = 0; i < countImg; i++){
					rutas.push(data.contenido[diapositiva].imagenes[i].ruta);
					tiempos.push(data.contenido[diapositiva].imagenes[i].time);
				}				
			}

		});

		function buscarImagen(posicionBarra){
			posicionBarra = parseInt(posicionBarra);
			 for (var i = 0; i < rutas.length;i++) {
			 	if (posicionBarra >= tiempos[i] && posicionBarra < tiempos[i+1] || tiempos[i+1] == null) {
			 		var posArray = i;
			 		cargaImagenes(tiempos[i], i);
			 		imgActual = posArray;
			 		tiempoActual = posArray;
			 		break;
			 	}
			 }
		}

	});
}
//**************************************************************************
//Carga de actividades
//**************************************************************************
var pregAct = -1;
var pregs;
var temp;

function cargarActividad(preguntas, template){
	tipoActividad = preguntas.tipo;
	pregs = preguntas;
	temp = template;
	eval = preguntas.evaluacion;
	if(tipoActividad == "0" || tipoActividad == "1" || tipoActividad == "3" || tipoActividad == "4" || tipoActividad == "5" || tipoActividad == "6"){
		respuestas = [];
		resps6 = [];
	}
	else if(tipoActividad == "2") {
		respuestas = 0;
	}
	nextPreg();
}

var nextBtn = true;
var eval = null;
var resps6 = null;


function nextPreg(btn){
	if(pregAct < (Object.size(pregs.reactivos) - 1)){
		pregAct++;
		if(pregAct == (Object.size(pregs.reactivos) - 1)){
			nextBtn = false;
		}
		else{
			nextBtn = true
		}
	}
	if(tipoActividad == "3" || tipoActividad == "6" || tipoActividad == "1"){
		respuestas[pregAct] = resps6;
		resps6 = [];
		aa = 0;
	}
	var _resps = "";
	for(var preg in pregs.reactivos[pregAct]){
		if(preg >  1){
			if(tipoActividad == "1"){
				_resps += '<li><input type="radio" name="respuesta1" class="respuestaItem" id="r'+preg+'" value="'+preg+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';
			}
			else if(tipoActividad == "2"){
				_resps += '<li><input type="radio" name="respuesta1" class="respuestaItem" id="r'+preg+'" value="'+pregs.reactivos[pregAct][preg][1]+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';	
			}
			else if(tipoActividad == "5"){
				_resps += '<li><input type="checkbox" name="respuesta1" class="respuestaItem" id="r'+preg+'" value="'+pregs.reactivos[pregAct][preg][1]+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';	
			}
			else if(tipoActividad == "6"){
				_resps += '<li><input type="checkbox" class="respuestaItem" id="r'+preg+'" value="'+preg+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';
			}
		}
	}
	if(tipoActividad == "1" || tipoActividad == "2" || tipoActividad == "5" || tipoActividad == "6"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><ul>'+_resps+'</ul>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
	else if(tipoActividad == "0"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><br /><div class="respuestas"><textarea placeholder="Escribe aqui tu respuesta..."></textarea></div>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
	else if(tipoActividad == "3"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><br /><div class="respuestas"><input type="text" id="m1" placeholder="Escribe aqui tu respuesta..."  /><input type="text" id="m2" placeholder="Escribe aqui tu respuesta..."  /><input type="text" id="m3" placeholder="Escribe aqui tu respuesta..."  /></div>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
	else if(tipoActividad == "4"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><br />'+cargarMetas(pregAct)+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
}

function terminarAct(){
	if(respuestas != null){
		console.log(respuestas);
		localStorage.setItem("actividad" + numDiap + "_" + $("#tituloCurso").html(), JSON.stringify(respuestas));
		if(tipoActividad == "2"){
			var resultadoHTML = "";
			var lastMax = 0;
			for(var i in eval){
				if(i == 0){
					if(respuestas <= parseInt(eval[i][0])){
						resultadoHTML += '<p class="evalItem evalItem_selected">'+eval[i][1]+'</p>';
					}
					else{
						resultadoHTML += '<p class="evalItem">'+eval[i][1]+'</p>';
					}
				}
				else{
					if((respuestas > parseInt(eval[i - 1][0])) && (respuestas <= parseInt(eval[i][0]))){
						resultadoHTML += '<p class="evalItem evalItem_selected">'+eval[i][1]+'</p>';
					}
					else{
						resultadoHTML += '<p class="evalItem">'+eval[i][1]+'</p>';
					}
				}
			}
			$("#contenedor").find("#seccionPreguntas").html(resultadoHTML);
		}
		else if(tipoActividad == "4"){
			for(var i in respuestas){
				metos[i].push(respuestas[i]);
			}
			localStorage.setItem("metas", JSON.stringify(metos));
		}
				else if(tipoActividad == "3" || tipoActividad == "4" || tipoActividad == "6" || tipoActividad == "1"){
			respuestas[pregAct + 1] = resps6;
			resps6 = [];
			aa = 0;
			respuestas.splice(0, 1);
			var respsBien = [];
			for(var i in pregs.reactivos){
				var respuesta = pregs.reactivos[i][1];
				if(respuesta.indexOf(","))
					respuesta = respuesta.split(",");
				respsBien.push(matchArrays(respuesta, respuestas[i]));
			}
			var resultadoContestado = '';
			for(var i in respsBien){
				var pregunta = pregs.reactivos[i];
				var preguntaStr = pregs.reactivos[i][0];
				var respuestaOk = plantillaRespuesta.replace(':respTxt:', "Respuestas correctas:").replace(':respTipo:', 'respOkTitle');
				var respuestaNok = plantillaRespuesta.replace(':respTxt:', "Respuestas incorrectas:").replace(':respTipo:', 'respNokTitle');
				for(var b in respsBien[i].ok){
					respuestaOk += plantillaRespuesta.replace(':respTxt:', pregunta[respsBien[i].ok[b]][0]).replace(':respTipo:', 'respOk');
				}
				
				for(var m in respsBien[i].no){
					respuestaNok += plantillaRespuesta.replace(':respTxt:', pregunta[respsBien[i].no[m]][0]).replace(':respTipo:', 'respNok');
				}
				var respTotal = "";

				if(respuestaOk == plantillaRespuesta.replace(':respTxt:', "Respuestas correctas:").replace(':respTipo:', 'respOkTitle')){
					respTotal = respuestaNok;
				}
				else if(respuestaNok == plantillaRespuesta.replace(':respTxt:', "Respuestas incorrectas:").replace(':respTipo:', 'respNokTitle')){
					respTotal = respuestaOk; //muy bien amiwito
				}
				else{
					respTotal = respuestaOk + respuestaNok;
				}
				resultadoContestado += plantillaPregunta.replace(':pregunta:', preguntaStr).replace(':resps:', respTotal);
				$("#contenedor").html(resultadoContestado);
			}
		}
		else{
			alert("Actividad terminada");
		}
	}
}

function matchArrays(array1, array2){
	var oks = [];
	var noks = [];
	for(var i in array2){
		if(array1.indexOf(array2[i]) != -1){
			oks.push(array2[i]);
		}
		else{
			noks.push(array2[i]);
		}
	}
	return {
		ok: oks,
		no: noks
	}
}

function prevPreg(){
	if(pregAct > -1) {
		pregAct--;
	}
	if(tipoActividad == "3" || tipoActividad == "6" || tipoActividad == "1"){
		respuestas[pregAct] = resps6;
		resps6 = [];
		aa = 0;
	}
	var _resps = "";
	for(var preg in pregs.reactivos[pregAct]){
		if(preg >  1){
			if(tipoActividad == "1"){
				_resps += '<li><input type="radio" name="respuesta1" class="respuestaItem" id="r'+preg+'" value="'+preg+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';
			}
			else if(tipoActividad == "2"){
				_resps += '<li><input type="radio" name="respuesta1" class="respuestaItem" id="r'+preg+'" value="'+pregs.reactivos[pregAct][preg][1]+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';	
			}
			else if(tipoActividad == "5"){
				_resps += '<li><input type="checkbox" name="respuesta1" class="respuestaItem" id="r'+preg+'" value="'+pregs.reactivos[pregAct][preg][1]+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';	
			}
		}
	}
	if(tipoActividad == "1" || tipoActividad == "2" || tipoActividad == "5" || tipoActividad == "6"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><ul>'+_resps+'</ul>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
	else if(tipoActividad == "0"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><br /><div class="respuestas"><textarea placeholder="Escribe aqui tu respuesta..."></textarea></div>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
	else if(tipoActividad == "3"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><br /><div class="respuestas"><input type="text" id="m1" placeholder="Escribe aqui tu respuesta..."  /><input type="text" id="m2" placeholder="Escribe aqui tu respuesta..."  /><input type="text" id="m3" placeholder="Escribe aqui tu respuesta..."  /></div>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
	else if(tipoActividad == "4"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><br />'+cargarMetas(pregAct)+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
}



//**************************************************************************
//ASIGNA FUNCION A BOTON SIG, ANT PARA CARGAR LOS TEMAS
//**************************************************************************
$(".icon-home").click(function(){


/*EN ESTA PARTE DEL CODIGO NO MANDARA AL MENU PRINCIPAL DONDE ESTARAN
TODOS LOS TEMAS DEL CURSO

ESTA PENDEINTE HACER PLANTILLA DE TEMAS*/


});

$("#diapSig").click(function(){

	////console.log(numDiap);
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




/*//console.log(autoplayDiap);*/
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

//**************************************************************************
//ASIGNA FUNCION A BOTONES DE MULTIMEDIA
//**************************************************************************

var updateBar; 

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


vid = document.getElementById("videoCurso");
    
$(".icon-fullscreen").click(function(){
	$('#videoCurso')[0].webkitEnterFullScreen();
});
       


//**************************************************************************
//FUNCIONES PARA LOS MENUS SECUNDARIOS DE INSTRUCCIONES Y MENU VERTICAL
//**************************************************************************

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


			</section>`;



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


$(".icon-search, .icon-pencil, .icon-file, .icon-edit").click(function(){
	if ($(this).attr("class") == $(".icon-home-teme").attr("data-idMenu") || $(".icon-home-teme").attr("data-idMenu") == null ) {
		if($(".icon-home-teme").is(":hidden")){
			$(".icon-home-teme").fadeIn();
			$(".icon-home-teme").attr("data-idMenu", $(this).attr("class"));
		}
		else{
			$(".icon-home-teme").fadeOut();
			$(".icon-home-teme").removeAttr("data-idMenu");
		}
	}
});



$("#catalogoDiap").click(function(){if($(".detalleDiap").is(":hidden")){}else{}});

$("#instrucciones").click(function(){if($(".detalleInstruccion").is(":hidden")){}else{}});





//**************************************************************************
//FUNCIONES PARA LA INTERACCION CON EL VIDEO
//**************************************************************************

function actualizaBarraVideo (){
	if(document.getElementById("videoCurso") != null){
		var tiempoVideo = document.getElementById("videoCurso").currentTime;
		segundos++;
		if(segundos > 59){
			segundos = 0;
			minutos++;
		}
		$("#controlVideo").val(tiempoVideo);
		duracionVideo = document.getElementById("videoCurso").duration;
		$("#controlVideo").attr("max", duracionVideo);
		//**************************************************************************
		//EJECUTAR FUNCION PARA MOSTRAR IMAGENES
		//**************************************************************************
		cargaImagenes( tiempoVideo, tiempoActual);
	}
}

var imgActual = 0;
var j = 0;
var tiempoActual = 0;
function cargaImagenes(tiempoVideo, posicion){
	tiempoVideo = Math.round(tiempoVideo);
	var tMinus = Math.round(duracionVideo - tiempoVideo);
	var minutes = parseInt(tMinus / 60);
	var secs = tMinus % 60;
	secs = (secs > 9) ? secs : "0" + secs;
	if(!(isNaN(minutes))){
		$("#tiempoVideo").html(minutes + ":" + secs);
	}
	if (tiempoVideo == tiempos[posicion]){
		$("#img0" ).hide();
		$("#img0 img" ).fadeOut( 500);
		setTimeout(function(){
			$("#img0 img").attr("src", rutas[imgActual]);
			$("#img0" ).show();
			$( "#img0 img" ).fadeIn(500);
			imgActual = posicion + 1;
			tiempoActual = posicion+1;
		},500);
	}		 
}

//**************************************************************************
//FUNCIONES QUE SE CARGAN UNA VEZ DIBUJADO TODO EL DOM
//**************************************************************************

var aa = 0;
$(document).ready(function(){
	cargaMenu();
	$("#contenedor").on("change", 'input', function(){
		if(tipoActividad == "1"){
			resps6[aa] = $(this).val();
		}
		else if(tipoActividad == "2"){
			respuestas += parseInt($(this).val());
		}
		else if(tipoActividad == "3" || tipoActividad == "4" || tipoActividad == "6"){
			var res = resps6.indexOf($(this).val());
			if(res == -1){
				resps6[aa] = $(this).val();
				aa++;
			}
			else{
				resps6.splice(res, 1);
				aa--;
			}
		}
		else if(tipoActividad == "5"){
			respuestas[pregAct + $(this).val()] = $(this).val();
		}

	});
});

function saveCampos(){
 	var data = [];
 	var inputs = $('#tabla > section input');

	for (i = 2; i <= inputs.length; i += 3){
		var datos = [];
		datos[0] = $(inputs[i - 2]).val();
		datos[1] = $(inputs[i - 1]).val();
		datos[2] = $(inputs[i]).val();
		data.push(datos);
	}
	localStorage.setItem('metas', JSON.stringify(data));
	var data2 = localStorage.getItem("metas");
	data2 = JSON.parse(data2);

	alert("Actividad Guardada");
/*
 var campos = `<section>
							 <input type="text" name="meta">
							 <input type="date" name="fecha">
							 <input type="text" name="monto" min="1" step="any" />
							</section>`;
 $("#tabla").append(campos);*/
 }
	 		

function cargarActividad2(){
	var metas = JSON.parse(localStorage.getItem("actividad2_Actividad: Define tus metas financieras (por plazo)"));

	for(var i in metas){
		$("#m" + i).val(metas[i]);
	}
}

function cargarMetas(meta){
	//<input type="text" id="m1" placeholder="Escribe aqui tu respuesta..."  /><input type="text" id="m2" placeholder="Escribe aqui tu respuesta..."  /><input type="text" id="m3" placeholder="Escribe aqui tu respuesta..."  />
	metos = JSON.parse(localStorage.getItem("metas"));
	if(metos == null){
		return '<h1>Primero debes llenar la actividad Define tus metas financieras</h1>';		
	}
	else{
		switch(meta){
			case 0:
				return `
							<div id="tabla">
								<section>
									<input type="text" name="meta" id="m0" disabled value="`+metos[0][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="0"/>
								</section>
								<section>
									<input type="text" name="meta" id="m1" disabled value="`+metos[1][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="1"/>
								</section>
								<section>
									<input type="text" name="meta" id="m2" disabled value="`+metos[2][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="2"/>
								</section>
							</div>
				`;
				break;
			case 1:
				return `
							<div id="tabla">
								<section>
									<input type="text" name="meta" id="m0" disabled value="`+metos[3][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="3"/>
								</section>
								<section>
									<input type="text" name="meta" id="m1" disabled value="`+metos[4][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="4"/>
								</section>
								<section>
									<input type="text" name="meta" id="m2" disabled value="`+metos[5][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="5"/>
								</section>
							</div>
				`;
				break;
			case 2:
				return `
							<div id="tabla">
								<section>
									<input type="text" name="meta" id="m0" disabled value="`+metos[6][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="6"/>
								</section>
								<section>
									<input type="text" name="meta" id="m1" disabled value="`+metos[7][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="7"/>
								</section>
								<section>
									<input type="text" name="meta" id="m2" disabled value="`+metos[8][0]+`" class="metos">
									<input type="text" placeholder="Periodo de revision" class="periodo" data-meto="8"/>
								</section>
							</div>
				`;
				break;
		}
	}
}