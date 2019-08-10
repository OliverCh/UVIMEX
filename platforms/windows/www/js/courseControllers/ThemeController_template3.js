define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var audioController = null;
	var themeAudio_ = null;
	var theme = null;
	var template = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.draw = function(){
		var base = $("<div></div>");
		base.load("secciones/platform/audioSubcontroller.html", function(){
			findFields();
			$.post(masterPath + "getFullContent.php", {themeID: theme.id, themeTemplate: template}, function(data){
				console.log(data);
				getFullContent();
			});
		});
		base.appendTo(screenContainer);
	}

	publics.setData = function(data){
		if(data.theme !== undefined){
			theme = data.theme;
		}
		if(data.template !== undefined){
			template = data.template;
		}

		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	var initVideo = function(audio, images, files){
		require(["courseControllers/AudioSubcontroller"], function(AudioSubcontroller){
			// audioController = AudioSubcontroller;
			// audioController.setContainer(themeAudio_)
			// 				.setParentNav(parentNav)
			// 				.setAudioURL("https://sample-videos.com/audio/mp3/crowd-cheering.mp3")
			// 				.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 0)
			// 				.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 20)
			// 				.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 10)
			// 				.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/378/Files/1562872569d1c3d647e0fb.png")
			// 				.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/372/Files/15627828930bc732e562be.pdf")
			// 				.addFile("AAA", "https://docs.google.com/document/d/e/2PACX-1vRJVgVwOWeaNUf1ew6Ir8nHO18RqlEhz_Bd7Gsa1e58aj8hdvNs8tKfIZPocmF0cJae5JHM3-uvyqRo/pub")
			// 				.addFile("Un dox", "https://uvimex.com.mx/dashboard/platform/uploads/Análisis-de-consumo-hídrico.docx")
			// 				.draw();

			audioController = AudioSubcontroller;
			audioController.setContainer(themeAudio_)
							.setParentNav(parentNav)
							.setAudioURL(audio);
			for (var i = 0; i < images.length; i++) {
				var image = images[i];
				audioController = audioController.addImageToShow(image.url, image.time);
				console.log(image);
				console.log(image.url);
				console.log(image.time);
			}

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				audioController = audioController.addFile(file.name, file.url);
			}
			audioController.draw();
		});
	}

	var getFullContent = function(){
		$.ajax({
			url: masterPath + "getFullContent.php",
			data: {themeID: theme.id, themeTemplate: template},
			success: function(data){
				if(data.content === undefined || data.images === undefined || data.files === undefined){
					throw new Error("Wrong data");
					console.error(data);
					return;
				}
				// convert from min:sec format
				for (var i = data.images.length - 1; i >= 0; i--) {
					var crudeTime = data.images[i].time;
					var splited = crudeTime.split(":");
					var min = parseInt(splited[0]);
					var sec = parseInt(splited[1]);
					data.images[i].time = min * 60 + sec; 
				}
				initVideo(data.content, data.images, data.files);
			}
		});
	}

	var findFields = function(){
		themeAudio_ = $("#themeAudio_");
	}

	return publics;
});
