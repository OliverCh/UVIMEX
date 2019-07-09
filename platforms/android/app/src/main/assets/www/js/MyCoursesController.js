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
		screenContainer.load("MyCourses.html", function(){
			findFields();
			setEvents();
			getCourses(function(d){
				// Get logged user ID
				loginID = d.login_id;
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
		if(d == null){
			courseContainer.append(`No tienes cursos adquiridos. Visita <a href="uvimex.com.mx">uvimex.com.mx</a> para comprar cursos.`)
		}
		for (var i = 0; i < d.length; i++) {
			var v = d[i];
			courseContainer.append(`<li class="f_course" data-id="${v.idCurso}">
				<img src="https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/${v.idUsuario}/${v.idCurso}/portraits/${v.urlPortada}">
				${v.nombre}
				</li>`);
		}
	}

	var getCourses = function(callback){
		var loginID;
		$.ajax({
			url: masterPath + "movileComms.php",
			data: null,
			contentType: "application/json",
			dataType: "json",
			success: callback
		});
	}
	return publics;
});