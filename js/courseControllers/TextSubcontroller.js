define(function(require){

	// Screen functional variables
	var publics = {};
	var parentNav = null;
	var screenContainer = null;
	
	// Local variables
	var files = null;
	var text = null;
	var isReadSummoned = null;
	var speechHandler = null;
	var isPlaying = null;

	// Views
	var stop_;
	var play_pause_;
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
		return true;
	}

	var init = function(){
		files = [];
		isReadSummoned = false;
		speechHandler = window.speechSynthesis;
	}

	var findFields = function(){
		stop_ = screenContainer.find("#stop_");
		play_pause_ = screenContainer.find("#play_pause_");
		text_ = screenContainer.find("#text_");
		filesAmmount_ = screenContainer.find("#filesAmmount_");
		files_ = screenContainer.find("#files_");
	}

	var fillFields = function(){
		text_.html(text);
		filesAmmount_.html(files.length);

		//screenContainer.append()
	}

	var setEvents = function(){
		stop_.click(function(){
			stopAction();
		});
		play_pause_.click(function(){
			if(isReadSummoned === false){
				isReadSummoned = true;
				restartSpeech();
				playAction();

				play_pause_.find("i").removeClass("fa-volume-up");
				stop_.show();
			}
			else if(isReadSummoned === true)
			{
				if(isPlaying === true){
					console.log("pause");
					pauseAction();
				}
				else if(isPlaying === false){
					console.log("play");
					playAction();
				}
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
		speechHandler.resume();
		isPlaying = true;

		play_pause_.find("i").removeClass("fa-play");
		play_pause_.find("i").addClass("fa-pause");

	}

	var pauseAction = function(){
		speechHandler.pause();
		isPlaying = false;

		play_pause_.find("i").removeClass("fa-pause");
		play_pause_.find("i").addClass("fa-play");

	}

	var stopAction = function(){
		play_pause_.find("i").addClass("fa-volume-up");
		stop_.hide();
		isReadSummoned = false;
		speechHandler.cancel();
	}

	var restartSpeech = function(){
		var filteredMessage = text.replace(/((<\/?[^<>]+>)|(&[^&;]+;))/gm, "");
		console.log(filteredMessage);
		var msg = new SpeechSynthesisUtterance(filteredMessage);
	    msg.lang = 'es-MX';
	    //speechHandler.speak(msg);
	    speechUtteranceChunker(msg, { chunkLength:120 }, function(){
		    //some code to execute when done
		    stopAction();
		    console.log('done');
		});
	}

	var getTaglessText = function(taggedText){
		var arr = iCalContent.match(/^SUMMARY\:(.)*$/g);
  		return(arr);
	}


	var speechUtteranceChunker = function (utt, settings, callback) {
	    settings = settings || {};
	    var chunkLength = settings && settings.chunkLength || 160;
	    var pattRegex = new RegExp('^.{' + Math.floor(chunkLength / 2) + ',' + chunkLength + '}[\.\!\?\,]{1}|^.{1,' + chunkLength + '}$|^.{1,' + chunkLength + '} ');
	    var txt = (settings && settings.offset !== undefined ? utt.text.substring(settings.offset) : utt.text);
	    var chunkArr = txt.match(pattRegex);
	    console.log(txt);

	    if (chunkArr[0] !== undefined && chunkArr[0].length > 2 && isReadSummoned === true) {
	        var chunk = chunkArr[0];
	        var newUtt = new SpeechSynthesisUtterance(chunk);
	        for (x in utt) {
	            if (utt.hasOwnProperty(x) && x !== 'text') {
	                newUtt[x] = utt[x];
	            }
	        }
	        newUtt.lang = 'es-MX';
	        newUtt.onend = function () {
	            settings.offset = settings.offset || 0;
	            settings.offset += chunk.length - 1;
	            speechUtteranceChunker(utt, settings, callback);
	        }
	        console.log(newUtt); //IMPORTANT!! Do not remove: Logging the object out fixes some onend firing issues.
	        //placing the speak invocation inside a callback fixes ordering and onend issues.
	        setTimeout(function () {
	            speechHandler.speak(newUtt);
	        }, 0);
	    } else {
	        //call once all text has been spoken...
	        if (callback !== undefined) {
	            callback();
	        }
	    }
	}

	return publics;
});