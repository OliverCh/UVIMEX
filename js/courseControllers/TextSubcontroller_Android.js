define(function(require){

	// Screen functional variables
	var publics = {};
	var parentNav = null;
	var screenContainer = null;
	
	// Local variables
	var files = null;
	var text = null;
	var isPlaying = null;

	// Views
	var play_stop_;
	var text_;
	var filesAmmount_;
	var files_;

	publics.setText = function(txt){
		text = txt;
		return this;
	}

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		init();
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	publics.addFile = function(name, url){
		if(files === null){
			console.error("Error: Orden de operación incorrecto. Establece el contenedor primero con 'obj.setContainer(container)'");
			return null;
		}
		files.push({name: name, url: url});
		return this;
	}

	publics.draw = function(){
		if(screenContainer == null){
			console.error("Error: Contenedor no establecido. Establece el contenedor con 'obj.setContainer(container)'");
			return;
		}

		findFields();
		fillFields();
		setEvents();
	}

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.onClose = function(){
		stopAction();
		return;
	}

	var init = function(){
		files = [];
		isPlaying = false;
	}

	var findFields = function(){
		play_stop_ = screenContainer.find("#play_pause_"); // play_pause es el boton de play y stop
		text_ = screenContainer.find("#text_");
		filesAmmount_ = screenContainer.find("#filesAmmount_");
		files_ = screenContainer.find("#files_");
	}

	var fillFields = function(){
		text_.html(text);
		filesAmmount_.html(files.length);
	}

	var setEvents = function(){
		play_stop_.click(function(){
			if(isPlaying === false){
				playAction();
			}
			else if(isPlaying === true){
				stopAction();
			}
		});
		files_.click(function(){
			require(["courseControllers/FilesController_pop"], function(popController){
				popController.setParentNav(parentNav);
				parentNav.pushPop(popController, "files", {files: files}, "pop-white-full");
			});
		});
	}

	var playAction = function(){
		TTS.speak({
			text: getText(),
			locale: "es-MX",
			rate: 1
		}, textFinished, function(e){alert(e);}); 
		isPlaying = true;

		play_stop_.find("i").removeClass("fa-volume-up");
		play_stop_.find("i").addClass("fa-stop");

	}

	var stopAction = function(){
		TTS.speak({text: ""});
		isPlaying = false;

		play_stop_.find("i").removeClass("fa-stop");
		play_stop_.find("i").addClass("fa-volume-up");

	}

	var getText = function(){
		var filteredMessage = text.replace(/((<\/?[^<>]+>)|(&[^&;]+;))/gm, "");
		return filteredMessage;
	}

	var textFinished = function(){
		stopAction();
	}

	return publics;
});