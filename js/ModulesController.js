define(function(require){
	var publics = {};
	var screenContainer = null;

	//Controllers
	var modulesContainer = null;
	var myData;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.draw = function(){
		screenContainer.load("Modules.html", function(){
			findFields();
			setEvents();
			getModules(function(d){
				loadModules(d);
			});
		});
	}

	var findFields = function(){
		modulesContainer = screenContainer.find("#modulesContainer");
	}

	var setEvents = function(){
		modulesContainer.on("click", ".f_module",function(){
			require(["WatchCourseController_pop"], function(WatchCourseController_pop){
				var moduleID = $(this).data("id");
				NavController.pushPopup(WatchCourseController_pop, "course",
					{userID: localStorage.getItem("user_id"), moduleID: moduleID});
				//window.location.href = `https://uvimex.com.mx/dashboard/platform/php/preview.php?idmodule=${moduleID}&usr=${id}`;
			});
		});
	}

	var loadModules = function(d){
		if(d == null){
			modulesContainer.append(`Este curso no tiene modulos disponibles. El instructor subirá el contenido en un futuro.`);
		}
		for (var i = 0; i < d.length; i++) {
			var v = d[i];
			modulesContainer.append(`<li class="f_module" data-id="${v.idModulo}">${v.nombre}</li>`);
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
