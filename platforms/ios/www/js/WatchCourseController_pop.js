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
		var moduleID = myData.moduleID;
		var userID = myData.userID;
		screen.orientation.lock('landscape-primary');
		screenContainer.prepend(`AAAAAAAAAAAAA<iframe src="https://uvimex.com.mx/dashboard/platform/php/preview.php?idmodule=${moduleID}&usr=${userID}"></iframe>`);
	}
	
	return publics;
});