define(function(require){

	var imageTemplate = `<img class="f_image t1--audio-display--image-display" style="display:none" src=":url:"/>`;

	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var isMuted = null;
	var files = null;
	var audioImageHandler = null;
	var isAudioReady = null;
	var isOnChange = null;
	var audioURL = null;

	var audioHTML = null;
	var audioObj = null;
	var timeControlObj = null;
	var audio_ = null;
	var timeLeft_ = null;
	var totalTime_ = null;
	var timeControl_ = null;
	var files_ = null;
	var fileCount_ = null;
	var mute_ = null;
	var stop_ = null;
	var play_ = null;
	var fullScreen_ = null;
	var fileCount_ = null;

	var onaudioready_callback = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		init();
		console.log("container set");
		return this;
	}

	publics.setAudioURL = function(url){
		audioURL = url;
		console.log("url set: " + url);
		return this;
	}

	publics.addImageToShow = function(url, timeInSeconds){
		audioImageHandler.addImage({url: url, time: timeInSeconds});
		console.log("image added: " + url);
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		console.log("nav set");
		return this;
	}

	publics.addFile = function(name, url){
		files.push({name: name, url: url});
		console.log("file added: " + url);
		return this;
	}

	publics.draw = function(){
		if(audioURL == null){
			console.error("Establece el url del audio con 'obj.setAudioURL(url)'");
			return;
		}
		if(screenContainer == null){
			console.error("Establece el contenedor con 'obj.setContainer(container)'");
			return;
		}

		console.log("draw invoke");
		findFields();
		fillFields();
		setEvents();
	}

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.onaudioready = function(callback){
		onaudioready_callback = callback;
	}

	var init = function(){	
		isMuted = false;
		isAudioReady = false;
		isOnChange = false;
		files = [];
		images = [];
		audioImageHandler = new ImageHandler();
	}

	var findFields = function(){
		audio_ = screenContainer.find("#audio_");
		timeLeft_ = screenContainer.find("#timeLeft_");
		totalTime_ = screenContainer.find("#totalTime_");
		timeControl_ = screenContainer.find("#timeControl_");
		files_ = screenContainer.find("#files_");
		mute_ = screenContainer.find("#mute_");
		stop_ = screenContainer.find("#stop_");
		play_ = screenContainer.find("#play_");
		fullScreen_ = screenContainer.find("#fullScreen_");
		fileCount_ = screenContainer.find("#fileCount_");
		fileCount_ = screenContainer.find("#fileCount_");
		console.log("Fields: ");
		console.log({
			audio_: audio_,
			timeLeft_: timeLeft_,
			totalTime_: totalTime_,
			timeControl_: timeControl_,
			files_: files_,
			mute_: mute_,
			stop_: stop_,
			play_: play_,
			fullScreen_: fullScreen_,
			fileCount_: fileCount_,
			fileCount_: fileCount_,
		});
		audioHTML = getAudioHTML();

		timeControlObj = timeControl_[0];
		audioObj = audioHTML[0];
	}

	var fillFields = function(){
		audio_.append(audioHTML);
		fileCount_.html(files.length);
	}

	var setChanges = function(bool){
		isOnChange = bool;
		if(bool == true){
			audioObj.pause();
		}
		else if(bool == false){
			audioObj.play();
		}
	}

	var setEvents = function(){
		timeControlObj.onchange = function(){
			console.log("clicked");
			setChanges(true);
			if(isAudioReady){
				changeTimeAction(this.value);
			}
			setChanges(false);
		};
		files_.click(function(){
			console.log("clicked");
			if(isAudioReady)
				showFilesAction();
		});
		mute_.click(function(){
			console.log("clicked");
			if(isAudioReady)
				muteAction();
		});
		stop_.click(function(){
			console.log("clicked");
			if(isAudioReady)
				stopAction();
		});
		play_.click(function(){
			console.log("clicked");
			if(isAudioReady)
				togglePlayAction();
		});
		fullScreen_.click(function(){
			console.log("clicked");
			if(isAudioReady)
				fullScreenAction();
		});
		audioObj.ontimeupdate = function(){
			console.log("clicked");
			if(isAudioReady && !isOnChange)
				changeTimeAction(this.currentTime, false);
		};
		audioObj.oncanplay = function(){
			console.log("clicked");
			audioImageHandler.refreshToTime(this.currentTime);
			isAudioReady = true;
			timeControlObj.min = 0;
			timeControlObj.max = audioObj.duration;
			timeControlObj.step = audioObj.duration/100;

			if(onaudioready_callback !== null){
				onaudioready_callback(false);
			}
		}
	}

	var changeTimeAction = function(time, updateAudio=true){

		if(time > audioObj.duration || time < 0){
			changeTimeAction(0);
			return;
		}
		if(updateAudio){
			audioObj.currentTime = time;
			audioImageHandler.refreshToTime(time);
		}

		findImageToShow(time);

		timeControlObj.value = time;

		var totalTime = time;
		var timeLeft = audioObj.duration - time;
		totalTime_.html(secondsToMinuteString(totalTime));
		timeLeft_.html(secondsToMinuteString(timeLeft))

	}


	var muteAction = function(){
		if(isMuted == true){
			mute_.find("i").removeClass("fa-volume-mute");
			mute_.find("i").addClass("fa-volume-up");
			isMuted = !isMuted;
		}
		else if(isMuted == false){
			mute_.find("i").removeClass("fa-volume-up");
			mute_.find("i").addClass("fa-volume-mute");
			isMuted = !isMuted;
		}

		$(audioObj).prop("muted", isMuted);
	}

	var playAction = function(){
		play_.find("i").removeClass("fa-play");
		play_.find("i").addClass("fa-pause");

		audioObj.play();
	}

	var pauseAction = function(){
		play_.find("i").removeClass("fa-pause");
		play_.find("i").addClass("fa-play");

		audioObj.pause();
	}

	var stopAction = function(){
		audioObj.pause();
		changeTimeAction(0);
	}

	var togglePlayAction = function(){
		if(audioObj.paused === false){
			pauseAction();
		}
		else if(audioObj.paused === true){
			playAction();
		}
	}

	var fullScreenAction = function(){
		var elem = audioObj;
		if (elem.requestFullscreen) {
			elem.requestFullscreen();
		} else if (elem.mozRequestFullScreen) {
			elem.mozRequestFullScreen();
		} else if (elem.webkitRequestFullscreen) {
			elem.webkitRequestFullscreen();
		} else if (elem.msRequestFullscreen) { 
			elem.msRequestFullscreen();
		}
	}

	var showFilesAction = function(){
		require(["courseControllers/FilesController_pop"], function(popController){
			popController.setParentNav(parentNav);
			parentNav.pushPop(popController, "files", {files: files}, "pop-white-full");
		})
		
	}

	var findImageToShow = function(time){
		var theTime = audioImageHandler.nextImageTime();
		if(theTime !== null && theTime <= time ){
			var fadeSpeed = 800;
			var imageDuration = 5000;
			var image = audioImageHandler.getNextImage();

			var audioView = imageTemplate.replace(":url:", image.url);
			audioView = $(audioView);

			audio_.append(audioView);
			audioView.fadeIn(fadeSpeed);

			setTimeout(function(){
				audioView.fadeOut(fadeSpeed, function(){
					audioView.remove();
				});
			}, imageDuration);
		}
	}

	var secondsToMinuteString = function(secs){
		var minutes = parseInt(secs / 60);
		var seconds = secs % 60;

		minutes = Math.round(minutes);
		seconds = Math.round(seconds);

		if(minutes < 10){
			minutes = "0" + minutes;
		}
		if(seconds < 10){
			seconds = "0" + seconds;
		}
		return minutes + ":" + seconds;
	}


	var getAudioHTML = function(){
		var str = `<audio class="daAudio" src="${audioURL}">No se soporta. Contacte administrador</audio>`;

		var obj = $($.parseHTML(str)[0]);

		obj[0].addEventListener("error", function(){
			reportBrokenAudio();
		});
		return obj;
	}

	var reportBrokenAudio = function(){
		onaudioready_callback(true);

		audio_.find(".daAudio").remove();

		var html = `<i class="far fa-file-excel video-audio--icon-display"></i>`;
		audio_.append(html);
	}

	function ImageHandler(){
		var publics = {};

		var mainImages = [];
		var imagesToShow = [];
		var nextImageTime = 0;

		publics.refreshToTime = function(time){
			imagesToShow = [];
			for (var i = mainImages.length - 1; i >= 0; i--) {
				var image = mainImages[i];
				if(time <= image.time){
					imagesToShow.push(image);
				}
			}
			if(imagesToShow.length > 0){
				nextImageTime = imagesToShow[imagesToShow.length-1].time;
			}
			else{
				nextImageTime = null;
			}
		}

		publics.nextImageTime = function(){
			return nextImageTime;
		}

		publics.getNextImage = function(){
			var next = imagesToShow.pop();
			var lastIndex = imagesToShow.length-1;
			if(lastIndex >= 0){
				nextImageTime = imagesToShow[imagesToShow.length-1].time;
			}
			else{
				nextImageTime = null;
			}
			return next;
		}

		publics.addImage = function(newImage){
			var added = false;
			for (var i = mainImages.length - 1; i >= 0; i--) {
				var image = mainImages[i];
				if(newImage.time <= image.time){
					added = true;
					mainImages.splice(i,0,newImage);
					break;
				}
			}
			if(added == false){
				mainImages.push(newImage);
			}
			
		}
		return publics;

	}

	return publics;
});
