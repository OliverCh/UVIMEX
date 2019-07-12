define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	//Controllers
	var modulesContainer = null;
	var f_back = null;
	var myData;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
	}

	publics.draw = function(){
		screenContainer.load("secciones/moduloscursos.html", function(){
			findFields();
			setEvents();
			getModules(function(d){
				loadModules(d);
			});
		});
	}

	var findFields = function(){
		modulesContainer = screenContainer.find("#modulesContainer");
		f_back = screenContainer.find(".f_back");
	}

	var setEvents = function(){
		modulesContainer.on("click", ".f_module",function(){
				var moduleID = $(this).data("id");

			require(["CourseBaseController"], function(CourseBaseController){

				NavMaster.pushScreen(CourseBaseController);
				/*
				NavController.setContainer($("#appContent"));
				NavController.pushStack(AppBaseController, undefined, false);
				NavController.pushStack(CourseBaseController);
				*/
			});			

			require(["WatchCourseController_pop"], function(WatchCourseController_pop){
				NavController.pushPop(WatchCourseController_pop, "course",
					{userID: localStorage.getItem("user_id"), moduleID: moduleID});
			});
		});
		f_back.click(function(){NavController.popScreen();});
	}

	var loadModules = function(d){
		modulesContainer.html("");
		if(d == null){
			modulesContainer.append(`Este curso no tiene modulos disponibles. El instructor subirá el contenido en un futuro.`);
		}
		for (var i = 0; i < d.length; i++) {
			var v = d[i];
			modulesContainer.append(
			`
			<div class="modulocontainer">
				<h3><i class="fas fa-book"></i> MODULO ${i+1}</h3><p>${v.nombre}</p>
				<button class="go-tomarcurso f_module" data-id="${v.idModulo}"><i class="fas fa-arrow-circle-right"></i></button>
			</div>
			`);
			//modulesContainer.append(`<li class="f_module" data-id="${v.idModulo}">${v.nombre}</li>`);
		}
	}

	var getModules = function(callback){
		var courseID = myData;
		console.log(courseID);
		$.ajax({
			url: masterPath + "getCourseModules.php",
			data: {id: courseID},
			success:callback
		});
	}
	return publics;
});
