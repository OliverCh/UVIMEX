define(function(require){
	var publics = {};
	var container = null;
	var nav = new NavController();
	var me = this;

	//Controllers
	var nav_buttons = null;
	var myData = "";

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	};

	publics.draw = function(){
		container.load("secciones/platform/courseBase.html" ,function(){
			var courseContent = container.find("#courseContent");
			nav.setContainer(courseContent);
			alturaInjecInfo(courseContent);

			findFields();
			setEvents();
			loadModule(myData);
		});
	}

	publics.setData = function(data){
		console.log(data);
		if(data.moduleID){
			myData = data;
		}
		return this;
	}

	publics.popSubscreen = function(){
		nav.popSomething();
	}

	var findFields = function(){
		nav_buttons = container.find(".bottom_btn");
	}

	var setEvents = function(){
		nav_buttons.click(navClick);
	}

	var loadModule = function(data){
		require(["ModuleController"], function(ModuleController){
			var button = container.find("#nav_modulo");
			var barrita = container.find(".barrita-select-gen");
			
			button.addClass('bottom_btn_slct');
			var position = button.parent().offset();
			position = (position.left);
			barrita.animate({
				left:0
			},800);

			ModuleController.setParentNav(nav);
			nav.pushScreen(ModuleController, data);
		});
	}

	var loadCourse = function(){
		NavMaster.popScreen();
	}

	var loadStart = function(){
		NavMaster.popScreen({restartNav: true});
	}

	var navClick = function(){
		console.log("clicked bottom");
		nav_buttons.removeClass('bottom_btn_slct');
		$(this).addClass('bottom_btn_slct');

		var position = $(this).parent().offset();
		position = (position.left);
		var screen = $(this).attr('id');
		screen = screen.split('_');
		screen = screen[1];
		switch(screen){
			case "volver":
				loadStart();
				break;
			case "modulo":
				loadModule(myData);
				break;
			case "micursos":
				loadCourse();
				break;
		}
		container.find('.barrita-select').animate({
			left:position
		},800);
	}

	// FUncs Mei
	function alturaInjec(){
    	var altura = $(window).height()-100;
	    $('.inject-information').height(altura);
	}

	// tamaño de Inject
	function alturaInjecInfo(container){
		var altura = $(window).height()-50;
		container.height(altura);
	}

	return publics;
});
