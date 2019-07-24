define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	//Controllers
	var courseContainer = null;
	var myData = "";

	var localCourseTemplate = 
			`<div class="indiv-displaycurso">
				<div class="curso-imagecontainer" style="background-image: url('https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/:idUsuario:/:idCurso:/portraits/:urlPortada:');">
				</div>
				<div class="curso-infocont">
					<p class="categoria">:strCategoria:</p>
					<h3>:nombre:</h3>
				</div>
				<button class="go-to-curso full-color-btn f_course" data-id=":idCurso:"><i class="fas fa-book"></i> Ir al Curso</button>
				<button class="showme-info-btn course_details" data-id=":idCurso:"><i class="fas fa-arrow-circle-right"></i></button>
			</div>`;
	var nonLocalCourseTemplate = 
		`<div class="indiv-displaycurso">
			<div class="curso-imagecontainer"></div>
			<div class="curso-infocont">
				<p class="categoria">:strCategoria:</p>
				<h3>:nombre:</h3>
			</div>
			<button class="go-to-curso full-color-btn f_course" data-id=":idCurso:" data-nonlocal="true"><i class="fas fa-book"></i> Ir al Curso</button>
		</div>`;

	var noCoursesTemplate = 
		`No tienes cursos adquiridos. Visita <a href="uvimex.com.mx">uvimex.com.mx</a> para comprar cursos.`;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.draw = function(){
		screenContainer.load("secciones/miscursos.html", function(){
			findFields();
			setEvents();
			getCourses(function(d){
				courseContainer.html("");

				if(d.error !== undefined && d.error === true){
					courseContainer.append(noCoursesTemplate);
					return;
				}
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
			var nonLocal = $(this).data("nonlocal");

			if(nonLocal !== undefined && nonLocal == true){
				nonLocal = true;
			}
			require(["ModulesController"], function(ModulesController){
				ModulesController.setParentNav(parentNav);
				parentNav.pushScreen(ModulesController, {idCourse:idCourse, nonLocal: nonLocal});
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
		if(d.length == 0){
			courseContainer.append(noCoursesTemplate);
		}
		for (var i = 0; i < d.length; i++) {
			var v = d[i];
			var template = null;
			if(v.isLocal === true){
				template = localCourseTemplate
												.replace(":idUsuario:", v.idUsuario)
												.replace(":idCurso:", v.idCurso)
												.replace(":urlPortada:", v.urlPortada)
												.replace(":strCategoria:", v.strCategoria)
												.replace(":nombre:", v.nombre)
												.replace(":idCurso:", v.idCurso)
												.replace(":idCurso:", v.idCurso);
			}
			else{
				template = nonLocalCourseTemplate
												.replace(":strCategoria:", v.strCategoria)
												.replace(":nombre:", v.nombre)
												.replace(":idCurso:", v.idCurso);
			}
			courseContainer.append(template);
		}
	}

	var getCourses = function(callback){
		$.ajax({
			url: masterPath + movileComms,
			data: {idUser: localStorage.getItem("user_id"), mode: "myCourses"},
			success: callback
		});
	}
	return publics;
});
