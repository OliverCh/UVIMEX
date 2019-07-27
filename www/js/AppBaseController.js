define(function(require){
	var publics = {};
	var container = null;

	//Controllers
	var nav_buttons = null;
	var logOut = null;

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	};

	publics.draw = function(){
		container.load("appBase.html" ,function(){
			alturaInjec();
			NavController.setHome();
			NavController.setContainer(container.find("#appContent"));
			console.log(container.find("#appContent"));
			loadMyCourses();
			findFields();
			setEvents();
		});
	}

	var findFields = function(){
		nav_buttons = container.find(".bottom_btn");
		logOut = container.find("#logOut");
	}

	var setEvents = function(){
		nav_buttons.click(navClick);
		logOut.click(endSession);
	}

	var loadMyCourses = function(){
		require(["MyCoursesController"], function(MyCoursesController){
			console.log("XD");
			NavController.pushScreen(MyCoursesController);
		});
	}

	var endSession = function(){
		localStorage.clear();
		sessionStorage.clear();
		NavController.setHome();
		require(['LoginController'], function(lc){
			container.find('.inject-information').remove().find('nav').remove();
			NavController.setContainer($("#content")).pushScreen(lc);
		});
	}

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
					NavController.pushScreen(MyCoursesController);
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
