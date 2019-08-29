define(function(require){
	var publics = {};
	var screenContainer = null;
	var popFiles_content_ = null;
	var parentNav = null;

	var myData = null;
	var self = this;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.setData = function(data){
		myData = data;
		console.log(myData);
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	publics.draw = function(){
		screenContainer.load("secciones/platform/popup_video.html", function(){
			findFields();
			setEvents();
			fillFields();
		});
	}

	var findFields = function(){

	}

	var setEvents = function(){

	}

	var fillFields = function(){

	}


	return publics;
});
