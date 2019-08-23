define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	//Controllers
	var f_back = null;
	var goToCourse_ = null;
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
			goToCourse_ = screenContainer.find("#goToCourse_");
			console.log(goToCourse_);
			$.ajax({
				type: 'POST',
				url: masterPath + 'courseDetails.php',
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
					loadModules();
					var portadaURL = "https://uvimex.com.mx/dashboard/dashboard/assets/courseAssets/"+localStorage.getItem('user_id')+"/"+data.idCurso+"/portraits/" + data.urlPortada;
					screenContainer.find('#portrait').css('background-image', "url('" +portadaURL + "')");
					f_back = screenContainer.find("#miscursos_btn");
					setEvents();
				}
			});
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
		goToCourse_.click(function(){
			require(["ModulesController"], function(ModulesController){
				console.log("XD");
				ModulesController.setParentNav(parentNav);
				parentNav.pushScreen(ModulesController, {idCourse:myData, nonLocal: false});
			});
		});
		modulocontainer.on('click', '.go-tomarcurso', function(){
			var moduleID = $(this).data('id');
			var moduleName = $(this).data('name');
			require(["courseControllers/CourseBaseController"], function(CourseBaseController){
				NavMaster.pushScreen(CourseBaseController, {moduleID:moduleID, moduleName: moduleName, nonLocal: false});
			});
		});
	}

	var loadModules = function(){
		modulocontainer.html('');
		$.post(masterPath + 'getCourseModules.php', {id: myData}, function(data){
			for(var i in data){
				loadThemes(data[i].idModulo, data[i].nombre, i); //Al chile me cagas JS
			}
		});
	};

	var loadThemes = function(idModulo, currentName){
		$.post(masterPath + 'getThemes.php', {courseID: idModulo}, function(themes){
			var themesStr = "";
			for(var j in themes){
				themesStr += '<p data-themeid="'+themes[j].id+'">'+themes[j].nombre+'</p>';
			}
			modulocontainer.append(`
				<div class="modulocontainer">
					<h3><i class="fas fa-book"></i> `+currentName+`</h3>
					`+themesStr+`
					<button class="go-tomarcurso" data-id="`+idModulo+`" data-name="`+currentName+`"><i class="fas fa-arrow-circle-right"></i></button>
				</div>`);
		});
	};

	return publics;
});
