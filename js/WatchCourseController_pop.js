define(function(require){
	var publics = {};
	var screenContainer = null;

	//Controllers
	var modulesContainer = null;
	var myData;
	var parentNav = null;

	var closeCourse_ = null;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	}

	publics.draw = function(){
		//screen.orientation.lock('landscape-primary');
		var moduleID = myData.moduleID;
		var morisID = moduleID;
		screenContainer.prepend(`
			<div class="frameCourseViewer">
				<div class="frameTop"><button class="closeCourse"><i class="fas fa-chevron-left"></i></button></div>
				<iframe src="http://104.154.247.218/cursoprueba/c1/m${morisID}/"></iframe>
			</div>
			`);

		findFields();
		setEvents();
	}

	var findFields = function(){
		closeCourse_ = screenContainer.find(".closeCourse");
	}

	var setEvents = function(){
		closeCourse_.click(function(){
			parentNav.popPop("course");
		})
	}
	
	return publics;
});