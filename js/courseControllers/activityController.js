define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var f_back = null;
	var nonLocal = null;
	var myData;
	var activityParser = require('courseControllers/activityParser');
	var currentPage = 0;
	var btns = null;

	var getActivityData = function(){
		return JSON.parse('[{"questionString":"OLA","answers":[{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"}]},{"questionString":"OLA","answers":[{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"}]},{"questionString":"OLA","answers":[{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"},{"answerID":69,"answerStr":"me gustan los onvres"}]}]');
	};

	var setControls = function(){
		var actBack = screenContainer.parent().find('#prevAct_');
		var actFw = screenContainer.parent().find('#nextAct_');

	};

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		setControls();
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
		$.post(masterPath + "activityCentre.php", {theme: myData.theme, action: 'loadAct', page: currentPage}, function(data){
			switch(myData.template){
				case 'actividad6':
					screenContainer.html(activityParser.parseType1(data)); //no puedo pensar
				break;
				case 'actividad5':
					screenContainer.html(activityParser.parseType2(data));
				break;
				case 'actividad2':
					screenContainer.html(activityParser.parseType3(data));
				break;
				default:
					screenContainer.html("<h1>Error</h1><br><h2>Invalid activity type</h2>");
				break;
			}
		});
	};

	return publics;
});