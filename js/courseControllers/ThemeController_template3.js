define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var audioController = null;
	var themeAudio_ = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.draw = function(){
		var base = $("<div></div>");
		base.load("secciones/platform/audioSubcontroller.html", function(){
			findFields();
			initVideo();
		});
		base.appendTo(screenContainer);
	}

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	var initVideo = function(){
		require(["courseControllers/AudioSubcontroller"], function(AudioSubcontroller){
			audioController = AudioSubcontroller;
			audioController.setContainer(themeAudio_)
							.setParentNav(parentNav)
							.setAudioURL("https://sample-videos.com/audio/mp3/crowd-cheering.mp3")
							.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 0)
							.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 20)
							.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 10)
							.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/378/Files/1562872569d1c3d647e0fb.png")
							.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/372/Files/15627828930bc732e562be.pdf")
							.addFile("AAA", "https://docs.google.com/document/d/e/2PACX-1vRJVgVwOWeaNUf1ew6Ir8nHO18RqlEhz_Bd7Gsa1e58aj8hdvNs8tKfIZPocmF0cJae5JHM3-uvyqRo/pub")
							.addFile("Un dox", "https://uvimex.com.mx/dashboard/platform/uploads/Análisis-de-consumo-hídrico.docx")
							.draw();
		});
	}

	var findFields = function(){
		themeAudio_ = $("#themeAudio_");
	}

	return publics;
});
