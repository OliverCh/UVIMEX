define(function(require){
	var publics = {};
	var container = null;
	var nav = new NavController();

	//Controllers
	var nav_buttons = null;

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	};

	publics.draw = function(){
		container.load("moduloCursos.html" ,function(){
			nav.setContainer(container.find("#appContent"));

			findFields();
			setEvents();
		});
	}

	publics.popSubscreen = function(){
		nav.popScreen();
	}

	var findFields = function(){
		nav_buttons = container.find(".bottom_btn");
	}

	var setEvents = function(){
		nav_buttons.click(navClick);
	}

	// var loadMyCourses = function(){
	// 	require(["MyCoursesController"], function(MyCoursesController){
	// 		MyCoursesController.setParentNav(nav);
	// 		nav.pushScreen(MyCoursesController);
	// 	});
	// }

	var navClick = function(){
		if(!$(this).hasClass('bottom_btn_slct')){

			nav_buttons.removeClass('bottom_btn_slct');
			$(this).addClass('bottom_btn_slct');

			var position = $(this).parent().offset();
			position = (position.left);
			var screen = $(this).attr('id');
			screen = screen.split('_');
			screen = screen[1];
			switch(screen){
				case "miscursos":
					loadMyCourses();
					break;
				case "allcursos":

					break;
				case "inicial":
					break;
			}
			container.find('.barrita-select').animate({
				left:position
			},800);
		}
	}

	// FUncs Mei
	function alturaInjec(){
    	var altura = $(window).height()-100;
	    $('.inject-information').height(altura);
	}

	return publics;
});
