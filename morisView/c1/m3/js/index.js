//**************************************************************************
//VARIABLES GLOBALES
//**************************************************************************
var tipoActividad;
var duracionVideo ;
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

function cargaMenu(){
$("#contenedor").html("");
	respuestas = null;
	var menuTemas = '<ol id="lista5">';
	$.getJSON("curso.json",function(data){
		var count = Object.keys(data.contenido).length;
		totalDiap = count;
		for (var i = 0; i < count; i++){
			//if(!(data.contenido["diap"+i].diapAnt)){
				menuTemas += "  <li><a><label onClick='cambiarDiap(`diap"+i+"`)'> "+data.contenido["diap"+i].titulo+"</label></a></li>";
			//}
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

	imgActual =0;
	j=0;
	tiempoActual = 0;
	var diapNum = diapositiva.replace("diap", "");
	numDiap = (parseInt(diapNum));
	console.log(numDiap);
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
					buscarImagen(rng.value,tiempos);
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


			//*************************************************************************
		//EJECUTAR LA FUNCION PARA PODER VISUALIZAR LAS IMAGENES AL INICIO DEL TEMA
		//*************************************************************************

			buscarImagen(rng.value);


		});

		function buscarImagen(posicionBarra, tiempoImg){
			posicionBarra = parseInt(posicionBarra);


			console.log(tiempoImg);

			 for (var i = 0; i < rutas.length;i++) {

			 		console.log("Rutas:"+rutas.length + ";  posicion barra: "+posicionBarra + ";  TiemposP:"+tiempoImg[i] + ";  TiemposS:"+tiempoImg[i+1]);

			 	if (posicionBarra >= tiempoImg[i] && (posicionBarra < tiempoImg[i+1] || tiempoImg[i+1] == null )) {



			 		var posArray = i;
			 		cargaImagenes(tiempoImg[i], i);
			 		imgActual = posArray;
			 		tiempoActual = posArray;


			 		break;

			 	}
			 }
		}

	});



 	setTimeout('buscarImagen($("#controlVideo").val(),tiempos)', 200);
	setInterval('actualizaBarraVideo();',200);
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
	else if(tipoActividad == "aaaaaa"){
		$("#contenedor").find("#seccionPreguntas").html('<a href="https://storage.googleapis.com/denlin-cursos/Moris/C3/Presupuesto%20Anual.xls" target="about:blank"><h1>Descarga la plantilla de presupuesto</h1></a>');
		return true;
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
			nextBtn = true;
		}
	}
	generaResp();
}

function terminarAct(){
	if(respuestas != null){
		//console.log(respuestas);
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
		else if(tipoActividad == "3" || tipoActividad == "4" || tipoActividad == "6" || tipoActividad == "1"){
			respuestas[pregAct + 1] = resps6;
			console.log(respuestas);
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
				$("#contenedor").find("#seccionPreguntas").html(resultadoContestado);
			}
		}
		alert("Actividad terminada");
		$('<button id="imprimirActividad">Imprimir</button>').prependTo("#seccionPreguntas");

	}
}

function prevPreg(){
	if(pregAct > -1) {
		pregAct--;
	}
	if(pregAct == (Object.size(pregs.reactivos) - 1)){
		nextBtn = false;
	}
	else{
		nextBtn = true;
	}
	generaResp();
}

function generaResp(){
	if(tipoActividad == "3" || tipoActividad == "4" || tipoActividad == "6" || tipoActividad == "1"){
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
			else if(tipoActividad == "3" || tipoActividad == "6"){
				_resps += '<li><input type="checkbox" data-name="'+(((pregs.reactivos[pregAct][1].length - 1) > 0) ? ("respuesta" + preg) : "respuesta")+'" class="respuestaItem" id="r'+preg+'" value="'+preg+'"><label for="r'+preg+'">'+pregs.reactivos[pregAct][preg][0]+'</label></li>';
			}
		}
	}
	if(tipoActividad == "1" || tipoActividad == "2" || tipoActividad == "3" || tipoActividad == "6"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><ul>'+_resps+'</ul>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
	}
	else if(tipoActividad == "0"){
		$("#contenedor").find("#seccionPreguntas").html('<h2>'+pregs.reactivos[pregAct][0]+'</h2><br /><div class="respuestas"><br /><div class="respuestas"><textarea placeholder="Escribe aqui tu respuesta..."></textarea></div>'+((nextBtn) ? '<button id="pregSig" onclick="nextPreg();">Siguiente</button>'  : '<button id="pregSig" onclick="terminarAct();">Terminar</button>')+'<button id="pregAnt" onclick="prevPreg();">Anterior</button></div>');
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


$("#mediaMuted").click(function(){

	if ($("#mediaMuted").attr("class") == "icon-volume-off" ) {

		$("#mediaMuted").removeAttr("class");
		$("#mediaMuted").attr("class", "icon-volume-up");

		document.getElementById("videoCurso").muted = false;




	}else {

		$("#mediaMuted").removeAttr("class");
		$("#mediaMuted").attr("class", "icon-volume-off");

document.getElementById("videoCurso").muted = true;

		/*	$('video').trigger('play');
		$('video').trigger('pause');*/



	}
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

	/*//console.log($(this).attr("class") + ":" +  $(".icon-home-teme").attr("data-idMenu") )*/

	if ($(this).attr("class") == $(".icon-home-teme").attr("data-idMenu") || $(".icon-home-teme").attr("data-idMenu") == null ) {

	if($(".icon-home-teme").is(":hidden")){
		$(".icon-home-teme").fadeIn();
		$(".icon-home-teme").attr("data-idMenu", $(this).attr("class"));
	}else{
		$(".icon-home-teme").fadeOut();
		$(".icon-home-teme").removeAttr("data-idMenu");
	}

	} else{

	}
});



$("#catalogoDiap").click(function(){

	if($(".detalleDiap").is(":hidden")){

	}else{

	}

});

$("#instrucciones").click(function(){

	if($(".detalleInstruccion").is(":hidden")){

	}else{

	}

});





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
				$("#img0 img").attr("src", rutas[posicion]);
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

var aa = -1;

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
			if($(this).data("name") == "respuesta"){
				$('input[data-name="respuesta"]').prop("checked", false);
				$(this).prop("checked", true);
				resps6[0] = $(this).val();
			}
			else{
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
		}
		else if(tipoActividad == "5"){
			respuestas[pregAct + $(this).val()] = $(this).val();
		}
	});
});

Object.size = function(obj) {
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) size++;
    }
    return size;
};
