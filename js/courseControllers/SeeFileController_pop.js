define(function(require){
	var publics = {};
	var screenContainer = null;
	var iFrameContainer_ = null;
	var parentNav = null;

	var myData = null;
	var file = null;

	var fileViewerTemplate = `https://docs.google.com/viewer?url=:url:&embedded=true`;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
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
			setEvents();
			fillFields();
		});
	}

	var findFields = function(){
		iFrameContainer_ = screenContainer.find("#iFrameContainer_");
	}

	var setEvents = function(){
		screenContainer.click(function(){
			parentNav.popPop(publics.id);
		});
	}

	var fillFields = function(){
		var url = file.url;
		var format = getFormat(url);

		var Wheight = $(window).height();
		var Wwidth = $(window).width();

		if(isImage(format)){
			iFrameContainer_[0].src = url;
			getSizes(url, function(sizes){
				if(sizes.width <= Wwidth * .8){
					iFrameContainer_[0].width = sizes.width;
				}
				else{
					iFrameContainer_[0].width = Wwidth * .8;
				}

				if(sizes.height <= Wheight * .8){
					iFrameContainer_[0].height = sizes.height;
				}
				else{
					iFrameContainer_[0].height = Wheight * .8;
				}
				
				var parent = iFrameContainer_.parent();
				parent.css("padding-left", (Wwidth - iFrameContainer_[0].width)/2);
			});
		}
		else{
			iFrameContainer_[0].src = fileViewerTemplate.replace(":url:", file.url);
			var viewWidth = Wwidth * .8;
			iFrameContainer_[0].width = viewWidth;
			iFrameContainer_[0].height = Wheight * .8;

			var parent = iFrameContainer_.parent();
			parent.css("padding-left", (Wwidth - viewWidth)/2);
			console.log($('div[role="toolbar"]'));
		}
		
	}

	function getSizes(url, callback){
		var img = new Image();
	    img.onload = function(){
	        console.log(this);
			callback({width: this.width, height: this.height});
	    };
	    img.src = url;
	}

	var isImage = function(x){
		console.log(x);
		x = x.toLowerCase();
		return (x == "gif" || x == "png" || x == "jpeg" || x == "jpg");
	}

	var getFormat = function(url){
		var points = url.split(".");

		return points[points.length-1];
	}


	return publics;
});
