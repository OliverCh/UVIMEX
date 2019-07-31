define(function(require){
	var publics = {};
	var screenContainer = null;

	var themeTitle_ = null;
	var themeSubtitle_ = null;
	var prevTheme_ = null;
	var nextTheme_ = null;
	var themeContent_ = null;
	var parentNav = null;

	var myData = null;
	var themes = null;
	var themeIndex = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.draw = function(){
		screenContainer.load("secciones/platform/themeMaster.html", function(){
			themes = myData.themes;
			themeIndex = myData.id;

			findFields();
			setEvents();
			loadTheme();
		});
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	var findFields = function(){
		themeTitle_ = $("#themeTitle_");
		themeSubtitle_ = $("#themeSubtitle_");
		prevTheme_ = $("#prevTheme_");
		nextTheme_ = $("#nextTheme_");
		themeContent_ = $("#themeContent_");
	}

	var setEvents = function(){
		prevTheme_.click(function(){
			themeIndex -= 1;
			loadTheme();
		});
		nextTheme_.click(function(){
			themeIndex += 1;
			loadTheme();
		});
	}

	var loadTheme = function(){
		var index = themeIndex;
		var max = themes.length-1;

		if(index > max || index < 0){
			parentNav.popScreen();
		}

		var theme = themes[index];
		var template = theme.plantilla;
		var themeController = "courseControllers/ThemeController_"+template;
		//var themeController = "courseControllers/ThemeController_template2";
		fillFields(theme);

		require([themeController], function(ThemeController){
			ThemeController.setContainer(themeContent_)
							.setData({theme: theme, template: template})
							.setParentNav(parentNav)
							.draw();
		});
	}

	var fillFields = function(theme){
		themeTitle_.html("Tema "+(parseInt(themeIndex)+1));
		themeSubtitle_.html(theme.nombre);
	}


	return publics;
});
