define(function(require){
	var fileTemplate = `
		<div class="individual-file-cont">
			<div class="file-icon-pop">
				<i class="fas fa-file-pdf"></i>
			</div>
			<p>:fileName:</p>
			<button type="button" name="button" data-id=":fileId:" class="watchFile">Ver</button>
		</div>`;


	var publics = {};
	var screenContainer = null;
	var popFiles_content_ = null;
	var parentNav = null;

	var myData = null;
	var files = null;
	var self = this;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	}

	publics.setData = function(data){
		myData = data;
		console.log(myData);
		files = myData.files;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	publics.draw = function(){
		screenContainer.load("secciones/platform/popup_files.html", function(){

			findFields();
			setEvents();
			fillFields();
		});
	}

	var findFields = function(){
		popFiles_content_ = screenContainer.find("#popFiles_content_");
	}

	var setEvents = function(){
		screenContainer.find(".close-pop").click(function(){
			console.log("close");
			parentNav.popPop(publics.id);
		});
		screenContainer.on("click", ".watchFile", function(){
			var id = $(this).data("id");
			var file = files[id];
			// Agregar otro popup
			require(["courseControllers/SeeFileController_pop"], function(controller){
				controller.setParentNav(parentNav);
				parentNav.pushPop(controller, "file", {file: file});
			});
			
		});
	}

	var fillFields = function(){
		for (var i = 0; i < files.length; i++) {
			var file = files[i];
			var fileHTML = fileTemplate.replace(":fileName:", file.name)
										.replace(":fileId:", i);
			popFiles_content_.append(fileHTML);
		}
	}


	return publics;
});
