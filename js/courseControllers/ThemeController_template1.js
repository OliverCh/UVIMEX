define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var videoController = null;
	var themeVideo_ = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.draw = function(){
		var base = $("<div></div>");
		base.load("secciones/platform/videoSubcontroller.html", function(){
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

	var initVideo = function(url, images, files){
		require(["courseControllers/VideoSubcontroller"], function(VideoSubcontroller){
			videoController = VideoSubcontroller;
			videoController = videoController.setContainer(themeVideo_)
							.setParentNav(parentNav)
							.setVideoURL(url);
			for (var i = 0; i < images.length; i++) {
				var image = images[i];
				videoController = videoController.addImageToShow(image.url, image.time);
			}

			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				videoController = videoController.addFile(file.name, file.url);
			}

			videoController.draw();
			// videoController.setContainer(themeVideo_)
			// 				.setParentNav(parentNav)
			// 				.setVideoURL("https://sample-videos.com/video123/mp4/720/big_buck_bunny_720p_5mb.mp4")
			// 				.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 0)
			// 				.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 20)
			// 				.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 10)
			// 				.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/378/Files/1562872569d1c3d647e0fb.png")
			// 				.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/372/Files/15627828930bc732e562be.pdf")
			// 				.addFile("AAA", "https://docs.google.com/document/d/e/2PACX-1vRJVgVwOWeaNUf1ew6Ir8nHO18RqlEhz_Bd7Gsa1e58aj8hdvNs8tKfIZPocmF0cJae5JHM3-uvyqRo/pub")
			// 				.addFile("Un dox", "https://uvimex.com.mx/dashboard/platform/uploads/Análisis-de-consumo-hídrico.docx")
			// 				.draw();
		});
	}

	var findFields = function(){
		themeVideo_ = $("#themeVideo_");
	}

	var getFullContent = function(){
		$.ajax({
			url: masterURL + "getFullContent.php",
			data: {themeID: theme.id},
			success: function(data){
				if(data.url === undefined || data.images === undefined || data.files === undefined){
					throw new Error("Wrong data");
					console.error(data);
					return;
				}
				initVideo(data.url, data.images, data.files);
			}
		});
	}

	return publics;
});
