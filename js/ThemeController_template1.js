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
		screenContainer.load("secciones/platform/theme_template1.html", function(){
			findFields();
			initVideo();
		});
	}

	publics.setData = function(data){
		console.log("mod Received" + data);
		myData = data;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	var initVideo = function(){
		require(["VideoSubcontroller"], function(VideoSubcontroller){
			videoController = VideoSubcontroller;
			videoController.setContainer(themeVideo_)
							.setParentNav(parentNav)
							.setVideoURL("http://techslides.com/demos/sample-videos/small.mp4")
							.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 0)
							.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 2)
							.addImageToShow("https://www.fujifilm.com/products/digital_cameras/x/fujifilm_x_pro2/sample_images/img/index/ff_x_pro2_003.JPG", 1)
							.addFile("pronombres", "https://uvimex.com.mx/dashboard/platform/uploads/372/Files/15627828930bc732e562be.pdf")
							.draw();
		});
	}

	var findFields = function(){
		themeVideo_ = $("#themeVideo_");
	}

	return publics;
});
