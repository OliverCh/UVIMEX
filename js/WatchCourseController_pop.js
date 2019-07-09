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
		var moduleID = data.moduleID;
		var userID = data.userID;
		screenContainer.prepend(`https://uvimex.com.mx/dashboard/platform/php/preview.php?idmodule=${moduleID}&usr=${userID}`);
	}
	
	return publics;
});