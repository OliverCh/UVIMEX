define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	//Controllers
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
		screenContainer.load("secciones/indivcurso.html", function(){
			$.ajax({
				type: 'GET',
				url: 'https://uvimex.com.mx/dashboard/dashboard/json/getSingleCourseForStudent.php',
				data: {idCurso: myData},
				error: console.log,
				success: function(data){
					data = data[0];
					var altura = $(window).height()-100;
					$('.inject-information').height(altura);
					screenContainer.find('#courseName').text(data.nombre);
					screenContainer.find('#description').text(data.descripcion);
					screenContainer.find('#totalCourseTimeD').text(data.totalCourseTime);
					screenContainer.find('#activities').text(data.totalActivities);
					screenContainer.find('#duration').text(data.totalCourseMedia == null ? 'N/A' : data.totalCourseMedia);
					screenContainer.find('#tag').text(data.tags.join(", "));
					screenContainer.find('#mandatoryCourses').text(data.mandatoryCourses.length == 0 ? 'N/A' : data.mandatoryCourses.join(", "));
					screenContainer.find('#streaming').text(data.streaming == 1 ? 'Si' : "No");
					modulocontainer = screenContainer.find("#moduleCont");
					loadModules(data.modulesFromCourse);

					var portadaURL = "https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/"+localStorage.getItem('user_id')+"/"+data.idCurso+"/portraits/" + data.urlPortada;

					screenContainer.find('#portrait').css('background-image', "url('" +portadaURL + "')");
				}
			});
			f_back = screenContainer.find("#miscursos_btn");
			console.log(f_back);
			setEvents();
		});
	}

	var setEvents = function(){
		/*modulesContainer.on("click", ".f_module",function(){
			var moduleID = $(this).data("id");
			require(["CourseBaseController"], function(CourseBaseController){
				NavMaster.pushScreen(CourseBaseController);
			});			

			require(["WatchCourseController_pop"], function(WatchCourseController_pop){
				NavController.pushPop(WatchCourseController_pop, "course",
					{userID: localStorage.getItem("user_id"), moduleID: moduleID});
			});
		});*/
		f_back.click(function(){parentNav.popScreen();});
	}

	var loadModules = function(data){
		var n = 1;
		var currentModule = null;
		var currentModuleID = null;
		var themesStr = "";
		modulocontainer.html('');
		for(var i in data){
			if(currentModuleID == null){
				currentModule = data[i].moduleName;
				currentModuleID = data[i].idModulo;
				themesStr = '<p data-themeid="'+data[i].idTema+'">'+data[i].themeName+'</p>';
			}
			else if(currentModuleID != data[i].idModulo){
				modulocontainer.append(`
					<div class="modulocontainer">
						<h3><i class="fas fa-book"></i> `+currentModule+`</h3>
						`+themesStr+`
						<button class="go-tomarcurso" data-id="`+currentModuleID+`"><i class="fas fa-arrow-circle-right"></i></button>
					</div>`);
				currentModule = data[i].moduleName;
				currentModuleID = data[i].idModulo;
				themesStr = '<p data-themeid="'+data[i].idTema+'">'+data[i].themeName+'</p>';
			}
			else{
				themesStr += '<p data-themeid="'+data[i].idTema+'">'+data[i].themeName+'</p>';
			}
		}
		modulocontainer.append(`
			<div class="modulocontainer">
				<h3><i class="fas fa-book"></i> `+currentModule+`</h3>
				`+themesStr+`
				<button class="go-tomarcurso" data-id="`+currentModuleID+`"><i class="fas fa-arrow-circle-right"></i></button>
			</div>`);
	}

	return publics;
});
