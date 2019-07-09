define(function(require){
	var publics = {};
	var screenContainer = null;

	//Controllers
	var courseContainer = null;
	var myData = "";

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.draw = function(){
		screenContainer.load("secciones/miscursos.html", function(){
			findFields();
			setEvents();
			getCourses(function(d){
				// Get logged usercourseContainer ID
				if(d == null){
					loadCourses(d);
					return;
				}
				loginID = d.login_id;
				console.log(loginID);
				d = d.courses;
				console.log(d);
				loadCourses(d);
			});
		});
	}

	var findFields = function(){
		courseContainer = screenContainer.find("#courseContainer");
	}

	var setEvents = function(){
		courseContainer.on("click", ".f_course",function(){
			var idCourse = $(this).data("id");
			requiere(["ModulesController"], function(ModulesController){
				NavController.pushScreen(ModulesController, idCourse);
			});
		});
	}

	var loadCourses = function(d){
		courseContainer.html("");
		if(d == null){
			courseContainer.append(`No tienes cursos adquiridos. Visita <a href="uvimex.com.mx">uvimex.com.mx</a> para comprar cursos.`);
			return;
		}
		if(d.length == 0){
			courseContainer.append(`No tienes cursos adquiridos. Visita <a href="uvimex.com.mx">uvimex.com.mx</a> para comprar cursos.`);
		}
		for (var i = 0; i < d.length; i++) {
			var v = d[i];
			courseContainer.append(
			`<div class="indiv-displaycurso">
				<div class="curso-imagecontainer">
					<img src="https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/${v.idUsuario}/${v.idCurso}/portraits/${v.urlPortada}">
				</div>
				<div class="curso-infocont">
					<p class="categoria">Categoría</p>
					<h3>Titulo Generico Largo Para probar Donde Se Corta</h3>
				</div>
				<button class="go-to-curso full-color-btn f_course" data-id="${v.idCurso}"><i class="fas fa-book"></i> Ir al Curso</button>
				<button class="showme-info-btn"><i class="fas fa-arrow-circle-right"></i></button>
			</div>`);

			/*courseContainer.append(`<li class="f_course" data-id="${v.idCurso}">
				<img src="https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/${v.idUsuario}/${v.idCurso}/portraits/${v.urlPortada}">
				${v.nombre}
				</li>`);*/
		}
	}

	var getCourses = function(callback){
		var loginID;
		console.log("XD");
		$.ajax({
			url: masterPath + "movileComms.php",
			data: null,
			success: callback
		});
	}
	return publics;
});