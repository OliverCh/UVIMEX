define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

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
				//console.log(d);
				// Get logged usercourseContainer ID
				if(d == null){
					loadCourses(d);
					return;
				}
				d = d.courses;
				loadCourses(d);
			});
		});
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	var findFields = function(){
		courseContainer = screenContainer.find("#courseContainer");
	}

	var setEvents = function(){
		courseContainer.on("click", ".f_course",function(){
			var idCourse = $(this).data("id");
			require(["ModulesController"], function(ModulesController){
				ModulesController.setParentNav(parentNav);
				parentNav.pushScreen(ModulesController, idCourse);
			});
		});

		courseContainer.on('click', '.course_details', function(){
			var idCourse = $(this).data("id");
			require(["detailsController"], function(detailsController){
				detailsController.setParentNav(parentNav);
				parentNav.pushScreen(detailsController, idCourse);
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
				<div class="curso-imagecontainer" style="background-image: url('https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/${v.idUsuario}/${v.idCurso}/portraits/${v.urlPortada}');">
				</div>
				<div class="curso-infocont">
					<p class="categoria">${v.strCategoria}</p>
					<h3>${v.nombre}</h3>
				</div>
				<button class="go-to-curso full-color-btn f_course" data-id="${v.idCurso}"><i class="fas fa-book"></i> Ir al Curso</button>
				<button class="showme-info-btn course_details" data-id="${v.idCurso}"><i class="fas fa-arrow-circle-right"></i></button>
			</div>`);

			/*courseContainer.append(`<li class="f_course" data-id="${v.idCurso}">
				<img src="https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/${v.idUsuario}/${v.idCurso}/portraits/${v.urlPortada}">
				${v.nombre}
				</li>`);*/
		}
	}

	var getCourses = function(callback){
		console.log("XD");
		$.ajax({
			url: masterPath + "movileComms.php",
			data: {idUser: localStorage.getItem("user_id")},
			success: callback
		});
	}
	return publics;
});
