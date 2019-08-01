define(function(require){
	var publics = {};
	var screenContainer = null;

	//Controllers
	var modulesContainer = null;
	var myData;

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.setData = function(data){
		myData = data;
		return this;
	}

	publics.draw = function(){
		//screen.orientation.lock('landscape-primary');
		var moduleID = myData.moduleID;
		var morisID = moduleID;
		screenContainer.prepend(`<iframe src="http://104.154.247.218/cursoprueba/c1/m${morisID}/"></iframe>`);
	}
	
	return publics;
});