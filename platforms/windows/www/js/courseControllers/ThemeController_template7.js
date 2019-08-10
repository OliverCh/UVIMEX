define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var videoController = null;
	var themeText_ = null;
	var theme = null;
	var template = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.draw = function(){
		var base = $("<div></div>");
		base.load("secciones/platform/textSubcontroller.html", function(){
			findFields();
			getFullContent();
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
		myData = data;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	var initText = function(text, files){
		if(window.device === "Android"){
			loadAndroid(text, files);
		}
		else{
			loadNonAndroid(text, files);
		}
	}

	var loadNonAndroid = function(text, files){
		require(["courseControllers/TextSubcontroller"], function(TextSubcontroller){
			textSubcontroller = TextSubcontroller;
			textSubcontroller.setContainer(themeText_)
								.setParentNav(parentNav)
								.setText(text);
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				textSubcontroller = textSubcontroller.addFile(file.name, file.url);
			}

			textSubcontroller.draw();
		});
	}

	var loadAndroid = function(text, files){
		require(["courseControllers/TextSubcontroller_Android"], function(TextSubcontroller){
			
			textSubcontroller = TextSubcontroller;
			textSubcontroller.setContainer(themeText_)
								.setParentNav(parentNav)
								.setText(text);
			for (var i = 0; i < files.length; i++) {
				var file = files[i];
				textSubcontroller = textSubcontroller.addFile(file.name, file.url);
			}

			textSubcontroller.draw();
		});
	}

	var findFields = function(){
		themeText_ = screenContainer.find("#themeText_");
	}

	var getFullContent = function(){
		$.ajax({
			url: masterPath + "getFullContent.php",
			data: {themeID: theme.id, themeTemplate: template},
			success: function(data){
				if(data.content === undefined || data.files === undefined){
					throw new Error("Wrong data");
					console.error(data);
					return;
				}
				initText(data.content, data.files);
			}
		});
	}
	return publics;
});
