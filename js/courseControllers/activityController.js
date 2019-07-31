define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var f_back = null;
	var nonLocal = null;
	var myData;
	var activityParser = require('courseControllers/activityParser');
	var currentPage = 0;

	var getActivityData = function(){
		return JSON.parse('[{"questionString":"OLA","answers":[{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"}]},{"questionString":"OLA","answers":[{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"}]},{"questionString":"OLA","answers":[{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"}]}]');
	};

	publics.setContainer = function(cnt){
		console.log(cnt);
		screenContainer = cnt;
		return this;
	};

	publics.setData = function(data){
		console.log(data);
		if((data.template == undefined || data.template == null) && (data.theme == undefined || data.theme == null)){
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
		console.log(myData);
		switch(myData.template){
			case 'template1':
				screenContainer.html(activityParser.parseType1(activityData)); //no puedo pensar
			break;
			case 'template2':
				screenContainer.html(activityParser.parseType2(activityData));
			break;
			case 'template3':
				screenContainer.html(activityParser.parseType3(activityData));
			break;
			default:
				screenContainer.html("<h1>Error</h1><br><h2>Invalid activity type</h2>");
			break;
		}
	};

	return publics;
});