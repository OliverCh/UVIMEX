define(function(require){
	var publics = {};
	var screenContainer = null;
	var parentNav = null;

	var nonLocal = null;
	var myData;
	var activityParser = require('courseControllers/activityParser');
	var answersParser = require('courseControllers/answersParser');
	var currentPage = 0;
	var actualAnswers = {};
	var currentActivity = [];
	var canSave = false;

	/*
		FUNCTIONS
	*/

	var previousPage = function(){
		if(currentPage != 0){
			canSave = false;
			currentPage--;
			screenContainer.parent().find('#nextAct_').text('Siguiente').removeClass('_saveAct');
			publics.draw(true);
		}
	};

	var nextPage = function(){
		if(currentPage != (myData.pageCount - 1)){
			currentPage++;
			publics.draw();
		}

		if(currentPage == (myData.pageCount - 1)){
			screenContainer.parent().find('#nextAct_').text('Terminar').addClass('_saveAct');
		}
	};

	var setControls = function(){
		currentPage = 0;
		var actBack = screenContainer.parent().find('#prevAct_');
		var actFw = screenContainer.parent().find('#nextAct_');
		if(myData.pageCount == 1){
			actBack.remove();
			actFw.text('Terminar').addClass('_saveAct');
			canSave = true;
		}
		else{
			actBack.on('click', previousPage);
			actFw.on('click', nextPage);
		}
	};

	var saveActivity = function(){
		if(canSave == false){
			canSave = true;
		}
		else{
			$.post(masterPath + "activityCentre.php", {theme: myData.theme, action: 'saveAct', userID: localStorage.getItem('user_id'), answers: actualAnswers}, function(data){
				console.log(data);
				screenContainer.parent().find('#prevAct_').remove();
				screenContainer.parent().find('#nextAct_').remove();
				answersParser.setAnswers(actualAnswers);
				switch(myData.template){
					case 'actividad6':
						screenContainer.html(answersParser.parseType1(currentActivity, data));
					break;
					case 'actividad5':
						screenContainer.html(answersParser.parseType2(currentActivity, data));
					break;
					case 'actividad2':
						screenContainer.html(answersParser.parseType3(currentActivity, data));
					break;
					default:
						screenContainer.html("<h1>Error</h1><br><h2>Invalid activity type</h2>");
					break;
				}
			});
		}
	};

	/*
		LISTENERS
	*/
/*
	$(document).on('click', '.falsoverdadero p', function(){
		if ($(this).hasClass('selected-fv')) {

		}
		else{
			$('.falsoverdadero p').removeClass('selected-fv');
			$(this).addClass('selected-fv');
		}
	});*/

	$(document).on('click', '.opcion-multiple p', function(){
		if(!($(this).hasClass('answered'))){
			var answerID = parseInt($(this).data('ansid'));
			var questionID = $(this).data('qid');
			var hijo = $(this).find('i');
			if (hijo.hasClass('fa-square')) {
				delete actualAnswers[answerID];
			}
			else{
				actualAnswers[answerID] = {
					aID: answerID,
					qID: questionID,
					theme: myData.theme,
					time: Date.now()
				};
			}
		}
	});

	$(document).on('click', '.row-opcion-unica', function(){
		if(!($(this).hasClass('answered'))){
			if ($(this).hasClass('selected-option-unica')) {
				console.log($(this));
				var answerID = parseInt($(this).data('ansid'));
				var questionID = $(this).data('qid');
				actualAnswers[questionID] = {
					aID: answerID,
					qID: questionID,
					theme: myData.theme,
					time: Date.now()
				};
			}
		}
	});

	$(document).on('click', '._saveAct', saveActivity);

	/*
		PUBLICS
	*/

	publics.setContainer = function(cnt){
		screenContainer = cnt;
		setControls();
		return this;
	};

	publics.setData = function(data){
		if((data.template == undefined || data.template == null) && (data.theme == undefined || data.theme == null)){
			throw new Error("Wrong data");
			return null;
		}
		else{
			if(myData != null && myData.theme != data.theme){
				actualAnswers = {};
				canSave = false;
			}
			myData = data;
			return this;
		}
	};

	publics.setParentNav = function(nav){
		parentNav = nav;
		return this;
	};

	publics.draw = function(isBack){
		$.post(masterPath + "activityCentre.php", {theme: myData.theme, action: 'loadAct', page: currentPage}, function(data){
			activityParser.setAnswers(actualAnswers);
			switch(myData.template){
				case 'actividad6':
					screenContainer.html(activityParser.parseType1(data)); //no puedo pensar
					if(!isBack)
						currentActivity = currentActivity.concat(data);
				break;
				case 'actividad5':
					screenContainer.html(activityParser.parseType2(data));
					if(!isBack)
						currentActivity = currentActivity.concat(data);
				break;
				case 'actividad2':
					screenContainer.html(activityParser.parseType3(data));
					if(!isBack)
						currentActivity = currentActivity.concat(data);
				break;
				default:
					screenContainer.html("<h1>Error</h1><br><h2>Invalid activity type</h2>");
				break;
			}
			console.log(currentActivity);
		});
	};

	return publics;
});