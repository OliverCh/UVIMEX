define(function(require){
	var publics = {};
	var container = null;
	var nav = new NavController();

	//Controllers
	var nav_buttons = null;
<<<<<<< HEAD
	var nav_logout = null;
	var myData = "";
=======
	var logOut = null;
>>>>>>> c79d9689ddc110a6b8d049209e68e6790acb9b33

	publics.setContainer = function(cnt){
		container = cnt;
		return this;
	};

	publics.draw = function(){
		container.load("appBase.html" ,function(){
			alturaInjec();
			nav.setContainer(container.find("#appContent"));

			findFields();
			setEvents();

			if(nav.isStackEmpty())
				loadMyCourses();
			else
				nav.reloadActual();
		});
	}

	publics.setData = function(data){
		if(data.restartNav && data.restartNav === true){
			nav.goHome();
		}
		myData = data;
		return this;
	}

	publics.popSubscreen = function(){
		return nav.popSomething();
	}

	var findFields = function(){
		nav_buttons = container.find(".bottom_btn");
<<<<<<< HEAD
		nav_logout = container.find("#nav_logout");
=======
		logOut = container.find("#logOut");
>>>>>>> c79d9689ddc110a6b8d049209e68e6790acb9b33
	}

	var setEvents = function(){
		nav_buttons.click(navClick);
<<<<<<< HEAD
		nav_logout.click(function(){
			require(["LoginController"], function(LoginController){
				localStorage.removeItem("user_id");
				NavMaster.setHome(LoginController);
			});
		});
=======
		logOut.click(endSession);
>>>>>>> c79d9689ddc110a6b8d049209e68e6790acb9b33
	}

	var loadMyCourses = function(){
		require(["MyCoursesController"], function(MyCoursesController){
			MyCoursesController.setParentNav(nav);
			nav.pushScreen(MyCoursesController);
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
