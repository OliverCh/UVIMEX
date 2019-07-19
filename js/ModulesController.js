define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	//Controllers
	var modulesContainer = null;
	var f_back = null;
	var nonLocal = null;
	var myData;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.setData = function(data){
		myData = data;
		if(myData.nonLocal !== undefined && myData.nonLocal === true){
			nonLocal = true;
		}
		else{
			nonLocal = false;
		}
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
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
			var moduleName = $(this).parent().find(".moduleName").html();

			require(["CourseBaseController"], function(CourseBaseController){

				console.log(moduleID);
				NavMaster.pushScreen(CourseBaseController, {moduleID:moduleID, moduleName: moduleName, nonLocal: nonLocal});
				/*
				NavController.setContainer($("#appContent"));
				NavController.pushStack(AppBaseController, undefined, false);
				NavController.pushStack(CourseBaseController);
				*/
			});			
		});
		f_back.click(function(){parentNav.popScreen();});
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
				<h3><i class="fas fa-book"></i> MODULO ${i+1}</h3><p class="moduleName">${v.nombre}</p>
				<button class="go-tomarcurso f_module" data-id="${v.idModulo}"><i class="fas fa-arrow-circle-right"></i></button>
			</div>
			`);
			//modulesContainer.append(`<li class="f_module" data-id="${v.idModulo}">${v.nombre}</li>`);
		}
	}

	var getModules = function(callback){
		var courseID = null;
		if(myData !== undefined && myData.idCourse !== undefined){
			courseID = myData.idCourse;
		}

		console.log(myData);
		if(nonLocal === true){
			$.ajax({
				url: masterPath + movileComms,
				data: {idUser: localStorage.getItem("user_id"), mode: "myLessons"},
				success:callback
			});
		}
		else if(nonLocal === false){
			$.ajax({
				url: masterPath + "getCourseModules.php",
				data: {id: courseID},
				success:callback
			});
		}

		
	}
	return publics;
});
