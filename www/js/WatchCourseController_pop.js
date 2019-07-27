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
		screen.orientation.lock('landscape-primary');
		if(myData.nonLocal === true){
			var moduleID = myData.moduleID;
			var morisID = moduleID - 90;
			screenContainer.prepend(`<iframe src="http://104.154.247.218/cursoprueba/c1/m${morisID}/"></iframe>`);
		}
		else if(myData.nonLocal === false){
			var moduleID = myData.moduleID;
			var userID = myData.userID;
			screenContainer.prepend(`<iframe src="https://uvimex.com.mx/dashboard/platform/php/preview.php?idmodule=${moduleID}&usr=${userID}"></iframe>`);
		}
	}
	
	return publics;
});