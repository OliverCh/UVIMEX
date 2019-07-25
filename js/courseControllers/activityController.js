define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var f_back = null;
	var nonLocal = null;
	var myData;
	var activityParser = require('activityParser');

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		return this;
	};

	publics.setData = function(data){
		if((data.activity != undefined || data.activity != null) && (data.theme != undefined || data.theme != null)){
			throw new Error("Wrong data");
			return null;
		}
		else{
			myData = data;
			return this;
		}
	};

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	};

	publics.draw = function(){
		var activityData = getActivityData();
		switch(myData.activity){
			case 1:
				activityParser.parseType1(activityData); //no puedo pensar
			break;
			case 2:
				activityParser.parseType2(activityData);
			break;
			case 3:
				activityParser.parseType3(activityData);
			break;
			default:
				screenContainer.html("<h1>Error</h1><br><h2>Invalid activity type</h2>");
			break;
		}
	};

	return publics;
});