define(function(require){
	var publics = {};
	var screenContainer = null;
	var iFrameContainer_ = null;
	var parentNav = null;

	var myData = null;
	var file = null;

	var fileViewerTemplate = `
		:url:
	`;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.setData = function(data){
		myData = data;
		console.log(myData);
		file = myData.file;
		return this;
	}

	publics.draw = function(){
		screenContainer.load("secciones/platform/seeFile_pop.html", function(){
			findFields();
			fillFields();
		});
	}

	var findFields = function(){
		iFrameContainer_ = screenContainer.find("#iFrameContainer_");
	}

	var fillFields = function(){
		var url = file.url;
		var format = getFormat(url);

		var height = $(window).height();
		var width = $(window).width();

		var viewHeigth = height*0.9;
		var marginHeigth = height*0.05;

		var viewWidth = width*0.9;
		var marginWidth = width*0.05;

		iFrameContainer_[0].height = viewHeigth;
		iFrameContainer_[0].width = viewWidth;
		
		if(isImage(format)){
			iFrameContainer_[0].src = url;
		}
		else{
			iFrameContainer_[0].src = fileViewerTemplate.replace(":url:", file.url);
		}
	}

	var isImage = function(x){
		console.log(x);
		x = x.toLowerCase();
		return (x == "gif" || x == "png" || x == "jpeg" || x == "jpg");
	}

	var getFormat = function(url){
		return url.split(".")[1];
	}


	return publics;
});
