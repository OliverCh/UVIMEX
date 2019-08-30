define(function(require){
	var publics = {};
	var container = null;
	var nav = new NavController();

	//Controllers
	var nav_buttons = null;
	var nav_logout = null;
	var myData = "";

	publics.init = function(){
		nav = new NavController();
	};

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
		nav_logout = container.find("#nav_logout");
	}

	var setEvents = function(){
		nav_buttons.click(navClick);
		nav_logout.click(function(){
			require(["LoginController"], function(LoginController){
				localStorage.removeItem("user_id");
				localStorage.clear();
				NavMaster.setHome(LoginController);
			});
		});

		$(window).resize(resizeFunc);
	}

	var loadMyCourses = function(){
		require(["MyCoursesController"], function(MyCoursesController){
			MyCoursesController.setParentNav(nav);
			nav.pushScreen(MyCoursesController);
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
	function alturaInjecInformation(){
    var altura = $(window).height()-100;
    $('.inject-information').height(altura);
}
function alturaInjec(){
    var altura = $(window).height()-50;
    var ancho = $(window).width();
    $('.inject-info').height(altura);
    if (ancho < 768) {
      if (altura < 380) {
        var menos = $('.plantilla-title-cont').outerHeight() + 30;
        menos = altura - menos;
        $('.multimedia-cont-indiv').width(menos+(menos/2));
        $('.multimedia-cont-indiv').height(menos);
        $('.botones-contianer').width(menos+(menos/2));
      }
      else{
        $('.multimedia-cont-indiv').width(300);
        $('.multimedia-cont-indiv').height(200);
        $('.botones-contianer').width(300);
      }
      if (ancho < 340) {
        $('.multimedia-cont-indiv').width('100%');
        $('.botones-contianer').width('100%');
      }
   }
    }

var resizeFunc = function(){
	console.log("aa");
  alturaInjec();
  alturaInjecInformation();
};

	return publics;
});
