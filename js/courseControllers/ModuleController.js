define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	//Controllers
	var themeContainer = null;
	var moduleID_ = null;
	var moduleName_ = null;

	var self = this;
	var myData = "";
	var moduleThemes = [];
	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.draw = function(){
		screenContainer.load("secciones/platform/module.html", function(){
			findFields();
			setEvents();
			fillFields();
			getThemes(function(themes){
				console.log(themes);
				moduleThemes = (themes != null)? themes:[];
				// PARA MUESTRA
				// moduleThemes.push({nombre: "* video", plantilla: "template1", id: 371});
				// moduleThemes.push({nombre: "* video con actividad", plantilla: "template2", id: 375});
				// moduleThemes.push({nombre: "* audio", plantilla: "template3", id: 374});
				// moduleThemes.push({nombre: "* texto", plantilla: "template7", id: 373}); no martin no
				console.log(moduleThemes);
				loadThemes(moduleThemes);
			})
		});
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	publics.setData = function(data){
		myData = data;
		return this;
	}

	var fillFields = function(){
		moduleName_.html(myData.moduleName);
	}

	var findFields = function(){
		themeContainer = screenContainer.find("#themeContainer");
		moduleID_ = screenContainer.find("#moduleID_");
		moduleName_ = screenContainer.find("#moduleName_");
	}

	var setEvents = function(){
		themeContainer.on("click", ".con-indiv-tema",function(){
			var id = $(this).data("id");
			var loadThemeFunction = function(ThemeController){
				ThemeController.setParentNav(parentNav);
				parentNav.pushScreen(ThemeController, {themes: moduleThemes, id: id});
			};
			require(["courseControllers/ThemeMasterController"], loadThemeFunction);

			// var template = $(this).data("tmplt");
			// var themeController = undefined;
			// switch(template){
			// 	// No preguntes...
			// 	case "template1":
			// 		themeController = "ThemeController_"+template;
			// 		break;
			// 	case "template2":
			// 		themeController = "ThemeController_"+template;
			// 		break;
			// 	case "template3":
			// 		themeController = "ThemeController_"+template;
			// 		break;
			// 	case "template4":
			// 		themeController = "ThemeController_"+template;
			// 		break;
			// 	default:
			// 		alert("Hay un error en este curso. Porfavor contactese con un administrador");
			// 		return;
			// 		break;
			// }
			// if(themeController !== undefined)
			// 	require([themeController], loadThemeFunction);
		});
	}

	var loadThemes = function(d){
		themeContainer.html("");
		if(d == null){
			themeContainer.append(`No hay temas en este modulo. Espera al instructor a que cree uno.`);
			return;
		}
		if(d.length == 0){
			themeContainer.append(`No hay temas en este modulo. Espera al instructor a que cree uno.`);
		}
		for (var i = 0; i < d.length; i++) {
			var v = d[i];
			themeContainer.append(`
				<div class="con-indiv-tema" data-id="${i}">
					<p class="injectnumber">${i+1}</p><h3>${v.nombre}</h3>
				</div>
			`);
		}
	}

	// Funcs mei
	// funcion que quita la calse del slected bottom;
	var animateClickTheme = function(){
		var base = screenContainer.parent();
		base.find('.inject-info').load(plantilla);
		hideSelectedBottom(base);
		base.find('.bottom_btn').removeClass('bottom_btn_slct');
	};

	// funcion que quita la calse del slected bottom;
	function hideSelectedBottom(base){
		base.find('.bottom_btn').removeClass('bottom_btn_slct');
		base.find('.barrita-select-gen').animate({
			left:'-200%'
		},1000);
	}

	// llamamadas
	var getThemes = function(callback){
		$.ajax({
			url: masterPath + "getThemes.php",
			data: {courseID: myData.moduleID},
			success: callback
		});
	}
	return publics;
});
