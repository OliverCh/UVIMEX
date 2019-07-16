define(function(require){

	var publics = {};
	var screenContainer = null;
	var videoURL = null;
	var isMuted = null;
	var files = null;
	var videoImageHandler = null;
	var isVideoReady = null;
	var isOnChange = null;
	var parentNav = null;


	var videoHTML = null;
	var videoObj = null;
	var timeControlObj = null;
	var video_ = null;
	var timeLeft_ = null;
	var totalTime_ = null;
	var timeControl_ = null;
	var files_ = null;
	var fileCount_ = null;
	var mute_ = null;
	var stop_ = null;
	var play_ = null;
	var fullScreen_ = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		init();
		return this;
	}

	publics.setVideoURL = function(url){
		videoURL = url;
		return this;
	}

	publics.addImageToShow = function(url, timeInSeconds){
		videoImageHandler.addImage({url: url, time: timeInSeconds});
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	publics.addFile = function(name, url){
		files.push({name: name, url: url});
		return this;
	}

	publics.draw = function(){
		if(videoURL == null){
			console.error("Establece el url del video con 'obj.setVideoURL(url)'");
			return;
		}
		if(screenContainer == null){
			console.error("Establece el contenedor con 'obj.setContainer(container)'");
			return;	
		}

		findFields();
		fillFields();
		setEvents();
	}

	publics.setData = function(data){
		console.log("mod Received" + data);
		myData = data;
		return this;
	}

	var init = function(){	
		isMuted = false;
		isVideoReady = false;
		isOnChange = false;
		files = [];
		images = [];
		videoImageHandler = new ImageHandler();
	}

	var findFields = function(){
		video_ = screenContainer.find("#video_");
		timeLeft_ = screenContainer.find("#timeLeft_");
		totalTime_ = screenContainer.find("#totalTime_");
		timeControl_ = screenContainer.find("#timeControl_");
		files_ = screenContainer.find("#files_");
		mute_ = screenContainer.find("#mute_");
		stop_ = screenContainer.find("#stop_");
		play_ = screenContainer.find("#play_");
		fullScreen_ = screenContainer.find("#fullScreen_");
		fileCount_ = screenContainer.find("#fileCount_");
		videoHTML = getVideoHTML();

		timeControlObj = timeControl_[0];
		videoObj = videoHTML[0];
	}

	var fillFields = function(){
		video_.append(videoHTML);
	}

	var setChanges = function(bool){
		isOnChange = bool;
		if(bool == true){
			videoObj.pause();
		}
		else if(bool == false){
			videoObj.play();
		}
		console.log("asd " + bool);
	}

	var setEvents = function(){
		timeControlObj.onchange = function(){
			setChanges(true);
			if(isVideoReady){
				changeTimeAction(this.value);
				
			}
			setChanges(false);
		};
		files_.click(function(){
			if(isVideoReady)
				showFilesAction();
		});
		mute_.click(function(){
			if(isVideoReady)
				muteAction();
		});
		stop_.click(function(){
			if(isVideoReady)
				stopAction();
		});
		play_.click(function(){
			if(isVideoReady)
				togglePlayAction();
		});
		fullScreen_.click(function(){
			if(isVideoReady)
				fullScreenAction();
		});
		videoObj.ontimeupdate = function(){
			if(isVideoReady && !isOnChange)
				changeTimeAction(this.currentTime, false);
		};
		videoObj.oncanplay = function(){
			videoImageHandler.refreshToTime(this.currentTime);
			isVideoReady = true;
			timeControlObj.min = 0;
			timeControlObj.max = videoObj.duration;
			timeControlObj.step = videoObj.duration/100;
		}
	}

	var changeTimeAction = function(time, updateVideo=true){

		if(time > videoObj.duration || time < 0){
			changeTimeAction(0);
			return;
		}
		if(updateVideo){
			videoObj.currentTime = time;
			videoImageHandler.refreshToTime(time);
		}

		findImageToShow(time);

		timeControlObj.value = time;

		var totalTime = time;
		var timeLeft = videoObj.duration - time;
		totalTime_.html(secondsToMinuteString(totalTime));
		timeLeft_.html(secondsToMinuteString(timeLeft))

	}


	var muteAction = function(){
		if(isMuted == true){
			mute_.removeClass("fas fa-volume-mute");
			mute_.addClass("fas fa-volume-up");
			isMuted = !isMuted;
		}
		else if(isMuted == false){
			mute_.removeClass("fas fa-volume-up");
			mute_.addClass("fas fa-volume-mute");
			isMuted = !isMuted;
		}

		$(videoObj).prop("muted", isMuted);
	}

	var playAction = function(){
		play_.removeClass("fas fa-play");
		play_.addClass("fas fa-pause");

		videoObj.play();
		console.log(videoObj);
	}

	var pauseAction = function(){
		play_.removeClass("fas fa-pause");
		play_.addClass("fas fa-play");

		videoObj.pause();
	}

	var stopAction = function(){
		videoObj.pause();
		changeTimeAction(0);
	}

	var togglePlayAction = function(){
		if(videoObj.paused === false){
			pauseAction();
		}
		else if(videoObj.paused === true){
			playAction();
		}
	}

	var fullScreenAction = function(){
		var elem = videoObj;
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
		require(["FileViewerController_pop"], function(popController){
			popController.setParentNav(parentNav);
			parentNav.pushPop(popController, "files", {files: files}, "pop-white-full");
		})
		
	}

	var findImageToShow = function(time){
		console.log(videoImageHandler.nextImageTime());
		if(videoImageHandler.nextImageTime() <= time ){
			var image = videoImageHandler.getNextImage();
			console.log("****");
			console.log(image);
			console.log(videoImageHandler.nextImageTime());
			console.log("****");
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


	var getVideoHTML = function(){
		var str = `<video class="daVideo" src="${videoURL}" id="video_">No se soporta. Contacte administrador</video>`;
		return $($.parseHTML(str)[0]);
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
			nextImageTime = imagesToShow[imagesToShow.length-1].time;
			console.log(imagesToShow);
		}

		publics.nextImageTime = function(){
			return nextImageTime;
		}

		publics.getNextImage = function(){
			var next = imagesToShow.pop();
			var lastIndex = imagesToShow.length-1;
			console.log(imagesToShow);
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
